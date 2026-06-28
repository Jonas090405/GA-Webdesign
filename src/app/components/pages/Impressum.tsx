import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";
import { usePageMeta } from "../../hooks/usePageMeta";
export function Impressum() {
  usePageMeta({
    title: "Impressum | G&A Webdesign",
    description: "Impressum und Anbieterkennzeichnung der G&A Webdesign GbR aus Triberg im Schwarzwald gemäß § 5 TMG.",
    path: "/impressum",
  });
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-5 sm:px-6 pt-28 sm:pt-32 pb-12">
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
              G&amp;A Webdesign GbR
              <br /><br />
              Jonas Gissler
              <br />
              Altenbergweg 12
              <br />
              78098 Triberg, Deutschland
              <br /><br />
              Berkant Agyar
              <br />
              Bergstraße 54
              <br />
              78098 Triberg, Deutschland
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              Unternehmensform
            </div>
            <div className="text-slate-200 text-[15px] leading-[1.9]">
              Gesellschaft bürgerlichen Rechts (GbR)
              <br />
              Gewerbliche Tätigkeit: Webdesign, Webentwicklung, Hosting und SEO
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              Kontakt
            </div>
            <div className="text-slate-200 text-[15px] leading-[1.9] break-all">
              E-Mail: Jonas@ga-webdesign.de
              <br />
              E-Mail: berkant@ga-webdesign.de
              <br />
              Telefon: +49 176 34649177
              <br /><br />
              <a
                href="https://www.linkedin.com/in/jonas-gissler-37b1482b0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300 transition-colors"
              >
                LinkedIn – Jonas Gissler
              </a>
              <br />
              <a
                href="https://www.linkedin.com/in/berkant-agyar-2334a6363"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300 transition-colors"
              >
                LinkedIn – Berkant Agyar
              </a>
              <br />
              <a
                href="https://www.linkedin.com/company/g%26a-webdesign/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300 transition-colors"
              >
                LinkedIn – G&amp;A Webdesign
              </a>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              Steuer
            </div>
            <div className="text-slate-200 text-[15px] leading-[1.9]">
              Steuernummer: 22191 / 13770
              <br />
              Umsatzsteuer-ID: DE462788107
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
              Wir sind nicht bereit oder verpflichtet, an
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
              Die Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt
              erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
              der Inhalte kann jedoch keine Gewähr übernommen werden. Für
              Inhalte externer Links wird keine Haftung übernommen; für deren
              Inhalt sind ausschließlich die jeweiligen Betreiber
              verantwortlich.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              Bildnachweise
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die 3D-Modelle auf der Startseite wurden mit{" "}
              <a
                href="https://www.meshy.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300 transition-colors"
              >
                Meshy
              </a>{" "}
              erstellt und sind lizenziert unter{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/deed.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300 transition-colors"
              >
                CC BY 4.0
              </a>
              . Erstellt auf Basis eigener Fotos, bearbeitet.
            </p>
          </Card>
        </FadeIn>
      </div>
    </main>
  );
}
