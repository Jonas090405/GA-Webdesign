import { usePageMeta } from "../../hooks/usePageMeta";
import { motion } from "motion/react";
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { PrimaryButton } from "../Button";
import { FadeIn } from "../FadeIn";
import { useNavigate } from "react-router-dom";
import profilbild from "../../../imports/Jonas_Gissler.png";
import berkantImg from "../../../imports/Berkant_agyar.jpeg";
import { Linkedin } from "lucide-react";
import { PortraitRing } from "../PortraitRing";
import { TileMedia } from "../TileMedia";
import tileZapClip from "../../../imports/tile-zap.mp4";
import tileZapPoster from "../../../imports/tile-zap-poster.webp";
import tileLayersClip from "../../../imports/tile-layers.mp4";
import tileLayersPoster from "../../../imports/tile-layers-poster.webp";
import tileUsersClip from "../../../imports/tile-users.mp4";
import tileUsersPoster from "../../../imports/tile-users-poster.webp";

const ANSATZ: { poster: string; clip: string; t: string; d: string }[] = [
  {
    poster: tileZapPoster,
    clip: tileZapClip,
    t: "Einfach & klar",
    d: "Ein modernes Design, bei dem eure Kunden sofort verstehen, was ihr anbietet. Ganz ohne suchen zu müssen.",
  },
  {
    poster: tileLayersPoster,
    clip: tileLayersClip,
    t: "Design & Technik aus einer Hand",
    d: "Wir machen beides selbst. So entsteht kein Wirrwarr zwischen verschiedenen Anbietern.",
  },
  {
    poster: tileUsersPoster,
    clip: tileUsersClip,
    t: "Persönliche Betreuung",
    d: "Ihr habt feste Ansprechpartner. Kein Callcenter, kein Ping-Pong – direkt, schnell und auf Augenhöhe.",
  },
];

function AnsatzCard({
  poster, clip, t, d, i,
}: {
  poster: string; clip: string; t: string; d: string; i: number;
}) {
  return (
    <FadeIn delay={i * 0.08} className="h-full">
      <div className="h-full">
        <Card className="h-full">
          {/* Illustration — läuft im Viewport dauerhaft */}
          <TileMedia
            poster={poster}
            src={clip}
            label={t}
            className="mb-4 w-full aspect-[16/9]"
          />
          <h3 className="text-white text-[18px] sm:text-[20px] 2xl:text-[23px] mb-2">{t}</h3>
          <p className="text-[14px] 2xl:text-[16px] leading-relaxed" style={{ color: "rgba(180, 210, 230, 0.6)" }}>
            {d}
          </p>
        </Card>
      </div>
    </FadeIn>
  );
}

export function About() {
  usePageMeta({
    title: "Über uns | G&A Webdesign",
    description: "Wir sind Jonas Gissler (Design & Entwicklung) und Berkant Agyar (Kundenkommunikation & Projektmanagement) – ein eingespieltes Team für moderne Webseiten aus dem Schwarzwald.",
    path: "/ueber-uns",
  });
  const navigate = useNavigate();
  return (
    <main id="main-content" className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-12 xl:pb-20 2xl:pb-28">
      <FadeIn>
        <SectionLabel>Über uns</SectionLabel>
      </FadeIn>

      {/* ── Jonas ── */}
      <div className="mt-4 grid gap-10 md:gap-16 2xl:gap-24 md:grid-cols-5 items-center">
        <FadeIn className="md:col-span-3">
          <h1 className="text-white text-[clamp(36px,6vw,80px)] tracking-tight leading-[1.05]">
            Hi, ich bin{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #4dbef3 0%, #006999 100%)" }}
            >
              Jonas.
            </span>
          </h1>
          <p
            className="mt-2 text-[12px] sm:text-[13px] tracking-[0.2em]"
            style={{ color: "#4dbef3" }}
          >
            Design & Entwicklung
          </p>
          <p
            className="mt-7 text-[16px] sm:text-[17px] xl:text-[19px] 2xl:text-[21px] leading-relaxed"
            style={{ color: "rgba(200, 225, 240, 0.8)" }}
          >
            Ich bin 21 Jahre alt und komme aus Triberg im Schwarzwald.
            Ich designe und entwickle Webseiten für lokale Unternehmen –
            von der ersten Idee bis sie live sind.
          </p>
          <p
            className="mt-4 text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed"
            style={{ color: "rgba(180, 210, 230, 0.6)" }}
          >
            Aktuell bin ich im 7. Semester Medienkonzeption an der Hochschule Furtwangen,
            mit Schwerpunkt auf UX/UI-Design und Frontend-Entwicklung. Nebenbei arbeite ich
            als zertifizierter Softwaredesigner bei M&amp;M Software. Mein Fachwissen aus
            Studium und Beruf bringe ich direkt in euer Projekt ein.
          </p>
          <p
            className="mt-4 text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed"
            style={{ color: "rgba(180, 210, 230, 0.6)" }}
          >
            Gestaltet wird in Figma, gebaut mit React, TypeScript und TailwindCSS –
            inklusive der kleinen Bewegungen, die eine Seite lebendig machen. Dazu kommt
            alles, was eine Webseite im Betrieb braucht: Hosting, Formulare, Analytics
            und auf Wunsch ein Redaktionssystem, über das ihr eure Inhalte selbst pflegt.
            KI setze ich da ein, wo sie Arbeit spart – nicht als Selbstzweck.
          </p>
          <a
            href="https://www.linkedin.com/in/jonas-gissler-37b1482b0/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jonas Gissler auf LinkedIn (öffnet in neuem Tab)"
            className="mt-6 inline-flex items-center gap-2.5 text-[14px] xl:text-[15px] font-medium transition-colors duration-200"
            style={{ color: "rgba(150, 190, 220, 0.6)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#4dbef3")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(150, 190, 220, 0.6)")}
          >
            <Linkedin size={16} aria-hidden="true" />
            LinkedIn
          </a>
        </FadeIn>

        <FadeIn delay={0.15} className="md:col-span-2 flex justify-center md:justify-end">
          <PortraitRing photo={profilbild} alt="Jonas Gissler" spin={1} duration={18} eager />
        </FadeIn>
      </div>

      {/* ── Berkant ── */}
      <div className="mt-24 sm:mt-28 xl:mt-32 2xl:mt-40 grid gap-10 md:gap-16 2xl:gap-24 md:grid-cols-5 items-center">
        <FadeIn className="md:col-span-3">
          <h2 className="text-white text-[clamp(36px,6vw,80px)] tracking-tight leading-[1.05]">
            Hi, ich bin{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #4dbef3 0%, #006999 100%)" }}
            >
              Berkant.
            </span>
          </h2>
          <p
            className="mt-2 text-[12px] sm:text-[13px] tracking-[0.2em]"
            style={{ color: "#4dbef3" }}
          >
            Kundenkommunikation & Projektmanagement
          </p>
          <p
            className="mt-7 text-[16px] sm:text-[17px] xl:text-[19px] 2xl:text-[21px] leading-relaxed"
            style={{ color: "rgba(200, 225, 240, 0.8)" }}
          >
            Ich komme wie Jonas aus Triberg und bin euer erster Ansprechpartner. Von der
            ersten Anfrage bis zum finalen Ergebnis begleite ich euch durch den gesamten
            Prozess – klar, direkt und zuverlässig.
          </p>
          <p
            className="mt-4 text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed"
            style={{ color: "rgba(180, 210, 230, 0.6)" }}
          >
            Ich studiere Wirtschaftsinformatik an der Hochschule Furtwangen, ebenfalls im
            7. Semester, mit Schwerpunkt Projektmanagement und Digital Business. Praxis
            dazu kommt aus dem Projektmanagement bei Mercedes-Benz.
          </p>
          <p
            className="mt-4 text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed"
            style={{ color: "rgba(180, 210, 230, 0.6)" }}
          >
            Bei euren Projekten kümmere ich mich um alles rund um die Zusammenarbeit:
            Angebot, Vertrag, Termine und die Abstimmung zwischen euch und Jonas.
            Ihr wisst immer, wo euer Projekt steht – und was als nächstes passiert.
          </p>
          <a
            href="https://www.linkedin.com/in/berkant-agyar-2334a6363"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Berkant Agyar auf LinkedIn (öffnet in neuem Tab)"
            className="mt-6 inline-flex items-center gap-2.5 text-[14px] xl:text-[15px] font-medium transition-colors duration-200"
            style={{ color: "rgba(150, 190, 220, 0.6)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#4dbef3")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(150, 190, 220, 0.6)")}
          >
            <Linkedin size={16} aria-hidden="true" />
            LinkedIn
          </a>
        </FadeIn>

        <FadeIn delay={0.15} className="md:col-span-2 flex justify-center md:justify-end">
          <PortraitRing photo={berkantImg} alt="Berkant Agyar" spin={-1} duration={22} />
        </FadeIn>
      </div>

      {/* ── Unser Ansatz ── */}
      <div className="mt-24 sm:mt-28 xl:mt-32 2xl:mt-40">
        <FadeIn>
          <SectionLabel>Unser Ansatz</SectionLabel>
          <h2 className="text-white text-[clamp(26px,4vw,52px)] tracking-tight max-w-2xl 2xl:max-w-3xl mb-10 2xl:mb-14">
            Was uns bei jeder Webseite wichtig ist.
          </h2>
        </FadeIn>
        <div className="grid gap-6 2xl:gap-8 sm:grid-cols-2 md:grid-cols-3 items-stretch">
          {ANSATZ.map((item, i) => (
            <AnsatzCard key={item.t} {...item} i={i} />
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <FadeIn>
        <div className="mt-20 2xl:mt-28 text-center">
          <h2 className="text-white text-[28px] 2xl:text-[36px] mb-3">
            Lass uns miteinander reden.
          </h2>
          <p
            className="text-[15px] xl:text-[16px] 2xl:text-[18px] mb-8"
            style={{ color: "rgba(180, 210, 230, 0.6)" }}
          >
            Unverbindlich, entspannt — Berkant meldet sich in der Regel innerhalb von 24 Stunden bei dir.
          </p>
          <PrimaryButton onClick={() => navigate("/kontakt")}>
            Projekt anfragen
          </PrimaryButton>
        </div>
      </FadeIn>
    </main>
  );
}
