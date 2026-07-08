import { useState } from "react";
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
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={i * 0.08} className="h-full">
      <div
        className="h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Card className="h-full">
          {/* Illustration — statisch gedämpft, zündet beim Hover */}
          <TileMedia
            poster={poster}
            src={clip}
            label={t}
            active={hovered}
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
            className="mt-2 text-[12px] sm:text-[13px] tracking-[0.2em] uppercase"
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
            Aktuell studiere ich Medienkonzeption an der Hochschule Furtwangen
            mit Fokus auf Webdesign und Nutzererfahrung. Nebenbei arbeite ich als zertifizierter
            Softwaredesigner bei M&amp;M Software.{" "}
            Mein Fachwissen aus Studium und Beruf bringe ich direkt in euer Projekt ein.
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
          <div className="group relative">
            <div
              className="absolute inset-0 rounded-full scale-[1.10]"
              style={{ border: "1px solid rgba(77, 190, 243, 0.15)" }}
            />
            <div
              className="absolute inset-0 rounded-full scale-[1.04]"
              style={{ border: "1px solid rgba(77, 190, 243, 0.08)" }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full scale-[1.18] pointer-events-none"
              style={{
                background: "conic-gradient(from 0deg, transparent 0deg, rgba(77,190,243,0.50) 80deg, transparent 160deg, transparent 360deg)",
                WebkitMask: "radial-gradient(circle, transparent 49%, #000 50%, #000 51%, transparent 52%)",
                mask: "radial-gradient(circle, transparent 49%, #000 50%, #000 51%, transparent 52%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <div
              className="relative h-60 w-60 sm:h-72 sm:w-72 xl:h-80 xl:w-80 2xl:h-96 2xl:w-96 rounded-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              style={{ border: "2px solid rgba(77, 190, 243, 0.45)" }}
            >
              <img
                src={profilbild}
                alt="Jonas Gissler"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Jonas info cards */}
      <div className="mt-16 2xl:mt-24 grid gap-4 2xl:gap-6 md:grid-cols-2 items-stretch">
        <FadeIn className="h-full">
          <Card className="h-full">
            <div className="text-[12px] tracking-[0.25em] uppercase mb-5" style={{ color: "#4dbef3" }}>
              Hintergrund
            </div>
            <ul className="space-y-3 text-[14px]" style={{ color: "rgba(200, 225, 240, 0.8)" }}>
              <li>Studium Medienkonzeption im 6. Semester (HFU Furtwangen)</li>
              <li>Schwerpunkt UX/UI Design &amp; Frontend-Entwicklung</li>
              <li>Arbeitserfahrung als Softwaredesigner bei M&amp;M Software</li>
              <li>Aus Triberg im Schwarzwald</li>
            </ul>
          </Card>
        </FadeIn>
        <FadeIn delay={0.08} className="h-full">
          <Card className="h-full">
            <div className="text-[12px] tracking-[0.25em] uppercase mb-5" style={{ color: "#4dbef3" }}>
              Womit ich arbeite
            </div>
            <div className="flex flex-wrap gap-2">
              {["Figma", "React", "KI", "TypeScript", "TailwindCSS", "Motiondesign", "Vercel", "EmailJS", "Google Analytics", "GitHub", "Strapi", "Supabase"].map((t) => (
                <span
                  key={t}
                  className="tag-pill rounded-full px-3 py-1 2xl:px-4 2xl:py-1.5 text-[12px] 2xl:text-[14px]"
                  style={{
                    background: "rgba(77, 190, 243, 0.08)",
                    border: "1px solid rgba(77, 190, 243, 0.18)",
                    color: "rgba(180, 225, 245, 0.85)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>

      {/* ── Berkant ── */}
      <div className="mt-20 sm:mt-24 xl:mt-28 2xl:mt-32 grid gap-10 md:gap-16 2xl:gap-24 md:grid-cols-5 items-center">
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
            className="mt-2 text-[12px] sm:text-[13px] tracking-[0.2em] uppercase"
            style={{ color: "#4dbef3" }}
          >
            Kundenkommunikation & Projektmanagement
          </p>
          <p
            className="mt-7 text-[16px] sm:text-[17px] xl:text-[19px] 2xl:text-[21px] leading-relaxed"
            style={{ color: "rgba(200, 225, 240, 0.8)" }}
          >
            Ich bin euer erster Ansprechpartner. Von der ersten Anfrage bis zum finalen Ergebnis
            begleite ich euch durch den gesamten Prozess – klar, direkt und zuverlässig.
          </p>
          <p
            className="mt-4 text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed"
            style={{ color: "rgba(180, 210, 230, 0.6)" }}
          >
            Mein Fokus liegt auf reibungsloser Kommunikation und strukturiertem Projektmanagement.
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
          <div className="group relative">
            <div
              className="absolute inset-0 rounded-full scale-[1.10]"
              style={{ border: "1px solid rgba(77, 190, 243, 0.15)" }}
            />
            <div
              className="absolute inset-0 rounded-full scale-[1.04]"
              style={{ border: "1px solid rgba(77, 190, 243, 0.08)" }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full scale-[1.18] pointer-events-none"
              style={{
                background: "conic-gradient(from 180deg, transparent 0deg, rgba(77,190,243,0.45) 80deg, transparent 160deg, transparent 360deg)",
                WebkitMask: "radial-gradient(circle, transparent 49%, #000 50%, #000 51%, transparent 52%)",
                mask: "radial-gradient(circle, transparent 49%, #000 50%, #000 51%, transparent 52%)",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            />
            <div
              className="relative h-60 w-60 sm:h-72 sm:w-72 xl:h-80 xl:w-80 2xl:h-96 2xl:w-96 rounded-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              style={{ border: "2px solid rgba(77, 190, 243, 0.45)" }}
            >
              <img
                src={berkantImg}
                alt="Berkant Agyar"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Berkant info cards */}
      <div className="mt-16 2xl:mt-24 grid gap-4 2xl:gap-6 md:grid-cols-2 items-stretch">
        <FadeIn className="h-full">
          <Card className="h-full">
            <div className="text-[12px] tracking-[0.25em] uppercase mb-5" style={{ color: "#4dbef3" }}>
              Hintergrund
            </div>
            <ul className="space-y-3 text-[14px]" style={{ color: "rgba(200, 225, 240, 0.8)" }}>
              <li>Studium Wirtschaftsinformatik im 6. Semester (HFU Furtwangen)</li>
              <li>Schwerpunkt Porjektmanagemnt & Digital Business</li>
              <li>Arbeitserfahrung im Projektmanagement bei Mercedes-Benz</li>
              <li>Aus Triberg im Schwarzwald</li>
            </ul>
          </Card>
        </FadeIn>
        <FadeIn delay={0.08} className="h-full">
          <Card className="h-full">
            <div className="text-[12px] tracking-[0.25em] uppercase mb-5" style={{ color: "#4dbef3" }}>
              Aufgabenbereiche
            </div>
            <div className="flex flex-wrap gap-2">
              {["Kundenkommunikation", "Projektmanagement", "Vertragsabwicklung", "Angebotserstellung"].map((t) => (
                <span
                  key={t}
                  className="tag-pill rounded-full px-3 py-1 2xl:px-4 2xl:py-1.5 text-[12px] 2xl:text-[14px]"
                  style={{
                    background: "rgba(77, 190, 243, 0.08)",
                    border: "1px solid rgba(77, 190, 243, 0.18)",
                    color: "rgba(180, 225, 245, 0.85)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>

      {/* ── Unser Ansatz ── */}
      <div className="mt-20 2xl:mt-28">
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
