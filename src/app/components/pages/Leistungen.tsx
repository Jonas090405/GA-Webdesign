import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { Card } from "../Card";
import { PrimaryButton } from "../Button";
import { FadeIn } from "../FadeIn";
import {
  Blocks,
  BriefcaseBusiness,
  CalendarCheck,
  Camera,
  ChartLine,
  Check,
  Clapperboard,
  FilePen,
  Languages,
  LayoutDashboard,
  Megaphone,
  Minus,
  Newspaper,
  Palette,
  Plus,
  Server,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { TechIcon, hasTechIcon } from "../TechIcon";
import { useNavigate } from "react-router-dom";
import { FAQSection } from "../FAQSection";
import { TileMedia } from "../TileMedia";
import tileDesignClip from "../../../imports/tile-design.mp4";
import tileDesignPoster from "../../../imports/tile-design-poster.webp";
import tileCodeClip from "../../../imports/tile-code.mp4";
import tileCodePoster from "../../../imports/tile-code-poster.webp";
import tileRocketClip from "../../../imports/tile-rocket.mp4";
import tileRocketPoster from "../../../imports/tile-rocket-poster.webp";
import { useCopy, useLocalePath } from "../../../i18n";

type Block = { poster: string; clip: string; title: string; lead: string; points: string[] };

const blocks: { de: Block[]; en: Block[] } = {
  de: [
  {
    poster: tileDesignPoster,
    clip: tileDesignClip,
    title: "Design",
    lead: "So, wie du dir das vorstellst.",
    points: [
      "Individuelles Design, kein Template",
      "Gut bedienbar & schön auf allen Geräten",
      "Auf deine Marke angepasst",
      "Barrierefrei nach WCAG 2.2 AA",
    ],
  },
  {
    poster: tileCodePoster,
    clip: tileCodeClip,
    title: "Entwicklung",
    lead: "Schnell, stabil & zukunftssicher.",
    points: [
      "Handgebaut mit Astro oder Next.js",
      "Schnelle Ladezeiten",
      "Gut bei Google auffindbar (SEO)",
      "Funktionen, auf deine Bedürfnisse angepasst",
    ],
  },
  {
    poster: tileRocketPoster,
    clip: tileRocketClip,
    title: "Deployment",
    lead: "Du musst dich um nichts kümmern.",
    points: [
      "Domain-Setup & Hosting",
      "DSGVO-konform eingerichtet",
      "Fertig live auf deiner Wunsch-Domain",
      "Wir sind auch nach dem Launch da",
    ],
  },
  ],
  en: [
  {
    poster: tileDesignPoster,
    clip: tileDesignClip,
    title: "Design",
    lead: "Exactly how you picture it.",
    points: [
      "Custom design, not a template",
      "Easy to use & great on every device",
      "Tailored to your brand",
      "Accessible to WCAG 2.2 AA",
    ],
  },
  {
    poster: tileCodePoster,
    clip: tileCodeClip,
    title: "Development",
    lead: "Fast, stable & future-proof.",
    points: [
      "Hand-built with Astro or Next.js",
      "Fast load times",
      "Easy to find on Google (SEO)",
      "Features built around your needs",
    ],
  },
  {
    poster: tileRocketPoster,
    clip: tileRocketClip,
    title: "Deployment",
    lead: "You don't have to worry about a thing.",
    points: [
      "Domain setup & hosting",
      "GDPR-compliant setup",
      "Live on the domain of your choice",
      "We're still here after launch",
    ],
  },
  ],
};

/**
 * Einheitlicher Listenpunkt für alle Leistungs- und Preislisten: schlichter
 * Haken ohne Kreis. Der Icon-Wrapper ist genau eine Zeile hoch (1.5em bei leading-normal), dadurch
 * sitzt der Haken bei jeder Schriftgröße mittig auf der ersten Textzeile –
 * auch wenn der Text umbricht.
 */
function CheckItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li className={`flex items-start gap-2.5 leading-normal ${className}`}>
      <span className="flex shrink-0 items-center" style={{ height: "1.5em" }} aria-hidden>
        <Check size={15} strokeWidth={2.5} className="text-brand" />
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}

function LeistungenCard({
  poster, clip, title, lead, points, i,
}: {
  poster: string; clip: string; title: string; lead: string;
  points: string[]; i: number;
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
              className="mb-4 w-full aspect-[16/9]"
            />
            <div className="flex flex-col flex-1">
              <h3 className="text-white text-[22px] 2xl:text-[26px] mb-1">{title}</h3>
              <p className="text-ink-300 text-[14px] 2xl:text-[16px] mb-5">{lead}</p>
              <ul className="space-y-2.5">
                {points.map((p) => (
                  <CheckItem key={p} className="text-ink-200 text-[14px] 2xl:text-[16px]">
                    {p}
                  </CheckItem>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </FadeIn>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function InfoTooltip({ text, onGradient = false }: { text: string; onGradient?: boolean }) {
  const moreLabel = useCopy({ de: "Mehr erfahren", en: "Learn more" });
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [pinned, setPinned] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  function getPos() {
    if (!btnRef.current) return null;
    const rect = btnRef.current.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top };
  }

  function handleEnter() {
    if (!pinned) setPos(getPos());
  }

  function handleLeave() {
    if (!pinned) setPos(null);
  }

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (pinned) {
      setPinned(false);
      setPos(null);
    } else {
      setPinned(true);
      setPos(getPos());
    }
  }

  // Close pinned tooltip when tapping/clicking anywhere else
  useEffect(() => {
    if (!pinned) return;
    function dismiss() {
      setPinned(false);
      setPos(null);
    }
    const id = setTimeout(() => {
      document.addEventListener("pointerdown", dismiss, { once: true });
    }, 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [pinned]);

  return (
    <span className="inline-flex items-center align-middle">
      <button
        ref={btnRef}
        type="button"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        className="ml-0.5 inline-flex items-center justify-center rounded-full select-none shrink-0 transition-all duration-200"
        style={
          onGradient
            ? {
                width: 15,
                height: 15,
                background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.55)",
                color: "#fff",
                fontSize: 9,
                fontWeight: 700,
                lineHeight: 1,
                cursor: "default",
              }
            : {
                width: 15,
                height: 15,
                background: "rgb(var(--blue-400-rgb) / 0.12)",
                border: "1px solid rgb(var(--blue-400-rgb) / 0.28)",
                color: "var(--blue-400)",
                fontSize: 9,
                fontWeight: 700,
                lineHeight: 1,
                cursor: "default",
              }
        }
        aria-label={moreLabel}
      >
        i
      </button>
      {/* Portal: umgeht Stacking-Contexts der Karten, damit der Tooltip über der Navbar liegt */}
      {pos &&
        createPortal(
          <span
            role="tooltip"
            className="z-[9999] w-56 rounded-xl px-3 py-2.5 text-[12px] text-ink-200 leading-relaxed pointer-events-none"
            style={{
              position: "fixed",
              left: pos.x,
              top: pos.y - 8,
              transform: "translateX(-50%) translateY(-100%)",
              background: "rgb(var(--ink-950-rgb) / 0.97)",
              border: "1px solid rgb(var(--blue-400-rgb) / 0.18)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            {text}
          </span>,
          document.body
        )}
    </span>
  );
}

// ─── Webseite-Preiskarte (dunkel, groß) ────────────────────────────────────────
type FeatureGroup = { label: string; points: string[] };

const websiteFeatureGroups: { de: FeatureGroup[]; en: FeatureGroup[] } = {
  de: [
  {
    label: "Design",
    points: [
      "Individuelles Design",
      "Mobil-optimiert & schön auf allen Geräten",
      "Auf deine Marke angepasst",
      "Barrierefrei nach WCAG 2.2 AA",
    ],
  },
  {
    label: "Technik",
    points: [
      "Schnelle Ladezeiten & modernste Technologie",
      "SEO-Optimierung (Meta-Tags, Schema, Sitemap)",
      "DSGVO-konform, SSL, Impressum & Datenschutz",
      "Funktionen auf deine Bedürfnisse zugeschnitten",
    ],
  },
  {
    label: "Deployment",
    points: [
      "Domain-Setup & Hosting",
      "DSGVO-konform eingerichtet & live geschaltet",
      "Fertig auf deiner Wunsch-Domain",
      "Persönlicher Support auch nach dem Launch",
    ],
  },
  ],
  en: [
  {
    label: "Design",
    points: [
      "Custom design",
      "Mobile-optimized & great on every device",
      "Tailored to your brand",
      "Accessible to WCAG 2.2 AA",
    ],
  },
  {
    label: "Tech",
    points: [
      "Fast load times & the latest technology",
      "SEO optimization (meta tags, schema, sitemap)",
      "GDPR-compliant, SSL, legal notice & privacy policy",
      "Features tailored to your needs",
    ],
  },
  {
    label: "Deployment",
    points: [
      "Domain setup & hosting",
      "GDPR-compliant setup & go-live",
      "Ready on the domain of your choice",
      "Personal support after launch too",
    ],
  },
  ],
};

const WEBSITE_CARD_COPY = {
  de: {
    title: "Deine Webseite",
    tagline: "Komplett. Fertig. Persönlich.",
    price: "auf Anfrage",
    priceNote: "Individuelles Angebot nach Erstgespräch & Anforderungsanalyse",
    cta: "Erstgespräch vereinbaren",
  },
  en: {
    title: "Your website",
    tagline: "Complete. Ready. Personal.",
    price: "on request",
    priceNote: "Custom quote after an intro call & requirements analysis",
    cta: "Book an intro call",
  },
};

function WebseitePreisCard({ onContact }: { onContact: () => void }) {
  const t = useCopy(WEBSITE_CARD_COPY);
  const featureGroups = useCopy(websiteFeatureGroups);
  const outerRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    el.style.background = `radial-gradient(520px circle at ${mx}px ${my}px, rgb(var(--blue-400-rgb) / 0.55), rgb(var(--blue-400-rgb) / 0.06) 70%)`;
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(600px circle at ${mx}px ${my}px, rgb(var(--blue-400-rgb) / 0.07), transparent 70%)`;
      spotRef.current.style.opacity = "1";
    }
  }

  function handleLeave() {
    const el = outerRef.current;
    if (!el) return;
    el.style.background = "rgb(var(--blue-400-rgb) / 0.14)";
    if (spotRef.current) spotRef.current.style.opacity = "0";
  }

  return (
    <div
      ref={outerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="h-full rounded-2xl"
      style={{ background: "rgb(var(--blue-400-rgb) / 0.14)", padding: "1px" }}
    >
      <div
        className="relative overflow-hidden flex flex-col h-full rounded-2xl p-7 xl:p-9 2xl:p-11"
        style={{
          background: "linear-gradient(145deg, rgba(12,22,30,0.99) 0%, rgba(7,14,20,1) 100%)",
        }}
      >
        {/* Spotlight overlay */}
        <div
          ref={spotRef}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 0, transition: "opacity 0.3s" }}
        />

        {/* Content */}
        <div className="relative flex flex-col flex-1">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-white text-[26px] xl:text-[30px] 2xl:text-[34px] tracking-tight leading-tight mb-1">
              {t.title}
            </h3>
            <p className="text-ink-300 text-[14px] 2xl:text-[15px]">{t.tagline}</p>
          </div>

          {/* Preis */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span
                className="text-[42px] xl:text-[50px] font-light tracking-tight text-blue-400"
              >
                {t.price}
              </span>
            </div>
            <p className="text-ink-400 text-[12px] mt-0.5">{t.priceNote}</p>
          </div>

          <div className="h-px mb-6" style={{ background: "rgb(var(--blue-400-rgb) / 0.1)" }} />

          {/* Features – gestaffelt nach Design / Technik / Deployment */}
          <div className="space-y-4 mb-6">
            {featureGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[10px] tracking-[0.18em] font-medium text-ink-400 mb-2">
                  {group.label}
                </p>
                <ul className="space-y-2">
                  {group.points.map((p) => (
                    <CheckItem key={p} className="text-ink-200 text-[13px] xl:text-[14px]">
                      {p}
                    </CheckItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <PrimaryButton
              onClick={onContact}
              className="w-full justify-center !rounded-xl py-3.5 text-[14px] xl:text-[15px] font-semibold"
            >
              {t.cta}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hosting-Karte ─────────────────────────────────────────────────────────────
const HOSTING_COPY = {
  de: {
    title: "Hosting & Domain",
    body: "Wir kümmern uns um alles – Hosting, Domain-Beschaffung und Einrichtung. Du musst dich um nichts kümmern.",
    existing: "Hosting bei vorhandener Domain",
    perMonth: "5 €/Monat",
    newDomain: "Domain-Beschaffung & Einrichtung",
    domainFees: "+ Domainkosten je nach Wunschdomain",
    setupFee: "+ 60 € Einrichtung (einmalig)",
  },
  en: {
    title: "Hosting & domain",
    body: "We take care of everything – hosting, getting your domain and setting it all up. You don't have to worry about a thing.",
    existing: "Hosting for your existing domain",
    perMonth: "€5/month",
    newDomain: "Domain registration & setup",
    domainFees: "+ domain fees depending on your domain",
    setupFee: "+ €60 one-time setup",
  },
};

function HostingCard() {
  const t = useCopy(HOSTING_COPY);
  return (
    <Card>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ background: "rgb(var(--blue-400-rgb) / 0.1)", border: "1px solid rgb(var(--blue-400-rgb) / 0.18)" }}
          >
            <Server size={16} style={{ color: "var(--blue-400)" }} />
          </div>
          <h3 className="text-white text-[17px] xl:text-[19px] 2xl:text-[21px] font-medium">{t.title}</h3>
        </div>
        <p className="text-ink-300 text-[13px] 2xl:text-[14px] leading-relaxed mb-5">
          {t.body}
        </p>
        <div className="space-y-2">
          {/* Hosting bei vorhandener Domain */}
          <div
            className="flex items-center justify-between rounded-lg px-3 py-2"
            style={{ background: "rgb(var(--blue-400-rgb) / 0.05)", border: "1px solid rgb(var(--blue-400-rgb) / 0.1)" }}
          >
            <span className="text-ink-200 text-[12px]">{t.existing}</span>
            <span className="text-[12px] font-semibold ml-3 shrink-0 text-blue-400">
              {t.perMonth}
            </span>
          </div>
          {/* Domain-Beschaffung & Einrichtung */}
          <div
            className="rounded-lg px-3 py-2.5"
            style={{ background: "rgb(var(--blue-400-rgb) / 0.05)", border: "1px solid rgb(var(--blue-400-rgb) / 0.1)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-ink-200 text-[12px]">{t.newDomain}</span>
              <div className="text-right shrink-0">
                <p className="text-[12px] font-semibold text-blue-400">{t.perMonth}</p>
                <p className="text-[11px] font-medium mt-0.5 text-blue-400">{t.domainFees}</p>
                <p className="text-[11px] font-medium mt-0.5 text-blue-400">{t.setupFee}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Wartung-Karte ─────────────────────────────────────────────────────────────
const EN_TIP_UPDATE =
  "We'll update or tweak text, images or small bits of content on your website whenever you ask.";
const EN_TIP_ADDITION =
  "We add a brand-new section or element to your website – like a new subpage, a new form or a gallery.";

type WartungTier = {
  name: string;
  price: string;
  features: { label: React.ReactNode }[];
};

const wartungTiers: { de: WartungTier[]; en: WartungTier[] } = {
  de: [
  {
    name: "Basis",
    price: "15 €/Monat",
    features: [
      { label: "Überwachung" },
      { label: "Meldung von Problemen" },
      { label: "Beratung bei Problemen" },
      { label: "Sicherheits- & Datenschutzupdates" },
      { label: "Technische Instandhaltung" },
      { label: "WCAG-Konformitätsinstandhaltung" },
    ],
  },
  {
    name: "Erweitert",
    price: "50 €/Monat",
    features: [
      { label: "Alles aus Basis" },
      {
        label: (
          <>
            2 Inhaltsanpassungen<InfoTooltip text="Texte, Bilder oder kleine Inhalte auf deiner Webseite werden auf Wunsch aktualisiert oder angepasst." /> pro Monat
          </>
        ),
      },
    ],
  },
  {
    name: "Erweitert+",
    price: "200 €/Monat",
    features: [
      { label: "Alles aus Basis" },
      {
        label: (
          <>
            4 Inhaltsanpassungen<InfoTooltip text="Texte, Bilder oder kleine Inhalte auf deiner Webseite werden auf Wunsch aktualisiert oder angepasst." /> pro Monat
          </>
        ),
      },
      {
        label: (
          <>
            1 Inhaltserweiterung<InfoTooltip text="Eine komplett neue Sektion oder ein neues Element wird deiner Webseite hinzugefügt – z. B. eine neue Unterseite, ein neues Formular oder ein Galerie-Bereich." /> pro Monat
          </>
        ),
      },
    ],
  },
  ],
  en: [
  {
    name: "Basic",
    price: "€15/month",
    features: [
      { label: "Monitoring" },
      { label: "Alerts when something's wrong" },
      { label: "Advice when problems come up" },
      { label: "Security & privacy updates" },
      { label: "Technical upkeep" },
      { label: "Ongoing WCAG compliance" },
    ],
  },
  {
    name: "Extended",
    price: "€50/month",
    features: [
      { label: "Everything in Basic" },
      {
        label: (
          <>
            2 content updates<InfoTooltip text={EN_TIP_UPDATE} /> per month
          </>
        ),
      },
    ],
  },
  {
    name: "Extended+",
    price: "€200/month",
    features: [
      { label: "Everything in Basic" },
      {
        label: (
          <>
            4 content updates<InfoTooltip text={EN_TIP_UPDATE} /> per month
          </>
        ),
      },
      {
        label: (
          <>
            1 content addition<InfoTooltip text={EN_TIP_ADDITION} /> per month
          </>
        ),
      },
    ],
  },
  ],
};

const wartungCmsTiers: { de: WartungTier[]; en: WartungTier[] } = {
  de: [
  {
    name: "Basis CMS",
    price: "25 €/Monat",
    features: [
      { label: "Auf dich zugeschnittenes CMS" },
      { label: "CMS-Instandhaltung" },
      { label: "Sicherheits- & Datenschutzupdates" },
      { label: "Überwachung" },
      { label: "Meldung von Problemen" },
      { label: "Beratung bei Problemen" },
      { label: "Technische Instandhaltung" },
    ],
  },
  {
    name: "Erweitert CMS",
    price: "135 €/Monat",
    features: [
      { label: "Alles aus Basis CMS" },
      {
        label: (
          <>
            1 Inhaltserweiterung<InfoTooltip text="Eine komplett neue Sektion oder ein neues Element wird deiner Webseite hinzugefügt – z. B. eine neue Unterseite, ein neues Formular oder ein Galerie-Bereich." /> pro Monat
          </>
        ),
      },
    ],
  },
  ],
  en: [
  {
    name: "Basic CMS",
    price: "€25/month",
    features: [
      { label: "A CMS built around you" },
      { label: "CMS upkeep" },
      { label: "Security & privacy updates" },
      { label: "Monitoring" },
      { label: "Alerts when something's wrong" },
      { label: "Advice when problems come up" },
      { label: "Technical upkeep" },
    ],
  },
  {
    name: "Extended CMS",
    price: "€135/month",
    features: [
      { label: "Everything in Basic CMS" },
      {
        label: (
          <>
            1 content addition<InfoTooltip text={EN_TIP_ADDITION} /> per month
          </>
        ),
      },
    ],
  },
  ],
};

const WARTUNG_COPY = {
  de: {
    title: "Wartung",
    body: "Damit deine Webseite dauerhaft sicher und aktuell bleibt. Wähle klassische Wartung oder die CMS-Option, bei der du Inhalte selbst bearbeitest.",
    tabStandard: "Standard",
    tipStandard: "Wir kümmern uns um alle Änderungen für dich – du schickst uns, was aktualisiert werden soll, und wir setzen es um.",
    tabCms: "Mit CMS",
    tipCms: "Mit CMS kannst du Texte, Bilder und Inhalte selbst bearbeiten – ohne Programmierkenntnisse. Der Preis beinhaltet Hosting, CMS-Updates und technische Wartung.",
  },
  en: {
    title: "Maintenance",
    body: "Keeps your website secure and up to date for the long haul. Choose classic maintenance or the CMS option, where you edit content yourself.",
    tabStandard: "Standard",
    tipStandard: "We handle every change for you – just send us what needs updating and we'll take care of it.",
    tabCms: "With CMS",
    tipCms: "With a CMS, you can edit text, images and content yourself – no coding skills needed. The price includes hosting, CMS updates and technical maintenance.",
  },
};


function WartungTabBtn({
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
      className="relative flex-1 rounded-lg px-3 py-2 text-[12px] font-medium tracking-wide cursor-pointer transition-colors duration-200 inline-flex items-center justify-center gap-1"
      style={{ color: active ? "#fff" : "var(--ink-400)" }}
    >
      {active && (
        <motion.div
          layoutId="wartung-tab-pill"
          className="absolute inset-0 rounded-lg"
          style={{ background: "var(--gradient-cta)" }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-1">{children}</span>
    </button>
  );
}

function WartungCard() {
  const t = useCopy(WARTUNG_COPY);
  const tiers = useCopy(wartungTiers);
  const cmsTiers = useCopy(wartungCmsTiers);
  const [tab, setTab] = useState<"ohneCMS" | "mitCMS">("ohneCMS");

  function switchTab(next: "ohneCMS" | "mitCMS") {
    if (next === tab) return;
    setTab(next);
  }

  return (
    <Card>
      <div className="flex items-center gap-2 mb-5">
        <div
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: "rgb(var(--blue-400-rgb) / 0.1)", border: "1px solid rgb(var(--blue-400-rgb) / 0.18)" }}
        >
          <Wrench size={16} style={{ color: "var(--blue-400)" }} />
        </div>
        <h3 className="text-white text-[17px] xl:text-[19px] 2xl:text-[21px] font-medium">{t.title}</h3>
      </div>
      <p className="text-ink-300 text-[13px] 2xl:text-[14px] leading-relaxed mb-4">
        {t.body}
      </p>

      {/* Toggle — identisch mit Kontakt-Form */}
      <div
        className="flex mb-5 p-1 rounded-xl gap-1"
        style={{
          background: "rgb(var(--ink-950-rgb) / 0.7)",
          border: "1px solid rgb(var(--blue-400-rgb) / 0.12)",
        }}
      >
        <WartungTabBtn active={tab === "ohneCMS"} onClick={() => switchTab("ohneCMS")}>
          {t.tabStandard}
          <InfoTooltip
            text={t.tipStandard}
            onGradient={tab === "ohneCMS"}
          />
        </WartungTabBtn>
        <WartungTabBtn active={tab === "mitCMS"} onClick={() => switchTab("mitCMS")}>
          {t.tabCms}
          <InfoTooltip
            text={t.tipCms}
            onGradient={tab === "mitCMS"}
          />
        </WartungTabBtn>
      </div>

      {/* Tier panels — beide immer gerendert, übereinander gestapelt via CSS Grid */}
      <div className="overflow-hidden" style={{ display: "grid" }}>
        <motion.div
          style={{ gridRow: 1, gridColumn: 1, pointerEvents: tab === "ohneCMS" ? "auto" : "none" }}
          animate={{ opacity: tab === "ohneCMS" ? 1 : 0, x: tab === "ohneCMS" ? 0 : -32 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-0 divide-y" style={{ borderColor: "rgb(var(--blue-400-rgb) / 0.07)" }}>
            {tiers.map((tier) => (
              <div key={tier.name} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[15px] xl:text-[16px] font-semibold text-white">{tier.name}</span>
                  <span className="text-[13px] font-semibold text-blue-400">{tier.price}</span>
                </div>
                <ul className="space-y-1.5">
                  {tier.features.map((f, idx) => (
                    <CheckItem key={idx} className="text-ink-300 text-[12px] xl:text-[13px]">
                      {f.label}
                    </CheckItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          style={{ gridRow: 1, gridColumn: 1, pointerEvents: tab === "mitCMS" ? "auto" : "none" }}
          animate={{ opacity: tab === "mitCMS" ? 1 : 0, x: tab === "mitCMS" ? 0 : 32 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-0 divide-y" style={{ borderColor: "rgb(var(--blue-400-rgb) / 0.07)" }}>
            {cmsTiers.map((tier) => (
              <div key={tier.name} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[15px] xl:text-[16px] font-semibold text-white">{tier.name}</span>
                  <span className="text-[13px] font-semibold text-blue-400">{tier.price}</span>
                </div>
                <ul className="space-y-1.5">
                  {tier.features.map((f, idx) => (
                    <CheckItem key={idx} className="text-ink-300 text-[12px] xl:text-[13px]">
                      {f.label}
                    </CheckItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Card>
  );
}

// ─── Konzept: individuell statt Baukasten ──────────────────────────────────────
const STACK = ["Astro", "Next.js", "React", "TypeScript", "Tailwind CSS", "Headless CMS"];

/** Zusatzleistungen mit passendem Icon („Du brauchst noch etwas anderes?“). */
type Extra = { label: string; Icon: LucideIcon };

const EXTRAS: { de: Extra[]; en: Extra[] } = {
  de: [
  { label: "Corporate Design (Logo, Markenfarben, Schriften)", Icon: Palette },
  { label: "Google Analytics Tracking", Icon: ChartLine },
  { label: "Content Management System", Icon: FilePen },
  { label: "Admin Panel", Icon: LayoutDashboard },
  { label: "Bewerbungsportal", Icon: BriefcaseBusiness },
  { label: "Mehrsprachigkeit", Icon: Languages },
  { label: "Online-Shop", Icon: ShoppingCart },
  { label: "Buchungssystem", Icon: CalendarCheck },
  { label: "Newsletter-Integration", Icon: Newspaper },
  { label: "Videoproduktion", Icon: Clapperboard },
  { label: "Fotoproduktion", Icon: Camera },
  { label: "SEA (Google Ads)", Icon: Megaphone },
  ],
  en: [
  { label: "Corporate design (logo, brand colors, fonts)", Icon: Palette },
  { label: "Google Analytics tracking", Icon: ChartLine },
  { label: "Content management system", Icon: FilePen },
  { label: "Admin panel", Icon: LayoutDashboard },
  { label: "Job application portal", Icon: BriefcaseBusiness },
  { label: "Multilingual sites", Icon: Languages },
  { label: "Online store", Icon: ShoppingCart },
  { label: "Booking system", Icon: CalendarCheck },
  { label: "Newsletter integration", Icon: Newspaper },
  { label: "Video production", Icon: Clapperboard },
  { label: "Photo production", Icon: Camera },
  { label: "SEA (Google Ads)", Icon: Megaphone },
  ],
};

type VergleichRow = { topic: string; ours: string; wp: string; wpGood?: boolean };

const VERGLEICH: { de: VergleichRow[]; en: VergleichRow[] } = {
  de: [
  {
    topic: "Ladezeit",
    ours: "Fertige Seiten, die sofort ausgeliefert werden – ohne Datenbankabfrage bei jedem Aufruf.",
    wp: "Viel ungenutzter Code aus Vorlagen und Erweiterungen wird bei jedem Besuch mitgeladen.",
  },
  {
    topic: "Sicherheit",
    ours: "Keine Plugins, kein öffentlicher Admin-Login – kaum Angriffsfläche.",
    wp: "Plugins, Erweiterungen und Login-Seiten sind häufige Einfallstore für Angriffe.",
  },
  {
    topic: "Wartung",
    ours: "Kein ständiges Update-Karussell. Was einmal läuft, läuft.",
    wp: "Erweiterungen und Vorlagen brauchen laufend Updates – oder du bist an Plattform und Abo gebunden.",
  },
  {
    topic: "Design",
    ours: "Jedes Detail frei gestaltet, genau passend zu deiner Marke.",
    wp: "Die Vorlage gibt Raster und Grenzen vor, individuelle Wünsche gehen oft nur über Umwege.",
  },
  {
    topic: "Google",
    ours: "Schlanker Code und sehr gute Core Web Vitals – eine starke Basis für SEO.",
    wp: "Überladene Vorlagen und Page-Builder können die Seite bremsen – und damit das Ranking.",
  },
  {
    topic: "Inhalte pflegen",
    ours: "Auf Wunsch mit maßgeschneidertem CMS – nur die Felder, die du wirklich brauchst.",
    wp: "Einfach zu bedienen. Das ist die echte Stärke von Baukästen.",
    wpGood: true,
  },
  ],
  en: [
  {
    topic: "Load time",
    ours: "Prebuilt pages that are served instantly – with no database query on every visit.",
    wp: "Lots of unused code from templates and plugins gets loaded on every visit.",
  },
  {
    topic: "Security",
    ours: "Without plugins or a public admin login, there's barely anything to attack.",
    wp: "Plugins, extensions and login pages are common entry points for attacks.",
  },
  {
    topic: "Maintenance",
    ours: "No endless cycle of updates. Once it runs, it keeps running.",
    wp: "Plugins and templates need constant updates – or you're locked into a platform and subscription.",
  },
  {
    topic: "Design",
    ours: "Every detail designed freely to fit your brand exactly.",
    wp: "The template sets the grid and the limits. Custom requests often take workarounds.",
  },
  {
    topic: "Google",
    ours: "Lean code and excellent Core Web Vitals – a strong foundation for SEO.",
    wp: "Bloated templates and page builders can slow your site down – and your ranking with it.",
  },
  {
    topic: "Editing content",
    ours: "A custom CMS if you want one – with only the fields you actually need.",
    wp: "Easy to use. That's where site builders really shine.",
    wpGood: true,
  },
  ],
};

const KONZEPT_COPY = {
  de: {
    titleA: "Handgebaut",
    titleB: "statt Baukasten.",
    body: "Wir nutzen keine fertige Vorlage aus dem Baukasten, sondern programmieren jede Webseite individuell – mit Astro oder Next.js. Das Ergebnis: schneller, sicherer und genau so, wie du es dir vorstellst.",
    stackLabel: "Unsere Technologien",
    colBuilder: "Baukastensysteme",
  },
  en: {
    titleA: "Hand-built",
    titleB: "instead of a site builder.",
    body: "Instead of a ready-made site builder template, we code every website from scratch with Astro or Next.js. The result: faster, more secure and exactly how you picture it.",
    stackLabel: "Our tech stack",
    colBuilder: "Site builders",
  },
};

function KonzeptSection() {
  const t = useCopy(KONZEPT_COPY);
  const rows = useCopy(VERGLEICH);
  return (
    <section aria-labelledby="konzept-heading" className="mt-24 2xl:mt-32">
      <div className="grid gap-12 lg:gap-16 2xl:gap-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start">
        <FadeIn className="lg:sticky lg:top-32">
          <h2
            id="konzept-heading"
            className="text-white text-[clamp(26px,4vw,52px)] tracking-tight leading-[1.08] text-balance"
          >
            {t.titleA}{" "}
            <span
              className="text-blue-400"
            >
              {t.titleB}
            </span>
          </h2>
          <p className="mt-5 text-ink-300 text-[15px] xl:text-[16px] 2xl:text-[18px] leading-relaxed max-w-md 2xl:max-w-lg">
            {t.body}
          </p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label={t.stackLabel}>
            {STACK.map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center gap-2 rounded-full border border-blue-400/[0.18] bg-blue-400/[0.07] py-1 pl-2.5 pr-3.5 text-[12px] xl:text-[13px] 2xl:text-[14px] text-brand-light"
              >
                {hasTechIcon(tech) ? (
                  <TechIcon name={tech} className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                ) : (
                  <Blocks size={14} strokeWidth={1.75} aria-hidden className="shrink-0 text-blue-400" />
                )}
                {tech}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgb(var(--ink-900-rgb) / 0.97) 0%, rgb(var(--ink-950-rgb) / 0.99) 100%)",
              border: "1px solid rgb(var(--blue-400-rgb) / 0.1)",
            }}
          >
            {/* Spaltenköpfe – ab sm, mobil trägt jede Zeile ihre eigenen Labels */}
            <div
              aria-hidden
              className="hidden sm:grid grid-cols-[120px_1fr_1fr] xl:grid-cols-[140px_1fr_1fr] gap-6 px-6 xl:px-8 pt-6 xl:pt-7 pb-4 text-[11px] xl:text-[12px] tracking-[0.18em] font-medium"
              style={{ borderBottom: "1px solid rgb(var(--blue-400-rgb) / 0.1)" }}
            >
              <span />
              <span className="text-brand">Astro / Next.js</span>
              <span className="text-ink-400">{t.colBuilder}</span>
            </div>

            <ul>
              {rows.map((row) => (
                <li
                  key={row.topic}
                  className="grid gap-3 sm:gap-6 sm:grid-cols-[120px_1fr_1fr] xl:grid-cols-[140px_1fr_1fr] px-6 xl:px-8 py-5 xl:py-6 border-t first:border-t-0"
                  style={{ borderColor: "rgb(var(--blue-400-rgb) / 0.07)" }}
                >
                  <h3 className="text-white text-[15px] xl:text-[16px] 2xl:text-[17px] font-medium leading-normal">
                    {row.topic}
                  </h3>
                  <p className="flex items-start gap-2.5 text-ink-100 text-[14px] 2xl:text-[15px] leading-normal">
                    <span className="flex shrink-0 items-center" style={{ height: "1.5em" }} aria-hidden>
                      <Check size={15} strokeWidth={2.5} className="text-brand" />
                    </span>
                    <span>
                      <span className="sm:sr-only text-brand text-[11px] tracking-[0.14em] block mb-0.5">
                        Astro / Next.js
                      </span>
                      {row.ours}
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5 text-ink-300 text-[14px] 2xl:text-[15px] leading-normal">
                    <span className="flex shrink-0 items-center" style={{ height: "1.5em" }} aria-hidden>
                      {row.wpGood ? (
                        <Check size={15} strokeWidth={2.5} className="text-ink-300" />
                      ) : (
                        <Minus size={15} strokeWidth={2.5} className="text-ink-400" />
                      )}
                    </span>
                    <span>
                      <span className="sm:sr-only text-ink-400 text-[11px] tracking-[0.14em] block mb-0.5">
                        {t.colBuilder}
                      </span>
                      {row.wp}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Preise Section ─────────────────────────────────────────────────────────────
const PREISE_COPY = {
  de: {
    titleA: "Transparent.",
    titleB: "Fair.",
    titleC: "Klar.",
    body: "Kein verstecktes Kleingedrucktes – du weißt von Anfang an, was du bekommst und was es kostet.",
  },
  en: {
    titleA: "Transparent.",
    titleB: "Fair.",
    titleC: "Clear.",
    body: "No hidden fine print – you know from day one what you're getting and what it costs.",
  },
};

function PreiseSection({ onContact }: { onContact: () => void }) {
  const t = useCopy(PREISE_COPY);
  return (
    <section className="mt-24 2xl:mt-32">
      <FadeIn>
        <h2 className="text-white text-[clamp(26px,4vw,52px)] tracking-tight leading-tight max-w-2xl 2xl:max-w-3xl mb-3">
          {t.titleA}{" "}
          <span
            className="text-blue-400"
          >
            {t.titleB}
          </span>{" "}
          {t.titleC}
        </h2>
        <p className="text-ink-300 text-[15px] xl:text-[16px] 2xl:text-[17px] leading-relaxed max-w-xl 2xl:max-w-2xl">
          {t.body}
        </p>
      </FadeIn>

      <div className="mt-10 2xl:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 2xl:gap-8 items-start">
        {/* Webseite Card (links, groß) */}
        <FadeIn delay={0} className="h-full">
          <WebseitePreisCard onContact={onContact} />
        </FadeIn>

        {/* Rechte Spalte: Hosting + Wartung */}
        <div className="flex flex-col gap-6 2xl:gap-8">
          <FadeIn delay={0.08}>
            <HostingCard />
          </FadeIn>
          <FadeIn delay={0.16}>
            <WartungCard />
          </FadeIn>
        </div>
      </div>

    </section>
  );
}

const PAGE_COPY = {
  de: {
    metaTitle: "Leistungen – Webdesign, Entwicklung & Hosting | G&A Webdesign",
    metaDescription: "Individuelle Webseiten mit Astro oder Next.js statt Baukasten: schnelle Ladezeiten, sicher und wartungsarm. Dazu Corporate Design, Hosting & SEO aus einer Hand.",
    h1Accent: "Deine Webseite",
    h1Rest: "– fertig, ohne Stress.",
    intro: "Du bekommst alles aus einer Hand: von der Gestaltung über die technische Umsetzung bis hin zur Veröffentlichung. Wir kümmern uns um den gesamten Ablauf für dich.",
    extrasTitle: "Du brauchst noch etwas anderes?",
    extrasBody: "Kein Problem – sag uns, was du brauchst, und wir finden gemeinsam eine Lösung.",
    extrasLabel: "Weitere Leistungen",
    extrasMore: "vieles mehr",
    ctaTitle: "Wie läuft die Zusammenarbeit ab?",
    ctaBody: "Von der ersten Anfrage bis zur fertigen Webseite – in 7 transparenten Schritten.",
    ctaButton: "Ablauf ansehen",
  },
  en: {
    metaTitle: "Services – Web Design, Development & Hosting | G&A Webdesign",
    metaDescription: "Custom websites built with Astro or Next.js instead of a site builder: fast load times, secure and low-maintenance. Plus corporate design, hosting & SEO, all from one team.",
    h1Accent: "Your website",
    h1Rest: "– done, without the stress.",
    intro: "You get everything from one team: from design and development all the way to launch. We handle the whole process for you.",
    extrasTitle: "Need something else?",
    extrasBody: "No problem – tell us what you need and we'll figure it out together.",
    extrasLabel: "More services",
    extrasMore: "and much more",
    ctaTitle: "What's it like to work with us?",
    ctaBody: "From your first inquiry to a finished website – in 7 transparent steps.",
    ctaButton: "See the process",
  },
};

export function Leistungen() {
  const t = useCopy(PAGE_COPY);
  const extras = useCopy(EXTRAS);
  const serviceBlocks = useCopy(blocks);
  const lp = useLocalePath();
  usePageMeta({
    title: t.metaTitle,
    description: t.metaDescription,
  });
  const navigate = useNavigate();
  return (
    <main id="main-content" className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-12 xl:pb-20 2xl:pb-28">
      <FadeIn>
        <h1 className="text-white text-[clamp(36px,6vw,84px)] tracking-tight leading-[1.05] max-w-4xl 2xl:max-w-5xl">
          <span
            className="text-blue-400"
          >
            {t.h1Accent}
          </span>{" "}
          {t.h1Rest}
        </h1>
        <p className="mt-6 max-w-2xl 2xl:max-w-3xl text-[16px] xl:text-[18px] 2xl:text-[20px] text-ink-300 leading-relaxed">
          {t.intro}</p>
      </FadeIn>

      {/* Service cards */}
      <div className="mt-16 2xl:mt-20 grid gap-6 2xl:gap-8 md:grid-cols-3 items-stretch">
        {serviceBlocks.map(({ poster, clip, title, lead, points }, i) => (
          <LeistungenCard key={title} poster={poster} clip={clip} title={title} lead={lead} points={points} i={i} />
        ))}
      </div>

      {/* Konzept: warum individuell statt Baukasten */}
      <KonzeptSection />

      {/* Extra services */}
      <FadeIn>
        <div className="mt-24 2xl:mt-32">
          <h2 className="text-white text-[clamp(22px,3vw,40px)] tracking-tight max-w-xl 2xl:max-w-2xl mb-3">
            {t.extrasTitle}
          </h2>
          <p className="text-ink-300 text-[15px] 2xl:text-[17px] leading-relaxed max-w-xl 2xl:max-w-2xl mb-7">
            {t.extrasBody}
          </p>
          <ul className="flex flex-wrap gap-2.5" aria-label={t.extrasLabel}>
            {extras.map(({ label, Icon }) => (
              <li
                key={label}
                className="tag-pill inline-flex items-center gap-2 rounded-full border border-blue-400/[0.18] bg-blue-400/[0.07] py-1.5 pl-3 pr-4 xl:pr-5 2xl:py-2 2xl:pl-4 2xl:pr-6 text-[13px] 2xl:text-[15px] text-brand-light"
              >
                <Icon size={15} strokeWidth={1.75} aria-hidden className="shrink-0 text-blue-400" />
                {label}
              </li>
            ))}
            <li className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] py-1.5 pl-3 pr-4 text-[13px] text-ink-400">
              <Plus size={15} strokeWidth={1.75} aria-hidden className="shrink-0" />
              {t.extrasMore}
            </li>
          </ul>
        </div>
      </FadeIn>

      {/* Preise */}
      <PreiseSection onContact={() => navigate(lp("/kontakt"))} />

      {/* FAQ */}
      <FAQSection />

      {/* CTA → Ablauf */}
      <FadeIn>
        <div className="mt-16 2xl:mt-24 text-center">
          <h2 className="text-white text-[28px] xl:text-[34px] 2xl:text-[42px] mb-3">
            {t.ctaTitle}
          </h2>
          <p className="text-ink-300 text-[15px] xl:text-[16px] 2xl:text-[18px] mb-8 max-w-xl 2xl:max-w-2xl mx-auto">
            {t.ctaBody}
          </p>
          <PrimaryButton onClick={() => navigate(lp("/ablauf"))}>
            {t.ctaButton}
          </PrimaryButton>
        </div>
      </FadeIn>
    </main>
  );
}