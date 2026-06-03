import { usePageMeta } from "../../hooks/usePageMeta";
import { SectionLabel } from "../SectionLabel";
import { FadeIn } from "../FadeIn";
import { PortfolioSlider } from "../PortfolioSlider";
import { PrimaryButton } from "../Button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gcnImg from "../../../imports/gcn-fahrzeughandel.png";
import gcnAvatar from "../../../imports/gcn-avatar.jpeg";
import gcnVideo from "../../../imports/GCN-Projekt.mp4";

const PROJECTS = [
  {
    image: gcnImg,
    video: gcnVideo,
    tag: "Fahrzeughandel · 2026",
    title: "GCN-Fahrzeughandel",
    desc: "Vollständige Web-Plattform für einen Fahrzeughändler. Außendarstellung, Fahrzeugsuche, Verkaufsauftragsformulare mit automatischer E-Mail-Benachrichtigung und internes Kundenverwaltungs-Dashboard.",
    url: "https://gcn-fahrzeughandel.de/",
    testimonial: {
      show: true, // ← false = Testimonial ausblenden
      quote: "Die Zusammenarbeit war von Anfang bis Ende reibungslos. Unsere Vorstellungen wurden genau verstanden und eine Webseite gebaut, die wirklich zu uns passt. Wir bekommen regelmäßig positives Feedback von unseren Kunden.",
      name: "Giosue Canobbio",
      role: "Geschäftsführer",
      company: "GCN-Fahrzeughandel",
      avatar: gcnAvatar,
    },
  },
  {
    image: null,
    tag: "In Umsetzung",
    title: "Nächstes Projekt",
    desc: "Unser nächstes Projekt ist gerade in Arbeit. Melde dich gerne, wenn du Interesse an einer Zusammenarbeit hast.",
  },
];

export function Portfolio() {
  const navigate = useNavigate();
  usePageMeta({
    title: "Portfolio | G&A Webdesign",
    description: "Ausgewählte Webdesign-Projekte von G&A Webdesign. Moderne Webseiten für lokale Unternehmen aus dem Schwarzwald.",
    path: "/projekte",
  });
  return (
    <main id="main-content" className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-12 xl:pb-20 2xl:pb-28">
      <FadeIn>
        <SectionLabel>Projekte</SectionLabel>
        <h1 className="text-white text-[clamp(32px,6vw,84px)] tracking-tight leading-[1.05] max-w-4xl 2xl:max-w-5xl">
          Projekte, die{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #4dbef3 0%, #006999 100%)",
            }}
          >
            für sich sprechen.
          </span>
        </h1>
        <p className="mt-5 sm:mt-6 max-w-2xl 2xl:max-w-3xl text-[15px] sm:text-[16px] 2xl:text-[18px] text-slate-400 leading-relaxed">
          Eine Auswahl aktueller Kundenarbeiten.
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-12 sm:mt-16">
        <PortfolioSlider projects={PROJECTS} />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-16 sm:mt-20 2xl:mt-28">
          <SectionLabel>Persönliches Portfolio</SectionLabel>
          <h2 className="text-white text-[22px] sm:text-[28px] 2xl:text-[36px] mb-3">
            Hochschulprojekte &amp; Eigenarbeiten
          </h2>
          <p className="text-slate-400 text-[14px] 2xl:text-[16px] leading-relaxed max-w-xl 2xl:max-w-2xl mb-7">
            Im Laufe meines Studiums und durch private Nebenprojekte sind zahlreiche Arbeiten entstanden. Diese findest du gebündelt in meinem persönlichen Portfolio.
          </p>
          <a
            href="https://portfolio.ga-webdesign.de"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-6 py-3 text-sky-300 hover:bg-sky-400/20 transition-all"
          >
            Persönliches Portfolio öffnen
            <ExternalLink size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <div className="mt-20 2xl:mt-28 text-center">
          <h2 className="text-white text-[28px] xl:text-[34px] 2xl:text-[42px] mb-3">
            Dein Projekt soll das nächste sein.
          </h2>
          <p className="text-slate-400 text-[15px] xl:text-[16px] 2xl:text-[18px] mb-8 max-w-xl 2xl:max-w-2xl mx-auto">
            Sag uns, was du dir vorstellst – das erste Gespräch ist kostenlos und unverbindlich.
          </p>
          <PrimaryButton onClick={() => navigate("/kontakt")}>
            Projekt anfragen
          </PrimaryButton>
        </div>
      </FadeIn>
    </main>
  );
}