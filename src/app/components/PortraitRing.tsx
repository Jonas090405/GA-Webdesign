import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

/**
 * Rundes Porträt mit den konzentrischen Ringen und dem umlaufenden Lichtbogen.
 *
 * Wird auf „Über uns" und im Team-Teaser der Startseite verwendet — dieselbe
 * Komponente, damit die beiden Auftritte nicht auseinanderlaufen.
 *
 * Der Bogen entsteht aus einem Kegelverlauf, aus dem eine Maske nur einen
 * schmalen Kreisring stehen lässt. `spin` dreht die Richtung um, damit zwei
 * nebeneinanderstehende Porträts nicht im Gleichschritt laufen.
 */
export function PortraitRing({
  photo,
  alt,
  className = "h-60 w-60 sm:h-72 sm:w-72 xl:h-80 xl:w-80 2xl:h-96 2xl:w-96",
  spin = 1,
  duration = 18,
  eager = false,
}: {
  photo: string;
  alt: string;
  /** Größe des Bildkreises. */
  className?: string;
  /** 1 = im Uhrzeigersinn, -1 = dagegen. */
  spin?: 1 | -1;
  duration?: number;
  eager?: boolean;
}) {
  // `w-fit`: ohne das nimmt der Wrapper die volle Spaltenbreite ein und aus
  // den Ringen (inset-0) würden Ellipsen.
  return (
    <div className="group relative w-fit">
      <div
        className="absolute inset-0 rounded-full scale-[1.10]"
        style={{ border: "1px solid rgba(77, 190, 243, 0.15)" }}
      />
      <div
        className="absolute inset-0 rounded-full scale-[1.04]"
        style={{ border: "1px solid rgba(77, 190, 243, 0.08)" }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full scale-[1.18] pointer-events-none"
        style={{
          background: `conic-gradient(from ${
            spin === 1 ? 0 : 180
          }deg, transparent 0deg, rgba(77,190,243,${
            spin === 1 ? 0.5 : 0.45
          }) 80deg, transparent 160deg, transparent 360deg)`,
          WebkitMask:
            "radial-gradient(circle, transparent 49%, #000 50%, #000 51%, transparent 52%)",
          mask: "radial-gradient(circle, transparent 49%, #000 50%, #000 51%, transparent 52%)",
        }}
        animate={{ rotate: 360 * spin }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
      <div
        className={twMerge(
          "relative rounded-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.02]",
          className,
        )}
        style={{ border: "2px solid rgba(77, 190, 243, 0.45)" }}
      >
        <img
          src={photo}
          alt={alt}
          loading={eager ? undefined : "lazy"}
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
    </div>
  );
}
