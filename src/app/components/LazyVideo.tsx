import { useEffect, useRef } from "react";

/**
 * Dekoratives Autoplay-Video, das erst im Viewport abspielt und außerhalb
 * pausiert. preload="metadata" lädt nur das erste Frame statt der ganzen
 * Datei — spart Bandbreite, solange der Nutzer nicht bis zum Video scrollt.
 */
export function LazyVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={className}
    />
  );
}
