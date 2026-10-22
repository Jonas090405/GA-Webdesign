import { useState } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader } from "../SectionHeader";
import { GhostButton, TertiaryButton } from "../Button";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";
import { PortfolioScrollSection } from "../PortfolioScrollSection";
import { HeroFlight } from "../HeroFlight";
import { useNavigate } from "react-router-dom";
import { Phone, Linkedin, Mail, MapPin } from "lucide-react";
import { ContactLine } from "../ContactLine";
import { PortraitRing } from "../PortraitRing";
import { TileMedia } from "../TileMedia";
import tileDesignClip from "../../../imports/tile-design.mp4";
import tileDesignPoster from "../../../imports/tile-design-poster.webp";
import tileCodeClip from "../../../imports/tile-code.mp4";
import tileCodePoster from "../../../imports/tile-code-poster.webp";
import tileRocketClip from "../../../imports/tile-rocket.mp4";
import tileRocketPoster from "../../../imports/tile-rocket-poster.webp";
import { ContactForm, BERKANT_EMAIL, BERKANT_PHONE, BERKANT_TEL, BERKANT_WHATSAPP } from "../ContactForm";
import { DirectContactCard } from "../DirectContactCard";
import { WhatsAppIcon } from "../WhatsAppIcon";
import { PROJECTS } from "../../../content/projects";
import profilbild from "../../../imports/Jonas_Gissler.jpg";
import berkantImg from "../../../imports/Berkant_agyar.jpeg";

export function Home() {
  usePageMeta({
    title: "Webdesign im Schwarzwald – Moderne Webseiten | G&A Webdesign",
    description: "G&A Webdesign aus Triberg: modernes Webdesign und professionelle Webseiten für lokale Unternehmen im Schwarzwald – komplett aus einer Hand, inkl. Hosting & SEO.",
    path: "/",
  });
  return (
    <main id="main-content">
      <HeroFlight />
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <PortfolioPreview />
        <Services />
        <TeamPreview />
        <Contact />
      </div>
    </main>
  );
}

function PortfolioPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-10 lg:py-14 xl:py-18 2xl:py-24">
      <SectionHeader
        title="Projekte, die wir umgesetzt haben."
        lead="Eine Auswahl unserer aktuellen Kundenarbeiten."
        className="mb-8 sm:mb-10 xl:mb-14 2xl:mb-20"
      />

      {/* Identisch zur Portfolio-Seite, nur Featured-Projekt */}
      <PortfolioScrollSection projects={PROJECTS.slice(0, 1)} hideTag />

      {/* Weiterführend als ruhige Zeile – die Hauptaktionen stehen in der Projektkarte */}
      <FadeIn delay={0.2}>
        <p className="mt-10 sm:mt-0 flex flex-wrap items-center justify-start sm:justify-center gap-x-6 gap-y-3 text-[14px] xl:text-[15px] text-ink-400">
          <span className="basis-full sm:basis-auto">Mehr von uns:</span>
          <TertiaryButton onClick={() => navigate("/projekte")}>Alle Projekte</TertiaryButton>
          <TertiaryButton href="https://portfolio.ga-webdesign.de" external={true}>
            Persönliches Portfolio
          </TertiaryButton>
        </p>
      </FadeIn>
    </section>
  );
}


function ServiceCard({
  poster,
  clip,
  title,
  desc,
  i,
}: {
  poster: string;
  clip: string;
  title: string;
  desc: string;
  i: number;
}) {
  return (
    <FadeIn delay={i * 0.08} className="h-full">
      <div className="h-full">
        <Card className="h-full">
          <div className="flex flex-col h-full">
            {/* Illustration — läuft im Viewport dauerhaft */}
            <TileMedia
              poster={poster}
              src={clip}
              label={title}
              className="mb-4 xl:mb-6 w-full aspect-[16/9]"
            />

            <h3 className="text-white text-[18px] sm:text-[20px] xl:text-[22px] 2xl:text-[25px] mb-2 xl:mb-3">
              {title}
            </h3>
            <p
              className="text-[14px] xl:text-[16px] 2xl:text-[18px] leading-relaxed flex-1 text-ink-300"
            >
              {desc}
            </p>
          </div>
        </Card>
      </div>
    </FadeIn>
  );
}

const SERVICES: { poster: string; clip: string; title: string; desc: string }[] = [
  {
    poster: tileDesignPoster,
    clip: tileDesignClip,
    title: "Individuelles Design",
    desc: "Deine Webseite sieht genau so aus, wie du es dir vorstellst. Kein vorgefertigtes Template, sondern ein eigenes Design für dich.",
  },
  {
    poster: tileCodePoster,
    clip: tileCodeClip,
    title: "Technische Umsetzung",
    desc: "Alle Funktionen sauber mit modernster Technik umgesetzt. Schnell geladen, für Google optimiert und auf jedem Gerät perfekt nutzbar.",
  },
  {
    poster: tileRocketPoster,
    clip: tileRocketClip,
    title: "Fertig live, sofort nutzbar",
    desc: "Domain, Hosting, Einrichtung. Wir kümmern uns um alles. Du bekommst eine fertige Webseite und kannst sofort loslegen.",
  },
];

function Services() {
  const navigate = useNavigate();

  return (
    <section id="leistungen" className="py-12 sm:py-10 lg:py-14 xl:py-18 2xl:py-24">
      <SectionHeader
        title="Alles, was du für deine Webseite brauchst."
        lead={<>Wir übernehmen alles: Design, Entwicklung und Hosting.<br />Du musst dich um nichts kümmern.</>}
      />

      <div className="grid gap-5 sm:gap-6 xl:gap-8 2xl:gap-10 sm:grid-cols-2 md:grid-cols-3 items-stretch">
        {SERVICES.map(({ poster, clip, title, desc }, i) => (
          <ServiceCard key={title} poster={poster} clip={clip} title={title} desc={desc} i={i} />
        ))}
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-10 xl:mt-14 2xl:mt-16">
          <GhostButton onClick={() => navigate("/leistungen")}>
            Mehr über unsere Leistungen
          </GhostButton>
        </div>
      </FadeIn>
    </section>
  );
}

const MEMBERS = [
  {
    photo: profilbild,
    name: "Jonas Gissler",
    role: "Design & Frontend",
    desc: "Gestaltet deine Webseite und auf Wunsch dein Corporate Design – und setzt alles im Frontend um. Also das, was deine Kunden sehen und erleben.",
    linkedin: "https://www.linkedin.com/in/jonas-gissler-37b1482b0/",
  },
  {
    photo: berkantImg,
    name: "Berkant Agyar",
    role: "Backend & Kundenkontakt",
    desc: "Dein Ansprechpartner von der Anfrage bis zum Livegang. Sorgt im Backend dafür, dass Formulare, CMS und Hosting zuverlässig laufen.",
    linkedin: "https://www.linkedin.com/in/berkant-agyar-2334a6363",
  },
];

/**
 * Porträt-Band statt Personen-Kacheln: dasselbe runde Bild mit Lichtring wie
 * auf „Über uns", darunter Name, Rolle und ein Satz zur Person.
 */
function Member({
  photo,
  name,
  role,
  desc,
  linkedin,
  spin,
}: (typeof MEMBERS)[number] & { spin: 1 | -1 }) {
  return (
    <article>
      <PortraitRing
        photo={photo}
        alt={name}
        spin={spin}
        duration={spin === 1 ? 18 : 22}
        className="h-52 w-52 sm:h-56 sm:w-56 xl:h-64 xl:w-64 2xl:h-72 2xl:w-72"
      />

      <h3 className="mt-5 xl:mt-6 text-white text-[clamp(22px,2.6vw,34px)] leading-[1.1] tracking-tight">
        {name}
      </h3>
      <p
        className="mt-2.5 text-[11px] xl:text-[12px] tracking-[0.2em] uppercase leading-snug text-blue-400"
      >
        {role}
      </p>
      <p
        className="mt-4 xl:mt-5 max-w-md text-[14px] xl:text-[16px] 2xl:text-[17px] leading-relaxed text-ink-300"
      >
        {desc}
      </p>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} auf LinkedIn (öffnet in neuem Tab)`}
        className="mt-5 inline-flex items-center gap-2 text-[13px] xl:text-[14px] font-medium text-ink-400 transition-colors duration-200 hover:text-blue-400 focus-visible:text-blue-400"
      >
        <Linkedin size={14} aria-hidden="true" />
        LinkedIn
      </a>
    </article>
  );
}

function TeamPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-10 lg:py-14 xl:py-18 2xl:py-24">
      <SectionHeader
        title="Das sind wir."
        lead="Wir sind Jonas und Berkant – zwei aus Triberg, die zusammen Webseiten für Unternehmen im Schwarzwald bauen. Du weißt von Anfang an, wer an deinem Projekt arbeitet und wen du anrufst."
        className="mb-12 sm:mb-14 xl:mb-20 2xl:mb-24"
      />

      <div className="grid gap-12 sm:gap-8 xl:gap-16 sm:grid-cols-2">
        {MEMBERS.map((m, i) => (
          <FadeIn key={m.name} delay={i * 0.1}>
            <Member {...m} spin={i === 0 ? 1 : -1} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-12 xl:mt-16 2xl:mt-20">
          <GhostButton onClick={() => navigate("/ueber-uns")}>
            Mehr über uns
          </GhostButton>
        </div>
      </FadeIn>
    </section>
  );
}

const slideVariants = {
  enter: (d: number) => ({ x: d * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -40, opacity: 0 }),
};

function Contact() {
  const [mode, setMode] = useState<"form" | "direct">("form");
  const [direction, setDirection] = useState(0);

  return (
    <section id="kontakt" className="py-12 sm:py-10 lg:py-14 xl:py-18 2xl:py-24">
      <div className="grid gap-10 md:gap-12 xl:gap-20 2xl:gap-28 md:grid-cols-2 items-start">
        <FadeIn>
          <h2 className="text-white text-[clamp(26px,4vw,64px)] tracking-tight mb-4 xl:mb-5">
            Erzähl uns von deinem Projekt.
          </h2>

          {/* Ansprechpartner */}
          <div className="flex items-center gap-3 mb-5 xl:mb-6">
            <div
              className="shrink-0 h-9 w-9 rounded-full overflow-hidden"
              style={{ border: "1.5px solid rgb(var(--blue-400-rgb) / 0.4)" }}
            >
              <img src={berkantImg} alt="Berkant Agyar" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
            </div>
            <div>
              <div className="text-[11px] text-ink-400">Dein Ansprechpartner</div>
              <div className="text-[13px] text-white font-medium leading-tight">Berkant Agyar</div>
            </div>
          </div>

          <p
            className="text-[14px] sm:text-[15px] xl:text-[17px] 2xl:text-[19px] leading-relaxed mb-8 max-w-md xl:max-w-lg 2xl:max-w-xl text-ink-300"
          >
            Wir melden uns innerhalb von 24 Stunden
            mit einer ersten Einschätzung und einem unverbindlichen Termin.
          </p>
          <div className="space-y-4">
            <ContactLine
              Icon={Mail}
              label="E-Mail"
              value={BERKANT_EMAIL}
              href={`mailto:${BERKANT_EMAIL}`}
            />
            <ContactLine
              Icon={WhatsAppIcon}
              label="WhatsApp"
              value="Nachricht schreiben"
              href={BERKANT_WHATSAPP}
              external
            />
            <ContactLine
              Icon={Phone}
              label="Telefon"
              value={BERKANT_PHONE}
              href={BERKANT_TEL}
            />
            <ContactLine Icon={MapPin} label="Standort" value="Triberg, Schwarzwald" />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          {/* Tab-Toggle */}
          <div
            className="flex mb-4 p-1 rounded-xl gap-1"
            style={{
              background: "rgb(var(--ink-950-rgb) / 0.7)",
              border: "1px solid rgb(var(--blue-400-rgb) / 0.12)",
            }}
          >
            <HomeTabBtn active={mode === "form"} onClick={() => { setDirection(-1); setMode("form"); }}>
              Anfrage senden
            </HomeTabBtn>
            <HomeTabBtn active={mode === "direct"} onClick={() => { setDirection(1); setMode("direct"); }}>
              Direkt kontaktieren
            </HomeTabBtn>
          </div>

          <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={mode}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
          {mode === "direct" ? (
            <DirectContactCard compact />
          ) : (
            <Card>
              <ContactForm subject="Anfrage über Startseite" />
            </Card>
          )}
          </motion.div>
          </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function HomeTabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex-1 rounded-lg px-4 py-2.5 text-[13px] font-medium tracking-wide cursor-pointer transition-colors duration-200"
      style={{ color: active ? "#fff" : "var(--ink-400)" }}
    >
      {active && (
        <motion.div
          layoutId="home-tab-pill"
          className="absolute inset-0 rounded-lg"
          style={{ background: "var(--gradient-cta)" }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
