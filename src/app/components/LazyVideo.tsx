import { useEffect, useRef } from "react";

/**
 * Dekoratives Autoplay-Video, das erst im Viewport abspielt und außerhalb
 * pausiert. preload="metadata" lädt nur das erste Frame statt der ganzen
 * Datei — spart Bandbreite, solange der Nutzer nicht bis zum Video scrollt.
 */
export function LazyVideo({
  src,
  className,
  poster,
  paused = false,
}: {
  src: string;
  className?: string;
  /** Standbild, bis das Video läuft – verhindert eine schwarze Fläche beim Einblenden. */
  poster?: string;
  /** true hält das Video an, z. B. wenn es in einem Slider gerade nicht zu sehen ist. */
  paused?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      // Großzügiger Vorlauf: Das Video lädt und startet, bevor es ins Bild kommt – kein Standbild-Moment
      { rootMargin: "600px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [paused]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={className}
    />
  );
}
