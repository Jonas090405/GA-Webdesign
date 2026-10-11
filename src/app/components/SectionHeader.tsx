import { FadeIn } from "./FadeIn";

/**
 * Kopf einer Inhaltssektion: Headline und optionaler Lead.
 *
 * Ersetzt das bisher pro Seite kopierte Markup, damit Größe, Zeilenabstand
 * und Farben überall gleich laufen. `accent` setzt ein Wort/eine Wortgruppe
 * am Ende der Headline in Funklicht-Blau – maximal ein Akzent pro Sektion.
 */
export function SectionHeader({
  title,
  accent,
  lead,
  tone = "dark",
  className = "mb-10 sm:mb-12 xl:mb-16 2xl:mb-20",
}: {
  title: React.ReactNode;
  accent?: React.ReactNode;
  lead?: React.ReactNode;
  tone?: "dark" | "fog";
  className?: string;
}) {
  const fog = tone === "fog";
  return (
    <FadeIn>
      <div className={className}>
        <h2
          className={`text-[clamp(28px,4.5vw,72px)] leading-[1.08] tracking-tight max-w-4xl 2xl:max-w-5xl ${
            fog ? "text-ink-950" : "text-white"
          }`}
        >
          {title}
          {accent && (
            <>
              {" "}
              <span className={fog ? "text-blue-700" : "text-blue-400"}>{accent}</span>
            </>
          )}
        </h2>
        {lead && (
          <p
            className={`mt-4 xl:mt-6 max-w-2xl 2xl:max-w-3xl text-[15px] sm:text-[17px] xl:text-[19px] 2xl:text-[21px] leading-relaxed ${
              fog ? "text-ink-600" : "text-ink-300"
            }`}
          >
            {lead}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
