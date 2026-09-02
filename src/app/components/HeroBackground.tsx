import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "./ui/utils";

/**
 * Full-Bleed-Hintergrund für die Hero-Section: ein generiertes Schwarzwald-Motiv
 * (neblige Tannenhügel mit aufsteigenden Cyan-Netzwerklinien – „online gehen").
 *
 * - Desktop (>=768px): Video-Loop (8s), lazy nach Idle geladen, blendet weich ein.
 * - Mobil: nur das leichte Standbild (119 KB) mit sanftem Ken-Burns-Zoom –
 *   spart die ~8 MB Video-Daten.
 * - `prefers-reduced-motion`: alles statisch.
 * Das Bild dient überall als Poster/Fallback hinter dem Video.
 */
export function HeroBackground() {
  const reduce = useReducedMotion();
  const [isWide, setIsWide] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const useVideo = !reduce && isWide;
  const kenBurns = !reduce && !isWide; // Bild nur bewegen, wenn kein Video läuft

  // Video erst nach Idle laden -> schützt den LCP (Bild ist sofort da).
  useEffect(() => {
    if (!useVideo) return;
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
  }, [useVideo]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden"
    >
      {/* Basis-Bild (Poster/Fallback; mobil mit sanftem Zoom) */}
      <motion.div
        className="absolute inset-0"
        animate={kenBurns ? { scale: [1.04, 1.12] } : undefined}
        transition={
          kenBurns
            ? { duration: 42, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
            : undefined
        }
        style={{
          backgroundImage: "url('/hero-schwarzwald.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Video-Loop (nur Desktop, kein reduced-motion), blendet weich ein */}
      {useVideo && videoOn && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out",
            ready ? "opacity-100" : "opacity-0"
          )}
        >
          <source src="/hero-schwarzwald.mp4" type="video/mp4" />
        </video>
      )}

      {/* Grund-Verdunklung für Textkontrast (auch mobil, wo Text mittig liegt) */}
      <div className="absolute inset-0" style={{ background: "rgba(9,13,18,0.45)" }} />
      {/* Zusätzliche Dunkelheit links, wo die Headline sitzt (ab sm) */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, rgba(9,13,18,0.88) 0%, rgba(9,13,18,0.4) 45%, transparent 72%)",
        }}
      />
      {/* Unterer Verlauf -> nahtloser Übergang in den Seitenhintergrund */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent 48%, rgb(13,17,21) 100%)",
        }}
      />
    </div>
  );
}
