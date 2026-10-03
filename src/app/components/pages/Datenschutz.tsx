import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";
import { hasConsent, revokeConsent } from "../../../lib/analytics";
import { usePageMeta } from "../../hooks/usePageMeta";

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
          color: "rgba(152,220,252,0.9)",
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
                    background: "var(--gradient-cta)",
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


function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand underline hover:text-brand-light transition-colors"
    >
      {children}
    </a>
  );
}

export function Datenschutz() {
  usePageMeta({
    title: "Datenschutz | G&A Webdesign",
    description: "Datenschutzerklärung der G&A Webdesign GbR: Informationen zur Verarbeitung personenbezogener Daten und zum Einsatz von Google Analytics (nur mit Einwilligung).",
    path: "/datenschutz",
  });
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-5 sm:px-6 pt-28 sm:pt-32 pb-12">
      <FadeIn>
        <SectionLabel>Rechtliches</SectionLabel>
        <h1 className="text-white text-[clamp(32px,6vw,64px)] tracking-tight leading-[1.05]">
          Datenschutzerklärung
        </h1>
        <p className="mt-4 text-slate-400 text-[14px]">
          Stand: Oktober 2026
        </p>
      </FadeIn>

      <div className="mt-10 sm:mt-12 space-y-5 sm:space-y-6">
        <FadeIn delay={0.05}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
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
              <br />
              E-Mail: berkant@ga-webdesign.de
            </div>
            <p className="text-slate-400 text-[13px] leading-relaxed mt-3">
              Ein Datenschutzbeauftragter ist nicht bestellt, da die gesetzlichen
              Voraussetzungen hierfür nicht vorliegen.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.08}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              2. Allgemeine Hinweise
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Der Schutz deiner personenbezogenen Daten ist uns ein wichtiges
              Anliegen. Wir verarbeiten deine Daten ausschließlich auf
              Grundlage der gesetzlichen Bestimmungen (DSGVO, BDSG, TDDDG). In
              dieser Datenschutzerklärung informieren wir dich darüber, welche
              Daten wir beim Besuch unserer Webseite und im Rahmen unserer
              Geschäftsbeziehungen verarbeiten.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Die Bereitstellung deiner Daten ist weder gesetzlich noch
              vertraglich vorgeschrieben. Ohne die Angaben im Kontaktformular
              können wir deine Anfrage jedoch nicht bearbeiten. Eine
              automatisierte Entscheidungsfindung einschließlich Profiling
              findet nicht statt.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.11}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              3. SSL- bzw. TLS-Verschlüsselung
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
              vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine
              verschlüsselte Verbindung erkennst du daran, dass die Adresszeile des
              Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol
              in deiner Browserzeile. Wenn die Verschlüsselung aktiviert ist, können
              die Daten, die du an uns übermittelst, nicht von Dritten mitgelesen werden.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.14}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              4. Hosting und Server-Logfiles – GitHub Pages
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Diese Webseite wird über <strong className="text-slate-200">GitHub Pages</strong> gehostet,
              einem Dienst der GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco,
              CA 94107, USA. Beim Aufruf der Webseite verarbeitet GitHub
              automatisch technisch notwendige Daten in Server-Logfiles,
              insbesondere IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene
              Seite, Browsertyp, Betriebssystem und Referrer-URL. Dies dient der
              Auslieferung der Webseite sowie der Sicherheit und Stabilität des
              Betriebs. Wir selbst haben keinen Zugriff auf diese Logfiles; die
              Speicherdauer richtet sich nach den Vorgaben von GitHub.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              GitHub ist unter dem EU-US Data Privacy Framework zertifiziert
              (Angemessenheitsbeschluss nach Art. 45 DSGVO). Weitere
              Informationen findest du in der{" "}
              <ExtLink href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
                Datenschutzerklärung von GitHub
              </ExtLink>
              . Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes
              Interesse liegt in einer sicheren und zuverlässigen Bereitstellung
              unserer Webseite.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.17}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              5. Lokale Speicherung im Browser
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Ohne deine Einwilligung setzen wir keine Cookies. Wir speichern
              lediglich folgende Angaben im lokalen Speicher (localStorage)
              deines Browsers:
            </p>
            <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1.5 pl-4 list-disc marker:text-brand mt-3">
              <li>
                <strong className="text-slate-200">Deine Einwilligungsentscheidung</strong> aus dem
                Cookie-Banner, damit wir dich nicht bei jedem Besuch erneut fragen.
              </li>
              <li>
                <strong className="text-slate-200">Deinen Highscore</strong> im Mini-Spiel, nur wenn du
                es spielst.
              </li>
            </ul>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Diese Angaben verbleiben auf deinem Gerät, werden nicht an uns
              übermittelt und bleiben gespeichert, bis du sie in deinem Browser
              löschst. Rechtsgrundlage: § 25 Abs. 2 Nr. 2 TDDDG, da die
              Speicherung für die von dir gewünschte Funktion unbedingt
              erforderlich ist, sowie Art. 6 Abs. 1 lit. c DSGVO
              (Nachweis der Einwilligung) bzw. lit. f DSGVO.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              6. Kontaktformular &amp; E-Mail-Kontakt
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Wenn du uns über das Kontaktformular oder per E-Mail kontaktierst,
              verarbeiten wir deine Angaben (Name, E-Mail-Adresse, optional
              Telefonnummer, Anliegen und Nachricht) zur Bearbeitung der Anfrage
              und für mögliche Anschlussfragen. Nach dem Absenden des Formulars
              erhältst du eine automatische Eingangsbestätigung an die
              angegebene E-Mail-Adresse. Diese Daten geben wir nicht ohne deine
              Einwilligung an Dritte weiter.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO, soweit deine Anfrage
              auf einen Vertragsschluss gerichtet ist, im Übrigen Art. 6 Abs. 1
              lit. f DSGVO (berechtigtes Interesse an der Beantwortung von
              Anfragen).
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.23}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              7. Kontaktformular – EmailJS
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Für den Versand der Formularnachrichten nutzen wir den Dienst{" "}
              <strong className="text-slate-200">EmailJS</strong> (EmailJS Ltd.,
              Vereinigtes Königreich). Dabei werden die von dir eingegebenen
              Daten an die Server von EmailJS übertragen und von dort als E-Mail
              an uns sowie als Eingangsbestätigung an dich zugestellt. EmailJS
              verarbeitet die Daten ausschließlich zur Übermittlung. Für das
              Vereinigte Königreich besteht ein Angemessenheitsbeschluss der
              EU-Kommission (Art. 45 DSGVO). Weitere Informationen:{" "}
              <ExtLink href="https://www.emailjs.com/legal/privacy-policy/">
                Datenschutzerklärung von EmailJS
              </ExtLink>
              . Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f DSGVO.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.26}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              8. Google Analytics
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Nur mit deiner Einwilligung nutzen wir{" "}
              <strong className="text-slate-200">Google Analytics 4</strong>, einen
              Dienst der Google Ireland Limited, Gordon House, Barrow Street,
              Dublin 4, Irland. Vor deiner Einwilligung wird Google Analytics
              nicht geladen. Nach Einwilligung werden Cookies (insbesondere{" "}
              <code className="text-slate-200">_ga</code> und{" "}
              <code className="text-slate-200">_ga_&lt;ID&gt;</code>, Speicherdauer
              bis zu 2 Jahre) gesetzt und pseudonyme Nutzungsdaten erhoben, z. B.
              besuchte Seiten, Verweildauer, ungefährer Standort, Gerät und
              Browser. Google Analytics 4 speichert nach Angaben von Google keine
              vollständigen IP-Adressen. Werbe- und Personalisierungsfunktionen
              nutzen wir nicht. Die erhobenen Daten werden nach höchstens 14
              Monaten gelöscht.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Dabei kann eine Übermittlung an die Google LLC in den USA
              erfolgen. Google ist unter dem EU-US Data Privacy Framework
              zertifiziert (Angemessenheitsbeschluss nach Art. 45 DSGVO).
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft
              widerrufen – direkt hier über den Button unten oder durch
              Installation des{" "}
              <ExtLink href="https://tools.google.com/dlpage/gaoptout">
                Browser-Add-ons zur Deaktivierung von Google Analytics
              </ExtLink>
              . Weitere Informationen:{" "}
              <ExtLink href="https://policies.google.com/privacy">
                Datenschutzerklärung von Google
              </ExtLink>
              . Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1
              TDDDG (Einwilligung).
            </p>
            <RevokeConsentButton />
          </Card>
        </FadeIn>

        <FadeIn delay={0.29}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              9. Google Search Console
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Diese Webseite ist in der{" "}
              <strong className="text-slate-200">Google Search Console</strong>{" "}
              (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
              Irland) registriert. Dieses Tool liefert uns aggregierte,
              anonymisierte Informationen über die Sichtbarkeit unserer Seite
              in der Google-Suche – z. B. Suchanfragen, Klicks und Impressionen.
              Personenbezogene Daten der Besucher dieser Webseite werden dabei
              nicht an uns übermittelt; die Verarbeitung findet ausschließlich
              auf Googles Seite statt. Weitere Informationen:{" "}
              <ExtLink href="https://policies.google.com/privacy">
                Datenschutzerklärung von Google
              </ExtLink>
              . Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.32}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              10. Kunden und Geschäftspartner
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Wenn du uns beauftragst oder mit uns zusammenarbeitest, verarbeiten
              wir die dafür erforderlichen Daten: Name, Firma, Anschrift,
              Kontaktdaten, Vertrags-, Rechnungs- und Zahlungsdaten sowie die
              Projektkommunikation. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO
              (Vertragsdurchführung), Art. 6 Abs. 1 lit. c DSGVO (steuer- und
              handelsrechtliche Pflichten) und Art. 6 Abs. 1 lit. f DSGVO
              (z. B. Geltendmachung von Ansprüchen).
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Empfänger sind, soweit erforderlich, unser Steuerberater,
              Finanzbehörden und Kreditinstitute sowie die Dienstleister, die wir
              für die Projektarbeit einsetzen (insbesondere GitHub, Vercel,
              Strato, Resend, Sanity, Supabase sowie KI-gestützte
              Entwicklungswerkzeuge von Anthropic, OpenAI und Google). Mit diesen
              bestehen, soweit erforderlich, Verträge zur Auftragsverarbeitung.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.35}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              11. Übermittlung in Drittländer
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Einige der genannten Dienstleister haben ihren Sitz außerhalb der
              EU bzw. des EWR (insbesondere USA und Vereinigtes Königreich). Eine
              Übermittlung erfolgt nur, wenn ein Angemessenheitsbeschluss der
              EU-Kommission besteht (z. B. EU-US Data Privacy Framework für
              zertifizierte US-Unternehmen) oder geeignete Garantien wie
              Standardvertragsklauseln nach Art. 46 DSGVO vereinbart sind.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.38}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              12. Speicherdauer
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Personenbezogene Daten werden nur so lange gespeichert, wie es
              für den jeweiligen Zweck erforderlich ist oder gesetzliche
              Aufbewahrungsfristen bestehen. Kontaktanfragen löschen wir nach
              abschließender Bearbeitung, sofern daraus kein Auftrag entsteht.
              Für Vertrags- und Rechnungsunterlagen gelten die gesetzlichen
              Aufbewahrungsfristen (§ 147 AO, § 257 HGB): in der Regel 8 Jahre
              für Buchungsbelege wie Rechnungen, 10 Jahre für Bücher und
              Jahresabschlüsse sowie 6 Jahre für Geschäftsbriefe.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.41}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              13. Deine Rechte
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Du hast jederzeit das Recht auf Auskunft (Art. 15 DSGVO),
              Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
              Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20). Wende
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
              steht das Recht zur Beschwerde bei einer Aufsichtsbehörde zu,
              etwa beim Landesbeauftragten für den Datenschutz und die
              Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20,
              70173 Stuttgart.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.44}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              14. Widerspruchsrecht nach Art. 21 DSGVO
            </div>
            <p className="text-slate-200 text-[14px] leading-relaxed font-medium">
              Soweit wir deine Daten auf Grundlage berechtigter Interessen
              (Art. 6 Abs. 1 lit. f DSGVO) verarbeiten, hast du das Recht, aus
              Gründen, die sich aus deiner besonderen Situation ergeben,
              jederzeit Widerspruch gegen diese Verarbeitung einzulegen. Wir
              verarbeiten die Daten dann nicht mehr, es sei denn, wir können
              zwingende schutzwürdige Gründe nachweisen, die deine Interessen,
              Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der
              Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
              Eine formlose E-Mail an uns genügt.
            </p>
          </Card>
        </FadeIn>

      </div>
    </main>
  );
}
