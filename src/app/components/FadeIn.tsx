import { createContext, useContext, useRef } from "react";
import { motion, useInView } from "motion/react";

const VIEWPORT_MARGIN = "-80px";
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Sichtbarkeit einer FadeInGroup. `null` heißt: kein Gruppen-Kontext, das
 * FadeIn beobachtet sich selbst.
 */
const RevealGroup = createContext<boolean | null>(null);

/**
 * Klammert zusammengehörige Elemente (z. B. Text und Bild nebeneinander, die
 * mobil untereinander rutschen). Beobachtet wird nur die Gruppe: Sobald ihre
 * Oberkante im Bild ist, erscheinen alle FadeIns darin gemeinsam – das Bild
 * wartet also nicht, bis man weiterscrollt. `delay` der Kinder bleibt als
 * leichte Staffelung erhalten.
 *
 * Rendert das Element selbst, damit Grid-Klassen direkt hier sitzen können
 * und keine zusätzliche Ebene entsteht.
 */
export function FadeInGroup({
  as: Tag = "div",
  children,
  ...rest
}: {
  as?: "div" | "section" | "article";
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN });
  return (
    <RevealGroup.Provider value={inView}>
      <Tag ref={ref as React.Ref<never>} {...rest}>
        {children}
      </Tag>
    </RevealGroup.Provider>
  );
}

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const groupInView = useContext(RevealGroup);
  const hidden = { opacity: 0, y };
  const shown = { opacity: 1, y: 0 };
  const transition = { duration: 0.7, delay, ease: EASE };

  if (groupInView !== null) {
    return (
      <motion.div
        initial={hidden}
        animate={groupInView ? shown : hidden}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
