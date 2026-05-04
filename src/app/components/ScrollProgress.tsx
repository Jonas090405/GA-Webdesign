import { motion, useScroll, useSpring } from "motion/react";

/**
 * Dünne Gradient-Leiste am oberen Viewport-Rand, die mit dem Scrollfortschritt
 * mitfüllt. Mit Spring geglättet, zarter Glow für Premium-Feel.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 25,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #006999 0%, #4dbef3 50%, #98dcfc 100%)",
        boxShadow: "0 0 12px rgba(77,190,243,0.55)",
      }}
    />
  );
}
