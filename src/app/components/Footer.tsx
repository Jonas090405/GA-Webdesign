import { Linkedin, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoUrl from "../../imports/Logo_GA_Webdesign.svg";
import { ForestRunner } from "./ForestRunner";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useWhatsAppLink } from "./ContactForm";
import { useCopy, useLocalePath } from "../../i18n";

const BERKANT_EMAIL = "Berkant@ga-webdesign.de";

const COPY = {
  de: {
    logoAlt: "G&A Webdesign Logo",
    tagline: "Modernes Webdesign & Entwicklung für lokale Unternehmen.",
    location: "Standort",
    place: "St. Georgen, Schwarzwald",
    contact: "Kontakt",
    mailLabel: (email: string) => `E-Mail an ${email} schreiben`,
    whatsappLabel: "Berkant Agyar auf WhatsApp schreiben (öffnet WhatsApp)",
    linkedinLabel: "LinkedIn Profil von G&A Webdesign",
    navigation: "Navigation",
    nav: [
      ["/", "Startseite"],
      ["/projekte", "Projekte"],
      ["/leistungen", "Leistungen"],
      ["/ueber-uns", "Über uns"],
      ["/kontakt", "Kontakt"],
      ["/impressum", "Impressum"],
      ["/datenschutz", "Datenschutz"],
      ["/agb", "AGB"],
    ] as [path: string, label: string][],
    easterEgg: "Weil jede gute Seite eine Stelle verdient, die niemand gebraucht hat.",
    rights: "© 2026 G&A Webdesign — Alle Rechte vorbehalten",
    thanks: "Danke für deinen Besuch :)",
  },
  en: {
    logoAlt: "G&A Webdesign logo",
    tagline: "Modern web design & development for local businesses.",
    location: "Location",
    place: "St. Georgen, Black Forest",
    contact: "Contact",
    mailLabel: (email: string) => `Send an email to ${email}`,
    whatsappLabel: "Message Berkant Agyar on WhatsApp (opens WhatsApp)",
    linkedinLabel: "G&A Webdesign on LinkedIn",
    navigation: "Navigation",
    nav: [
      ["/", "Home"],
      ["/projekte", "Projects"],
      ["/leistungen", "Services"],
      ["/ueber-uns", "About us"],
      ["/kontakt", "Contact"],
      ["/impressum", "Legal notice"],
      ["/datenschutz", "Privacy policy"],
      ["/agb", "Terms"],
    ] as [path: string, label: string][],
    easterEgg: "Because every good website deserves one spot nobody asked for.",
    rights: "© 2026 G&A Webdesign — All rights reserved",
    thanks: "Thanks for stopping by :)",
  },
};

export function Footer() {
  const navigate = useNavigate();
  const t = useCopy(COPY);
  const lp = useLocalePath();
  const whatsappLink = useWhatsAppLink();

  return (
    <footer
      className="mt-24 sm:mt-32"
      style={{
        background: "rgb(var(--ink-950-rgb) / 0.95)",
        borderTop: "1px solid rgb(var(--blue-400-rgb) / 0.08)",
      }}
    >
      <div className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-12 sm:pt-16 2xl:pt-20">
        <div className="grid gap-10 sm:gap-12 2xl:gap-16 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 mb-0.5">
              <img
                src={logoUrl}
                alt={t.logoAlt}
                loading="lazy"
                decoding="async"
                className="h-8 2xl:h-9 w-auto opacity-80"
              />
              <div
                className="text-[18px] sm:text-[20px] 2xl:text-[22px] font-semibold"
                style={{
                  background: "linear-gradient(135deg, var(--blue-400), var(--blue-700))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                G&amp;A Webdesign
              </div>
            </div>
            <p
              className="mt-3 text-[14px] 2xl:text-[16px] leading-relaxed text-ink-300"
            >
              {t.tagline}
            </p>
          </div>

          <div>
            <div
              className="mb-3 text-[12px] 2xl:text-[13px] tracking-[0.25em] font-medium text-blue-400"
            >
              {t.location}
            </div>
            <p
              className="flex items-center gap-2 text-[14px] 2xl:text-[16px] text-ink-200"
            >
              <MapPin size={14} className="shrink-0" style={{ color: "rgb(var(--blue-400-rgb) / 0.7)" }} />
              {t.place}
            </p>
          </div>

          <div>
            <div
              className="mb-3 text-[12px] 2xl:text-[13px] tracking-[0.25em] font-medium text-blue-400"
            >
              {t.contact}
            </div>
            {[BERKANT_EMAIL].map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                aria-label={t.mailLabel(email)}
                className="mt-1.5 first:mt-0 flex items-center gap-2 text-[12px] sm:text-[13px] xl:text-[14px] transition-colors duration-200 cursor-pointer text-ink-200 hover:text-blue-400 focus-visible:text-blue-400"
              >
                <Mail size={13} className="shrink-0" style={{ color: "rgb(var(--blue-400-rgb) / 0.7)" }} />
                <span className="break-all">{email}</span>
              </a>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.whatsappLabel}
              className="mt-2 flex items-center gap-2 text-[12px] sm:text-[13px] xl:text-[14px] transition-colors duration-200 cursor-pointer text-ink-200 hover:text-blue-400 focus-visible:text-blue-400"
            >
              <WhatsAppIcon size={13} className="shrink-0" style={{ color: "rgb(var(--blue-400-rgb) / 0.7)" }} />
              WhatsApp
            </a>
            <a
              href="https://www.linkedin.com/company/g%26a-webdesign/"
              target="_blank"
              rel="noreferrer"
              aria-label={t.linkedinLabel}
              className="mt-2 inline-flex items-center gap-2 text-[14px] 2xl:text-[16px] transition-colors duration-200 cursor-pointer text-ink-200 hover:text-blue-400 focus-visible:text-blue-400"
            >
              <Linkedin size={14} style={{ color: "var(--blue-400)" }} />
              LinkedIn
            </a>
          </div>

          <div>
            <div
              className="mb-3 text-[12px] 2xl:text-[13px] tracking-[0.25em] font-medium text-blue-400"
            >
              {t.navigation}
            </div>
            <ul className="space-y-2 2xl:space-y-3 text-[14px] 2xl:text-[16px]">
              {t.nav.map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => navigate(lp(id))}
                    className="transition-colors duration-200 cursor-pointer text-ink-200"
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color = "var(--blue-400)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color =
                        "var(--ink-200)")
                    }
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ForestRunner className="mt-14 sm:mt-16" />

      <div className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pb-12 sm:pb-16 2xl:pb-20">
        <p
          className="text-[12px] 2xl:text-[13px] text-ink-400"
        >
          {t.easterEgg}
        </p>

        <div
          className="mt-12 sm:mt-16 2xl:mt-20 flex flex-col items-center gap-2 pt-8 text-center"
          style={{ borderTop: "1px solid rgb(var(--blue-400-rgb) / 0.06)" }}
        >
          <p className="text-[13px] 2xl:text-[15px] text-ink-300">
            {t.rights}
          </p>
          <p className="text-[13px] 2xl:text-[15px] text-ink-400">
            {t.thanks}
          </p>
        </div>
      </div>
    </footer>
  );
}
