import { useState } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { motion, AnimatePresence } from "motion/react";
import { SectionLabel } from "../SectionLabel";
import { PrimaryButton } from "../Button";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";
import { Mail, MapPin, Clock, CheckCircle2, Phone } from "lucide-react";
import { FAQSection } from "../FAQSection";
import berkantImg from "../../../imports/Berkant_agyar.jpeg";
import emailjs from "@emailjs/browser";

// ─── EmailJS-Konfiguration ────────────────────────────────────────────────────
// IDs kommen aus .env (nie in Git pushen!):
//   VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const BERKANT_EMAIL = "Berkant@ga-webdesign.de";
const BERKANT_PHONE = "+49 176 3464 9177";
// Empfänger direkt im EmailJS-Template-Dashboard einstellen (To Email-Feld)

// ─────────────────────────────────────────────────────────────────────────────

type ContactMode = "form" | "call";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const e: FormErrors = {};

  if (!data.name.trim())
    e.name = "Name ist erforderlich.";
  else if (data.name.trim().length < 2)
    e.name = "Name muss mindestens 2 Zeichen haben.";

  if (!data.email.trim())
    e.email = "E-Mail-Adresse ist erforderlich.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    e.email = "Bitte eine gültige E-Mail-Adresse eingeben.";

  if (data.phone.trim() && !/^[\+\d\s\-\(\)\/]{6,20}$/.test(data.phone.trim()))
    e.phone = "Bitte eine gültige Telefonnummer eingeben.";



  if (!data.message.trim())
    e.message = "Nachricht ist erforderlich.";
  else if (data.message.trim().length < 20)
    e.message = "Bitte etwas ausführlicher beschreiben (mind. 20 Zeichen).";

  return e;
}

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
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [emailCopied, setEmailCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(BERKANT_EMAIL).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    });
  }

  function handleChange(field: keyof FormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone.trim() || "–",
          subject: "Anfrage über Kontaktseite",
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      // Eingangsbestätigung an Absender (best-effort, kein Fehler bei Misserfolg)
      emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      ).catch(() => {});
      setStatus("sent");
    } catch {
      setStatus("error");
    }
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
                    {status === "sent" ? (
                      <SuccessState />
                    ) : (
                      <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field
                            label="Name *"
                            name="name"
                            value={formData.name}
                            onChange={v => handleChange("name", v)}
                            error={errors.name}
                            placeholder="Max Mustermann"
                          />
                          <Field
                            label="E-Mail *"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={v => handleChange("email", v)}
                            error={errors.email}
                            placeholder="max@beispiel.de"
                          />
                        </div>
                        <Field
                          label="Telefon (optional)"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={v => handleChange("phone", v)}
                          error={errors.phone}
                          placeholder="+49 123 456789"
                        />
                        <Field
                          label="Nachricht *"
                          name="message"
                          textarea
                          value={formData.message}
                          onChange={v => handleChange("message", v)}
                          error={errors.message}
                          placeholder="Erzähl uns kurz, was du brauchst. Branche, Ziel, Wünsche…"
                        />
                        {status === "error" && (
                          <p className="text-red-400 text-[13px] leading-relaxed">
                            Beim Senden ist ein Fehler aufgetreten. Bitte versuche es erneut
                            oder schreib uns direkt an{" "}
                            <button
                              onClick={copyEmail}
                              className="underline cursor-pointer bg-transparent border-none p-0 text-red-400 hover:text-red-300 transition-colors"
                            >
                              {emailCopied ? "Kopiert ✓" : BERKANT_EMAIL}
                            </button>
                            .
                          </p>
                        )}
                        <div className="pt-1">
                          <PrimaryButton type="submit" disabled={status === "loading"}>
                            {status === "loading" ? "Wird gesendet…" : "Projekt anfragen"}
                          </PrimaryButton>
                        </div>
                      </form>
                    )}
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

function SuccessState() {
  return (
    <div className="py-14 flex flex-col items-center text-center gap-4">
      <CheckCircle2 size={40} className="text-sky-400" />
      <div className="text-sky-400 text-[11px] tracking-[0.25em] uppercase">Gesendet</div>
      <h3 className="text-white text-[22px]">Danke für deine Nachricht!</h3>
      <p className="text-slate-400 text-[14px] max-w-sm leading-relaxed">
        Wir haben deine Anfrage erhalten und melden uns so schnell wie möglich bei dir.
      </p>
    </div>
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

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const baseCls =
    "w-full rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-all text-[14px]";
  const borderStyle = error
    ? "1px solid rgba(248,113,113,0.6)"
    : "1px solid rgba(77,190,243,0.15)";

  const sharedProps = {
    name,
    value,
    placeholder,
    className: baseCls,
    style: {
      background: "#0a1322",
      border: borderStyle,
    } as React.CSSProperties,
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = error
        ? "rgba(248,113,113,0.8)"
        : "rgba(77,190,243,0.5)";
      e.currentTarget.style.boxShadow = error
        ? "0 0 0 3px rgba(248,113,113,0.1)"
        : "0 0 0 3px rgba(77,190,243,0.1)";
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = error
        ? "rgba(248,113,113,0.6)"
        : "rgba(77,190,243,0.15)";
      e.currentTarget.style.boxShadow = "none";
    },
  };

  return (
    <label className="block">
      <span className="block text-[12px] tracking-[0.2em] text-slate-400 uppercase mb-2">
        {label}
      </span>
      {textarea ? (
        <textarea
          {...sharedProps}
          rows={5}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <input
          {...sharedProps}
          type={type}
          onChange={e => onChange(e.target.value)}
        />
      )}
      {error && (
        <span className="block mt-1.5 text-[12px] text-red-400">{error}</span>
      )}
    </label>
  );
}
