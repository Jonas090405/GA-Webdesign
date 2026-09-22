/**
 * extract-frames.mjs — schneidet ein Video in eine WebP-Framesequenz.
 *
 * Die Hero-Kamerafahrt wird nicht als <video> abgespielt, sondern beim Scrollen
 * Frame für Frame auf ein <canvas> gezeichnet. Nur so lässt sich die Kamerafahrt
 * exakt an den Scrollfortschritt koppeln — iOS Safari kann <video> nicht
 * zuverlässig scrubben.
 *
 * Gerendert wird in zwei Breiten (Desktop/Retina + Mobil), damit kleine Geräte
 * nicht die volle Datenmenge laden.
 *
 * Aufruf:
 *   node scripts/extract-frames.mjs <video> <ziel-ordner> [--frames 36]
 *
 * Beispiel:
 *   node scripts/extract-frames.mjs public/hero-flug.mp4 public/hero-flug
 */
import puppeteer from "puppeteer";
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "fs";
import { basename, join, resolve } from "path";

const [videoArg, outArg, ...rest] = process.argv.slice(2);

if (!videoArg || !outArg) {
  console.error("Aufruf: node scripts/extract-frames.mjs <video> <ziel-ordner> [--frames 36]");
  process.exit(1);
}

const flag = (name, fallback) => {
  const i = rest.indexOf(`--${name}`);
  return i === -1 ? fallback : Number(rest[i + 1]);
};

const FRAMES = flag("frames", 36);
const QUALITY = flag("quality", 0.74);
const PORT = flag("port", 3055);

/** Ausgabebreiten: Desktop/Retina und Mobil. */
const SIZES = [
  { dir: "w1920", width: 1920 },
  { dir: "w960", width: 960 },
];

const videoPath = resolve(videoArg);
const outDir = resolve(outArg);

if (!existsSync(videoPath)) {
  console.error(`Video nicht gefunden: ${videoPath}`);
  process.exit(1);
}

// ── Mini-Server: Chrome lädt das Video per HTTP ───────────────────────────────
// Range-Requests müssen beantwortet werden, sonst hält Chrome das Video für
// nicht seekbar — `currentTime` bleibt dann wirkungslos und jeder Frame wäre
// Frame 0.
const videoBytes = readFileSync(videoPath);
const server = createServer((req, res) => {
  if (req.url.startsWith("/video")) {
    const range = req.headers.range;
    if (range) {
      const [rawStart, rawEnd] = range.replace(/bytes=/, "").split("-");
      const start = Number(rawStart);
      const end = rawEnd ? Number(rawEnd) : videoBytes.length - 1;
      res.writeHead(206, {
        "Content-Type": "video/mp4",
        "Content-Range": `bytes ${start}-${end}/${videoBytes.length}`,
        "Content-Length": end - start + 1,
        "Accept-Ranges": "bytes",
      });
      res.end(videoBytes.subarray(start, end + 1));
      return;
    }
    res.writeHead(200, {
      "Content-Type": "video/mp4",
      "Content-Length": videoBytes.length,
      "Accept-Ranges": "bytes",
    });
    res.end(videoBytes);
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<!doctype html><meta charset=utf-8><title>frames</title><body style=margin:0;background:#000>");
});
await new Promise((ok) => server.listen(PORT, ok));

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--autoplay-policy=no-user-gesture-required"],
});

const page = await browser.newPage();
page.on("console", (m) => process.env.DEBUG && console.log("  [chrome]", m.text()));
await page.goto(`http://localhost:${PORT}/`, { waitUntil: "domcontentloaded" });

const meta = await page.evaluate(async () => {
  const v = document.createElement("video");
  v.src = "/video.mp4";
  v.muted = true;
  v.playsInline = true;
  v.preload = "auto";
  document.body.appendChild(v);
  window.__v = v;
  await new Promise((ok, fail) => {
    v.onloadeddata = ok;
    v.onerror = () => fail(new Error("Video konnte nicht dekodiert werden (Codec?)"));
  });
  return {
    duration: v.duration,
    width: v.videoWidth,
    height: v.videoHeight,
    seekable: v.seekable.length > 0 ? v.seekable.end(0) : 0,
  };
});

if (meta.seekable < meta.duration - 0.5) {
  throw new Error(
    `Video ist nicht seekbar (seekable bis ${meta.seekable}s von ${meta.duration}s) — ` +
      "alle Frames wären identisch.",
  );
}

console.log(
  `Quelle: ${basename(videoPath)} — ${meta.width}×${meta.height}, ${meta.duration.toFixed(2)}s`,
);

const manifest = { frames: FRAMES, sizes: {}, source: basename(videoPath) };

for (const size of SIZES) {
  const height = Math.round((size.width / meta.width) * meta.height);
  const dir = join(outDir, size.dir);
  mkdirSync(dir, { recursive: true });

  let bytes = 0;
  for (let i = 0; i < FRAMES; i++) {
    // Letzten Frame minimal vor Ende greifen — exakt auf duration liefert
    // in Chrome gelegentlich ein leeres Bild.
    const t = (i / (FRAMES - 1)) * (meta.duration - 0.05);

    const dataUrl = await page.evaluate(
      async (time, w, h, q) => {
        const v = window.__v;
        await new Promise((ok) => {
          v.onseeked = ok;
          v.currentTime = time;
        });
        // Zwei Frames Puffer, damit der dekodierte Frame sicher anliegt.
        // (`requestVideoFrameCallback` feuert im Headless-Betrieb nicht, weil
        // nichts an den Compositor ausgeliefert wird.)
        await new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok)));
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        c.getContext("2d").drawImage(v, 0, 0, w, h);
        return c.toDataURL("image/webp", q);
      },
      t,
      size.width,
      height,
      QUALITY,
    );

    if (!dataUrl.startsWith("data:image/webp")) {
      throw new Error("Chrome hat kein WebP geliefert — Frame " + i);
    }

    const file = join(dir, `${String(i).padStart(2, "0")}.webp`);
    writeFileSync(file, Buffer.from(dataUrl.split(",")[1], "base64"));
    bytes += statSync(file).size;
    process.stdout.write(`\r  ${size.dir}: ${i + 1}/${FRAMES}`);
  }

  manifest.sizes[size.dir] = { width: size.width, height };
  console.log(`\r  ${size.dir}: ${FRAMES} Frames, ${(bytes / 1024 / 1024).toFixed(2)} MB gesamt`);
}

writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));

await browser.close();
server.close();
console.log(`Fertig → ${outDir}`);
