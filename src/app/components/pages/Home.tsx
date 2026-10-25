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
import { ContactForm, BERKANT_EMAIL, BERKANT_PHONE, BERKANT_TEL, useWhatsAppLink } from "../ContactForm";
import { DirectContactCard } from "../DirectContactCard";
import { WhatsAppIcon } from "../WhatsAppIcon";
import { PROJECTS } from "../../../content/projects";
import profilbild from "../../../imports/Jonas_Gissler.jpg";
import berkantImg from "../../../imports/Berkant_agyar.jpeg";
import { useCopy, useLocalePath } from "../../../i18n";

const COPY = {
  de: {
    metaTitle: "Webdesign im Schwarzwald – Moderne Webseiten | G&A Webdesign",
    metaDescription: "G&A Webdesign aus St. Georgen: modernes Webdesign und professionelle Webseiten für lokale Unternehmen im Schwarzwald – komplett aus einer Hand, inkl. Hosting & SEO.",
    portfolioTitle: "Projekte, die wir umgesetzt haben.",
    portfolioLead: "Eine Auswahl unserer aktuellen Kundenarbeiten.",
    moreFromUs: "Mehr von uns:",
    allProjects: "Alle Projekte",
    personalPortfolio: "Persönliches Portfolio",
    servicesTitle: "Alles, was du für deine Webseite brauchst.",
    servicesLead1: "Wir übernehmen alles: Design, Entwicklung und Hosting.",
    servicesLead2: "Du musst dich um nichts kümmern.",
    servicesCta: "Mehr über unsere Leistungen",
    teamTitle: "Das sind wir.",
    teamLead: "Wir sind Jonas und Berkant und bauen von St. Georgen aus zusammen Webseiten für Unternehmen im Schwarzwald. Du weißt von Anfang an, wer an deinem Projekt arbeitet und wen du anrufst.",
    teamCta: "Mehr über uns",
    linkedinLabel: (name: string) => `${name} auf LinkedIn (öffnet in neuem Tab)`,
    contactTitle: "Erzähl uns von deinem Projekt.",
    yourContact: "Dein Ansprechpartner",
    contactLead: "Wir melden uns innerhalb von 24 Stunden mit einer ersten Einschätzung und einem unverbindlichen Termin.",
    emailLabel: "E-Mail",
    whatsappValue: "Nachricht schreiben",
    phoneLabel: "Telefon",
    locationLabel: "Standort",
    locationValue: "St. Georgen, Schwarzwald",
    tabForm: "Anfrage senden",
    tabDirect: "Direkt kontaktieren",
  },
  en: {
    metaTitle: "Web Design in the Black Forest – Modern Websites | G&A Webdesign",
    metaDescription: "G&A Webdesign from St. Georgen: modern web design and professional websites for local businesses in the Black Forest – all from one team, including hosting & SEO.",
    portfolioTitle: "Projects we've built.",
    portfolioLead: "A selection of our recent client work.",
    moreFromUs: "More from us:",
    allProjects: "All projects",
    personalPortfolio: "Personal portfolio",
    servicesTitle: "Everything your website needs.",
    servicesLead1: "We handle it all: design, development and hosting.",
    servicesLead2: "You don't have to worry about a thing.",
    servicesCta: "More about our services",
    teamTitle: "That's us.",
    teamLead: "We're Jonas and Berkant, and from St. Georgen we build websites for businesses across the Black Forest. From day one, you know who's working on your project and who to call.",
    teamCta: "More about us",
    linkedinLabel: (name: string) => `${name} on LinkedIn (opens in a new tab)`,
    contactTitle: "Tell us about your project.",
    yourContact: "Your contact",
    contactLead: "We'll get back to you within 24 hours with an initial assessment and a no-obligation appointment.",
    emailLabel: "Email",
    whatsappValue: "Send a message",
    phoneLabel: "Phone",
    locationLabel: "Location",
    locationValue: "St. Georgen, Black Forest",
    tabForm: "Send a request",
    tabDirect: "Contact us directly",
  },
};

export function Home() {
  const t = useCopy(COPY);
  usePageMeta({
    title: t.metaTitle,
    description: t.metaDescription,
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
  const t = useCopy(COPY);
  const lp = useLocalePath();

  return (
    <section className="py-12 sm:py-10 lg:py-14 xl:py-18 2xl:py-24">
      <SectionHeader
        title={t.portfolioTitle}
        lead={t.portfolioLead}
        className="mb-8 sm:mb-10 xl:mb-14 2xl:mb-20"
      />

      {/* Identisch zur Portfolio-Seite, nur Featured-Projekt */}
      <PortfolioScrollSection projects={PROJECTS.slice(0, 1)} hideTag />

      {/* Weiterführend als ruhige Zeile – die Hauptaktionen stehen in der Projektkarte */}
      <FadeIn delay={0.2}>
        <p className="mt-10 sm:mt-0 flex flex-wrap items-center justify-start sm:justify-center gap-x-6 gap-y-3 text-[14px] xl:text-[15px] text-ink-400">
          <span className="basis-full sm:basis-auto">{t.moreFromUs}</span>
          <TertiaryButton onClick={() => navigate(lp("/projekte"))}>{t.allProjects}</TertiaryButton>
          <TertiaryButton href="https://portfolio.ga-webdesign.de" external={true}>
            {t.personalPortfolio}
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

type Service = { poster: string; clip: string; title: string; desc: string };

const SERVICES: { de: Service[]; en: Service[] } = {
  de: [
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
  ],
  en: [
    {
      poster: tileDesignPoster,
      clip: tileDesignClip,
      title: "Custom design",
      desc: "Your website looks exactly the way you picture it. We design it just for you instead of starting from a ready-made template.",
    },
    {
      poster: tileCodePoster,
      clip: tileCodeClip,
      title: "Clean development",
      desc: "Every feature built cleanly with the latest technology. Fast to load, optimized for Google and easy to use on any device.",
    },
    {
      poster: tileRocketPoster,
      clip: tileRocketClip,
      title: "Live and ready to use",
      desc: "Domain, hosting, setup. We take care of all of it. You get a finished website and can get started right away.",
    },
  ],
};

function Services() {
  const navigate = useNavigate();
  const t = useCopy(COPY);
  const lp = useLocalePath();
  const services = useCopy(SERVICES);

  return (
    <section id="leistungen" className="py-12 sm:py-10 lg:py-14 xl:py-18 2xl:py-24">
      <SectionHeader
        title={t.servicesTitle}
        lead={<>{t.servicesLead1}<br />{t.servicesLead2}</>}
      />

      <div className="grid gap-5 sm:gap-6 xl:gap-8 2xl:gap-10 sm:grid-cols-2 md:grid-cols-3 items-stretch">
        {services.map(({ poster, clip, title, desc }, i) => (
          <ServiceCard key={title} poster={poster} clip={clip} title={title} desc={desc} i={i} />
        ))}
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-10 xl:mt-14 2xl:mt-16">
          <GhostButton onClick={() => navigate(lp("/leistungen"))}>
            {t.servicesCta}
          </GhostButton>
        </div>
      </FadeIn>
    </section>
  );
}

const JONAS_LINKEDIN = "https://www.linkedin.com/in/jonas-gissler-37b1482b0/";
const BERKANT_LINKEDIN = "https://www.linkedin.com/in/berkant-agyar-2334a6363";

const MEMBERS = {
  de: [
    {
      photo: profilbild,
      name: "Jonas Gissler",
      role: "Design & Frontend",
      desc: "Gestaltet deine Webseite und auf Wunsch dein Corporate Design – und setzt alles im Frontend um. Also das, was deine Kunden sehen und erleben.",
      linkedin: JONAS_LINKEDIN,
    },
    {
      photo: berkantImg,
      name: "Berkant Agyar",
      role: "Backend & Kundenkontakt",
      desc: "Dein Ansprechpartner von der Anfrage bis zum Livegang. Sorgt im Backend dafür, dass Formulare, CMS und Hosting zuverlässig laufen.",
      linkedin: BERKANT_LINKEDIN,
    },
  ],
  en: [
    {
      photo: profilbild,
      name: "Jonas Gissler",
      role: "Design & Frontend",
      desc: "Designs your website and, if you want, your corporate design – then builds it all on the frontend. That's everything your customers see and experience.",
      linkedin: JONAS_LINKEDIN,
    },
    {
      photo: berkantImg,
      name: "Berkant Agyar",
      role: "Backend & Client Contact",
      desc: "Your point of contact from first inquiry to launch. On the backend, he makes sure forms, CMS and hosting run reliably.",
      linkedin: BERKANT_LINKEDIN,
    },
  ],
};

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
}: (typeof MEMBERS)["de"][number] & { spin: 1 | -1 }) {
  const t = useCopy(COPY);
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
        aria-label={t.linkedinLabel(name)}
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
  const t = useCopy(COPY);
  const lp = useLocalePath();
  const members = useCopy(MEMBERS);

  return (
    <section className="py-12 sm:py-10 lg:py-14 xl:py-18 2xl:py-24">
      <SectionHeader
        title={t.teamTitle}
        lead={t.teamLead}
        className="mb-12 sm:mb-14 xl:mb-20 2xl:mb-24"
      />

      <div className="grid gap-12 sm:gap-8 xl:gap-16 sm:grid-cols-2">
        {members.map((m, i) => (
          <FadeIn key={m.name} delay={i * 0.1}>
            <Member {...m} spin={i === 0 ? 1 : -1} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-12 xl:mt-16 2xl:mt-20">
          <GhostButton onClick={() => navigate(lp("/ueber-uns"))}>
            {t.teamCta}
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
  const t = useCopy(COPY);
  const lp = useLocalePath();
  const whatsAppLink = useWhatsAppLink();

  return (
    <section id="kontakt" className="py-12 sm:py-10 lg:py-14 xl:py-18 2xl:py-24">
      <div className="grid gap-10 md:gap-12 xl:gap-20 2xl:gap-28 md:grid-cols-2 items-start">
        <FadeIn>
          <h2 className="text-white text-[clamp(26px,4vw,64px)] tracking-tight mb-4 xl:mb-5">
            {t.contactTitle}
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
              <div className="text-[11px] text-ink-400">{t.yourContact}</div>
              <div className="text-[13px] text-white font-medium leading-tight">Berkant Agyar</div>
            </div>
          </div>

          <p
            className="text-[14px] sm:text-[15px] xl:text-[17px] 2xl:text-[19px] leading-relaxed mb-8 max-w-md xl:max-w-lg 2xl:max-w-xl text-ink-300"
          >
            {t.contactLead}
          </p>
          <div className="space-y-4">
            <ContactLine
              Icon={Mail}
              label={t.emailLabel}
              value={BERKANT_EMAIL}
              href={`mailto:${BERKANT_EMAIL}`}
            />
            <ContactLine
              Icon={WhatsAppIcon}
              label="WhatsApp"
              value={t.whatsappValue}
              href={whatsAppLink}
              external
            />
            <ContactLine
              Icon={Phone}
              label={t.phoneLabel}
              value={BERKANT_PHONE}
              href={BERKANT_TEL}
            />
            <ContactLine Icon={MapPin} label={t.locationLabel} value={t.locationValue} to={lp("/kontakt#standort")} />
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
              {t.tabForm}
            </HomeTabBtn>
            <HomeTabBtn active={mode === "direct"} onClick={() => { setDirection(1); setMode("direct"); }}>
              {t.tabDirect}
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
      aria-pressed={active}
      className={`relative flex-1 rounded-lg px-4 py-2.5 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
        active ? "text-white cursor-default" : "text-ink-400 cursor-pointer hover:text-ink-100 hover:bg-blue-400/[0.08]"
      }`}
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
