import { useState } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";
import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "../WhatsAppIcon";
import { DirectContactCard } from "../DirectContactCard";
import { FAQSection } from "../FAQSection";
import { ContactForm, BERKANT_EMAIL, BERKANT_PHONE, BERKANT_TEL, useWhatsAppLink } from "../ContactForm";
import { useCopy } from "../../../i18n";
import { ContactLine } from "../ContactLine";
import { LocationMap, LOCATION_ANCHOR } from "../LocationMap";
import berkantImg from "../../../imports/Berkant_agyar.jpeg";

type ContactMode = "form" | "direct";

const slideVariants = {
  enter: (d: number) => ({ x: d * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -40, opacity: 0 }),
};

const COPY = {
  de: {
    metaTitle: "Kontakt | G&A Webdesign",
    metaDescription: "Starte dein Webprojekt. Schreib uns, per WhatsApp oder ruf direkt an – das Erstgespräch ist kostenlos und unverbindlich.",
    h1Start: "Erzähl uns von",
    h1Accent: "deinem Projekt.",
    contactPerson: "Dein Ansprechpartner",
    intro: "Wir melden uns innerhalb von 24 Stunden mit einer ersten Einschätzung und einem unverbindlichen Termin.",
    emailLabel: "E-Mail",
    whatsappValue: "Nachricht schreiben",
    phoneLabel: "Telefon",
    locationLabel: "Standort",
    locationValue: "Leopoldstraße 1, St. Georgen im Schwarzwald",
    tabForm: "Anfrage senden",
    tabDirect: "Direkt kontaktieren",
  },
  en: {
    metaTitle: "Contact | G&A Webdesign",
    metaDescription: "Start your web project. Email us, send a WhatsApp or give us a call – the first consultation is free and there's no commitment.",
    h1Start: "Tell us about",
    h1Accent: "your project.",
    contactPerson: "Your contact",
    intro: "We'll get back to you within 24 hours with an initial assessment and a no-obligation meeting.",
    emailLabel: "Email",
    whatsappValue: "Send a message",
    phoneLabel: "Phone",
    locationLabel: "Location",
    locationValue: "Leopoldstraße 1, St. Georgen im Schwarzwald",
    tabForm: "Send a request",
    tabDirect: "Contact us directly",
  },
};

export function Kontakt() {
  const t = useCopy(COPY);
  const whatsAppLink = useWhatsAppLink();
  usePageMeta({
    title: t.metaTitle,
    description: t.metaDescription,
  });
  const [mode, setMode] = useState<ContactMode>("form");
  const [direction, setDirection] = useState(0);

  return (
    <main id="main-content" className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-24 2xl:pb-32">
      <FadeIn>
        <h1 className="text-white text-[clamp(32px,6vw,76px)] leading-[1.05] tracking-tight max-w-2xl 2xl:max-w-3xl mb-4">
          {t.h1Start}{" "}
          <span
            className="text-blue-400"
          >
            {t.h1Accent}
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
            <div className="text-[11px] text-ink-400">{t.contactPerson}</div>
            <div className="text-[13px] text-white font-medium leading-tight">Berkant Agyar</div>
          </div>
        </div>

        <p className="text-ink-300 text-[15px] sm:text-[16px] 2xl:text-[18px] leading-relaxed max-w-xl 2xl:max-w-2xl mb-14 2xl:mb-20">
          {t.intro}
        </p>
      </FadeIn>

      <div className="grid gap-10 md:gap-14 2xl:gap-20 md:grid-cols-5 items-start">
        {/* Info-Spalte */}
        <FadeIn className="md:col-span-2 space-y-4">
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
          <ContactLine Icon={MapPin} label={t.locationLabel} value={t.locationValue} href={`#${LOCATION_ANCHOR}`} />
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
              {t.tabForm}
            </TabBtn>
            <TabBtn active={mode === "direct"} onClick={() => { setDirection(1); setMode("direct"); }}>
              {t.tabDirect}
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

      <LocationMap className="mt-20 2xl:mt-28" />

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
      aria-pressed={active}
      className={`relative flex-1 rounded-lg px-4 py-2.5 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
        active ? "text-white cursor-default" : "text-ink-400 cursor-pointer hover:text-ink-100 hover:bg-blue-400/[0.08]"
      }`}
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
