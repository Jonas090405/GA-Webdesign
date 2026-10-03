import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";
import { usePageMeta } from "../../hooks/usePageMeta";

export function AGB() {
  usePageMeta({
    title: "AGB | G&A Webdesign",
    description: "Allgemeine Geschäftsbedingungen der G&A Webdesign GbR für Erstellung, Hosting, Wartung und technische Betreuung von Webseiten.",
    path: "/agb",
  });
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-5 sm:px-6 pt-28 sm:pt-32 pb-12">
      <FadeIn>
        <SectionLabel>Rechtliches</SectionLabel>
        <h1 className="text-white text-[clamp(32px,6vw,64px)] tracking-tight leading-[1.05]">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="mt-4 text-slate-400 text-[14px]">
          G&amp;A Webdesign GbR · Stand: Oktober 2026
        </p>
      </FadeIn>

      <div className="mt-10 sm:mt-12 space-y-5 sm:space-y-6">

        <FadeIn delay={0.05}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              1. Geltungsbereich
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der G&amp;A Webdesign GbR,
              vertreten durch die Gesellschafter Berkant Agyar und Jonas Gissler, Altenbergweg 12, 78098 Triberg,
              Deutschland, und ihren Auftraggebern über die Erstellung, Überarbeitung, Bereitstellung, das
              Hosting, die Wartung und die technische Betreuung von Webseiten, CMS-Lösungen sowie damit
              zusammenhängende Leistungen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Das Angebot richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB, also an natürliche
              oder juristische Personen oder rechtsfähige Personengesellschaften, die bei Abschluss des Vertrags
              in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handeln.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Entgegenstehende oder abweichende Allgemeine Geschäftsbedingungen des Auftraggebers werden nicht
              Vertragsbestandteil, es sei denn, ihrer Geltung wurde ausdrücklich in Textform zugestimmt.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.08}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              2. Leistungen
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed mb-3">
              Die G&amp;A Webdesign GbR erbringt insbesondere folgende Leistungen:
            </p>
            <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1.5 pl-4 list-disc marker:text-brand">
              <li>Erstellung und Entwicklung individueller Webseiten</li>
              <li>Gestalterische und technische Umsetzung</li>
              <li>Hosting für selbst erstellte Projekte</li>
              <li>Domain-Beschaffung und technische Einrichtung</li>
              <li>Wartung und technische Betreuung</li>
              <li>Einrichtung und Pflege von CMS-Lösungen</li>
              <li>Technische SEO-Grundleistungen, insbesondere Meta-Beschreibungen, Strukturierung und Entwicklung der Webseite nach SEO-Richtlinien, Sitemap-Integration sowie Einreichung bei Google Search Console</li>
            </ul>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Der konkrete Leistungsumfang ergibt sich aus dem individuellen Angebot, der Leistungsbeschreibung,
              dem gebuchten Paket oder sonstigen vertraglichen Vereinbarungen. Beschreibungen auf der Website der
              G&amp;A Webdesign GbR (z. B. Leistungsseite oder FAQ) dienen der allgemeinen Information; bei
              Abweichungen ist das individuelle Angebot maßgeblich.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">Datenschutzfreundliche Einrichtung</strong> bedeutet die
              technische Umsetzung, insbesondere SSL-Verschlüsselung, lokal eingebundene Schriften, ein
              Einwilligungs-Banner für einwilligungspflichtige Dienste sowie die Einbindung von Impressum und
              Datenschutzerklärung. Soweit die G&amp;A Webdesign GbR Rechtstexte erstellt oder einbindet,
              geschieht dies auf Grundlage der Angaben des Auftraggebers bzw. gängiger Rechtstext-Generatoren;
              eine rechtliche Prüfung ist nicht geschuldet.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">Barrierefreiheit</strong> (z. B. nach WCAG 2.2 AA) bezieht
              sich, soweit vereinbart, auf die von der G&amp;A Webdesign GbR erstellten Bestandteile der Webseite
              zum Zeitpunkt der Abnahme. Vom Auftraggeber gelieferte oder selbst eingepflegte Inhalte (z. B.
              Bildbeschreibungen, PDF-Dokumente, Videos) sowie eingebundene Drittinhalte sind davon ausgenommen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Rechtliche Beratung, insbesondere zu Wettbewerbsrecht, Datenschutzrecht, Impressumspflichten,
              Barrierefreiheitspflichten, branchenspezifischen Informationspflichten oder sonstigen rechtlichen
              Anforderungen, ist nicht geschuldet, sofern nicht ausdrücklich in Textform etwas anderes vereinbart
              wurde.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.11}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              3. Vertragsschluss und Preise
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Angebote der G&amp;A Webdesign GbR sind freibleibend, sofern sie nicht ausdrücklich als verbindlich
              bezeichnet sind.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Ein Vertrag kommt durch Annahme eines Angebots, durch Bestätigung in Textform oder durch Beginn
              der Leistungserbringung zustande.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Es gelten die im individuellen Angebot genannten Preise. Soweit dort keine Angabe erfolgt, gelten
              die zum Zeitpunkt des Vertragsschlusses auf ga-webdesign.de/leistungen veröffentlichten Preise
              (nachfolgend „aktuelle Preisliste“).
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.14}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              4. Mitwirkungspflichten des Auftraggebers
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Der Auftraggeber ist verpflichtet, alle für die Durchführung des Projekts erforderlichen Inhalte,
              Informationen, Freigaben, Zugangsdaten und sonstigen Mitwirkungsleistungen rechtzeitig und
              vollständig bereitzustellen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Der Auftraggeber versichert, dass die von ihm bereitgestellten Inhalte, insbesondere Texte, Bilder,
              Videos, Logos, Dokumente und sonstige Materialien, frei von Rechten Dritter sind oder von ihm
              rechtmäßig genutzt werden dürfen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Der Auftraggeber bleibt für die inhaltliche, rechtliche und tatsächliche Richtigkeit aller von ihm
              gelieferten oder selbst eingepflegten Inhalte allein verantwortlich. Dies gilt insbesondere für
              Inhalte, die nachträglich durch den Auftraggeber oder durch Dritte geändert, ergänzt oder über ein
              CMS eingepflegt werden.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Kommt der Auftraggeber seinen Mitwirkungspflichten nicht rechtzeitig nach, verlängern sich
              vereinbarte Fristen und Termine angemessen. Verzögerungen aufgrund fehlender Mitwirkung des
              Auftraggebers liegen nicht im Verantwortungsbereich der G&amp;A Webdesign GbR.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.17}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              5. Freistellung
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Der Auftraggeber stellt die G&amp;A Webdesign GbR von sämtlichen Ansprüchen Dritter frei, die
              aufgrund von vom Auftraggeber bereitgestellten Inhalten, Daten, Rechten oder Weisungen gegen die
              G&amp;A Webdesign GbR geltend gemacht werden, soweit der Auftraggeber die zugrunde liegende
              Rechtsverletzung zu vertreten hat. Dies umfasst auch angemessene Kosten der Rechtsverteidigung.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              6. Erstellung, Feedback und Abnahme
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die Erstellung einer Webseite erfolgt auf Grundlage der vertraglich vereinbarten
              Leistungsbeschreibung.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Im vereinbarten Webseitenpreis sind zwei Feedbackrunden enthalten. Weitergehende
              Änderungswünsche, insbesondere größere gestalterische, strukturelle oder funktionale Änderungen,
              sind gesondert zu vergüten.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Nach Fertigstellung der Webseite fordert die G&amp;A Webdesign GbR den Auftraggeber zur Abnahme auf.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Die Webseite gilt als abgenommen, wenn der Auftraggeber die Freigabe zum Livegang erteilt, oder
              wenn der Auftraggeber nicht innerhalb von 10 Werktagen nach Aufforderung zur Abnahme unter Angabe
              mindestens eines nicht nur unerheblichen Mangels die Abnahme verweigert.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Kleinere Feinschliffe und unwesentliche Anpassungen stehen der Abnahme nicht entgegen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Nach erfolgter Abnahme gewünschte weitere Anpassungen oder Inhaltserweiterungen sind nur im
              Rahmen eines gebuchten Wartungspakets oder gegen gesonderte Vergütung geschuldet.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Für erstellte Webseiten gilt nach Abnahme eine Gewährleistungsfrist von zwölf Monaten.
              Als Mangel gilt eine erhebliche Abweichung von der zum Zeitpunkt der Abnahme vereinbarten
              Leistungsbeschreibung. Offensichtliche Mängel sind innerhalb von 10 Werktagen nach Abnahme
              in Textform zu rügen; andernfalls gilt die Leistung insoweit als genehmigt. Mängelrechte
              entfallen, soweit der Auftraggeber oder Dritte Änderungen am Code oder an der Webseite
              vorgenommen haben und der Mangel hierauf zurückzuführen ist.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Die Verkürzung der Gewährleistungsfrist gilt nicht bei Vorsatz, grober Fahrlässigkeit, arglistigem
              Verschweigen eines Mangels, bei Schäden aus der Verletzung des Lebens, des Körpers oder der
              Gesundheit sowie bei Übernahme einer Garantie; insoweit gelten die gesetzlichen Fristen.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.23}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              7. Termine und Lieferverzug
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die G&amp;A Webdesign GbR ist bestrebt, vereinbarte Fertigstellungstermine einzuhalten. Diese
              können jedoch nur dann eingehalten werden, wenn der Auftraggeber seinen Mitwirkungspflichten
              gemäß Abschnitt 4 vollständig und rechtzeitig nachkommt. Lieferverzögerungen oder Mehrkosten,
              die durch unrichtige, unvollständige oder nachträglich geänderte Angaben, Unterlagen oder
              Inhalte des Auftraggebers entstehen, gehen nicht zu Lasten der G&amp;A Webdesign GbR;
              daraus resultierende Mehrkosten trägt der Auftraggeber.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Gerät die G&amp;A Webdesign GbR in Verzug, kann der Auftraggeber seine gesetzlichen Rechte
              erst nach Ablauf einer in Textform gesetzten Nachfrist von mindestens 14 Tagen geltend machen.
              Die Frist beginnt mit Zugang der Fristsetzung.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Für Verzugsschäden gilt Abschnitt 19 (Haftung). Höhere Gewalt sowie sonstige unvorhersehbare
              oder unabwendbare Ereignisse – insbesondere Naturkatastrophen, Krieg, Streik, Aussperrung,
              erhebliche unverschuldete Betriebsstörungen oder Verzögerungen bei eingesetzten Drittanbietern –
              verlängern die vereinbarten Fristen um die Dauer der Störung zuzüglich zwei weiterer Wochen. Die
              G&amp;A Webdesign GbR informiert den Auftraggeber unverzüglich über den Eintritt und die
              voraussichtliche Dauer solcher Ereignisse.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Verzögert sich die Leistungserbringung aus Gründen, die der Auftraggeber zu vertreten hat,
              kann die G&amp;A Webdesign GbR eine angemessene Erhöhung der vereinbarten Vergütung verlangen.
              Bei Vorsatz oder grober Fahrlässigkeit des Auftraggebers können darüber hinaus
              Schadensersatzansprüche geltend gemacht werden.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.26}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              8. Hosting
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Hosting wird ausschließlich für von der G&amp;A Webdesign GbR erstellte Projekte angeboten. Es
              erfolgt über die Infrastruktur sorgfältig ausgewählter Drittanbieter gemäß Abschnitt 9.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Das Hosting bei vorhandener Domain kostet 5 EUR pro Monat. Bei gewünschter Domain-Beschaffung
              und Einrichtung beträgt das Hosting ebenfalls 5 EUR pro Monat, zuzüglich der tatsächlichen
              Domainkosten entsprechend der gewünschten Domain sowie einer einmaligen Einrichtungspauschale
              von 60 EUR.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Im Rahmen des Hostings wird mindestens einmal monatlich geprüft, ob die Webseite online erreichbar
              ist. Auftretende Probleme im Einflussbereich der G&amp;A Webdesign GbR werden bearbeitet. Erlangt
              die G&amp;A Webdesign GbR Kenntnis von einem Ausfall der Webseite, informiert sie den Auftraggeber
              innerhalb von 24 Stunden an Werktagen über den Ausfall und den bekannten Grund.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Der Betrieb der Webseite ist an ein bestehendes Hosting bei der G&amp;A Webdesign GbR gebunden. Ein
              Betrieb der Webseite bei einem anderen Anbieter setzt eine Übergabe gemäß Abschnitt 15 bzw.
              Abschnitt 20 voraus.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Laufzeit, Kündigung und die Folgen der Beendigung des Hostings richten sich nach Abschnitt 20.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.29}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              9. Drittanbieter, Domains und Fremdleistungen
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die G&amp;A Webdesign GbR nutzt je nach Projekt Drittanbieter und externe Dienste, insbesondere
              GitHub, Vercel, Strato, Resend, EmailJS, Headless-CMS-Systeme (Sanity, Strapi), Datenbankdienste
              (Supabase), Cookie-Tools, Analyse-Tools oder vergleichbare technische Anbieter.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Leistungen Dritter sind, soweit einschlägig, als Fremdleistungen zu verstehen. Die G&amp;A
              Webdesign GbR haftet nicht für Ausfälle, Preisänderungen, Leistungsänderungen oder Einstellung
              solcher Drittleistungen, soweit diese nicht im eigenen Verantwortungsbereich liegen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Werden für ein Projekt kostenpflichtige externe Dienste eingebunden – beispielsweise
              Datenbankdienste (z. B. Supabase), E-Mail-Dienste (z. B. Resend, EmailJS), Headless-CMS-Dienste
              (z. B. Sanity, Strapi Cloud), Authentifizierungsdienste oder vergleichbare technische
              Infrastrukturleistungen –, werden die entstehenden Kosten
              im individuellen Angebot ausgewiesen. Der Auftraggeber stimmt mit Annahme des Angebots
              der Einbindung und der monatlichen Weitergabe dieser Kosten zu.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Derartige Drittkosten werden dem Auftraggeber monatlich gemäß dem im Angebot ausgewiesenen
              Betrag weiterberechnet. Dieser Betrag umfasst die anteiligen Kosten des jeweiligen Dienstes
              sowie eine Servicegebühr für Beschaffung, Einrichtung und Verwaltung. Da einzelne Dienste
              projektübergreifend genutzt werden können, erfolgt die Kalkulation auf Basis eines pauschalierten
              Anteils; der im Angebot genannte Betrag ist maßgeblich. Die Abrechnung beginnt mit Aufnahme
              des aktiven Betriebs des jeweiligen Dienstes.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Ändern sich die Preise eines eingesetzten Drittdienstes (z. B. Vercel, Resend, Sanity, Supabase),
              wird der weiterberechnete Betrag entsprechend angepasst: Er erhöht oder verringert sich in
              dem Umfang, in dem sich die zugrunde liegenden tatsächlichen Kosten des jeweiligen
              Drittdienstes ändern. Die enthaltene Servicegebühr bleibt hiervon unberührt und wird durch
              eine solche Anpassung nicht verändert. Senkt ein Drittanbieter seine Preise, wird die
              Kostenersparnis in gleicher Weise an den Auftraggeber weitergegeben.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Die G&amp;A Webdesign GbR informiert den Auftraggeber über eine solche Preisanpassung bis
              spätestens zum 15. eines Kalendermonats in Textform. Der angepasste Betrag gilt ab der
              darauffolgenden Zahlung, frühestens jedoch ab dem auf die Mitteilung folgenden Kalendermonat.
              Ist der Auftraggeber mit einer Erhöhung nicht einverstanden, kann er den betreffenden Dienst
              bis zum Wirksamwerden der Preisanpassung abbestellen; in diesem Fall entfällt die entsprechende
              Funktionalität und es wird kein erhöhter Betrag berechnet.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Domains werden grundsätzlich auf den Auftraggeber als Domaininhaber registriert. Domainkosten
              werden in tatsächlicher Höhe weiterberechnet. Die Herausgabe der Domain bei Vertragsende regelt
              Abschnitt 20.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.32}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              10. Wartungspakete für Webseiten
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-slate-200 text-[14px] font-medium mb-2">Basis – Preis gemäß aktueller Preisliste</p>
                <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1 pl-4 list-disc marker:text-brand">
                  <li>Überwachung</li>
                  <li>Meldung von Problemen</li>
                  <li>Beratung bei Problemen</li>
                  <li>Sicherheits- und Datenschutzupdates</li>
                  <li>Technische Instandhaltung</li>
                  <li>WCAG-Konformitätsinstandhaltung</li>
                </ul>
              </div>
              <div
                className="h-px"
                style={{ background: "rgba(77,190,243,0.08)" }}
              />
              <div>
                <p className="text-slate-200 text-[14px] font-medium mb-2">Erweitert – Preis gemäß aktueller Preisliste</p>
                <p className="text-slate-400 text-[13px] mb-2">Alle Leistungen aus Basis, zusätzlich:</p>
                <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1 pl-4 list-disc marker:text-brand">
                  <li>2 Inhaltsanpassungen pro Monat</li>
                </ul>
              </div>
              <div
                className="h-px"
                style={{ background: "rgba(77,190,243,0.08)" }}
              />
              <div>
                <p className="text-slate-200 text-[14px] font-medium mb-2">Erweitert+ – Preis gemäß aktueller Preisliste</p>
                <p className="text-slate-400 text-[13px] mb-2">Alle Leistungen aus Basis, zusätzlich:</p>
                <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1 pl-4 list-disc marker:text-brand">
                  <li>4 Inhaltsanpassungen pro Monat</li>
                  <li>1 Inhaltserweiterung pro Monat</li>
                </ul>
              </div>
            </div>

            <div
              className="h-px my-5"
              style={{ background: "rgba(77,190,243,0.08)" }}
            />

            <p className="text-slate-300 text-[14px] leading-relaxed">
              Das Monitoring beinhaltet eine monatliche Prüfung der Technik, Funktionalität und Visualität der
              Webseite sowie der vereinbarten Inhalte. Bei erkannten Problemen erfolgt eine Mitteilung und
              Beratung zu möglichen Lösungen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Die technische Instandhaltung umfasst insbesondere die Behebung veralteter Elemente oder
              technischer Fehler sowie erforderliche Anpassungen, wenn Komponenten, Bibliotheken,
              Browser-Updates oder projektbezogen genutzte Drittanbieter zu Funktionsstörungen, visuellen
              Beeinträchtigungen oder erheblichen Abweichungen der zugesagten Funktionalität führen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">Sicherheits- und Datenschutzupdates</strong> umfassen die
              technische Aktualisierung eingesetzter Komponenten und Dienste (z. B. Einwilligungs-Banner,
              Einbindung von Drittdiensten). Eine rechtliche Prüfung oder Aktualisierung von Rechtstexten ist
              nicht enthalten.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">WCAG-Konformitätsinstandhaltung</strong> bedeutet den Erhalt
              des bei Abnahme vereinbarten Barrierefreiheitsniveaus der von der G&amp;A Webdesign GbR erstellten
              Bestandteile; Abschnitt 2 gilt entsprechend.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">Inhaltsanpassungen</strong> sind Änderungen an bestehenden
              Elementen oder die strukturelle Duplizierung bestehender Inhalte, soweit hierfür keine Entwicklung
              neuer Elemente, Sektionen, Buttons oder Funktionen erforderlich ist.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">Inhaltserweiterungen</strong> sind Leistungen, die die
              Entwicklung neuer Elemente mit zusätzlichen Inhalten erfordern, insbesondere neue Sektionen,
              Unterseiten oder vergleichbare Inhaltserweiterungen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Nicht genutzte Anpassungen oder Erweiterungen verfallen jeweils zum Monatsende. Eine Übertragung
              in Folgemonate findet nicht statt.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Innerhalb der Geschäftszeiten Montag bis Freitag von 10:30 Uhr bis 18:00 Uhr reagiert die G&amp;A
              Webdesign GbR auf Störungsmeldungen innerhalb von 48 Stunden. Mit der Behebung wird spätestens
              24 Stunden nach dieser Reaktion begonnen, soweit die Ursache im tatsächlichen Einflussbereich der
              G&amp;A Webdesign GbR liegt. Eine bestimmte Dauer bis zur vollständigen Behebung wird nicht
              geschuldet, da diese von Art und Ursache der Störung abhängt.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.35}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              11. CMS-Pakete
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-slate-200 text-[14px] font-medium mb-2">Basis CMS – Preis gemäß aktueller Preisliste</p>
                <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1 pl-4 list-disc marker:text-brand">
                  <li>Individuelles CMS</li>
                  <li>CMS-Instandhaltung</li>
                  <li>Sicherheits- und Datenschutzupdates</li>
                  <li>Überwachung &amp; Meldung von Problemen</li>
                  <li>Beratung bei Problemen</li>
                  <li>Technische Instandhaltung</li>
                </ul>
              </div>
              <div
                className="h-px"
                style={{ background: "rgba(77,190,243,0.08)" }}
              />
              <div>
                <p className="text-slate-200 text-[14px] font-medium mb-2">Erweitert CMS – Preis gemäß aktueller Preisliste</p>
                <p className="text-slate-400 text-[13px] mb-2">Alle Leistungen aus Basis CMS, zusätzlich:</p>
                <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1 pl-4 list-disc marker:text-brand">
                  <li>1 Inhaltserweiterung pro Monat</li>
                </ul>
              </div>
            </div>

            <div
              className="h-px my-5"
              style={{ background: "rgba(77,190,243,0.08)" }}
            />

            <p className="text-slate-300 text-[14px] leading-relaxed">
              Je nach Projektumfang wird als Headless-CMS-System Sanity (bei kleineren Projekten) oder
              Strapi (bei größeren Projekten) eingesetzt. Die konkrete Systemauswahl wird im individuellen
              Angebot ausgewiesen. Entstehende Kosten des jeweiligen CMS-Dienstes werden gemäß Abschnitt 9
              weiterberechnet. Die Begriffsbestimmungen und Reaktionszeiten aus Abschnitt 10 gelten entsprechend.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Backups und Versionsstände werden projektspezifisch über GitHub-Repositories und, bei
              CMS-Projekten, zusätzlich über das jeweils eingesetzte CMS-System abgesichert.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Für Inhalte, die der Auftraggeber selbst im CMS erstellt, überarbeitet oder hochlädt, bleibt
              allein der Auftraggeber verantwortlich. Dies gilt insbesondere für Texte, Fotos, Videos,
              Dokumente und sonstige Medieninhalte.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.38}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              12. SEO-Grundleistungen
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Im Rahmen der Webseiten-Erstellung sind technische SEO-Grundleistungen enthalten, soweit nicht
              ausdrücklich etwas anderes vereinbart wird.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Hierzu zählen insbesondere Meta-Beschreibungen, die technische Strukturierung und Entwicklung
              der Webseite nach SEO-Richtlinien einschließlich Usability und Barrierefreiheit, die Integration
              einer Sitemap sowie deren Einreichung bei Google Search Console.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Ein bestimmtes Ranking, eine bestimmte Sichtbarkeit oder ein wirtschaftlicher Erfolg werden
              nicht geschuldet.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.41}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              13. Vergütung und Zahlungsbedingungen
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Alle genannten Preise verstehen sich als Nettopreise zuzüglich der jeweils geltenden
              gesetzlichen Umsatzsteuer.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Für die Erstellung von Webseiten gilt, sofern nicht anders vereinbart, folgende Zahlungsregelung
              auf Basis von Abschlägen:
            </p>
            <ul className="text-slate-300 text-[14px] leading-relaxed space-y-2 pl-4 list-disc marker:text-brand mt-3">
              <li>
                Die Vergütung wird projektbezogen nach abgeschlossenen Teilschritten bzw. Projektphasen
                abgerechnet.
              </li>
              <li>
                Nach Abschluss und Freigabe eines vereinbarten Projektabschnitts stellt die G&amp;A Webdesign GbR
                einen entsprechenden Abschlag in Rechnung.
              </li>
              <li>
                Der jeweils nächste Projektabschnitt beginnt erst nach vollständigem Zahlungseingang des zuvor
                gestellten Abschlags.
              </li>
              <li>
                Die Höhe, Reihenfolge und Anzahl der Abschläge ergeben sich aus dem individuellen Angebot, der
                Leistungsbeschreibung oder der sonstigen vertraglichen Vereinbarung.
              </li>
            </ul>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Einmalige Projektrechnungen sind innerhalb von 10 Tagen ab Rechnungsdatum ohne Abzug zur Zahlung
              fällig.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Monatliche Gebühren für Hosting, Wartung, CMS oder sonstige laufende Leistungen sind jeweils im
              Voraus bis zum 3. Werktag eines Kalendermonats fällig.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Wird ein Projekt durch den Auftraggeber vorzeitig beendet oder abgebrochen, ist die G&amp;A
              Webdesign GbR berechtigt, die bis zu diesem Zeitpunkt erbrachten Leistungen nach tatsächlichem
              Aufwand zu vergüten sowie bereits entstandene Kosten in Rechnung zu stellen. Ein weitergehender
              Anspruch nach § 648 BGB bleibt unberührt.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Preise für laufende monatliche Leistungen (Hosting, Wartungspakete, CMS-Pakete) können von der
              G&amp;A Webdesign GbR mit einer Ankündigungsfrist von sechs Wochen in Textform angepasst werden.
              Der Auftraggeber ist berechtigt, den betroffenen Vertrag in diesem Fall mit Wirkung zum
              Inkrafttreten der Preisänderung zu kündigen.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.44}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              14. Zahlungsverzug, Sperrung und Wiederfreischaltung
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Gerät der Auftraggeber mit einer fälligen Zahlung in Verzug, gelten die gesetzlichen
              Verzugsregelungen. Für Geschäfte zwischen Unternehmern können insbesondere die gesetzlichen
              Verzugszinsen sowie die Verzugspauschale nach § 288 Abs. 5 BGB verlangt werden.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Befindet sich der Auftraggeber mit der Zahlung einer fälligen Rate oder mit monatlichen Gebühren
              für mindestens zwei aufeinanderfolgende Monate oder in Höhe von zwei Monatsbeträgen in Verzug,
              ist die G&amp;A Webdesign GbR berechtigt, nach vorheriger Ankündigung und angemessener
              Fristsetzung in Textform Leistungen auszusetzen und die Webseite vorübergehend offline zu schalten.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Die Zahlungspflicht für die vereinbarten laufenden Leistungen bleibt während einer berechtigten
              Sperrung bestehen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Für die Wiederfreischaltung nach Ausgleich offener Forderungen kann der hierfür entstehende
              Aufwand nach tatsächlichem Zeitaufwand gemäß dem im Angebot vereinbarten Stundensatz berechnet
              werden.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Der Auftraggeber ist zur Aufrechnung mit eigenen Forderungen nur berechtigt, soweit diese
              unbestritten oder rechtskräftig festgestellt sind. Ein Zurückbehaltungsrecht steht dem
              Auftraggeber nur zu, soweit es auf demselben Vertragsverhältnis beruht.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.47}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              15. Urheberrecht und Nutzungsrechte
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Verträge über die Erstellung von Webseiten sind Werkverträge, die auf die Einräumung von
              Nutzungsrechten an den Arbeitsergebnissen gerichtet sind. Das Hosting ist eine Dienstleistung;
              Wartungs- und CMS-Pakete enthalten dienst- und werkvertragliche Elemente.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Die Urheberrechte an allen im Rahmen des Projekts erstellten Werken, insbesondere Quellcode,
              Designs, Grafiken und technische Dokumentationen, verbleiben bei den jeweiligen Urhebern. Die
              G&amp;A Webdesign GbR hält hieran sämtliche ausschließlichen Nutzungsrechte.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Der Auftraggeber erhält erst nach vollständiger Bezahlung der vereinbarten Vergütung ein
              einfaches, nicht übertragbares Nutzungsrecht an der erstellten Webseite. Dieses berechtigt zum
              Betrieb der Webseite im Rahmen des Hostings durch die G&amp;A Webdesign GbR für die Dauer des
              Hostingvertrags. Der Auftraggeber erwirbt kein Eigentum an der Webseite oder am Quellcode.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Auf Wunsch des Auftraggebers erfolgt eine <strong className="text-slate-200">Projektübergabe</strong> gegen
              Zahlung einer Übergabepauschale. Sie umfasst die Herausgabe des Quellcodes in lauffähiger Form
              sowie der technischen Dokumentation. Mit Zahlung der Pauschale erweitert sich das Nutzungsrecht
              des Auftraggebers auf den zeitlich unbeschränkten Betrieb bei einem Anbieter seiner Wahl sowie auf
              die Bearbeitung durch ihn selbst oder durch von ihm beauftragte Dritte. Die Höhe der
              Übergabepauschale wird im individuellen Angebot ausgewiesen; enthält das Angebot keine Angabe,
              wird sie vor der Übergabe in Textform vereinbart.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Ohne Projektübergabe bedarf eine Weitergabe des Quellcodes oder des Nutzungsrechts an Dritte,
              insbesondere an andere Agenturen oder Dienstleister, der vorherigen Zustimmung der G&amp;A
              Webdesign GbR in Textform. Eine Übertragung von Urheberrechten findet nicht statt.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Kündigt die G&amp;A Webdesign GbR das Hosting ordentlich, erfolgt die Projektübergabe
              kostenfrei gemäß Abschnitt 20.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Die Regelungen dieses Abschnitts gelten als vertragliche Vereinbarung auch insoweit, als einzelne
              Arbeitsergebnisse – etwa unter Einsatz von KI-Werkzeugen erstellte Bestandteile – keinen
              urheberrechtlichen Schutz genießen. Die G&amp;A Webdesign GbR bleibt berechtigt, allgemeine,
              nicht kundenspezifische Komponenten, Bibliotheken und Know-how in anderen Projekten zu verwenden.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Verwendete Open-Source-Komponenten und Drittinhalte unterliegen den jeweils geltenden
              Lizenzbedingungen der jeweiligen Rechteinhaber.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.5}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              16. Referenznutzung und Footer-Hinweis
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die G&amp;A Webdesign GbR ist berechtigt, abgeschlossene Projekte als Referenz zu verwenden und
              dabei insbesondere Name, Logo, Screenshot, Screencast und Projektbeschreibung des Auftraggebers
              auf der eigenen Website, Social Media oder Präsentationen zu veröffentlichen, soweit keine
              zwingenden berechtigten Interessen des Auftraggebers entgegenstehen. Dies gilt standardmäßig,
              sofern kein abweichendes Einvernehmen in Textform vereinbart wurde. Der Auftraggeber kann der
              künftigen Referenznutzung aus berechtigtem Grund in Textform widersprechen; bereits erstellte
              Druck- oder Präsentationsmaterialien bleiben davon unberührt.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Die G&amp;A Webdesign GbR ist berechtigt, auf der erstellten Webseite im Footer einen
              standardisierten Hinweis wie „Erstellt von G&amp;A Webdesign“ einschließlich verlinktem
              Logobutton auf die eigene Website anzubringen. Dieser Hinweis ist Bestandteil des
              Standardleistungsumfangs. Ein Verzicht auf den Hinweis kann im Angebot gegen gesonderte
              Vergütung vereinbart werden.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.53}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              17. Einsatz von KI-Tools
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die G&amp;A Webdesign GbR nutzt im Rahmen ihrer Leistungen verschiedene KI-gestützte Tools und
              Dienste, insbesondere von Anbietern wie Anthropic, OpenAI und Google; weitere Anbieter können bei
              Bedarf ergänzt werden.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Diese KI-Modelle können insbesondere für Gestaltung, Erstellung von Code, Planung sowie weitere
              Prozesse im Rahmen der Website-Erstellung und -Optimierung eingesetzt werden.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Zugangsdaten, Passwörter, API-Keys und sonstige Credentials werden nicht als Klartext direkt
              in KI-Systeme eingegeben oder übermittelt. Solche Daten werden ausschließlich in sicheren,
              isolierten Umgebungen gespeichert – insbesondere als verschlüsselte Secrets in
              GitHub-Repositories oder vergleichbaren Systemen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Der Einsatz KI-gestützter Entwicklungswerkzeuge mit kontrollierten Systemzugriffen (z. B. über
              MCP-Schnittstellen zu Datenbankdiensten wie Supabase) ist möglich, sofern Credentials dabei
              nicht im Klartext an das KI-Modell übertragen werden. Personenbezogene oder vertrauliche
              Kundendaten werden in diesem Rahmen nur in dem Umfang verarbeitet, der für die jeweilige
              Entwicklungsaufgabe erforderlich ist; Abschnitt 18 gilt entsprechend.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.56}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              18. Datenschutz und Auftragsverarbeitung
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Soweit die G&amp;A Webdesign GbR im Rahmen von Hosting, Wartung, CMS, Formularen, Datenbanken oder
              sonstigen Leistungen personenbezogene Daten im Auftrag des Auftraggebers verarbeitet – etwa Daten
              der Besucher der Webseite oder über Formulare übermittelte Anfragen –, schließen die Parteien einen
              Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO (AVV). Die G&amp;A Webdesign GbR stellt
              diesen mit dem Angebot bzw. auf Anfrage bereit. Bei Widersprüchen geht der AVV diesen AGB vor.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Der Auftraggeber stimmt dem Einsatz folgender Unterauftragsverarbeiter zu, soweit diese im
              jeweiligen Projekt genutzt werden:
            </p>
            <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1.5 pl-4 list-disc marker:text-brand mt-3">
              <li>GitHub (USA) – Code-Verwaltung, Backups, Hosting über GitHub Pages</li>
              <li>Vercel (USA) – Hosting und Auslieferung von Webseiten</li>
              <li>Strato (Deutschland) – Domains, DNS und E-Mail</li>
              <li>Resend (USA) – Versand von E-Mails, z. B. aus Kontaktformularen</li>
              <li>EmailJS (Vereinigtes Königreich) – Versand von E-Mails aus Kontaktformularen</li>
              <li>Sanity (Norwegen) bzw. Strapi (Frankreich) – Headless-CMS</li>
              <li>Supabase (USA) – Datenbanken und Authentifizierung</li>
              <li>Anthropic, OpenAI, Google (USA) – KI-gestützte Entwicklungswerkzeuge gemäß Abschnitt 17</li>
            </ul>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Übermittlungen in Länder außerhalb der EU bzw. des EWR erfolgen nur auf Grundlage eines
              Angemessenheitsbeschlusses der EU-Kommission (z. B. EU-US Data Privacy Framework) oder geeigneter
              Garantien wie Standardvertragsklauseln. Über die Hinzuziehung oder den Austausch von
              Unterauftragsverarbeitern informiert die G&amp;A Webdesign GbR den Auftraggeber vorab in Textform;
              der Auftraggeber kann der Änderung innerhalb von 14 Tagen aus wichtigem datenschutzrechtlichem
              Grund widersprechen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Für die Datenschutzerklärung seiner Webseite und die Rechtmäßigkeit der Datenverarbeitung bleibt
              der Auftraggeber als Verantwortlicher zuständig. Die G&amp;A Webdesign GbR stellt ihm auf Anfrage
              die technischen Angaben zu den eingesetzten Diensten zur Verfügung.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.59}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              19. Haftung
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die G&amp;A Webdesign GbR haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei Schäden
              aus der Verletzung des Lebens, des Körpers oder der Gesundheit, bei arglistigem Verschweigen eines
              Mangels, bei Übernahme einer Garantie sowie nach dem Produkthaftungsgesetz.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Bei leichter Fahrlässigkeit haftet die G&amp;A Webdesign GbR nur bei Verletzung wesentlicher
              Vertragspflichten, also solcher Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des
              Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Auftraggeber regelmäßig vertrauen
              darf. In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden beschränkt.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Soweit sie nicht auf einer von der G&amp;A Webdesign GbR zu vertretenden Pflichtverletzung beruhen,
              besteht insbesondere keine Haftung für:
            </p>
            <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1.5 pl-4 list-disc marker:text-brand mt-3">
              <li>Vom Auftraggeber bereitgestellte oder selbst gepflegte Inhalte</li>
              <li>Rechtliche Zulässigkeit von Inhalten</li>
              <li>Rechtswidrige Nutzung der Website durch den Auftraggeber</li>
              <li>Änderungen durch den Auftraggeber oder Dritte</li>
              <li>Ausfälle, Störungen oder Leistungsänderungen von Drittanbietern außerhalb des eigenen Einflussbereichs</li>
              <li>Fehlende oder verspätete Mitwirkung des Auftraggebers</li>
              <li>Rechtliche Prüfung von Impressum, Datenschutzerklärung, Cookie-Texten oder sonstigen Rechtstexten, sofern nicht ausdrücklich vereinbart</li>
            </ul>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Für den Verlust von Daten haftet die G&amp;A Webdesign GbR im Rahmen der vorstehenden Absätze nur
              in Höhe des Aufwands, der bei ordnungsgemäßer Datensicherung für die Wiederherstellung erforderlich
              gewesen wäre.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Ohne gesonderten Wartungsvertrag besteht nach Abnahme keine dauerhafte Pflicht zur Aktualisierung,
              Sicherheitsüberwachung, Kompatibilitätsanpassung oder Wiederherstellung der Webseite.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.62}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              20. Laufzeit, Kündigung und Vertragsende
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Laufende Leistungen wie Hosting, Wartungs- und CMS-Pakete werden auf unbestimmte Zeit
              geschlossen. Kündigungen bedürfen der Textform (z. B. E-Mail).
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">Kündigung durch den Auftraggeber:</strong> Der Auftraggeber kann
              laufende Leistungen bis zum 15. eines Monats zum Ende desselben Monats kündigen. Der laufende Monat
              ist vollständig zu vergüten.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">Kündigung durch die G&amp;A Webdesign GbR:</strong> Die G&amp;A
              Webdesign GbR kann laufende Leistungen mit einer Frist von drei Monaten zum Monatsende ordentlich
              kündigen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Kündigt die G&amp;A Webdesign GbR das Hosting ordentlich oder stellt sie ihren Geschäftsbetrieb ein,
              bleibt die Webseite bis zum Vertragsende online. Der Auftraggeber erhält auf Wunsch rechtzeitig vor
              Vertragsende <strong className="text-slate-200">kostenfrei</strong> den Quellcode in lauffähiger
              Form, die technische Dokumentation sowie seine Inhalte. Sein Nutzungsrecht erweitert sich in diesem
              Fall – ohne Übergabepauschale – auf den zeitlich unbeschränkten Betrieb bei einem Anbieter seiner
              Wahl sowie auf die Bearbeitung durch ihn selbst oder beauftragte Dritte. Voraussetzung ist der
              Ausgleich aller bis dahin fälligen Forderungen. Eine darüber hinausgehende Unterstützung beim Umzug
              zu einem anderen Anbieter erfolgt auf Wunsch gegen Vergütung nach Aufwand.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">Kündigung aus wichtigem Grund:</strong> Das Recht beider
              Parteien zur außerordentlichen Kündigung bleibt unberührt. Ein wichtiger Grund für die G&amp;A
              Webdesign GbR liegt insbesondere vor, wenn der Auftraggeber trotz Fristsetzung mit Zahlungen im
              Sinne von Abschnitt 14 in Verzug bleibt, wenn er trotz Aufforderung rechtswidrige Inhalte nicht
              entfernt oder wenn er wiederholt gegen wesentliche Vertragspflichten verstößt. In diesen Fällen
              besteht kein Anspruch auf kostenfreie Übergabe; eine Projektübergabe ist nur nach Ausgleich aller
              offenen Forderungen und gegen Zahlung der Übergabepauschale nach Abschnitt 15 möglich.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Mit Beendigung des Hostings enden zugleich alle darauf aufbauenden Wartungs- und CMS-Pakete zum
              selben Zeitpunkt. Wartungs- und CMS-Pakete können dagegen einzeln gekündigt werden, ohne dass das
              Hosting endet.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">Folgen der Beendigung:</strong> Erfolgt keine Projektübergabe,
              wird die Webseite zum Vertragsende offline genommen. Die vom Auftraggeber bereitgestellten oder über
              das CMS eingepflegten Inhalte – insbesondere Texte, Bilder und Dokumente – stellt die G&amp;A
              Webdesign GbR auf Anforderung innerhalb von 30 Tagen nach Vertragsende in einem üblichen Format zur
              Verfügung; danach werden sie gelöscht, soweit keine gesetzlichen Aufbewahrungspflichten
              entgegenstehen. Dies umfasst nicht den Quellcode, das Design oder die technische Umsetzung der
              Webseite, soweit nicht eine Übergabe nach Abschnitt 15 oder nach diesem Abschnitt erfolgt.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              <strong className="text-slate-200">Domain:</strong> Unabhängig vom Grund der Beendigung gibt die
              G&amp;A Webdesign GbR die Domain an den Auftraggeber heraus, insbesondere durch Mitteilung des
              Auth-Codes oder Mitwirkung beim Providerwechsel, sofern die Domainkosten bis zum Vertragsende
              beglichen sind. Veranlasst der Auftraggeber innerhalb von 30 Tagen nach Vertragsende keinen
              Transfer, darf die G&amp;A Webdesign GbR die Domain nach erneuter Aufforderung in Textform mit einer
              Frist von 14 Tagen kündigen; bis dahin anfallende Domainkosten trägt der Auftraggeber.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.65}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              21. Änderungen dieser AGB
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die G&amp;A Webdesign GbR kann diese AGB für laufende Leistungen mit Wirkung für die Zukunft
              ändern, soweit dies aufgrund geänderter rechtlicher Rahmenbedingungen, technischer Entwicklungen
              oder geänderter Leistungen eingesetzter Drittanbieter erforderlich ist. Die Änderungen werden dem
              Auftraggeber mindestens sechs Wochen vor ihrem Inkrafttreten in Textform mitgeteilt.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Widerspricht der Auftraggeber nicht bis zum Inkrafttreten in Textform, gelten die Änderungen als
              angenommen; auf diese Folge wird in der Mitteilung gesondert hingewiesen. Widerspricht der
              Auftraggeber, gelten die bisherigen Bedingungen fort; beide Parteien können den betroffenen Vertrag
              dann zum Inkrafttreten der Änderung kündigen. Änderungen, die das Verhältnis von Leistung und
              Vergütung wesentlich verändern, bedürfen stets der ausdrücklichen Zustimmung des Auftraggebers.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.68}>
          <Card>
            <div className="text-brand text-[12px] tracking-[0.25em] mb-4">
              22. Schlussbestimmungen
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Ist der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches
              Sondervermögen, ist Triberg (Sitz der G&amp;A Webdesign GbR) Gerichtsstand für alle Streitigkeiten
              aus und im Zusammenhang mit dem Vertragsverhältnis, soweit gesetzlich zulässig.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Soweit diese AGB Textform verlangen, genügt eine Erklärung per E-Mail.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, bleibt
              die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </Card>
        </FadeIn>

      </div>
    </main>
  );
}
