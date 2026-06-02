import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { PrimaryButton } from "../Button";
import { FadeIn } from "../FadeIn";
import { Palette, Code2, Rocket, CheckCircle2, Check, Server, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ServiceCardBg, type BgKey } from "../ServiceCardBg";
import { FAQSection } from "../FAQSection";

const blocks: { Icon: React.ElementType; title: string; lead: string; points: string[]; bgKey: BgKey }[] = [
  {
    Icon: Palette,
    bgKey: "design",
    title: "Design",
    lead: "So, wie du dir das vorstellst.",
    points: [
      "Individuelles Design ",
      "Gut bedienbar & schön auf allen Geräten",
      "Auf deine Marke angepasst",
      "Barrierefrei nach WCAG 2.2 AA",
    ],
  },
  {
    Icon: Code2,
    bgKey: "code",
    title: "Entwicklung",
    lead: "Schnell, stabil & zukunftssicher.",
    points: [
      "Modernste Technik im Hintergrund",
      "Schnelle Ladezeiten",
      "Gut bei Google auffindbar (SEO)",
      "Funktionen, auf deine Bedürfnisse angepasst",
    ],
  },
  {
    Icon: Rocket,
    bgKey: "rocket",
    title: "Deployment",
    lead: "Du musst dich um nichts kümmern.",
    points: [
      "Domain-Setup & Hosting",
      "DSGVO-konform eingerichtet",
      "Fertig live auf deiner Wunsch-Domain",
      "Wir sind auch nach dem Launch da",
    ],
  },
];

function LeistungenCard({
  Icon, title, lead, points, bgKey, i,
}: {
  Icon: React.ElementType; title: string; lead: string;
  points: string[]; bgKey: BgKey; i: number;
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
            <ServiceCardBg bgKey={bgKey} hovered={hovered} />
            <div className="relative z-10 flex flex-col h-full">
              <div
                className="mb-5 inline-flex h-12 w-12 2xl:h-16 2xl:w-16 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, rgba(0,105,153,0.25) 0%, rgba(77,190,243,0.12) 100%)", border: "1px solid rgba(77,190,243,0.20)" }}
              >
                <Icon size={22} className="text-sky-400 2xl:!h-7 2xl:!w-7" />
              </div>
              <h3 className="text-white text-[22px] 2xl:text-[26px] mb-1">{title}</h3>
              <p className="text-slate-400 text-[14px] 2xl:text-[16px] mb-5">{lead}</p>
              <ul className="space-y-2.5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-slate-300 text-[14px] 2xl:text-[16px]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sky-400" />
                    <span>{p}</span>
                  </li>
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
                background: "rgba(77,190,243,0.12)",
                border: "1px solid rgba(77,190,243,0.28)",
                color: "#4dbef3",
                fontSize: 9,
                fontWeight: 700,
                lineHeight: 1,
                cursor: "default",
              }
        }
        aria-label="Mehr erfahren"
      >
        i
      </button>
      {pos && (
        <span
          className="z-[9999] w-56 rounded-xl px-3 py-2.5 text-[12px] text-slate-300 leading-relaxed pointer-events-none"
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y - 8,
            transform: "translateX(-50%) translateY(-100%)",
            background: "rgba(8,16,22,0.97)",
            border: "1px solid rgba(77,190,243,0.18)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}

// ─── Webseite-Preiskarte (dunkel, groß) ────────────────────────────────────────
const websiteFeatureGroups: { label: string; points: string[] }[] = [
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
];

function WebseitePreisCard({ onContact }: { onContact: () => void }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    el.style.background = `radial-gradient(520px circle at ${mx}px ${my}px, rgba(77,190,243,0.55), rgba(77,190,243,0.06) 70%)`;
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(600px circle at ${mx}px ${my}px, rgba(77,190,243,0.07), transparent 70%)`;
      spotRef.current.style.opacity = "1";
    }
  }

  function handleLeave() {
    const el = outerRef.current;
    if (!el) return;
    el.style.background = "rgba(77,190,243,0.14)";
    if (spotRef.current) spotRef.current.style.opacity = "0";
  }

  return (
    <div
      ref={outerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="h-full rounded-2xl"
      style={{ background: "rgba(77,190,243,0.14)", padding: "1px" }}
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
              Deine Webseite
            </h3>
            <p className="text-slate-400 text-[14px] 2xl:text-[15px]">Komplett. Fertig. Persönlich.</p>
          </div>

          {/* Preis */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span
                className="text-[42px] xl:text-[50px] font-light tracking-tight"
                style={{ color: "#4dbef3" }}
              >
                auf Anfrage
              </span>
            </div>
            <p className="text-slate-500 text-[12px] mt-0.5">Individuelles Angebot nach Erstgespräch & Anforderungsanalyse</p>
          </div>

          <div className="h-px mb-6" style={{ background: "rgba(77,190,243,0.1)" }} />

          {/* Features – gestaffelt nach Design / Technik / Deployment */}
          <div className="space-y-4 mb-6">
            {websiteFeatureGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[10px] tracking-[0.18em] uppercase font-medium text-slate-500 mb-2">
                  {group.label}
                </p>
                <ul className="space-y-2">
                  {group.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: "#4dbef3" }} />
                      <span className="text-slate-300 text-[13px] xl:text-[14px] leading-snug">{p}</span>
                    </li>
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
              Erstgespräch vereinbaren
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hosting-Karte ─────────────────────────────────────────────────────────────
function HostingCard() {
  return (
    <Card>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ background: "rgba(77,190,243,0.1)", border: "1px solid rgba(77,190,243,0.18)" }}
          >
            <Server size={16} style={{ color: "#4dbef3" }} />
          </div>
          <h3 className="text-white text-[17px] xl:text-[19px] 2xl:text-[21px] font-medium">Hosting & Domain</h3>
        </div>
        <p className="text-slate-400 text-[13px] 2xl:text-[14px] leading-relaxed mb-5">
          Wir kümmern uns um alles – Hosting, Domain-Beschaffung und Einrichtung. Du musst dich um nichts kümmern.
        </p>
        <div className="space-y-2">
          {/* Hosting bei vorhandener Domain */}
          <div
            className="flex items-center justify-between rounded-lg px-3 py-2"
            style={{ background: "rgba(77,190,243,0.05)", border: "1px solid rgba(77,190,243,0.1)" }}
          >
            <span className="text-slate-300 text-[12px]">Hosting bei vorhandener Domain</span>
            <span className="text-[12px] font-semibold ml-3 shrink-0" style={{ color: "#4dbef3" }}>
              5 €/Monat
            </span>
          </div>
          {/* Domain-Beschaffung & Einrichtung */}
          <div
            className="rounded-lg px-3 py-2.5"
            style={{ background: "rgba(77,190,243,0.05)", border: "1px solid rgba(77,190,243,0.1)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-slate-300 text-[12px]">Domain-Beschaffung & Einrichtung</span>
              <div className="text-right shrink-0">
                <p className="text-[12px] font-semibold" style={{ color: "#4dbef3" }}>5 €/Monat</p>
                <p className="text-[11px] font-medium mt-0.5" style={{ color: "#4dbef3" }}>+ Domainkosten je nach Wunschdomain</p>
                <p className="text-[11px] font-medium mt-0.5" style={{ color: "#4dbef3" }}>+ 60 € Einrichtung (einmalig)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Wartung-Karte ─────────────────────────────────────────────────────────────
const wartungTiers: {
  name: string;
  price: string;
  features: { label: React.ReactNode }[];
}[] = [
  {
    name: "Basis",
    price: "15 €/Monat",
    features: [
      { label: "Überwachung" },
      { label: "Meldung von Problemen" },
      { label: "Beratung bei Problemen" },
      { label: "Sicherheitsupdates" },
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
            1 Inhaltsanpassung<InfoTooltip text="Texte, Bilder oder kleine Inhalte auf deiner Webseite werden auf Wunsch aktualisiert oder angepasst." /> pro Monat
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
            2 Inhaltsanpassungen<InfoTooltip text="Texte, Bilder oder kleine Inhalte auf deiner Webseite werden auf Wunsch aktualisiert oder angepasst." /> pro Monat
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
];

const wartungCmsTiers: {
  name: string;
  price: string;
  features: { label: React.ReactNode }[];
}[] = [
  {
    name: "Nur CMS",
    price: "20 €/Monat",
    features: [
      { label: "Auf dich zugeschnittenes CMS" },
    ],
  },
  {
    name: "Basis",
    price: "40 €/Monat",
    features: [
      { label: "Auf dich zugeschnittenes CMS" },
      { label: "CMS-Instandhaltung" },
      { label: "Sicherheitsupdates" },
      { label: "Überwachung" },
      { label: "Meldung von Problemen" },
      { label: "Beratung bei Problemen" },
      { label: "Technische Instandhaltung" },
    ],
  },
  {
    name: "Erweitert",
    price: "150 €/Monat",
    features: [
      { label: "Alles aus Basis" },
      { label: "Inhalte selbst anpassen – jederzeit, direkt im CMS" },
      {
        label: (
          <>
            1 Inhaltserweiterung<InfoTooltip text="Eine komplett neue Sektion oder ein neues Element wird deiner Webseite hinzugefügt – z. B. eine neue Unterseite, ein neues Formular oder ein Galerie-Bereich." /> pro Monat
          </>
        ),
      },
    ],
  },
];

const wartungSlideVariants = {
  enter: (d: number) => ({ x: d * 32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -32, opacity: 0 }),
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
      style={{ color: active ? "#fff" : "rgba(150,190,220,0.6)" }}
    >
      {active && (
        <motion.div
          layoutId="wartung-tab-pill"
          className="absolute inset-0 rounded-lg"
          style={{ background: "linear-gradient(135deg, #006999 0%, #4dbef3 100%)" }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-1">{children}</span>
    </button>
  );
}

function WartungCard() {
  const [tab, setTab] = useState<"ohneCMS" | "mitCMS">("ohneCMS");
  const [direction, setDirection] = useState(0);

  function switchTab(next: "ohneCMS" | "mitCMS") {
    if (next === tab) return;
    setDirection(next === "mitCMS" ? 1 : -1);
    setTab(next);
  }

  return (
    <Card>
      <div className="flex items-center gap-2 mb-5">
        <div
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: "rgba(77,190,243,0.1)", border: "1px solid rgba(77,190,243,0.18)" }}
        >
          <Wrench size={16} style={{ color: "#4dbef3" }} />
        </div>
        <h3 className="text-white text-[17px] xl:text-[19px] 2xl:text-[21px] font-medium">Wartung</h3>
      </div>
      <p className="text-slate-400 text-[13px] 2xl:text-[14px] leading-relaxed mb-4">
        Damit deine Webseite dauerhaft sicher und aktuell bleibt. Wähle klassische Wartung oder die CMS-Option, bei der du Inhalte selbst bearbeitest.
      </p>

      {/* Toggle — identisch mit Kontakt-Form */}
      <div
        className="flex mb-5 p-1 rounded-xl gap-1"
        style={{
          background: "rgba(10,19,30,0.7)",
          border: "1px solid rgba(77,190,243,0.12)",
        }}
      >
        <WartungTabBtn active={tab === "ohneCMS"} onClick={() => switchTab("ohneCMS")}>
          Standard
          <InfoTooltip
            text="Wir kümmern uns um alle Änderungen für dich – du schickst uns, was aktualisiert werden soll, und wir setzen es um."
            onGradient={tab === "ohneCMS"}
          />
        </WartungTabBtn>
        <WartungTabBtn active={tab === "mitCMS"} onClick={() => switchTab("mitCMS")}>
          Mit CMS
          <InfoTooltip
            text="Mit CMS kannst du Texte, Bilder und Inhalte selbst bearbeiten – ohne Programmierkenntnisse. Der Preis beinhaltet Hosting, CMS-Updates und technische Wartung."
            onGradient={tab === "mitCMS"}
          />
        </WartungTabBtn>
      </div>

      {/* Tier panels — AnimatePresence identisch mit Kontakt */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={tab}
            custom={direction}
            variants={wartungSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === "ohneCMS" ? (
              <div className="space-y-0 divide-y" style={{ borderColor: "rgba(77,190,243,0.07)" }}>
                {wartungTiers.map((tier) => (
                  <div key={tier.name} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[15px] xl:text-[16px] font-semibold text-white">{tier.name}</span>
                      <span className="text-[13px] font-semibold" style={{ color: "#4dbef3" }}>{tier.price}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-400 text-[12px] xl:text-[13px] leading-snug">
                          <Check size={12} className="shrink-0" style={{ color: "#4dbef3" }} />
                          <span>{f.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-0 divide-y" style={{ borderColor: "rgba(77,190,243,0.07)" }}>
                {wartungCmsTiers.map((tier) => (
                  <div key={tier.name} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[15px] xl:text-[16px] font-semibold text-white">{tier.name}</span>
                      <span className="text-[13px] font-semibold" style={{ color: "#4dbef3" }}>{tier.price}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-400 text-[12px] xl:text-[13px] leading-snug">
                          <Check size={12} className="shrink-0" style={{ color: "#4dbef3" }} />
                          <span>{f.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </Card>
  );
}

// ─── Preise Section ─────────────────────────────────────────────────────────────
function PreiseSection({ onContact }: { onContact: () => void }) {
  return (
    <section className="mt-24 2xl:mt-32">
      <FadeIn>
        <SectionLabel>Preise</SectionLabel>
        <h2 className="text-white text-[clamp(26px,4vw,52px)] tracking-tight leading-tight max-w-2xl 2xl:max-w-3xl mb-3">
          Transparent.{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #4dbef3 0%, #006999 100%)" }}
          >
            Fair.
          </span>{" "}
          Klar.
        </h2>
        <p className="text-slate-400 text-[15px] xl:text-[16px] 2xl:text-[17px] leading-relaxed max-w-xl 2xl:max-w-2xl">
          Kein verstecktes Kleingedrucktes – du weißt von Anfang an, was du bekommst und was es kostet.
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

export function Leistungen() {
  usePageMeta({
    title: "Leistungen | G&A Webdesign",
    description: "Webdesign, Entwicklung & Deployment aus einer Hand. Individuelles Design, schnelle Ladezeiten und alles fertig live – inkl. Hosting & SEO.",
    path: "/leistungen",
  });
  const navigate = useNavigate();
  return (
    <main id="main-content" className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-12 xl:pb-20 2xl:pb-28">
      <FadeIn>
        <SectionLabel>Leistungen</SectionLabel>
        <h1 className="text-white text-[clamp(36px,6vw,84px)] tracking-tight leading-[1.05] max-w-4xl 2xl:max-w-5xl">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #4dbef3 0%, #006999 100%)",
            }}
          >
            Deine Webseite
          </span>{" "}
          – fertig, ohne Stress.
        </h1>
        <p className="mt-6 max-w-2xl 2xl:max-w-3xl text-[16px] xl:text-[18px] 2xl:text-[20px] text-slate-400 leading-relaxed">
          Du bekommst alles aus einer Hand: von der Gestaltung über die technische Umsetzung bis hin zur Veröffentlichung. Wir kümmern uns um den gesamten Ablauf für dich.</p>
      </FadeIn>

      {/* Service cards */}
      <div className="mt-16 2xl:mt-20 grid gap-6 2xl:gap-8 md:grid-cols-3 items-stretch">
        {blocks.map(({ Icon, title, lead, points, bgKey }, i) => (
          <LeistungenCard key={title} Icon={Icon} title={title} lead={lead} points={points} bgKey={bgKey} i={i} />
        ))}
      </div>

      {/* Extra services */}
      <FadeIn>
        <div className="mt-14 2xl:mt-20">
          <h2 className="text-white text-[clamp(22px,3vw,40px)] tracking-tight max-w-xl 2xl:max-w-2xl mb-3">
            Du brauchst noch etwas anderes?
          </h2>
          <p className="text-slate-400 text-[15px] 2xl:text-[17px] leading-relaxed max-w-xl 2xl:max-w-2xl mb-7">
            Kein Problem – sag uns, was du brauchst, und wir finden gemeinsam eine Lösung.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {[
              "Google Analytics Tracking",
              "Content Management System",
              "Admin Panel",
              "Bewerbungsportal",
              "Mehrsprachigkeit",
              "Online-Shop",
              "Buchungssystem",
              "Newsletter-Integration",
            ].map((item) => (
              <span
                key={item}
                className="tag-pill rounded-full px-4 py-1.5 xl:px-5 2xl:px-6 2xl:py-2 text-[13px] 2xl:text-[15px] text-sky-300"
                style={{
                  background: "rgba(77, 190, 243, 0.07)",
                  border: "1px solid rgba(77, 190, 243, 0.18)",
                }}
              >
                {item}
              </span>
            ))}
            <span
              className="rounded-full px-4 py-1.5 text-[13px] text-slate-500"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              & vieles mehr …
            </span>
          </div>
        </div>
      </FadeIn>

      {/* Preise */}
      <PreiseSection onContact={() => navigate("/kontakt")} />

      {/* FAQ */}
      <FAQSection />

      {/* CTA → Ablauf */}
      <FadeIn>
        <div className="mt-16 2xl:mt-24 text-center">
          <h2 className="text-white text-[28px] xl:text-[34px] 2xl:text-[42px] mb-3">
            Wie läuft die Zusammenarbeit ab?
          </h2>
          <p className="text-slate-400 text-[15px] xl:text-[16px] 2xl:text-[18px] mb-8 max-w-xl 2xl:max-w-2xl mx-auto">
            Von der ersten Anfrage bis zur fertigen Webseite – in 8 transparenten Schritten.
          </p>
          <PrimaryButton onClick={() => navigate("/ablauf")}>
            Ablauf ansehen
          </PrimaryButton>
        </div>
      </FadeIn>
    </main>
  );
}