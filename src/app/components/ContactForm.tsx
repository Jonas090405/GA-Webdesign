import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PrimaryButton } from "./Button";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── EmailJS-Konfiguration ────────────────────────────────────────────────────
// IDs kommen aus .env (nie in Git pushen!):
//   VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
// Empfänger direkt im EmailJS-Template-Dashboard einstellen (To Email-Feld)

export const BERKANT_EMAIL = "Berkant@ga-webdesign.de";
export const BERKANT_PHONE = "+49 176 3464 9177";

// ─────────────────────────────────────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validateField(field: keyof FormData, value: string): string | undefined {
  const v = value.trim();
  switch (field) {
    case "name":
      if (!v) return "Name ist erforderlich.";
      if (v.length < 2) return "Name muss mindestens 2 Zeichen haben.";
      return;
    case "email":
      if (!v) return "E-Mail-Adresse ist erforderlich.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Bitte eine gültige E-Mail-Adresse eingeben.";
      return;
    case "phone":
      if (v && !/^[\+\d\s\-\(\)\/]{6,20}$/.test(v)) return "Bitte eine gültige Telefonnummer eingeben.";
      return;
    case "message":
      if (!v) return "Nachricht ist erforderlich.";
      if (v.length < 20) return "Bitte etwas ausführlicher beschreiben (mind. 20 Zeichen).";
      return;
  }
}

function validate(data: FormData): FormErrors {
  const e: FormErrors = {};
  (Object.keys(data) as (keyof FormData)[]).forEach(field => {
    const err = validateField(field, data[field]);
    if (err) e[field] = err;
  });
  return e;
}

// ─── Schritte des Formulars: immer nur eine Frage auf einmal ──────────────────

type StepDef = {
  field: keyof FormData;
  question: string;
  hint: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
  optional?: boolean;
  autoComplete?: string;
};

const STEPS: StepDef[] = [
  {
    field: "name",
    question: "Wie heißt du?",
    hint: "Damit wir wissen, mit wem wir sprechen.",
    placeholder: "Max Mustermann",
    autoComplete: "name",
  },
  {
    field: "email",
    question: "Wie erreichen wir dich?",
    hint: "An diese Adresse schicken wir unsere Antwort.",
    type: "email",
    placeholder: "max@beispiel.de",
    autoComplete: "email",
  },
  {
    field: "phone",
    question: "Deine Telefonnummer?",
    hint: "Falls du lieber telefonierst – wir rufen dich gerne an.",
    type: "tel",
    placeholder: "+49 123 456789",
    autoComplete: "tel",
    optional: true,
  },
  {
    field: "message",
    question: "Erzähl uns von deinem Projekt.",
    hint: "Branche, Ziel, Wünsche – ein paar Sätze reichen völlig.",
    textarea: true,
    placeholder: "Wir sind ein Café in Triberg und brauchen eine Website mit…",
  },
];

const slideVariants = {
  enter: (d: number) => ({ x: d * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -40, opacity: 0 }),
};

// ─── Multi-Step-Formular ──────────────────────────────────────────────────────
// Eine Frage pro Schritt statt aller Felder auf einmal: weniger kognitive Last,
// klarer Fokus, sichtbarer Fortschritt. Wird auf Startseite und Kontaktseite
// verwendet – `subject` unterscheidet die Herkunft in der E-Mail.

export function ContactForm({ subject }: { subject: string }) {
  const [step, setStep] = useState(0);
  const [stepDir, setStepDir] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [emailCopied, setEmailCopied] = useState(false);
  // Honeypot: unsichtbares Feld, das nur Bots ausfüllen
  const [honeypot, setHoneypot] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  // Erst nach aktiver Navigation autofokussieren – nie beim Seitenaufruf
  const hasNavigated = useRef(false);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  function copyEmail() {
    navigator.clipboard.writeText(BERKANT_EMAIL).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    });
  }

  function goTo(next: number) {
    hasNavigated.current = true;
    setStepDir(next > step ? 1 : -1);
    setStep(next);
  }

  function handleChange(value: string) {
    setFormData(prev => ({ ...prev, [current.field]: value }));
    if (errors[current.field]) setErrors(prev => ({ ...prev, [current.field]: undefined }));
  }

  function resetForm() {
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setStatus("idle");
    setStep(0);
    hasNavigated.current = false;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const err = validateField(current.field, formData[current.field]);
    if (err) {
      setErrors(prev => ({ ...prev, [current.field]: err }));
      return;
    }

    if (!isLast) {
      goTo(step + 1);
      return;
    }

    // Letzter Schritt: sicherheitshalber alles prüfen, sonst zum Fehler springen
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrorStep = STEPS.findIndex(s => errs[s.field]);
      if (firstErrorStep !== -1 && firstErrorStep !== step) goTo(firstErrorStep);
      return;
    }

    if (honeypot) {
      // Bot erkannt: stillschweigend "Erfolg" anzeigen, nichts senden
      setStatus("sent");
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
          subject,
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
    } catch (err) {
      console.warn("EmailJS-Fehler:", err);
      setStatus("error");
    }
  }

  if (status === "sent") return <SuccessState onReset={resetForm} />;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot: für Menschen unsichtbar, fängt Spam-Bots */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <fieldset
        disabled={status === "loading"}
        className="border-0 p-0 m-0 min-w-0 disabled:opacity-70"
      >
        {/* Progress: Dots + Zähler */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1.5" aria-label="Fortschritt">
            {STEPS.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <button
                  key={s.field}
                  type="button"
                  onClick={done ? () => goTo(i) : undefined}
                  disabled={!done}
                  aria-label={done ? `Zurück zu Schritt ${i + 1}: ${s.question}` : `Schritt ${i + 1}: ${s.question}`}
                  aria-current={active ? "step" : undefined}
                  className={`h-2 rounded-full p-0 border-none transition-all duration-300 ${done ? "cursor-pointer hover:brightness-125" : "cursor-default"}`}
                  style={{
                    width: active ? 28 : 8,
                    background: active
                      ? "linear-gradient(135deg, #006999 0%, #4dbef3 100%)"
                      : done
                        ? "rgba(77,190,243,0.55)"
                        : "rgba(77,190,243,0.15)",
                  }}
                />
              );
            })}
          </div>
          <span
            className="text-[11px] tracking-[0.2em] uppercase tabular-nums"
            style={{ color: "rgba(150,190,220,0.5)" }}
            aria-hidden
          >
            {step + 1} / {STEPS.length}
          </span>
        </div>
        <p className="sr-only" aria-live="polite">
          Schritt {step + 1} von {STEPS.length}
        </p>

        {/* Aktuelle Frage. Padding + Negativ-Margin geben dem Focus-Ring
            (2px Outline + 3px Offset bzw. 3px Schatten) Platz im Clip-Bereich,
            damit overflow-hidden ihn an den Ecken nicht abschneidet. */}
        <div className="overflow-hidden -mx-1.5 -my-1.5 px-1.5 py-1.5">
          <AnimatePresence mode="wait" custom={stepDir} initial={false}>
            <motion.div
              key={current.field}
              custom={stepDir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onAnimationStart={def => {
                if (def === "center" && hasNavigated.current) {
                  inputRef.current?.focus({ preventScroll: true });
                }
              }}
              className="min-h-[190px]"
            >
              <StepField
                step={current}
                value={formData[current.field]}
                onChange={handleChange}
                error={errors[current.field]}
                inputRef={inputRef}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {status === "error" && (
          <p className="text-red-400 text-[13px] leading-relaxed mb-5">
            Beim Senden ist ein Fehler aufgetreten. Bitte versuche es erneut
            oder schreib uns direkt an{" "}
            <button
              type="button"
              onClick={copyEmail}
              className="underline cursor-pointer bg-transparent border-none p-0 text-red-400 hover:text-red-300 transition-colors"
            >
              {emailCopied ? "Kopiert ✓" : BERKANT_EMAIL}
            </button>
            .
          </p>
        )}

        {/* Navigation: flex-wrap + ml-auto, damit der Button auf sehr schmalen
            Geräten unter "Zurück" rutscht statt zu überlaufen */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-1">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="inline-flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 text-[13px] font-medium text-slate-500 hover:text-slate-300 transition-colors"
            >
              <ArrowLeft size={15} aria-hidden />
              Zurück
            </button>
          ) : (
            <span aria-hidden />
          )}
          <div className="flex items-center gap-4 ml-auto">
            {!isLast && (
              <span className="hidden sm:inline text-[12px]" style={{ color: "rgba(150,190,220,0.35)" }}>
                oder Enter ↵
              </span>
            )}
            <PrimaryButton type="submit" disabled={status === "loading"} arrow={isLast ? "up-right" : "right"}>
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden />
                  Wird gesendet…
                </>
              ) : isLast ? (
                "Projekt anfragen"
              ) : (
                "Weiter"
              )}
            </PrimaryButton>
          </div>
        </div>
      </fieldset>
    </form>
  );
}

// ─── Unterkomponenten ─────────────────────────────────────────────────────────

function SuccessState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="py-14 flex flex-col items-center text-center gap-4" role="status">
      <CheckCircle2 size={40} className="text-sky-400" />
      <div className="text-sky-400 text-[11px] tracking-[0.25em] uppercase">Gesendet</div>
      <h3 className="text-white text-[22px]">Danke für deine Nachricht!</h3>
      <p className="text-slate-400 text-[14px] max-w-sm leading-relaxed">
        Wir haben deine Anfrage erhalten und melden uns so schnell wie möglich bei dir.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-2 text-[13px] cursor-pointer bg-transparent border-none p-0 underline underline-offset-4 text-sky-400 hover:text-sky-300 transition-colors"
        >
          Weitere Nachricht senden
        </button>
      )}
    </div>
  );
}

function StepField({
  step,
  value,
  onChange,
  error,
  inputRef,
}: {
  step: StepDef;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  inputRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>;
}) {
  // Kein outline-none: Tastaturnutzer bekommen den globalen :focus-visible-Ring,
  // Mausnutzer den Schatten aus onFocus
  const baseCls =
    "w-full rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 transition-all text-[15px]";
  const borderStyle = error
    ? "1px solid rgba(248,113,113,0.6)"
    : "1px solid rgba(77,190,243,0.15)";
  const errorId = `${step.field}-error`;

  const sharedProps = {
    name: step.field,
    value,
    placeholder: step.placeholder,
    autoComplete: step.autoComplete,
    className: baseCls,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
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
      <span className="block text-white text-[20px] sm:text-[24px] tracking-tight leading-snug mb-1.5">
        {step.question}
        {step.optional && (
          <span
            className="ml-2.5 align-middle text-[11px] tracking-[0.15em] uppercase"
            style={{ color: "rgba(150,190,220,0.5)" }}
          >
            Optional
          </span>
        )}
      </span>
      <span className="block text-[13px] text-slate-500 leading-relaxed mb-5">
        {step.hint}
      </span>
      {step.textarea ? (
        <textarea
          {...sharedProps}
          ref={el => { inputRef.current = el; }}
          rows={4}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <input
          {...sharedProps}
          ref={el => { inputRef.current = el; }}
          type={step.type ?? "text"}
          onChange={e => onChange(e.target.value)}
        />
      )}
      {error && (
        <span id={errorId} role="alert" className="block mt-1.5 text-[12px] text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}
