import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

/**
 * TileMedia — große freigestellte Illustration der Leistungskarten mit
 * loopender Hover-Micro-Animation.
 *
 * Clip & Poster liegen auf pechschwarzem Grund; `mix-blend-mode: screen`
 * lässt Schwarz auf der dunklen Kachel optisch verschwinden — es bleibt nur
 * die leuchtende Illustration, ohne sichtbares Video-Rechteck (funktioniert
 * in allen Browsern, kein Alpha-Video nötig).
 *
 * Ruhezustand = Poster (identisch mit Frame 1 des Clips — kein Sprung beim
 * Start). Desktop (hover-fähig): `active` startet den nahtlosen Loop,
 * Deaktivieren friert aufs Poster ein. Touch-Geräte ohne Hover: der Loop
 * läuft, solange die Kachel im Viewport ist.
 *
 * prefers-reduced-motion und Data-Saver bekommen nur das Poster-Bild —
 * das <video>-Element wird dann gar nicht erst gerendert.
 */
export function TileMedia({
  poster,
  src,
  label,
  active = false,
  className = "",
}: {
  poster: string;
  src: string;
  label: string;
  /** Desktop: Karten-Hover — true startet den Loop, false friert ein. */
  active?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Einmalig beim Mount ausgewertet — Vite-SPA, läuft nur im Browser.
  const [env] = useState(() => ({
    staticOnly:
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true,
    canHover: window.matchMedia("(hover: hover)").matches,
  }));

  // Desktop: Hover startet den Loop, Leave friert aufs Poster ein.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !env.canHover) return;
    if (active) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [active, env.canHover]);

  // Touch: Loop läuft, solange die Kachel im Viewport ist.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || env.canHover) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [env.canHover]);

  return (
    <div role="img" aria-label={label} className={twMerge("relative", className)}>
      {env.staticOnly ? (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain mix-blend-screen"
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain mix-blend-screen"
        />
      )}
    </div>
  );
}
