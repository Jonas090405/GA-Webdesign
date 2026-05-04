import { motion } from "motion/react";

/**
 * Aurora – sanft pulsierende Lichtflächen im Hintergrund.
 * Wird auf kleinen Bildschirmen komplett ausgeblendet (performance + optik).
 */
export function Aurora({
  className = "",
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const a = 0.15 * intensity;
  const b = 0.17 * intensity;
  const c = 0.08 * intensity;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 hidden md:block ${className}`}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 1000,
          height: 1000,
          left: "-15%",
          top: "-25%",
          background: `radial-gradient(circle at center, rgba(77,190,243,${a}), transparent 70%)`,
          filter: "blur(140px)",
          willChange: "transform",
        }}
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 900,
          height: 900,
          right: "-10%",
          top: "10%",
          background: `radial-gradient(circle at center, rgba(0,105,153,${b}), transparent 70%)`,
          filter: "blur(130px)",
          willChange: "transform",
        }}
        animate={{ x: [0, -50, 35, 0], y: [0, 50, -25, 0], scale: [1, 0.92, 1.08, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 750,
          height: 750,
          left: "25%",
          top: "45%",
          background: `radial-gradient(circle at center, rgba(152,220,252,${c}), transparent 70%)`,
          filter: "blur(110px)",
          willChange: "transform",
        }}
        animate={{ x: [0, 35, -35, 0], y: [0, -25, 20, 0], scale: [1, 1.05, 1, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
