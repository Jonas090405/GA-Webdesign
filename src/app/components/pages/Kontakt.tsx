import { useState } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { motion, AnimatePresence } from "motion/react";
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";
import { Mail, MapPin, Clock, Phone } from "lucide-react";
import { FAQSection } from "../FAQSection";
import { ContactForm, BERKANT_EMAIL, BERKANT_PHONE } from "../ContactForm";
import berkantImg from "../../../imports/Berkant_agyar.jpeg";

type ContactMode = "form" | "call";

const slideVariants = {
  enter: (d: number) => ({ x: d * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -40, opacity: 0 }),
};

export function Kontakt() {
  usePageMeta({
    title: "Kontakt | G&A Webdesign",
    description: "Starte dein Webprojekt. Schreib uns oder ruf uns direkt an – das Erstgespräch ist kostenlos und unverbindlich.",
    path: "/kontakt",
  });
  const [mode, setMode] = useState<ContactMode>("form");
  const [direction, setDirection] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(BERKANT_EMAIL).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    });
  }

  return (
    <main id="main-content" className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-24 2xl:pb-32">
      <FadeIn>
        <SectionLabel>Kontakt</SectionLabel>
        <h1 className="text-white text-[clamp(32px,6vw,76px)] leading-[1.05] tracking-tight max-w-2xl 2xl:max-w-3xl mb-4">
          Erzähl uns von{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #4dbef3 0%, #006999 100%)" }}
          >
            deinem Projekt.
          </span>
        </h1>

        {/* Ansprechpartner */}
        <div className="flex items-center gap-3 mb-6 2xl:mb-8">
          <div
            className="shrink-0 h-9 w-9 rounded-full overflow-hidden"
            style={{ border: "1.5px solid rgba(77,190,243,0.4)" }}
          >
            <img src={berkantImg} alt="Berkant Agyar" className="h-full w-full object-cover object-top" />
          </div>
          <div>
            <div className="text-[11px]" style={{ color: "rgba(150,190,220,0.5)" }}>Dein Ansprechpartner</div>
            <div className="text-[13px] text-white font-medium leading-tight">Berkant Agyar</div>
          </div>
        </div>

        <p className="text-slate-400 text-[15px] sm:text-[16px] 2xl:text-[18px] leading-relaxed max-w-xl 2xl:max-w-2xl mb-14 2xl:mb-20">
          Wir melden uns innerhalb von 24 Stunden
          mit einer ersten Einschätzung und einem unverbindlichen Termin.
        </p>
      </FadeIn>

      <div className="grid gap-10 md:gap-14 2xl:gap-20 md:grid-cols-5 items-start">
        {/* Info-Spalte */}
        <FadeIn className="md:col-span-2 space-y-8">
          <InfoItem
            Icon={Mail}
            label="E-Mail"
            value={emailCopied ? "Kopiert ✓" : BERKANT_EMAIL}
            onClick={copyEmail}
          />
          <InfoItem
            Icon={Phone}
            label="Telefon"
            value={BERKANT_PHONE}
            href={`tel:${BERKANT_PHONE.replace(/[\s]/g, "")}`}
          />
          <InfoItem Icon={MapPin} label="Standort" value="Triberg, Schwarzwald" />
          <InfoItem Icon={Clock} label="Antwortzeit" value="In der Regel innerhalb von 24 Stunden" />
        </FadeIn>

        {/* Form / Anruf */}
        <FadeIn delay={0.12} className="md:col-span-3">
          {/* Tab-Toggle */}
          <div
            className="flex mb-5 p-1 rounded-xl gap-1"
            style={{
              background: "rgba(10,19,30,0.7)",
              border: "1px solid rgba(77,190,243,0.12)",
            }}
          >
            <TabBtn active={mode === "form"} onClick={() => { setDirection(-1); setMode("form"); }}>
              Anfrage senden
            </TabBtn>
            <TabBtn active={mode === "call"} onClick={() => { setDirection(1); setMode("call"); }}>
              Direkt anrufen
            </TabBtn>
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
                  <CallCard phone={BERKANT_PHONE} />
                ) : (
                  <Card>
                    <ContactForm subject="Anfrage über Kontaktseite" />
                  </Card>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>

      <FAQSection className="mt-20 2xl:mt-28" showContactCTA={false} />
    </main>
  );
}

// ─── Unterkomponenten ─────────────────────────────────────────────────────────

function TabBtn({
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
          layoutId="kontakt-tab-pill"
          className="absolute inset-0 rounded-lg"
          style={{ background: "linear-gradient(135deg, #006999 0%, #4dbef3 100%)" }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function CallCard({ phone }: { phone: string }) {
  return (
    <Card>
      <div className="py-10 flex flex-col items-center text-center gap-6">
        <div
          className="h-20 w-20 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(0,105,153,0.3) 0%, rgba(77,190,243,0.15) 100%)",
            border: "1px solid rgba(77,190,243,0.3)",
          }}
        >
          <Phone size={32} style={{ color: "#4dbef3" }} />
        </div>
        <div>
          <p className="text-slate-400 text-[14px] mb-2">Ruf uns einfach direkt an:</p>
          <a
            href={`tel:${phone.replace(/[\s\-\(\)]/g, "")}`}
            className="text-white text-[28px] sm:text-[34px] font-semibold tracking-tight hover:text-sky-300 transition-colors"
          >
            {phone}
          </a>
        </div>
        <p className="text-slate-500 text-[13px] max-w-xs leading-relaxed">
          Falls wir nicht erreichbar sind, hinterlasse eine Nachricht mit deinem Namen und deiner Telefonnummer. Wir melden uns schnellstmöglich zurück.
        </p>
        <a
          href={`tel:${phone.replace(/[\s\-\(\)]/g, "")}`}
          className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-white font-medium transition-all duration-200 hover:brightness-110"
          style={{ background: "linear-gradient(135deg, #006999 0%, #4dbef3 100%)" }}
        >
          <Phone size={16} />
          Jetzt anrufen
        </a>
      </div>
    </Card>
  );
}

function InfoItem({
  Icon,
  label,
  value,
  href,
  onClick,
}: {
  Icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="shrink-0 h-10 w-10 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(77, 190, 243, 0.10)", border: "1px solid rgba(77, 190, 243, 0.20)" }}
      >
        <Icon size={18} className="text-sky-400" />
      </div>
      <div>
        <div className="text-slate-500 text-[12px] tracking-[0.15em] uppercase mb-1">
          {label}
        </div>
        {onClick ? (
          <button
            onClick={onClick}
            className="text-white text-[14px] hover:text-sky-300 transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
          >
            {value}
          </button>
        ) : href ? (
          <a href={href} className="text-white text-[14px] hover:text-sky-300 transition-colors">
            {value}
          </a>
        ) : (
          <div className="text-white text-[14px]">{value}</div>
        )}
      </div>
    </div>
  );
}
