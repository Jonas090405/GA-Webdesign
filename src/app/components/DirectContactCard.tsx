import { Phone } from "lucide-react";
import { Card } from "./Card";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BERKANT_PHONE, BERKANT_TEL, BERKANT_WHATSAPP } from "./ContactForm";

/**
 * „Direkt kontaktieren“-Karte für Homepage und Kontakt-Seite:
 * WhatsApp als Hauptweg, Anruf als zweite Option darunter.
 */
export function DirectContactCard({ compact = false }: { compact?: boolean }) {
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
            Schreib Berkant auf WhatsApp
          </p>
          <p className="mt-2 text-[13px] max-w-xs mx-auto leading-relaxed text-ink-400">
            Schick uns kurz, worum es geht – wir antworten dir direkt im Chat.
          </p>
        </div>

        <a
          href={BERKANT_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Berkant Agyar auf WhatsApp schreiben (öffnet WhatsApp)"
          className={`inline-flex items-center gap-2 rounded-full ${compact ? "px-6" : "px-7"} py-3 text-white font-medium transition-all duration-200 hover:brightness-110 active:brightness-95`}
          style={{ background: "var(--gradient-cta)" }}
        >
          <WhatsAppIcon size={compact ? 16 : 17} />
          Auf WhatsApp schreiben
        </a>

        <div className="w-full max-w-xs pt-5 border-t border-white/[0.08]">
          <p className="text-[13px] mb-1 text-ink-400">Lieber telefonieren?</p>
          <a
            href={BERKANT_TEL}
            aria-label={`Berkant Agyar anrufen: ${BERKANT_PHONE}`}
            className="inline-flex items-center gap-2 text-white text-[17px] font-semibold tracking-tight hover:text-brand-light transition-colors"
          >
            <Phone size={15} className="text-blue-400" aria-hidden />
            {BERKANT_PHONE}
          </a>
          <p className="mt-2 text-[12px] leading-relaxed text-ink-400">
            Nicht erreichbar? Hinterlass eine kurze Nachricht – wir melden uns schnellstmöglich.
          </p>
        </div>
      </div>
    </Card>
  );
}
