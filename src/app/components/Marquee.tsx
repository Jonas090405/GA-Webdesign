/**
 * HeroTicker – schmaler Inline-Ticker für den Hero.
 * Verwendet pure CSS-Animation für nahtloses, lückenloses Looping.
 * Der Inhalt wird 4× wiederholt, damit keine Lücke beim Reset sichtbar ist.
 */

import { useCopy } from "../../i18n";

const ITEMS = {
  de: [
    "Webdesign",
    "Entwicklung",
    "Hosting",
    "SEO",
    "Performance",
    "Betreuung",
    "Support",
  ],
  en: [
    "Web design",
    "Development",
    "Hosting",
    "SEO",
    "Performance",
    "Maintenance",
    "Support",
  ],
};

const SEP = (
  <span
    aria-hidden
    className="inline-block mx-2 sm:mx-3 opacity-40"
    style={{ color: "var(--blue-400)", fontSize: "10px", verticalAlign: "middle" }}
  >
    ●
  </span>
);

export function HeroTicker() {
  // 4 Kopien für restlosen Loop ohne jeden sichtbaren Sprung
  const copies = [0, 1, 2, 3];
  const items = useCopy(ITEMS);

  return (
    <div
      aria-hidden
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: "hero-ticker 22s linear infinite",
          willChange: "transform",
        }}
      >
        {copies.map((c) =>
          items.map((item, j) => (
            <span
              key={`${c}-${j}`}
              className="inline-flex items-center text-[11px] sm:text-[12px] tracking-[0.2em] font-medium text-ink-400"
            >
              {item}
              {SEP}
            </span>
          )),
        )}
      </div>
    </div>
  );
}
