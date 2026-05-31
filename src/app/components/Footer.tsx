import { useState } from "react";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoUrl from "../../imports/Logo_GA_Webdesign.svg";

const BERKANT_EMAIL = "Berkant@ga-webdesign.de";
const JONAS_EMAIL = "Jonas@ga-webdesign.de";

export function Footer() {
  const navigate = useNavigate();
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  function copyEmail(email: string) {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2200);
    });
  }

  return (
    <footer
      className="mt-24 sm:mt-32"
      style={{
        background: "rgba(10, 15, 20, 0.95)",
        borderTop: "1px solid rgba(77, 190, 243, 0.08)",
      }}
    >
      <div className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 2xl:py-20">
        <div className="grid gap-10 sm:gap-12 2xl:gap-16 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 mb-0.5">
              <img
                src={logoUrl}
                alt="G&A Webdesign Logo"
                className="h-8 2xl:h-9 w-auto opacity-80"
              />
              <div
                className="text-[18px] sm:text-[20px] 2xl:text-[22px] font-semibold"
                style={{
                  background: "linear-gradient(135deg, #4dbef3, #006999)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                G&amp;A Webdesign
              </div>
            </div>
            <p
              className="mt-3 text-[14px] 2xl:text-[16px] leading-relaxed"
              style={{ color: "rgba(180, 210, 230, 0.55)" }}
            >
              Modernes Webdesign &amp; Entwicklung für lokale Unternehmen.
            </p>
          </div>

          <div>
            <div
              className="mb-3 text-[12px] 2xl:text-[13px] tracking-[0.25em] uppercase font-medium"
              style={{ color: "#4dbef3" }}
            >
              Standort
            </div>
            <p
              className="flex items-center gap-2 text-[14px] 2xl:text-[16px]"
              style={{ color: "rgba(200, 225, 240, 0.7)" }}
            >
              <MapPin size={14} className="shrink-0" style={{ color: "rgba(77,190,243,0.7)" }} />
              Triberg, Germany
            </p>
          </div>

          <div>
            <div
              className="mb-3 text-[12px] 2xl:text-[13px] tracking-[0.25em] uppercase font-medium"
              style={{ color: "#4dbef3" }}
            >
              Kontakt
            </div>
            {[BERKANT_EMAIL, JONAS_EMAIL].map((email) => (
              <button
                key={email}
                onClick={() => copyEmail(email)}
                aria-label={`E-Mail ${email} kopieren`}
                className="mt-1.5 first:mt-0 flex items-center gap-2 text-[12px] sm:text-[13px] xl:text-[14px] transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 text-left"
                style={{ color: copiedEmail === email ? "#4dbef3" : "rgba(200, 225, 240, 0.7)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#4dbef3"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = copiedEmail === email ? "#4dbef3" : "rgba(200, 225, 240, 0.7)"; }}
              >
                <Mail size={13} className="shrink-0" style={{ color: "rgba(77,190,243,0.7)" }} />
                <span className="break-all">{copiedEmail === email ? "Kopiert ✓" : email}</span>
              </button>
            ))}
            <a
              href="https://www.linkedin.com/company/g%26a-webdesign/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profil von G&A Webdesign"
              className="mt-2 inline-flex items-center gap-2 text-[14px] 2xl:text-[16px] transition-colors duration-200 cursor-pointer"
              style={{ color: "rgba(200, 225, 240, 0.7)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#4dbef3")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(200, 225, 240, 0.7)")}
            >
              <Linkedin size={14} style={{ color: "#4dbef3" }} />
              LinkedIn
            </a>
          </div>

          <div>
            <div
              className="mb-3 text-[12px] 2xl:text-[13px] tracking-[0.25em] uppercase font-medium"
              style={{ color: "#4dbef3" }}
            >
              Navigation
            </div>
            <ul className="space-y-2 2xl:space-y-3 text-[14px] 2xl:text-[16px]">
              {(
                [
                  ["/", "Startseite"],
                  ["/projekte", "Projekte"],
                  ["/leistungen", "Leistungen"],
                  ["/ueber-uns", "Über uns"],
                  ["/kontakt", "Kontakt"],
                  ["/impressum", "Impressum"],
                  ["/datenschutz", "Datenschutz"],
                ] as const
              ).map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => navigate(id)}
                    className="transition-colors duration-200 cursor-pointer"
                    style={{ color: "rgba(200, 225, 240, 0.6)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color = "#4dbef3")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(200, 225, 240, 0.6)")
                    }
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 sm:mt-16 2xl:mt-20 flex flex-col items-center gap-2 pt-8 text-center"
          style={{ borderTop: "1px solid rgba(77, 190, 243, 0.06)" }}
        >
          <p className="text-[13px] 2xl:text-[15px]" style={{ color: "rgba(170, 200, 220, 0.65)" }}>
            © 2026 G&A Webdesign — Alle Rechte vorbehalten
          </p>
          <p className="text-[13px] 2xl:text-[15px]" style={{ color: "rgba(170, 200, 220, 0.5)" }}>
            Danke für deinen Besuch :)
          </p>
        </div>
      </div>
    </footer>
  );
}
