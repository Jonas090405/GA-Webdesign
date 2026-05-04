/**
 * HeroTicker – schmaler Inline-Ticker für den Hero.
 * Verwendet pure CSS-Animation für nahtloses, lückenloses Looping.
 * Der Inhalt wird 4× wiederholt, damit keine Lücke beim Reset sichtbar ist.
 */

const ITEMS = [
  "Webdesign",
  "Entwicklung",
  "Hosting",
  "SEO",
  "Performance",
  "Betreuung",
  "Support",
];

const SEP = (
  <span
    aria-hidden
    className="inline-block mx-2 sm:mx-3 opacity-40"
    style={{ color: "#4dbef3", fontSize: "10px", verticalAlign: "middle" }}
  >
    ●
  </span>
);

export function HeroTicker() {
  // 4 Kopien für restlosen Loop ohne jeden sichtbaren Sprung
  const copies = [0, 1, 2, 3];

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
          ITEMS.map((item, j) => (
            <span
              key={`${c}-${j}`}
              className="inline-flex items-center text-[11px] sm:text-[12px] tracking-[0.2em] uppercase font-medium"
              style={{ color: "rgba(180, 215, 240, 0.45)" }}
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
