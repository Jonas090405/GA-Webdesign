import { ArrowUpRight, Linkedin, Mail, MapPin, Navigation, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoUrl from "../../imports/Logo_GA_Webdesign.svg";
import { ForestRunner } from "./ForestRunner";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useWhatsAppLink } from "./ContactForm";
import { useRouteUrl } from "./LocationMap";
import { useCopy, useLocalePath } from "../../i18n";

const BERKANT_EMAIL = "Berkant@ga-webdesign.de";
const GOOGLE_REVIEW_URL = "https://share.google/gTMIiZR4JHAzGJFPJ";

const COPY = {
  de: {
    logoAlt: "G&A Webdesign Logo",
    tagline: "Modernes Webdesign & Entwicklung für lokale Unternehmen.",
    location: "Standort",
    city: "78112 St. Georgen im\u00A0Schwarzwald",
    route: "Route planen",
    routeLabel: "Route zu G&A Webdesign planen (öffnet deine Karten-App)",
    reviewLead: "Zufrieden mit uns?",
    review: "Bewerte uns auf Google",
    reviewLabel: "G&A Webdesign auf Google bewerten (öffnet Google)",
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
    city: "78112 St. Georgen im\u00A0Schwarzwald, Germany",
    route: "Get directions",
    routeLabel: "Get directions to G&A Webdesign (opens your maps app)",
    reviewLead: "Happy with our work?",
    review: "Review us on Google",
    reviewLabel: "Review G&A Webdesign on Google (opens Google)",
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
  const routeUrl = useRouteUrl();

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
            <address className="flex items-start gap-2 not-italic text-[14px] 2xl:text-[16px] leading-relaxed text-ink-200">
              <MapPin size={14} className="mt-[5px] 2xl:mt-[6px] shrink-0" style={{ color: "rgb(var(--blue-400-rgb) / 0.7)" }} />
              <span>
                G&amp;A Webdesign GbR
                <br />
                Leopoldstraße 1
                <br />
                {t.city}
              </span>
            </address>
            <a
              href={routeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.routeLabel}
              className="mt-3 inline-flex items-center gap-2 text-[14px] 2xl:text-[16px] font-medium text-blue-400 underline decoration-blue-400/35 underline-offset-4 transition-colors duration-200 hover:text-blue-300 hover:decoration-blue-300 focus-visible:text-blue-300"
            >
              <Navigation size={13} className="shrink-0" aria-hidden />
              {t.route}
            </a>
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
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.reviewLabel}
            className="tag-pill group mb-6 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full px-5 py-2.5 text-[14px] 2xl:text-[15px] text-ink-200 transition-colors duration-200 hover:text-white"
            style={{
              border: "1px solid rgb(var(--blue-400-rgb) / 0.18)",
              background: "rgb(var(--blue-400-rgb) / 0.06)",
            }}
          >
            <Star size={14} className="shrink-0 fill-current text-blue-400" aria-hidden />
            <span className="hidden sm:inline text-ink-400">{t.reviewLead}</span>
            <span className="inline-flex items-center gap-1 font-medium">
              {t.review}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </a>
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
