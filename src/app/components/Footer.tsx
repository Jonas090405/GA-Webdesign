import { Linkedin, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EMAIL_ADDRESS = "gissler.jonas@gmail.com";

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      className="mt-24 sm:mt-32"
      style={{
        background: "rgba(10, 15, 20, 0.95)",
        borderTop: "1px solid rgba(77, 190, 243, 0.08)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-10 sm:gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div
              className="text-[18px] sm:text-[20px] font-semibold"
              style={{
                background: "linear-gradient(135deg, #4dbef3, #006999)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Gissler Webdesign
            </div>
            <p
              className="mt-3 text-[14px] leading-relaxed"
              style={{ color: "rgba(180, 210, 230, 0.55)" }}
            >
              Modernes Webdesign &amp; Entwicklung für lokale Unternehmen.
            </p>
          </div>

          <div>
            <div
              className="mb-3 text-[12px] tracking-[0.25em] uppercase font-medium"
              style={{ color: "#4dbef3" }}
            >
              Standort
            </div>
            <p
              className="flex items-center gap-2 text-[14px]"
              style={{ color: "rgba(200, 225, 240, 0.7)" }}
            >
              <MapPin size={14} className="shrink-0" style={{ color: "rgba(77,190,243,0.7)" }} />
              Triberg, Germany
            </p>
          </div>

          <div>
            <div
              className="mb-3 text-[12px] tracking-[0.25em] uppercase font-medium"
              style={{ color: "#4dbef3" }}
            >
              Kontakt
            </div>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              aria-label="E-Mail an Jonas Gissler senden"
              className="flex items-center gap-2 text-[14px] break-all transition-colors duration-200 cursor-pointer"
              style={{ color: "rgba(200, 225, 240, 0.7)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#4dbef3")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(200, 225, 240, 0.7)")
              }
            >
              <Mail size={14} className="shrink-0" style={{ color: "rgba(77,190,243,0.7)" }} />
              {EMAIL_ADDRESS}
            </a>
            <a
              href="https://www.linkedin.com/in/jonas-gissler-37b1482b0/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profil von Jonas Gissler"
              className="mt-2 inline-flex items-center gap-2 text-[14px] transition-colors duration-200 cursor-pointer"
              style={{ color: "rgba(200, 225, 240, 0.7)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#4dbef3")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(200, 225, 240, 0.7)")
              }
            >
              <Linkedin size={14} style={{ color: "#4dbef3" }} />
              LinkedIn
            </a>
          </div>

          <div>
            <div
              className="mb-3 text-[12px] tracking-[0.25em] uppercase font-medium"
              style={{ color: "#4dbef3" }}
            >
              Navigation
            </div>
            <ul className="space-y-2 text-[14px]">
              {(
                [
                  ["/", "Startseite"],
                  ["/portfolio", "Portfolio"],
                  ["/leistungen", "Leistungen"],
                  ["/ueber-mich", "Über mich"],
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
                      ((e.currentTarget as HTMLButtonElement).style.color =
                        "#4dbef3")
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
          className="mt-12 sm:mt-16 flex flex-col items-center gap-2 pt-8 text-center"
          style={{ borderTop: "1px solid rgba(77, 190, 243, 0.06)" }}
        >
          <p className="text-[13px]" style={{ color: "rgba(150, 180, 200, 0.4)" }}>
            © 2026 Jonas Gissler — Alle Rechte vorbehalten
          </p>
          <p className="text-[13px]" style={{ color: "rgba(150, 180, 200, 0.3)" }}>
            Danke für deinen Besuch :)
          </p>
        </div>
      </div>
    </footer>
  );
}