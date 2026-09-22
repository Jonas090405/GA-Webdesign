import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useNavigate } from "react-router-dom";
import { TeamBadge } from "./TeamBadge";
import { SectionLabel } from "./SectionLabel";
import { PrimaryButton } from "./Button";
import { FadeIn } from "./FadeIn";

/**
 * HeroFlight — der Scroll-Hero der Startseite.
 *
 * Die Kamerafahrt durch den Schwarzwald liegt als Framesequenz vor (40 WebP,
 * aus dem generierten Clip geschnitten via `scripts/extract-frames.mjs`) und
 * wird beim Scrollen Frame für Frame auf ein Canvas gezeichnet. Ein <video> zu
 * scrubben wäre der naheliegende Weg, funktioniert aber auf iOS Safari nicht
 * zuverlässig — die Framesequenz läuft überall gleich.
 *
 * Darüber liegen drei Ebenen, die sich unterschiedlich schnell bewegen
 * (Nebel, Lichtblüte, Abdunklung) — daraus entsteht die Tiefenwirkung.
 * Während der Fahrt lösen sich vier Textblöcke ab; das Netzwerk im Bild baut
 * sich parallel dazu auf.
 *
 * Zwei Bildbreiten: >1200 effektive Pixel bekommen w1920, alles darunter w960.
 * `prefers-reduced-motion` bekommt einen normal hohen Hero ohne Scroll-Bindung.
 * Smartphones und Tablets (Touch oder < 1024 px) bekommen keine Fahrt, sondern
 * nur den Video-Loop hinter der Headline — siehe `VideoHero`.
 */

const FRAME_COUNT = 40;
const PAGE_BG = "rgb(13,17,21)";

/**
 * Die vier Textblöcke auf dem Scrollfortschritt (0…1).
 * `in`/`out` sind die Ein- und Ausblendkanten, `from`/`to` das Fenster, in dem
 * der Block voll steht.
 *
 * Die ersten 12 % gehören allein dem Bild: die Fahrt beginnt im dunklen Wald,
 * ohne Text. Danach lösen sich die drei Aussagen ab, und der Headline-Block
 * steht erst am Ende — dort, wo die Fahrt im vertrauten Hero-Bild ankommt.
 */
const BEATS = [
  { in: 0.12, from: 0.17, to: 0.34, out: 0.365 },
  { in: 0.353, from: 0.4, to: 0.57, out: 0.595 },
  { in: 0.583, from: 0.63, to: 0.8, out: 0.825 },
  // Bleibt bis zum Schluss stehen und scrollt mit der Bühne weg — sonst
  // stünde man die letzten Pixel vor einem leeren Bild.
  { in: 0.813, from: 0.86, to: 1.0, out: 1.0 },
];
/** Index des Headline-Blocks: zuletzt sichtbar, im Dokument aber zuerst. */
const HEADLINE_BEAT = 3;

/**
 * Anteil des Scrollwegs, auf dem die Fahrt läuft. Der Rest ist Haltestrecke:
 * unten angekommen bleibt das Hero-Bild stehen (und das Loop-Video läuft),
 * bevor die nächste Sektion nachrückt. Beim Hochscrollen spürt man dieselbe
 * Strecke als kurzen Widerstand, bevor die Fahrt wieder einsetzt.
 */
const FLIGHT_SHARE = 0.88;

const frameUrl = (tier: string, i: number) =>
  `/hero-flug/${tier}/${String(i).padStart(2, "0")}.webp`;

/** Stückweise lineare Interpolation mit Klemmung an beiden Enden. */
function mix(input: number[], output: number[], v: number) {
  let i = 1;
  while (i < input.length - 1 && v > input[i]) i++;
  const t0 = input[i - 1];
  const t1 = input[i];
  const p = t1 === t0 ? 0 : Math.min(1, Math.max(0, (v - t0) / (t1 - t0)));
  return output[i - 1] + (output[i] - output[i - 1]) * p;
}

/**
 * Ersatz für `useTransform(value, inputRange, outputRange)`.
 *
 * Die Bereichsform übergibt motion an native Scroll-Animationen. Deren
 * Zeitachse deckt sich hier nicht mit dem Bereich aus `useScroll` — `opacity`
 * lief dem Scroll dadurch um ein Vielfaches hinterher. Die Funktionsform wird
 * nicht ausgelagert und bleibt exakt am Scroll.
 */
function useRange(value: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(value, (v) => mix(input, output, v));
}

/** Wie `useRange`, gibt den Wert aber als Prozentangabe aus. */
function usePercent(value: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(value, (v) => `${mix(input, output, v)}%`);
}

/* ───────────────────────────── Framesequenz ──────────────────────────────── */

function FlightCanvas({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>(
    new Array(FRAME_COUNT).fill(null),
  );
  const wanted = useRef(0);
  const painted = useRef(-1);
  const raf = useRef(0);
  /** Vom Effekt gesetzt: fordert ein Neuzeichnen im nächsten Frame an. */
  const schedulePaint = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let alive = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const tier = window.innerWidth * dpr > 1200 ? "w1920" : "w960";

    /** Nächstbestes bereits geladenes Bild zeichnen (cover). */
    const paint = () => {
      raf.current = 0;
      let i = wanted.current;
      while (i >= 0 && !frames.current[i]) i--;
      if (i < 0 || i === painted.current) return;

      const img = frames.current[i]!;
      const { width: cw, height: ch } = canvas;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      painted.current = i;
    };

    const schedule = () => {
      if (!raf.current) raf.current = requestAnimationFrame(paint);
    };
    schedulePaint.current = schedule;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (w === canvas.width && h === canvas.height) return;
      canvas.width = w;
      canvas.height = h;
      painted.current = -1; // Canvas ist nach dem Resize leer
      schedule();
    };

    const load = (i: number) =>
      new Promise<void>((done) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          frames.current[i] = img;
          done();
        };
        img.onerror = () => done();
        img.src = frameUrl(tier, i);
      });

    resize();

    // Erstes Bild sofort, der Rest der Reihe nach — man scrollt ohnehin
    // von vorn nach hinten durch die Sequenz.
    (async () => {
      await load(0);
      if (!alive) return;
      schedule();
      for (let i = 1; i < FRAME_COUNT; i++) {
        await load(i);
        if (!alive) return;
        if (wanted.current >= i) schedule();
      }
    })();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      alive = false;
      ro.disconnect();
      schedulePaint.current = () => {};
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  useMotionValueEvent(progress, "change", (v) => {
    const i = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(v * (FRAME_COUNT - 1))));
    if (i === wanted.current) return;
    wanted.current = i;
    schedulePaint.current();
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full block"
      style={{ background: PAGE_BG }}
    />
  );
}

/* ──────────────────────── Loop am Ende der Fahrt ─────────────────────────── */

/**
 * Der letzte Frame der Sequenz ist exakt das Standbild, mit dem
 * `hero-schwarzwald.mp4` beginnt. Am Ende der Fahrt blendet deshalb das
 * bestehende Hero-Video darüber und läuft dort weiter — der Wechsel ist
 * unsichtbar.
 *
 * Geladen wird es erst, wenn die Fahrt fast durch ist, und nur auf breiten
 * Displays ohne Datensparmodus: die Datei wiegt gut 10 MB.
 */
function HeroLoop({ progress }: { progress: MotionValue<number> }) {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const opacity = useRange(progress, [0.9, 1], [0, 1]);

  useMotionValueEvent(progress, "change", (v) => {
    if (v < 0.55 || mounted) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData === true;
    if (saveData || window.innerWidth < 768) return;
    setMounted(true);
  });

  // Außerhalb des Blickfelds anhalten — ein Loop, den niemand sieht, kostet nur Akku.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <motion.video
      ref={videoRef}
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      style={{ opacity }}
    >
      <source src="/hero-schwarzwald.mp4" type="video/mp4" />
    </motion.video>
  );
}

/* ──────────────────────────────── Textblock ──────────────────────────────── */

function Beat({
  progress,
  index,
  flow = false,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  /** Steht im Textfluss und gibt damit die Höhe der Bühne vor. */
  flow?: boolean;
  children: React.ReactNode;
}) {
  const beat = BEATS[index];
  const edges = [beat.in, beat.from, beat.to, beat.out];
  const ref = useRef<HTMLDivElement>(null);

  const opacity = useRange(progress, edges, [0, 1, 1, 0]);
  // Die Strecke liegt in den Blendphasen, nicht im Lesefenster: der Block
  // steht ruhig, solange man ihn liest, und räumt danach schnell das Feld —
  // sonst überlagern sich beim Wechsel zwei Textblöcke.
  const y = useRange(progress, edges, [124, 8, -8, -124]);
  const scale = useRange(progress, edges, [0.98, 1, 1, 0.98]);

  // Unsichtbare Blöcke dürfen keine Klicks abfangen und nicht per Tab
  // erreichbar sein — sonst landet der Fokus auf einem Button im Nichts.
  const sync = (v: number) => {
    const el = ref.current;
    if (!el) return;
    const off = v < beat.in || v > beat.out;
    el.style.pointerEvents = off ? "none" : "auto";
    (el as HTMLDivElement & { inert: boolean }).inert = off;
    el.setAttribute("aria-hidden", off ? "true" : "false");
  };
  useEffect(() => { sync(progress.get()); }, []);
  useMotionValueEvent(progress, "change", sync);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={flow ? "" : "absolute inset-0 flex flex-col justify-center"}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────── Geräteweiche ──────────────────────────────── */

/**
 * Die Fahrt lohnt sich nur mit Maus/Trackpad auf breitem Display. Auf Touch
 * kämpft die Scroll-Bindung gegen Trägheit und Adressleiste, und 440 Bildschirm-
 * höhen Wischen bis zum ersten Inhalt sind dort schlicht zu viel — Tablets im
 * Querformat eingeschlossen.
 */
const FLIGHT_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

function useFlightCapable() {
  const [ok, setOk] = useState(
    () => typeof window !== "undefined" && window.matchMedia(FLIGHT_QUERY).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(FLIGHT_QUERY);
    const sync = () => setOk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return ok;
}

/* ─────────────────────────────────  Hero  ────────────────────────────────── */

const CONTAINER =
  "mx-auto max-w-7xl 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24";

const LEAD_CLASS =
  "mt-5 sm:mt-6 text-[16px] sm:text-[18px] lg:text-[19px] xl:text-[21px] 2xl:text-[24px] leading-relaxed max-w-xl 2xl:max-w-2xl";
const LEAD_COLOR = "rgba(206, 228, 242, 0.82)";

export function HeroFlight() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const flight = useFlightCapable();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // Die Fahrt endet vor dem Sektionsende — der Rest ist Haltestrecke.
  const scrollYProgress = useTransform(rawProgress, (v) =>
    Math.min(1, v / FLIGHT_SHARE),
  );

  // Tiefenebenen — jede bewegt sich in einem anderen Tempo.
  // Die Bildebene fährt zum Ende hin auf ihre neutrale Lage zurück, damit die
  // Fahrt exakt im gewohnten Hero-Ausschnitt landet und das Loop-Video
  // deckungsgleich übernimmt.
  const flightScale = useRange(scrollYProgress, [0, 1], [1.09, 1.0]);
  const flightY = usePercent(scrollYProgress, [0, 1], [2, 0]);
  const fogY = usePercent(scrollYProgress, [0, 1], [6, -22]);
  const fogOpacity = useRange(scrollYProgress, [0, 0.55, 1], [0.6, 0.3, 0.06]);
  const bloomOpacity = useRange(scrollYProgress, [0.15, 0.62, 1], [0, 0.42, 0.16]);
  const bloomScale = useRange(scrollYProgress, [0.15, 1], [0.65, 1.3]);
  // Abdunklung: unterwegs etwas stärker, am Ende wieder so hell wie der
  // gewohnte Hero — dort übernimmt der seitliche Verlauf den Textkontrast.
  const veil = useRange(scrollYProgress, [0, 0.6, 1], [0.42, 0.54, 0.44]);
  const landing = useRange(scrollYProgress, [0.92, 1], [0, 0.12]);
  const cueOpacity = useRange(scrollYProgress, [0.02, 0.1], [1, 0]);

  if (reduce) return <StaticHero navigate={navigate} />;
  if (!flight) return <VideoHero onCta={() => navigate("/kontakt")} />;

  return (
    <section
      ref={sectionRef}
      aria-label="Willkommen bei G&A Webdesign"
      className="relative h-[440svh] md:h-[490svh]"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ height: "100dvh" }}
      >
        {/* ── Bildebenen ─────────────────────────────────────────────── */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ scale: flightScale, y: flightY }}
        >
          <FlightCanvas progress={scrollYProgress} />
          <HeroLoop progress={scrollYProgress} />
        </motion.div>

        {/* Nebelbank — zieht schneller nach oben als das Bild */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none"
          style={{
            y: fogY,
            opacity: fogOpacity,
            background:
              "radial-gradient(120% 70% at 50% 100%, rgba(186,214,232,0.30) 0%, rgba(186,214,232,0.10) 42%, transparent 72%)",
          }}
        />

        {/* Lichtblüte — geht auf, während sich das Netzwerk entzündet */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-[46%] h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            opacity: bloomOpacity,
            scale: bloomScale,
            background:
              "radial-gradient(circle, rgba(77,190,243,0.42) 0%, rgba(0,105,153,0.16) 38%, transparent 68%)",
          }}
        />

        {/* Abdunklung für den Text */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: PAGE_BG, opacity: veil }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none hidden sm:block"
          style={{
            background:
              "linear-gradient(to right, rgba(9,13,18,0.86) 0%, rgba(9,13,18,0.42) 46%, transparent 74%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none sm:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9,13,18,0.22) 0%, rgba(9,13,18,0.58) 52%, rgba(9,13,18,0.70) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent 52%, ${PAGE_BG} 100%)`,
          }}
        />
        {/* Landung: am Ende der Fahrt geht das Bild sauber in die Seite über */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: PAGE_BG, opacity: landing }}
        />

        {/* ── Textblöcke ─────────────────────────────────────────────── */}
        <div className="relative h-full flex items-center pt-24 pb-20 sm:pt-20">
          <div className={`${CONTAINER} w-full`}>
            <div className="relative max-w-3xl 2xl:max-w-4xl">
              {/* Sichtbar wird dieser Block zuletzt; im Dokument steht er
                  zuerst, damit die h1 vor den übrigen Überschriften kommt.
                  Als einziger im Textfluss gibt er außerdem die Höhe vor —
                  die kürzeren Blöcke zentrieren sich darin. */}
              <Beat progress={scrollYProgress} index={HEADLINE_BEAT} flow>
                <HeadlineCopy onCta={() => navigate("/kontakt")} />
              </Beat>

              <Beat progress={scrollYProgress} index={0}>
                <h2 className="text-white text-[clamp(28px,5vw,74px)] leading-[1.08] tracking-tight">
                  Wir sind zu zweit.
                </h2>
                <p className={LEAD_CLASS} style={{ color: LEAD_COLOR }}>
                  Jonas designt und entwickelt deine Webseite. Berkant ist dein
                  Ansprechpartner – von der ersten Frage bis zum Livegang. Keine
                  Agentur dazwischen, keine Warteschleife.
                </p>
              </Beat>

              <Beat progress={scrollYProgress} index={1}>
                <h2 className="text-white text-[clamp(28px,5vw,74px)] leading-[1.08] tracking-tight">
                  Alles aus einer Hand.
                </h2>
                <p className={LEAD_CLASS} style={{ color: LEAD_COLOR }}>
                  Design, Entwicklung, Hosting und SEO. Du redest mit uns – nicht mit
                  vier Dienstleistern, die sich gegenseitig die Schuld geben.
                </p>
              </Beat>

              <Beat progress={scrollYProgress} index={2}>
                <h2 className="text-white text-[clamp(28px,5vw,74px)] leading-[1.08] tracking-tight">
                  Aus Triberg, für den Schwarzwald.
                </h2>
                <p className={LEAD_CLASS} style={{ color: LEAD_COLOR }}>
                  Von St. Georgen bis Villingen-Schwenningen. Wir kennen die Region und
                  die Kunden, die du erreichen willst.
                </p>
              </Beat>
            </div>
          </div>
        </div>

        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: cueOpacity }}
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(160,200,225,0.55)" }}
          >
            Scrollen
          </span>
          <motion.svg
            width="22"
            height="13"
            viewBox="0 0 22 13"
            fill="none"
            animate={{ y: [0, 5, 0], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M2 2.5 L11 11 L20 2.5"
              stroke="#4dbef3"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}

/** Headline, Lead und CTA — in Fahrt und Video-Hero identisch. */
function HeadlineCopy({ onCta }: { onCta: () => void }) {
  return (
    <>
      <TeamBadge />
      <SectionLabel>Webdesign · Entwicklung · Hosting · SEO</SectionLabel>
      <h1 className="text-white text-[clamp(34px,6.5vw,108px)] leading-[1.05] tracking-tight">
        Webseiten,{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #4dbef3 0%, #006999 100%)",
          }}
        >
          die Wirkung zeigen.
        </span>
      </h1>
      <p className={LEAD_CLASS} style={{ color: LEAD_COLOR }}>
        Modernes Webdesign für lokale Unternehmen im Schwarzwald – wir erstellen
        professionelle Webseiten, von der ersten Idee bis sie live ist. Du musst
        dich um nichts kümmern.
      </p>
      <div className="mt-8 sm:mt-10">
        <PrimaryButton onClick={onCta}>Projekt anfragen</PrimaryButton>
      </div>
    </>
  );
}

/* ─────────────────────── Variante für Smartphone & Tablet ─────────────────── */

/**
 * Nur der Video-Loop hinter der Headline, keine Scroll-Bindung.
 * Das Standbild steht sofort (LCP), das Video kommt nach Idle dazu und blendet
 * weich darüber. Im Datensparmodus bleibt es beim Standbild.
 * `hero-schwarzwald-mobile.mp4` ist derselbe Clip, nur stärker komprimiert
 * (x264 CRF 26, ~1,4 MB statt ~10,8 MB).
 */
function VideoHero({ onCta }: { onCta: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOn, setVideoOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData === true;
    if (saveData) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let id = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (w.requestIdleCallback) id = w.requestIdleCallback(() => setVideoOn(true), { timeout: 1500 });
    else timer = setTimeout(() => setVideoOn(true), 500);
    return () => {
      if (id && w.cancelIdleCallback) w.cancelIdleCallback(id);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Außerhalb des Blickfelds anhalten.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [videoOn]);

  return (
    <section
      aria-label="Willkommen bei G&A Webdesign"
      className="relative overflow-hidden pt-28 sm:pt-36 md:pt-40 pb-4 sm:pb-8"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero-schwarzwald.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {videoOn && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-schwarzwald.webp"
            onCanPlay={() => setReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src="/hero-schwarzwald-mobile.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0" style={{ background: "rgba(9,13,18,0.45)" }} />
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(to right, rgba(9,13,18,0.86) 0%, rgba(9,13,18,0.42) 46%, transparent 74%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 48%, ${PAGE_BG} 100%)`,
          }}
        />
      </div>

      <div className={`${CONTAINER} relative`}>
        <div className="max-w-3xl">
          <FadeIn>
            <HeadlineCopy onCta={onCta} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Variante ohne Bewegung (reduced motion) ───────────── */

function StaticHero({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-44 pb-16 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: "url('/hero-schwarzwald.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(9,13,18,0.58)" }} />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 45%, ${PAGE_BG} 100%)`,
          }}
        />
      </div>

      <div className={`${CONTAINER} relative`}>
        <div className="max-w-3xl">
          <TeamBadge />
          <SectionLabel>Webdesign · Entwicklung · Hosting · SEO</SectionLabel>
          <h1 className="text-white text-[clamp(34px,6.5vw,108px)] leading-[1.05] tracking-tight">
            Webseiten,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #4dbef3 0%, #006999 100%)",
              }}
            >
              die Wirkung zeigen.
            </span>
          </h1>
          <p className={LEAD_CLASS} style={{ color: LEAD_COLOR }}>
            Modernes Webdesign für lokale Unternehmen im Schwarzwald – wir erstellen
            professionelle Webseiten, von der ersten Idee bis sie live ist. Du musst dich
            um nichts kümmern.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3 max-w-3xl">
            {[
              ["Wir sind zu zweit.", "Jonas designt und entwickelt, Berkant ist dein Ansprechpartner."],
              ["Alles aus einer Hand.", "Design, Entwicklung, Hosting und SEO – nicht vier Dienstleister."],
              ["Aus Triberg.", "Von St. Georgen bis Villingen-Schwenningen."],
            ].map(([title, text]) => (
              <div key={title}>
                <h2 className="text-white text-[17px] mb-1.5">{title}</h2>
                <p className="text-[14px] leading-relaxed" style={{ color: "rgba(180,210,230,0.62)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="mt-10">
              <PrimaryButton onClick={() => navigate("/kontakt")}>
                Projekt anfragen
              </PrimaryButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
