import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

/**
 * TileMedia — große freigestellte Illustration der Leistungskarten mit
 * loopender Micro-Animation.
 *
 * Clip & Poster liegen auf pechschwarzem Grund; `mix-blend-mode: screen`
 * lässt Schwarz auf der dunklen Kachel optisch verschwinden — es bleibt nur
 * die leuchtende Illustration, ohne sichtbares Video-Rechteck (funktioniert
 * in allen Browsern, kein Alpha-Video nötig).
 *
 * Der Loop läuft von selbst, solange die Kachel im Viewport ist — auf allen
 * Geräten, nicht erst beim Hover. Außerhalb des Viewports wird pausiert,
 * damit im Hintergrund nichts dekodiert wird.
 *
 * prefers-reduced-motion und Data-Saver bekommen nur das Poster-Bild —
 * das <video>-Element wird dann gar nicht erst gerendert.
 */
export function TileMedia({
  poster,
  src,
  label,
  className = "",
}: {
  poster: string;
  src: string;
  label: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Einmalig beim Mount ausgewertet — Vite-SPA, läuft nur im Browser.
  const [staticOnly] = useState(
    () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true,
  );

  // Der Loop läuft, solange die Kachel im Viewport ist.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
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
  }, []);

  return (
    <div role="img" aria-label={label} className={twMerge("relative", className)}>
      {staticOnly ? (
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
