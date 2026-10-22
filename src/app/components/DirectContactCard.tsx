import { Phone } from "lucide-react";
import { Card } from "./Card";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BERKANT_PHONE, BERKANT_TEL, useWhatsAppLink } from "./ContactForm";
import { useCopy } from "../../i18n";

const COPY = {
  de: {
    title: "Schreib Berkant auf WhatsApp",
    text: "Schick uns kurz, worum es geht – wir antworten dir direkt im Chat.",
    whatsappLabel: "Berkant Agyar auf WhatsApp schreiben (öffnet WhatsApp)",
    whatsappButton: "Auf WhatsApp schreiben",
    callPrompt: "Lieber telefonieren?",
    callLabel: (phone: string) => `Berkant Agyar anrufen: ${phone}`,
    voicemail: "Nicht erreichbar? Hinterlass eine kurze Nachricht – wir melden uns schnellstmöglich.",
  },
  en: {
    title: "Message Berkant on WhatsApp",
    text: "Send us a quick note about what you need – we'll reply right in the chat.",
    whatsappLabel: "Message Berkant Agyar on WhatsApp (opens WhatsApp)",
    whatsappButton: "Message on WhatsApp",
    callPrompt: "Prefer to call?",
    callLabel: (phone: string) => `Call Berkant Agyar: ${phone}`,
    voicemail: "Can't reach us? Leave a short message – we'll get back to you as soon as we can.",
  },
};

/**
 * „Direkt kontaktieren“-Karte für Homepage und Kontakt-Seite:
 * WhatsApp als Hauptweg, Anruf als zweite Option darunter.
 */
export function DirectContactCard({ compact = false }: { compact?: boolean }) {
  const t = useCopy(COPY);
  const whatsappLink = useWhatsAppLink();
  return (
    <Card>
      <div className={`flex flex-col items-center text-center ${compact ? "py-8 gap-5" : "py-10 gap-6"}`}>
        <div
          className={`${compact ? "h-16 w-16" : "h-20 w-20"} rounded-full flex items-center justify-center`}
          style={{
            background: "linear-gradient(135deg, rgb(var(--blue-700-rgb) / 0.3) 0%, rgb(var(--blue-400-rgb) / 0.15) 100%)",
            border: "1px solid rgb(var(--blue-400-rgb) / 0.3)",
          }}
        >
          <WhatsAppIcon size={compact ? 28 : 34} style={{ color: "var(--blue-400)" }} />
        </div>

        <div>
          <p className={`text-white font-semibold tracking-tight ${compact ? "text-[20px]" : "text-[22px] sm:text-[26px]"}`}>
            {t.title}
          </p>
          <p className="mt-2 text-[13px] max-w-xs mx-auto leading-relaxed text-ink-400">
            {t.text}
          </p>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.whatsappLabel}
          className={`inline-flex items-center gap-2 rounded-full ${compact ? "px-6" : "px-7"} py-3 text-white font-medium transition-all duration-200 hover:brightness-110 active:brightness-95`}
          style={{ background: "var(--gradient-cta)" }}
        >
          <WhatsAppIcon size={compact ? 16 : 17} />
          {t.whatsappButton}
        </a>

        <div className="w-full max-w-xs pt-2">
          <p className="text-[13px] mb-1 text-ink-400">{t.callPrompt}</p>
          <a
            href={BERKANT_TEL}
            aria-label={t.callLabel(BERKANT_PHONE)}
            className="inline-flex items-center gap-2 text-white text-[17px] font-semibold tracking-tight hover:text-brand-light transition-colors"
          >
            <Phone size={15} className="text-blue-400" aria-hidden />
            {BERKANT_PHONE}
          </a>
          <p className="mt-2 text-[12px] leading-relaxed text-ink-400">
            {t.voicemail}
          </p>
        </div>
      </div>
    </Card>
  );
}
