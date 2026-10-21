import { useState } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";
import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "../WhatsAppIcon";
import { DirectContactCard } from "../DirectContactCard";
import { FAQSection } from "../FAQSection";
import { ContactForm, BERKANT_EMAIL, BERKANT_PHONE, BERKANT_TEL, BERKANT_WHATSAPP } from "../ContactForm";
import { ContactLine } from "../ContactLine";
import berkantImg from "../../../imports/Berkant_agyar.jpeg";

type ContactMode = "form" | "direct";

const slideVariants = {
  enter: (d: number) => ({ x: d * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -40, opacity: 0 }),
};

export function Kontakt() {
  usePageMeta({
    title: "Kontakt | G&A Webdesign",
    description: "Starte dein Webprojekt. Schreib uns, per WhatsApp oder ruf direkt an – das Erstgespräch ist kostenlos und unverbindlich.",
    path: "/kontakt",
  });
  const [mode, setMode] = useState<ContactMode>("form");
  const [direction, setDirection] = useState(0);

  return (
    <main id="main-content" className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-24 2xl:pb-32">
      <FadeIn>
        <h1 className="text-white text-[clamp(32px,6vw,76px)] leading-[1.05] tracking-tight max-w-2xl 2xl:max-w-3xl mb-4">
          Erzähl uns von{" "}
          <span
            className="text-blue-400"
          >
            deinem Projekt.
          </span>
        </h1>

        {/* Ansprechpartner */}
        <div className="flex items-center gap-3 mb-6 2xl:mb-8">
          <div
            className="shrink-0 h-9 w-9 rounded-full overflow-hidden"
            style={{ border: "1.5px solid rgb(var(--blue-400-rgb) / 0.4)" }}
          >
            <img src={berkantImg} alt="Berkant Agyar" className="h-full w-full object-cover object-top" />
          </div>
          <div>
            <div className="text-[11px] text-ink-400">Dein Ansprechpartner</div>
            <div className="text-[13px] text-white font-medium leading-tight">Berkant Agyar</div>
          </div>
        </div>

        <p className="text-ink-300 text-[15px] sm:text-[16px] 2xl:text-[18px] leading-relaxed max-w-xl 2xl:max-w-2xl mb-14 2xl:mb-20">
          Wir melden uns innerhalb von 24 Stunden
          mit einer ersten Einschätzung und einem unverbindlichen Termin.
        </p>
      </FadeIn>

      <div className="grid gap-10 md:gap-14 2xl:gap-20 md:grid-cols-5 items-start">
        {/* Info-Spalte */}
        <FadeIn className="md:col-span-2 space-y-4">
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
        </FadeIn>

        {/* Form / Direktkontakt */}
        <FadeIn delay={0.12} className="md:col-span-3">
          {/* Tab-Toggle */}
          <div
            className="flex mb-5 p-1 rounded-xl gap-1"
            style={{
              background: "rgb(var(--ink-950-rgb) / 0.7)",
              border: "1px solid rgb(var(--blue-400-rgb) / 0.12)",
            }}
          >
            <TabBtn active={mode === "form"} onClick={() => { setDirection(-1); setMode("form"); }}>
              Anfrage senden
            </TabBtn>
            <TabBtn active={mode === "direct"} onClick={() => { setDirection(1); setMode("direct"); }}>
              Direkt kontaktieren
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
                {mode === "direct" ? (
                  <DirectContactCard />
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
      style={{ color: active ? "#fff" : "var(--ink-400)" }}
    >
      {active && (
        <motion.div
          layoutId="kontakt-tab-pill"
          className="absolute inset-0 rounded-lg"
          style={{ background: "var(--gradient-cta)" }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
