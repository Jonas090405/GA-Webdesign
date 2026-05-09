import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";

export function Impressum() {
  return (
    <main className="mx-auto max-w-3xl px-5 sm:px-6 pt-28 sm:pt-32 pb-12">
      <FadeIn>
        <SectionLabel>Rechtliches</SectionLabel>
        <h1 className="text-white text-[clamp(32px,6vw,64px)] tracking-tight leading-[1.05]">
          Impressum
        </h1>
        <p className="mt-4 text-slate-400 text-[14px]">
          Angaben gemäß § 5 TMG
        </p>
      </FadeIn>

      <div className="mt-10 sm:mt-12 space-y-5 sm:space-y-6">
        <FadeIn delay={0.05}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              Anbieter
            </div>
            <div className="text-slate-200 text-[15px] leading-[1.9]">
              Gissler Webdesign
              <br />
              Jonas Gissler
              <br />
              Altenbergweg 12
              <br />
              78098 Triberg
              <br />
              Deutschland
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              Unternehmensform
            </div>
            <div className="text-slate-200 text-[15px] leading-[1.9]">
              Einzelunternehmen
              <br />
              Gewerbliche Tätigkeit: Webdesign und Webentwicklung
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              Kontakt
            </div>
            <div className="text-slate-200 text-[15px] leading-[1.9] break-all">
              E-Mail: Jonas@gissler-webdesign.de
              <br />
              Telefon: +49 151 2079 7408
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              Steuernummer
            </div>
            <div className="text-slate-200 text-[15px] leading-[1.9]">
              {/* TODO: Steuernummer eintragen */}
              Steuernummer: wird nachgereicht
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.25}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </div>
            <div className="text-slate-200 text-[15px] leading-[1.9]">
              Jonas Gissler
              <br />
              Altenbergweg 12
              <br />
              78098 Triberg
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              Streitbeilegung
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300 transition-colors"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .<br />
              Ich bin nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.35}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              Haftungsausschluss
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt
              erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
              der Inhalte kann jedoch keine Gewähr übernommen werden. Für
              Inhalte externer Links übernehme ich keine Haftung; für deren
              Inhalt sind ausschließlich die jeweiligen Betreiber
              verantwortlich.
            </p>
          </Card>
        </FadeIn>
      </div>
    </main>
  );
}
