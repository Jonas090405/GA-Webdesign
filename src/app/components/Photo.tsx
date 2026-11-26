import { twMerge } from "tailwind-merge";
import type { PhotoAsset } from "../teamPhotos";

/**
 * Rechteckiges Foto im Stil der Karten: Eckradius aus den Tokens
 * (`--radius-lg` 16 px, in Karten `--radius-md` 12 px), 1 px Blau-Rand wie
 * Karte und Standortkarte, keine weiteren Effekte.
 *
 * Feste `aspect-ratio` plus width/height verhindern Layoutsprünge (CLS);
 * `srcSet` + `sizes` lassen den Browser die passende Datei wählen.
 */
export function Photo({
  photo,
  alt,
  sizes,
  eager = false,
  radius = "lg",
  className = "",
  imgClassName = "",
}: {
  photo: PhotoAsset;
  alt: string;
  /** Angezeigte Breite je Breakpoint, z. B. "(min-width: 768px) 60vw, 100vw". */
  sizes: string;
  eager?: boolean;
  /** `lg` (16 px) frei stehend, `md` (12 px) innerhalb einer Karte mit Innenabstand. */
  radius?: "md" | "lg";
  className?: string;
  imgClassName?: string;
}) {
  const [rw, rh] = photo.ratio;
  const sources = [...photo.sources].sort((a, b) => a.width - b.width);
  const largest = sources[sources.length - 1];

  return (
    <div
      className={twMerge("relative overflow-hidden", className)}
      style={{
        aspectRatio: `${rw} / ${rh}`,
        borderRadius: radius === "md" ? "var(--radius-md)" : "var(--radius-lg)",
        border: "1px solid rgb(var(--blue-400-rgb) / 0.12)",
        background: "var(--ink-900)",
      }}
    >
      <img
        src={largest.src}
        srcSet={sources.map((s) => `${s.src} ${s.width}w`).join(", ")}
        sizes={sizes}
        alt={alt}
        width={largest.width}
        height={Math.round((largest.width * rh) / rw)}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={twMerge("absolute inset-0 h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
