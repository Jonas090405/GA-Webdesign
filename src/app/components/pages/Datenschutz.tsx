import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";
import { hasConsent, revokeConsent } from "../../../lib/analytics";

// ─── Widerruf-Button + Bestätigungs-Popup ────────────────────────────────────
function RevokeConsentButton() {
  const [open, setOpen] = useState(false);
  const [status] = useState<"active" | "inactive">(() =>
    hasConsent() ? "active" : "inactive"
  );
  const [revoked, setRevoked] = useState(false);

  if (revoked) {
    return (
      <p className="text-emerald-400/80 text-[13px] mt-4">
        ✓ Einwilligung widerrufen – Google Analytics ist deaktiviert.
      </p>
    );
  }

  if (status === "inactive") {
    return (
      <p className="text-slate-500 text-[13px] mt-4 italic">
        Du hast Google Analytics nicht zugestimmt – es findet kein Tracking statt.
      </p>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 cursor-pointer"
        style={{
          background: "rgba(77,190,243,0.07)",
          border: "1px solid rgba(77,190,243,0.2)",
          color: "rgba(125,211,252,0.9)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(77,190,243,0.13)";
          e.currentTarget.style.borderColor = "rgba(77,190,243,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(77,190,243,0.07)";
          e.currentTarget.style.borderColor = "rgba(77,190,243,0.2)";
        }}
      >
        Einwilligung widerrufen
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.65)" }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
              style={{
                background: "rgb(16, 22, 28)",
                border: "1px solid rgba(77,190,243,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white font-semibold text-[16px] mb-2">
                Einwilligung widerrufen?
              </h3>
              <p className="text-slate-400 text-[13px] leading-relaxed mb-5">
                Google Analytics wird ab sofort nicht mehr geladen. Bereits
                erhobene Daten bleiben beim Anbieter bestehen.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    background: "rgba(77,190,243,0.07)",
                    border: "1px solid rgba(77,190,243,0.2)",
                    color: "rgba(200,235,255,0.85)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(77,190,243,0.13)";
                    e.currentTarget.style.borderColor = "rgba(77,190,243,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(77,190,243,0.07)";
                    e.currentTarget.style.borderColor = "rgba(77,190,243,0.2)";
                  }}
                >
                  Abbrechen
                </button>
                <button
                  onClick={() => {
                    revokeConsent();
                    setRevoked(true);
                    setOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl text-[13px] font-medium text-white transition-[filter] duration-300 hover:brightness-110 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #006999 0%, #4dbef3 100%)",
                  }}
                >
                  Ja, widerrufen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Datenschutz() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-5 sm:px-6 pt-28 sm:pt-32 pb-12">
      <FadeIn>
        <SectionLabel>Rechtliches</SectionLabel>
        <h1 className="text-white text-[clamp(32px,6vw,64px)] tracking-tight leading-[1.05]">
          Datenschutzerklärung
        </h1>
        <p className="mt-4 text-slate-400 text-[14px]">
          Stand: Juni 2026
        </p>
      </FadeIn>

      <div className="mt-10 sm:mt-12 space-y-5 sm:space-y-6">
        <FadeIn delay={0.05}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              1. Verantwortlicher
            </div>
            <div className="text-slate-200 text-[15px] leading-[1.9]">
              G&amp;A Webdesign GbR
              <br />
              Jonas Gissler &amp; Berkant Agyar
              <br />
              Altenbergweg 12
              <br />
              78098 Triberg, Deutschland
              <br />
              E-Mail: Jonas@ga-webdesign.de
            </div>
            <p className="text-slate-400 text-[13px] leading-relaxed mt-3">
              Ein Datenschutzbeauftragter ist nicht bestellt, da die gesetzlichen
              Voraussetzungen hierfür nicht vorliegen.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              2. Allgemeine Hinweise
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Der Schutz deiner personenbezogenen Daten ist uns ein wichtiges
              Anliegen. Wir verarbeiten deine Daten ausschließlich auf
              Grundlage der gesetzlichen Bestimmungen (DSGVO, TDDDG). In
              dieser Datenschutzerklärung informieren wir dich über die
              wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer
              Webseite.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              3. SSL- bzw. TLS-Verschlüsselung
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
              vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine
              verschlüsselte Verbindung erkennst du daran, dass die Adresszeile des
              Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol
              in deiner Browserzeile. Wenn die Verschlüsselung aktiviert ist, können
              die Daten, die du an uns übermittelst, nicht von Dritten mitgelesen werden.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              4. Server-Logfiles
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Beim Aufruf der Webseite werden automatisch technisch notwendige
              Daten (z. B. IP-Adresse, Datum und Uhrzeit, Browsertyp,
              Betriebssystem, Referrer-URL) in Server-Logfiles gespeichert.
              Diese Daten dienen ausschließlich der Sicherstellung eines
              störungsfreien Betriebs und der Verbesserung des Angebots.
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.25}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              5. Kontaktformular &amp; E-Mail-Kontakt
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Wenn du uns über das Kontaktformular oder per E-Mail Anfragen
              zukommen lässt, werden deine Angaben zur Bearbeitung der
              Anfrage und für mögliche Anschlussfragen gespeichert. Diese
              Daten geben wir nicht ohne deine Einwilligung weiter.
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f DSGVO.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              6. Cookies &amp; Tracking
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Diese Webseite verwendet technisch notwendige Cookies, die für den
              Betrieb der Seite erforderlich sind. Darüber hinaus setzen wir mit
              deiner ausdrücklichen Einwilligung{" "}
              <strong className="text-slate-200">Google Analytics</strong> ein,
              das Analyse-Cookies verwendet, um die Nutzung der Webseite anonymisiert
              auszuwerten. Wie du die Erfassung unterbinden kannst, erfährst
              du in Abschnitt 7.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.35}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              7. Google Analytics
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Mit deiner Einwilligung nutzen wir{" "}
              <strong className="text-slate-200">Google Analytics</strong> (Google
              LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). Dabei
              werden Nutzungsdaten (u. a. IP-Adresse in gekürzter Form, besuchte
              Seiten, Verweildauer) an Server von Google übertragen. Die
              IP-Anonymisierung ist aktiviert, sodass deine IP-Adresse vor der
              Übermittlung gekürzt wird. Google ist unter dem EU-US Data Privacy
              Framework zertifiziert, sodass ein angemessenes Datenschutzniveau
              gewährleistet ist.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Du kannst deine Einwilligung jederzeit widerrufen – direkt hier
              über den Button unten oder durch Installation des{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300 transition-colors"
              >
                Browser-Add-ons zur Deaktivierung von Google Analytics
              </a>
              . Weitere Informationen:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300 transition-colors"
              >
                Datenschutzerklärung von Google
              </a>
              . Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            </p>
            <RevokeConsentButton />
          </Card>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              8. Deine Rechte
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Du hast jederzeit das Recht auf Auskunft, Berichtigung,
              Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
              sowie Widerspruch gegen die Verarbeitung deiner Daten. Wende
              dich dafür einfach per E-Mail an uns.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">Widerrufsrecht:</strong> Soweit
              die Datenverarbeitung auf deiner Einwilligung beruht (z. B.
              Google Analytics), kannst du diese jederzeit mit Wirkung für die
              Zukunft widerrufen – ohne dass die Rechtmäßigkeit der bis dahin
              erfolgten Verarbeitung berührt wird.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">Beschwerderecht:</strong> Dir
              steht das Recht zur Beschwerde bei der zuständigen
              Aufsichtsbehörde zu: Landesbeauftragter für den Datenschutz
              Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.45}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              9. Hosting – GitHub Pages
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Diese Webseite wird über <strong className="text-slate-200">GitHub Pages</strong> gehostet,
              einem Dienst der GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco,
              CA 94107, USA. Beim Aufruf der Webseite werden technische Daten
              (insb. IP-Adresse) automatisch an Server von GitHub übertragen und
              dort verarbeitet. GitHub ist unter dem EU-US Data Privacy Framework
              zertifiziert, sodass ein angemessenes Datenschutzniveau gewährleistet
              ist. Weitere Informationen findest du in der{" "}
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300 transition-colors"
              >
                Datenschutzerklärung von GitHub
              </a>
              . Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.5}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              10. Kontaktformular – EmailJS
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Das Kontaktformular dieser Webseite nutzt den Dienst{" "}
              <strong className="text-slate-200">EmailJS</strong> (EmailJS Ltd., UK),
              um eingehende Nachrichten per E-Mail an uns weiterzuleiten.
              Dabei werden die von dir eingegebenen Daten (Name, E-Mail-Adresse,
              Nachricht) an die Server von EmailJS übertragen und von dort
              zugestellt. Die Daten werden nicht dauerhaft bei EmailJS gespeichert
              und ausschließlich zur Übermittlung deiner Anfrage verwendet.
              Weitere Informationen:{" "}
              <a
                href="https://www.emailjs.com/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300 transition-colors"
              >
                Datenschutzerklärung von EmailJS
              </a>
              . Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f DSGVO.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.55}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              11. Speicherdauer
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Personenbezogene Daten werden nur so lange gespeichert, wie es
              für den jeweiligen Zweck erforderlich ist oder gesetzliche
              Aufbewahrungsfristen bestehen. Kontaktanfragen werden nach
              abschließender Bearbeitung gelöscht, sofern keine gesetzlichen
              Pflichten zur Aufbewahrung entgegenstehen. Server-Logfiles werden
              in der Regel nach 7 Tagen automatisch gelöscht.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.6}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              12. Google Search Console
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Diese Webseite ist in der{" "}
              <strong className="text-slate-200">Google Search Console</strong>{" "}
              (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043,
              USA) registriert. Dieses Tool liefert uns aggregierte,
              anonymisierte Informationen über die Sichtbarkeit unserer Seite
              in der Google-Suche – z. B. Suchanfragen, Klicks und Impressionen.
              Personenbezogene Daten der Besucher dieser Webseite werden dabei
              nicht an uns übermittelt; die Verarbeitung findet ausschließlich
              auf Googles Seite statt. Weitere Informationen:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300 transition-colors"
              >
                Datenschutzerklärung von Google
              </a>
              . Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </Card>
        </FadeIn>

      </div>
    </main>
  );
}
