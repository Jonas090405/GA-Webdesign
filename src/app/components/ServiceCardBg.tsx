/**
 * ServiceCardBg — Hover-Hintergrundanimation für Leistungskarten.
 * Wird von Home.tsx (ServiceCard) und Leistungen.tsx (LeistungenCard) geteilt.
 */
import { motion, AnimatePresence } from "motion/react";
import { Rocket, Paintbrush } from "lucide-react";

export type BgKey = "design" | "code" | "rocket";

// ─── Statische Configs ────────────────────────────────────────────────────────
const ROCKET_BG = [
  { top:  "4%", dur: 0.82, delay: 0.00 },
  { top: "12%", dur: 0.93, delay: 0.22 },
  { top: "20%", dur: 0.78, delay: 0.48 },
  { top:  "8%", dur: 0.98, delay: 0.70 },
  { top: "16%", dur: 0.88, delay: 0.92 },
  { top: "24%", dur: 0.74, delay: 1.15 },
];

const CODE_BG = [
  { text: "01",   left:  "4%", dur: 2.0, delay: 0.00 },
  { text: "10",   left: "16%", dur: 2.4, delay: 0.35 },
  { text: "{}",   left: "30%", dur: 1.9, delay: 0.70 },
  { text: "=>",   left: "45%", dur: 2.2, delay: 0.15 },
  { text: "</>",  left: "57%", dur: 2.6, delay: 0.55 },
  { text: "fn()", left: "70%", dur: 2.1, delay: 0.90 },
  { text: "==",   left: "83%", dur: 2.3, delay: 0.30 },
  { text: "0x1",  left: "11%", dur: 2.0, delay: 1.10 },
];

const BRUSH_BG = [
  { left:  "8%", top: "68%", rot: -25, dur: 1.8, delay: 0.00 },
  { left: "24%", top: "60%", rot:  15, dur: 2.0, delay: 0.30 },
  { left: "42%", top: "75%", rot: -40, dur: 1.7, delay: 0.60 },
  { left: "60%", top: "56%", rot:  22, dur: 2.1, delay: 0.15 },
  { left: "76%", top: "66%", rot: -12, dur: 1.9, delay: 0.75 },
  { left: "88%", top: "72%", rot:  35, dur: 1.6, delay: 0.45 },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function ServiceCardBg({ bgKey, hovered }: { bgKey: BgKey; hovered: boolean }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ inset: "-40px", overflow: "hidden" }}
      aria-hidden
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Raketen */}
            {bgKey === "rocket" && ROCKET_BG.map((r, j) => (
              <motion.div
                key={j}
                className="absolute"
                style={{ top: r.top, left: 0, rotate: 45 }}
                animate={{
                  x: [-40, 500],
                  y: [30, -30],
                  opacity: [0, 0.5, 0.5, 0],
                }}
                transition={{
                  x: { duration: r.dur, ease: "linear", repeat: Infinity, delay: r.delay },
                  y: { duration: r.dur, ease: "linear", repeat: Infinity, delay: r.delay },
                  opacity: { duration: r.dur, times: [0, 0.08, 0.88, 1], repeat: Infinity, delay: r.delay },
                }}
              >
                <Rocket size={11} style={{ color: "#4dbef3" }} />
              </motion.div>
            ))}

            {/* Code-Zeichen */}
            {bgKey === "code" && CODE_BG.map((c, j) => (
              <motion.div
                key={j}
                className="absolute font-mono font-semibold"
                style={{ left: c.left, bottom: "-4px", fontSize: "10px", color: "rgba(77,190,243,0.48)", lineHeight: 1 }}
                animate={{
                  y: [0, -240],
                  opacity: [0, 0.6, 0.6, 0],
                }}
                transition={{
                  y: { duration: c.dur, ease: "linear", repeat: Infinity, delay: c.delay },
                  opacity: { duration: c.dur, times: [0, 0.08, 0.82, 1], repeat: Infinity, delay: c.delay },
                }}
              >
                {c.text}
              </motion.div>
            ))}

            {/* Pinsel */}
            {bgKey === "design" && BRUSH_BG.map((b, j) => (
              <motion.div
                key={j}
                className="absolute"
                style={{ left: b.left, top: b.top }}
                animate={{
                  y: [0, -72],
                  rotate: [b.rot, b.rot + 18],
                  scale: [0.7, 1.2],
                  opacity: [0, 0.42, 0.42, 0],
                }}
                transition={{
                  duration: b.dur,
                  ease: "easeOut",
                  repeat: Infinity,
                  delay: b.delay,
                }}
              >
                <Paintbrush size={13} style={{ color: "#4dbef3" }} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
