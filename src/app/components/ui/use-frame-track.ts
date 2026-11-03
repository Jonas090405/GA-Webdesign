import { useEffect, useRef } from "react";
import { animate } from "motion";

/**
 * Schiene für Projekt-Rahmen: Alle Rahmen sind dauerhaft gerendert (Bilder
 * schon dekodiert, nichts poppt auf) und liegen im selben Grid-Feld. Beim
 * Wechsel fahren der alte und der neue Rahmen gleichzeitig um eine
 * Fensterbreite – dadurch sind beide außerhalb der Bühne garantiert
 * unsichtbar. Nicht beteiligte Rahmen bleiben versteckt.
 *
 * `move` ist die Richtung, in die sich alles bewegt: 1 = nach rechts (der
 * alte Rahmen geht rechts raus, der neue kommt von links), -1 = nach links.
 *
 * Nur Transform (x, scale) wird animiert – läuft auf der Grafikkarte. Die
 * Feder startet vom aktuellen Wert, unterbrochene Fahrten bleiben organisch.
 */
const SPRING = { type: "spring", visualDuration: 0.5, bounce: 0.14 } as const;
/** Beim Fahren tauchen die Rahmen leicht in die Tiefe. */
const DEPTH = 0.94;

const distance = () => (typeof window === "undefined" ? 1600 : window.innerWidth);

export function useFrameTrack(count: number, index: number, move: number) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const prev = useRef(index);
  /** Rahmen, die gerade sichtbar sind (aktiv oder noch unterwegs). */
  const visible = useRef(new Set<number>([index]));

  const show = (i: number) => {
    const el = refs.current[i];
    if (el) el.style.visibility = "visible";
    visible.current.add(i);
  };
  const hide = (i: number) => {
    const el = refs.current[i];
    if (el) el.style.visibility = "hidden";
    visible.current.delete(i);
  };

  useEffect(() => {
    const from = prev.current;
    prev.current = index;
    if (from === index) return;
    const dir = move || 1;
    const d = distance();

    const enter = refs.current[index];
    const leave = refs.current[from];
    if (!enter) return;

    // Steht der neue Rahmen noch nicht auf der Bühne, kommt er von der Gegenseite.
    // Start als Keyframe mitgeben – ein vorheriges Setzen wäre asynchron und ginge verloren.
    if (visible.current.has(index)) {
      animate(enter, { x: 0, scale: 1 }, SPRING);
    } else {
      show(index);
      animate(enter, { x: [-dir * d, 0], scale: [DEPTH, 1] }, SPRING);
    }
    show(index);

    if (leave) {
      animate(leave, { x: dir * d, scale: DEPTH }, SPRING).then(() => {
        if (prev.current !== from) hide(from);
      });
    }

    // Alle übrigen sofort weg (z. B. nach schnellem Mehrfachklick)
    visible.current.forEach((i) => {
      if (i !== index && i !== from) hide(i);
    });
  }, [index, move]);

  /**
   * Mobil: Rahmen am Finger. `dx` ist der aktuelle Zugweg; der Nachbar auf
   * der Gegenseite schiebt sich schon mit herein.
   */
  const drag = (dx: number) => {
    const d = distance();
    const cur = refs.current[index];
    if (cur) animate(cur, { x: dx }, { duration: 0 });
    // Zug nach links holt den nächsten von rechts, Zug nach rechts den vorherigen von links
    const n = dx < 0 ? (index + 1) % count : (index - 1 + count) % count;
    const other = dx < 0 ? (index - 1 + count) % count : (index + 1) % count;
    if (n !== index) {
      const el = refs.current[n];
      if (el) {
        show(n);
        animate(el, { x: (dx < 0 ? d : -d) + dx, scale: 1 }, { duration: 0 });
      }
    }
    if (other !== n && other !== index) hide(other);
  };

  /** Mobil: losgelassen ohne Wechsel – alles federt zurück. */
  const release = () => {
    const d = distance();
    const cur = refs.current[index];
    if (cur) animate(cur, { x: 0 }, SPRING);
    visible.current.forEach((i) => {
      if (i === index) return;
      const el = refs.current[i];
      if (!el) return;
      const side = (el.getBoundingClientRect().left > 0 ? 1 : -1) * d;
      animate(el, { x: side }, SPRING).then(() => {
        if (prev.current !== i) hide(i);
      });
    });
  };

  const setRef = (i: number) => (el: HTMLElement | null) => {
    refs.current[i] = el;
  };

  /**
   * Sichtbarkeit beim ersten Rendern. Bewusst nur aus dem Start-Index: Würde
   * React sie bei jedem Wechsel neu setzen, verschwände der hinausfahrende
   * Rahmen mitten in der Fahrt. Danach steuert allein die Schiene.
   */
  const initial = useRef(index).current;
  const initialStyle = (i: number) => ({ visibility: i === initial ? "visible" : "hidden" }) as const;

  return { setRef, drag, release, initialStyle };
}
