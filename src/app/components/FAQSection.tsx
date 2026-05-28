/**
 * FAQSection — wiederverwendbare FAQ-Sektion.
 * Wird auf /leistungen und /kontakt verwendet.
 * Desktop (xl+): 3-Karten-Karussell mit Hover-Reveal.
 * Mobile/Tablet: Accordion mit Plus→×-Animation.
 */
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import berkantImg from "../../imports/Berkant_agyar.jpeg";
import { SectionLabel } from "./SectionLabel";
import { FadeIn } from "./FadeIn";
import { Plus, ChevronLeft, ChevronRight, Mail, Phone } from "lucide-react";

// ─── Daten ────────────────────────────────────────────────────────────────────
const FAQ_EMAIL = "Berkant@ga-webdesign.de";
const FAQ_PHONE = "+49 176 3464 9177";

const faqs: { q: string; a: string }[] = [
  {
    q: "Was kostet eine Webseite bei euch?",
    a: "Das lässt sich nicht pauschal beantworten – der Preis hängt von deinen Anforderungen und dem Umfang ab. Im ersten Schritt führen wir gemeinsam eine kostenlose Anforderungsanalyse durch, erst dann erhältst du ein individuelles Angebot. Bis dahin ist alles unverbindlich und kostenlos für dich.",
  },
  {
    q: "Wie lange dauert es bis meine Webseite live ist?",
    a: "Das kommt auf den Umfang deines Projekts an. Kleinere Webseiten können schon nach 2–3 Monaten fertig sein, größere Projekte brauchen entsprechend mehr Zeit. Im Erstgespräch bekommst du direkt eine ehrliche Einschätzung.",
  },
  {
    q: "Brauche ich schon eine Domain um anzufragen?",
    a: "Nein, überhaupt nicht. Du kannst uns ohne jegliche Vorbereitung kontaktieren – ohne Domain, ohne fertiges Konzept, ohne technisches Vorwissen. Auf Wunsch kümmern wir uns um alles: Domain-Beschaffung, Hosting und Einrichtung inklusive.",
  },
  {
    q: "Muss ich beim Kennenlerngespräch schon wissen was ich möchte?",
    a: "Nein. Das Kennenlerngespräch dient genau dazu, gemeinsam herauszufinden, was du brauchst. Wir stellen die richtigen Fragen, hören zu und nehmen dich an die Hand – kein Vorwissen, keine Vorbereitung nötig.",
  },
  {
    q: "Was ist wenn ich nach dem Launch noch etwas ändern möchte?",
    a: "Wir sind auch danach für dich da. Du kannst dir ein CMS (Content Management System – ein Tool zum selbst Bearbeiten von Texten & Bildern, ohne Programmierkenntnisse) einrichten lassen, eines unserer Wartungspakete buchen oder direkt bei uns anfragen – wir erstellen dir ein Angebot je nach Aufwand.",
  },
  {
    q: "Was ist der Unterschied zwischen den Wartungspaketen?",
    a: "Basis (15 €/Mon.): Sicherheitsupdates, Fehlerbehebungen & Überwachung. Erweitert (50 €/Mon.): plus eine monatliche Inhaltsanpassung – z. B. Texte oder Bilder. Erweitert+ (200 €/Mon.): zwei Anpassungen und eine Inhaltserweiterung pro Monat, z. B. eine neue Unterseite.",
  },
  {
    q: "Arbeitet ihr auch überregional?",
    a: "Ja – wir arbeiten mit Kunden aus ganz Deutschland zusammen, vollständig remote. Für Kennenlerngespräch, Anforderungsanalyse und alle weiteren Abstimmungen nutzen wir einfach Video-Call oder Telefon. Dein Standort spielt keine Rolle.",
  },
  {
    q: "Bekomme ich eine Vorschau bevor die Seite live geht?",
    a: "Ja, auf jeden Fall. Kurz vor dem Launch erhältst du einen Vorschau-Link, über den du die fertige Seite in Ruhe anschauen und testen kannst. Erst wenn du mit allem zufrieden bist, schalten wir live.",
  },
  {
    q: "Arbeitet ihr mit Festpreisen oder nach Aufwand?",
    a: "Wir arbeiten in der Regel mit transparenten Festpreisen, die wir nach der gemeinsamen Anforderungsanalyse schriftlich festhalten. So weißt du von Anfang an genau, was dein Projekt kostet – keine versteckten Kosten oder böse Überraschungen.",
  },
];

// ─── Desktop-Karte ────────────────────────────────────────────────────────────
function DesktopFAQCard({ faq }: { faq: (typeof faqs)[0] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const spotRef  = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

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
    setHovered(false);
    if (outerRef.current) outerRef.current.style.background = "rgba(77,190,243,0.1)";
    if (spotRef.current)  spotRef.current.style.opacity  = "0";
  }

  return (
    <div
      ref={outerRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      className="rounded-2xl cursor-default"
      style={{ background: "rgba(77,190,243,0.1)", padding: "1px" }}
    >
      <div
        className="relative overflow-hidden rounded-2xl h-[290px] xl:h-[300px] 2xl:h-[310px]"
        style={{ background: "linear-gradient(135deg, rgba(16,24,27,0.97) 0%, rgba(10,17,22,0.99) 100%)" }}
      >
        {/* Spotlight */}
        <div
          ref={spotRef}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 0, transition: "opacity 0.3s" }}
        />

        {/* Content: zentriert → nach oben (nur y-Transform; festes px verhindert Sprung
            wenn die Antwort in den Flow kommt und die Container-Höhe wächst) */}
        <motion.div
          className="absolute left-0 right-0 z-10 px-6 xl:px-7"
          style={{ top: "50%" }}
          animate={{ y: hovered ? -116 : -29 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h3
            className="text-slate-100 font-bold leading-snug text-[21px] xl:text-[22px] 2xl:text-[23px]"
            animate={{ scale: hovered ? 0.8 : 1 }}
            style={{ transformOrigin: "top left" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {faq.q}
          </motion.h3>

          <AnimatePresence>
            {hovered && (
              <motion.p
                className="text-slate-400 text-[12px] xl:text-[13px] leading-relaxed"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.26, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ marginTop: 10 }}
              >
                {faq.a}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Mobile-Accordion-Item ────────────────────────────────────────────────────
function MobileAccordionItem({ faq }: { faq: (typeof faqs)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(14,22,28,0.98) 0%, rgba(9,16,22,0.99) 100%)",
        border: open ? "1px solid rgba(77,190,243,0.22)" : "1px solid rgba(77,190,243,0.1)",
        transition: "border-color 0.2s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span
          className="text-[14px] sm:text-[15px] font-medium leading-snug"
          style={{ color: open ? "#e2e8f0" : "rgba(226,232,240,0.75)" }}
        >
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
          style={{ color: "#4dbef3" }}
        >
          <Plus size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-slate-400 text-[13px] sm:text-[14px] leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Exported Component ───────────────────────────────────────────────────────
export function FAQSection({
  className = "mt-24 2xl:mt-32",
  showContactCTA = true,
}: {
  className?: string;
  showContactCTA?: boolean;
}) {
  const [startIdx, setStartIdx] = useState(0);
  const [dir, setDir]           = useState(1);
  const [copied, setCopied]     = useState<"email" | "phone" | null>(null);
  const total      = faqs.length;
  const touchStartX = useRef(0);

  function copyToClipboard(type: "email" | "phone") {
    const text = type === "email" ? FAQ_EMAIL : FAQ_PHONE;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2200);
    });
  }

  // Seitenbasiert: 3 Karten pro Seite, keine doppelten Stages
  const PAGE_SIZE = 3;
  const numPages   = Math.ceil(total / PAGE_SIZE);

  const goNext = () => { setDir(1);  setStartIdx((i) => (i + 1) % numPages); };
  const goPrev = () => { setDir(-1); setStartIdx((i) => (i - 1 + numPages) % numPages); };

  // Letzte Seite: zeigt die letzten PAGE_SIZE FAQs (kein Wrap zurück zu FAQ[0])
  const pageStart =
    startIdx === numPages - 1 && total % PAGE_SIZE !== 0
      ? total - PAGE_SIZE
      : startIdx * PAGE_SIZE;

  const visible = ([0, 1, 2] as const).map((offset) => ({
    faq: faqs[(pageStart + offset) % total],
    key: pageStart + offset, // eindeutig pro Seite → saubere Animationen
  }));

  return (
    <section className={className}>
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 2xl:mb-14">
          <div>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-white text-[clamp(26px,4vw,52px)] tracking-tight leading-tight max-w-xl mb-3">
              Häufige{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #4dbef3 0%, #006999 100%)" }}
              >
                Fragen
              </span>
            </h2>
            <p className="text-slate-400 text-[15px] xl:text-[16px] 2xl:text-[17px] leading-relaxed max-w-lg">
              Antworten auf die Fragen, die uns am häufigsten gestellt werden. Etwas fehlt?{" "}
              <button
                onClick={() => copyToClipboard("email")}
                className="cursor-pointer transition-colors duration-200 underline-offset-2 hover:underline bg-transparent border-none p-0"
                style={{ color: copied === "email" ? "rgba(186,230,253,1)" : "#4dbef3" }}
              >
                {copied === "email" ? "E-Mail kopiert ✓" : "Schreib uns einfach."}
              </button>
            </p>
          </div>

          {/* Nav-Pfeile – nur xl+ */}
          <div className="hidden xl:flex gap-3 shrink-0 pb-1">
            {([{ action: goPrev, Icon: ChevronLeft }, { action: goNext, Icon: ChevronRight }] as const).map(
              ({ action, Icon }, i) => (
                <button
                  key={i}
                  onClick={action}
                  className="flex items-center justify-center w-10 h-10 xl:w-11 xl:h-11 rounded-full transition-all duration-200"
                  style={{ background: "rgba(77,190,243,0.07)", border: "1px solid rgba(77,190,243,0.2)", color: "rgba(125,211,252,0.8)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(77,190,243,0.13)"; e.currentTarget.style.borderColor = "rgba(77,190,243,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(77,190,243,0.07)"; e.currentTarget.style.borderColor = "rgba(77,190,243,0.2)"; }}
                  aria-label={i === 0 ? "Vorherige Frage" : "Nächste Frage"}
                >
                  <Icon size={18} />
                </button>
              )
            )}
          </div>
        </div>
      </FadeIn>

      {/* Karussell – xl+ */}
      <div
        className="hidden xl:block overflow-hidden"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const delta = touchStartX.current - e.changedTouches[0].clientX;
          if (delta > 50) goNext();
          else if (delta < -50) goPrev();
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={startIdx}
            className="grid grid-cols-3 gap-5 2xl:gap-6"
            initial={{ opacity: 0, x: dir > 0 ? 48 : -48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir > 0 ? -48 : 48 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {visible.map(({ faq, key }) => (
              <DesktopFAQCard key={key} faq={faq} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Progress dots – eine pro Seite */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: numPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > startIdx ? 1 : -1); setStartIdx(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                height: 5,
                width: i === startIdx ? 20 : 5,
                background: i === startIdx ? "#4dbef3" : "rgba(77,190,243,0.25)",
              }}
              aria-label={`Seite ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Accordion – mobile & tablet (unter xl) */}
      <div className="xl:hidden space-y-3">
        {faqs.map((faq, i) => (
          <MobileAccordionItem key={i} faq={faq} />
        ))}
      </div>

      {/* Footer CTA – kompakte Kontaktzeile, kein Divider */}
      {showContactCTA && (
        <div className="mt-14 xl:mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          {/* Ansprechpartner */}
          <div className="flex items-center gap-3.5">
            <div
              className="shrink-0 h-10 w-10 rounded-full overflow-hidden"
              style={{ border: "1.5px solid rgba(77,190,243,0.38)" }}
            >
              <img src={berkantImg} alt="Berkant Agyar" className="h-full w-full object-cover object-top" />
            </div>
            <div>
              <div className="text-white font-semibold text-[14px] xl:text-[15px] leading-tight">
                Berkant Agyar
              </div>
              <div className="text-[12px] xl:text-[13px] mt-0.5" style={{ color: "rgba(150,190,220,0.52)" }}>
                Noch eine andere Frage? Meld dich gerne.
              </div>
            </div>
          </div>

          {/* Kontakt-Buttons – visuell identisch */}
          <div className="flex gap-2.5 shrink-0">
            {/* E-Mail → Clipboard-Copy */}
            <button
              onClick={() => copyToClipboard("email")}
              className="cursor-pointer inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] xl:text-[14px] font-medium transition-all duration-200 whitespace-nowrap"
              style={{
                background: "rgba(77,190,243,0.09)",
                border: "1px solid rgba(77,190,243,0.2)",
                color: "rgba(125,211,252,0.9)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(77,190,243,0.16)"; e.currentTarget.style.borderColor = "rgba(77,190,243,0.38)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(77,190,243,0.09)"; e.currentTarget.style.borderColor = "rgba(77,190,243,0.2)"; }}
            >
              <Mail size={14} />
              {copied === "email" ? "Kopiert ✓" : "E-Mail schreiben"}
            </button>
            {/* Anrufen → direkt tel: öffnen */}
            <a
              href={`tel:${FAQ_PHONE.replace(/[\s]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] xl:text-[14px] font-medium transition-all duration-200 whitespace-nowrap"
              style={{
                background: "rgba(77,190,243,0.09)",
                border: "1px solid rgba(77,190,243,0.2)",
                color: "rgba(125,211,252,0.9)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(77,190,243,0.16)"; e.currentTarget.style.borderColor = "rgba(77,190,243,0.38)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(77,190,243,0.09)"; e.currentTarget.style.borderColor = "rgba(77,190,243,0.2)"; }}
            >
              <Phone size={14} />
              Anrufen
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
