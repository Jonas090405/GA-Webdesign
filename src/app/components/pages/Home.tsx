import { useState } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { motion, AnimatePresence } from "motion/react";
import { SectionLabel } from "../SectionLabel";
import { PrimaryButton, GhostButton, TertiaryButton } from "../Button";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";
import { PortfolioScrollSection } from "../PortfolioScrollSection";
import { Aurora } from "../Aurora";
import { useNavigate } from "react-router-dom";
import { Phone, Linkedin } from "lucide-react";
import { TileMedia } from "../TileMedia";
import tileDesignClip from "../../../imports/tile-design.mp4";
import tileDesignPoster from "../../../imports/tile-design-poster.webp";
import tileCodeClip from "../../../imports/tile-code.mp4";
import tileCodePoster from "../../../imports/tile-code-poster.webp";
import tileRocketClip from "../../../imports/tile-rocket.mp4";
import tileRocketPoster from "../../../imports/tile-rocket-poster.webp";
import { ContactForm, BERKANT_EMAIL, BERKANT_PHONE } from "../ContactForm";
import profilbild from "../../../imports/Jonas_Gissler.png";
import berkantImg from "../../../imports/Berkant_agyar.jpeg";
import { HeroModels } from "../HeroModels";
import { TeamBadge } from "../TeamBadge";
import gcnImg from "../../../imports/gcn-fahrzeughandel.png";
import gcnAvatar from "../../../imports/gcn-avatar.jpeg";
import gcnVideo from "../../../imports/GCN-Projekt.mp4";

const PROJECTS = [
  {
    image: gcnImg,
    video: gcnVideo,
    tag: "Fahrzeughandel · 2026",
    title: "GCN-Fahrzeughandel",
    desc: "Vollständige Web-Plattform für einen Fahrzeughändler – Außendarstellung, Fahrzeugsuche, Verkaufsauftragsformulare mit automatischer E-Mail-Benachrichtigung und internes Kundenverwaltungs-Dashboard.",
    url: "https://gcn-fahrzeughandel.de/",
    features: ["React", "Dashboard", "Fahrzeugsuche", "E-Mail-System", "Deployment"],
    testimonial: {
      show: true, // ← false = Testimonial ausblenden
      quote: "Die Zusammenarbeit war von Anfang bis Ende reibungslos. Unsere Vorstellungen wurden genau verstanden und eine Webseite gebaut, die wirklich zu uns passt. Außerdem erleichtert unser neues Admin-Panel die Verwaltung unserer Kunden erheblich.",
      name: "Giosue Canobbio",
      role: "Geschäftsführer",
      company: "GCN-Fahrzeughandel",
      avatar: gcnAvatar,
    },
  },
  {
    image: null,
    tag: "Weitere Projekte",
    title: "Persönliches Portfolio",
    desc: "Hier sind nur ausgewählte Projekte zu sehen. Auf meiner Portfolio-Seite findest du alle meine Arbeiten.",
    url: "/projekte",
    urlLabel: "Alle Projekte",
  },
];

export function Home() {
  usePageMeta({
    title: "G&A Webdesign | Moderne Webseiten für lokale Unternehmen",
    description: "Wir entwerfen und entwickeln moderne, professionelle Webseiten für lokale Unternehmen. Komplett fertig eingerichtet inkl. Hosting & SEO.",
    path: "/",
  });
  return (
    <main id="main-content" className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <Hero />
      <PortfolioPreview />
      <Services />
      <TeamPreview />
      <Contact />
    </main>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative pt-22 sm:pt-18 lg:pt-24 xl:pt-28 2xl:pt-36 pb-12 sm:pb-12 lg:pb-18 xl:pb-22 2xl:pb-28">
      <Aurora />

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-8 xl:gap-16 2xl:gap-24 items-center">
        <div>
          <FadeIn>
            <TeamBadge />
            <SectionLabel>Webdesign · Entwicklung · Hosting · SEO</SectionLabel>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-white text-[clamp(34px,6.5vw,108px)] leading-[1.05] tracking-tight">
              Webseiten,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #4dbef3 0%, #006999 100%)",
                }}
              >
                die Wirkung zeigen.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="mt-5 sm:mt-7 text-[16px] sm:text-[18px] lg:text-[19px] xl:text-[21px] 2xl:text-[24px] leading-relaxed"
              style={{ color: "rgba(200, 225, 240, 0.75)" }}
            >
              Wir entwerfen und bauen deine Webseite. Von der ersten Idee bis sie live ist.
              Du musst dich um nichts kümmern.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 sm:mt-10 xl:mt-12">
              <PrimaryButton onClick={() => navigate("/kontakt")}>
                Projekt anfragen
              </PrimaryButton>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4} className="flex justify-center lg:justify-end">
          <HeroModels className="max-w-[340px] sm:max-w-[460px] lg:max-w-[520px] xl:max-w-[660px] 2xl:max-w-[820px]" />
        </FadeIn>
      </div>
    </section>
  );
}

function PortfolioPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-10 lg:py-14 xl:py-18 2xl:py-24">
      <FadeIn>
        <SectionLabel>Projekte</SectionLabel>
        <div className="mb-8 sm:mb-10 xl:mb-14 2xl:mb-20">
          <h2 className="text-white text-[clamp(28px,4.5vw,72px)] tracking-tight max-w-4xl 2xl:max-w-5xl">
            Projekte, die wir umgesetzt haben.
          </h2>
          <p className="mt-4 xl:mt-6 max-w-2xl 2xl:max-w-3xl text-[15px] sm:text-[17px] xl:text-[19px] 2xl:text-[21px] leading-relaxed" style={{ color: "rgba(180,210,230,0.65)" }}>
            Eine Auswahl unserer aktuellen Kundenarbeiten.
          </p>
        </div>
      </FadeIn>

      {/* Identisch zur Portfolio-Seite, nur Featured-Projekt */}
      <PortfolioScrollSection projects={[PROJECTS[0]]} hideTag />

      <FadeIn delay={0.2}>
        <div className="mt-10 sm:mt-0 flex items-center justify-start sm:justify-center gap-5 sm:gap-7">
          <GhostButton onClick={() => navigate("/projekte")}>
            Alle Projekte
          </GhostButton>
          <TertiaryButton href="https://portfolio.ga-webdesign.de" external={true}>
            Persönliches Portfolio
          </TertiaryButton>
        </div>
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
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={i * 0.08} className="h-full">
      <div
        className="h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Card className="h-full">
          <div className="flex flex-col h-full">
            {/* Illustration — statisch gedämpft, zündet beim Hover */}
            <TileMedia
              poster={poster}
              src={clip}
              label={title}
              active={hovered}
              className="mb-4 xl:mb-6 w-full aspect-[16/9]"
            />

            <h3 className="text-white text-[18px] sm:text-[20px] xl:text-[22px] 2xl:text-[25px] mb-2 xl:mb-3">
              {title}
            </h3>
            <p
              className="text-[14px] xl:text-[16px] 2xl:text-[18px] leading-relaxed flex-1"
              style={{ color: "rgba(180,210,230,0.6)" }}
            >
              {desc}
            </p>
          </div>
        </Card>
      </div>
    </FadeIn>
  );
}

function Services() {
  const navigate = useNavigate();
  const services: { poster: string; clip: string; title: string; desc: string }[] = [
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

  return (
    <section id="leistungen" className="py-12 sm:py-10 lg:py-14 xl:py-18 2xl:py-24">
      <FadeIn>
        <SectionLabel>Leistungen</SectionLabel>
        <div className="mb-10 sm:mb-12 xl:mb-16 2xl:mb-20">
          <h2 className="text-white text-[clamp(28px,4.5vw,72px)] tracking-tight max-w-4xl 2xl:max-w-5xl">
            Alles, was du für deine Webseite brauchst.
          </h2>
          <p className="mt-4 xl:mt-6 max-w-2xl 2xl:max-w-3xl text-[15px] sm:text-[17px] xl:text-[19px] 2xl:text-[21px] leading-relaxed" style={{ color: "rgba(180,210,230,0.65)" }}>
            Wir übernehmen alles: Design, Entwicklung und Hosting.<br />Du musst dich um nichts kümmern.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-5 sm:gap-6 xl:gap-8 2xl:gap-10 sm:grid-cols-2 md:grid-cols-3 items-stretch">
        {services.map(({ poster, clip, title, desc }, i) => (
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

function TeamPreview() {
  const navigate = useNavigate();

  const members = [
    {
      photo: profilbild as string | null,
      initials: null as string | null,
      name: "Jonas Gissler",
      role: "Design & Entwicklung",
      desc: "Jonas entwirft und entwickelt deine Webseite – von der Idee bis zur Live-Schaltung. Design, Technik und Hosting aus einer Hand.",
      linkedin: "https://www.linkedin.com/in/jonas-gissler-37b1482b0/",
    },
    {
      photo: berkantImg as string | null,
      initials: null as string | null,
      name: "Berkant Agyar",
      role: "Kundenkommunikation & Projektmanagement",
      desc: "Berkant ist dein erster Ansprechpartner. Er begleitet dich durch den gesamten Prozess – von der ersten Anfrage bis zum finalen Ergebnis.",
      linkedin: "https://www.linkedin.com/in/berkant-agyar-2334a6363",
    },
  ];

  return (
    <section className="py-12 sm:py-10 lg:py-14 xl:py-18 2xl:py-24">
      <FadeIn>
        <SectionLabel>Über uns</SectionLabel>
        <div className="mb-10 sm:mb-12 xl:mb-16 2xl:mb-20">
          <h2 className="text-white text-[clamp(28px,4.5vw,72px)] tracking-tight">
            Das sind wir.
          </h2>
          <p
            className="mt-4 xl:mt-6 max-w-2xl 2xl:max-w-3xl text-[15px] sm:text-[17px] xl:text-[19px] 2xl:text-[21px] leading-relaxed"
            style={{ color: "rgba(180,210,230,0.65)" }}
          >
            Design, Entwicklung und Hosting — du musst dich um nichts kümmern.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-5 sm:gap-6 xl:gap-8 2xl:gap-10 sm:grid-cols-2 items-stretch">
        {members.map(({ photo, initials, name, role, desc, linkedin }, i) => (
          <FadeIn key={name} delay={i * 0.1} className="h-full">
            <Card className="h-full">
              {/* Avatar + name + role */}
              <div className="flex items-center gap-4 mb-5 xl:mb-6">
                <div
                  className="shrink-0 h-14 w-14 xl:h-16 xl:w-16 2xl:h-[72px] 2xl:w-[72px] rounded-full overflow-hidden flex items-center justify-center text-[17px] xl:text-[20px] font-bold"
                  style={{
                    border: "2px solid rgba(77, 190, 243, 0.45)",
                    background: photo
                      ? "transparent"
                      : "linear-gradient(135deg, rgba(0,105,153,0.5) 0%, rgba(77,190,243,0.18) 100%)",
                    color: "#4dbef3",
                  }}
                >
                  {photo ? (
                    <img src={photo} alt={name} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
                  ) : (
                    initials
                  )}
                </div>
                <div>
                  <h3 className="text-white text-[17px] xl:text-[19px] 2xl:text-[21px] font-medium leading-tight mb-1.5">
                    {name}
                  </h3>
                  <p
                    className="text-[11px] tracking-[0.18em] uppercase leading-snug"
                    style={{ color: "#4dbef3" }}
                  >
                    {role}
                  </p>
                </div>
              </div>

              <p
                className="text-[14px] xl:text-[15px] 2xl:text-[16px] leading-relaxed mb-5"
                style={{ color: "rgba(180, 210, 230, 0.6)" }}
              >
                {desc}
              </p>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] xl:text-[14px] font-medium transition-colors duration-200"
                style={{ color: "rgba(150, 190, 220, 0.6)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#4dbef3")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(150, 190, 220, 0.6)")}
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </Card>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-10 xl:mt-14 2xl:mt-16">
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
  const [mode, setMode] = useState<"form" | "call">("form");
  const [direction, setDirection] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(BERKANT_EMAIL).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    });
  }

  return (
    <section id="kontakt" className="py-12 sm:py-10 lg:py-14 xl:py-18 2xl:py-24">
      <FadeIn>
        <SectionLabel>Kontakt</SectionLabel>
      </FadeIn>
      <div className="grid gap-10 md:gap-12 xl:gap-20 2xl:gap-28 md:grid-cols-2 items-start">
        <FadeIn>
          <h2 className="text-white text-[clamp(26px,4vw,64px)] tracking-tight mb-4 xl:mb-5">
            Erzähl uns von deinem Projekt.
          </h2>

          {/* Ansprechpartner */}
          <div className="flex items-center gap-3 mb-5 xl:mb-6">
            <div
              className="shrink-0 h-9 w-9 rounded-full overflow-hidden"
              style={{ border: "1.5px solid rgba(77,190,243,0.4)" }}
            >
              <img src={berkantImg} alt="Berkant Agyar" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
            </div>
            <div>
              <div className="text-[11px]" style={{ color: "rgba(150,190,220,0.5)" }}>Dein Ansprechpartner</div>
              <div className="text-[13px] text-white font-medium leading-tight">Berkant Agyar</div>
            </div>
          </div>

          <p
            className="text-[14px] sm:text-[15px] xl:text-[17px] 2xl:text-[19px] leading-relaxed mb-8 max-w-md xl:max-w-lg 2xl:max-w-xl"
            style={{ color: "rgba(180, 210, 230, 0.6)" }}
          >
            Wir melden uns innerhalb von 24 Stunden
            mit einer ersten Einschätzung und einem unverbindlichen Termin.
          </p>
          <div className="space-y-3 text-[14px] xl:text-[16px]">
            <div>
              <div className="mb-1" style={{ color: "rgba(150, 180, 200, 0.5)" }}>E-Mail</div>
              <button
                onClick={copyEmail}
                className="cursor-pointer text-white hover:text-sky-300 transition-colors break-all bg-transparent border-none p-0 text-left text-[14px] xl:text-[16px]"
              >
                {emailCopied ? "Kopiert ✓" : BERKANT_EMAIL}
              </button>
            </div>
            <div>
              <div className="mb-1" style={{ color: "rgba(150, 180, 200, 0.5)" }}>Telefon</div>
              <a
                href={`tel:${BERKANT_PHONE.replace(/[\s]/g, "")}`}
                className="text-white hover:text-sky-300 transition-colors"
              >
                {BERKANT_PHONE}
              </a>
            </div>
            <div>
              <div className="mb-1" style={{ color: "rgba(150, 180, 200, 0.5)" }}>Standort</div>
              <div className="text-white">Triberg, Schwarzwald</div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          {/* Tab-Toggle */}
          <div
            className="flex mb-4 p-1 rounded-xl gap-1"
            style={{
              background: "rgba(10,19,30,0.7)",
              border: "1px solid rgba(77,190,243,0.12)",
            }}
          >
            <HomeTabBtn active={mode === "form"} onClick={() => { setDirection(-1); setMode("form"); }}>
              Anfrage senden
            </HomeTabBtn>
            <HomeTabBtn active={mode === "call"} onClick={() => { setDirection(1); setMode("call"); }}>
              Direkt anrufen
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
          {mode === "call" ? (
            <Card>
              <div className="py-8 flex flex-col items-center text-center gap-5">
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,105,153,0.3) 0%, rgba(77,190,243,0.15) 100%)",
                    border: "1px solid rgba(77,190,243,0.3)",
                  }}
                >
                  <Phone size={26} style={{ color: "#4dbef3" }} />
                </div>
                <div>
                  <p className="text-[13px] mb-1" style={{ color: "rgba(150,190,220,0.6)" }}>
                    Ruf uns einfach direkt an:
                  </p>
                  <a
                    href={`tel:${BERKANT_PHONE.replace(/[\s]/g, "")}`}
                    className="text-white text-[24px] font-semibold tracking-tight hover:text-sky-300 transition-colors"
                  >
                    {BERKANT_PHONE}
                  </a>
                </div>
                <p className="text-[13px] max-w-xs leading-relaxed" style={{ color: "rgba(150,190,220,0.5)" }}>
                  Falls wir nicht erreichbar sind, hinterlasse eine kurze Nachricht — wir melden uns schnellstmöglich.
                </p>
                <a
                  href={`tel:${BERKANT_PHONE.replace(/[\s]/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-white font-medium transition-all duration-200 hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #006999 0%, #4dbef3 100%)" }}
                >
                  <Phone size={15} />
                  Jetzt anrufen
                </a>
              </div>
            </Card>
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
      style={{ color: active ? "#fff" : "rgba(150,190,220,0.6)" }}
    >
      {active && (
        <motion.div
          layoutId="home-tab-pill"
          className="absolute inset-0 rounded-lg"
          style={{ background: "linear-gradient(135deg, #006999 0%, #4dbef3 100%)" }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
