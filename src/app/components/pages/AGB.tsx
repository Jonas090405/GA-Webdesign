import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";

export function AGB() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-5 sm:px-6 pt-28 sm:pt-32 pb-12">
      <FadeIn>
        <SectionLabel>Rechtliches</SectionLabel>
        <h1 className="text-white text-[clamp(32px,6vw,64px)] tracking-tight leading-[1.05]">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="mt-4 text-slate-400 text-[14px]">
          G&amp;A Webdesign GbR · Stand: Juni 2026
        </p>
      </FadeIn>

      <div className="mt-10 sm:mt-12 space-y-5 sm:space-y-6">

        <FadeIn delay={0.05}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
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
              Vertragsbestandteil, es sei denn, ihrer Geltung wurde ausdrücklich schriftlich zugestimmt.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.08}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              2. Leistungen
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed mb-3">
              Die G&amp;A Webdesign GbR erbringt insbesondere folgende Leistungen:
            </p>
            <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1.5 pl-4 list-disc marker:text-sky-400">
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
              dem Wartungspaket oder sonstigen vertraglichen Vereinbarungen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Rechtliche Beratung, insbesondere zu Wettbewerbsrecht, Datenschutzrecht, Impressumspflichten,
              branchenspezifischen Informationspflichten oder sonstigen rechtlichen Anforderungen, ist nicht
              geschuldet, sofern nicht ausdrücklich schriftlich etwas anderes vereinbart wurde.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.11}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              3. Vertragsschluss
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Angebote der G&amp;A Webdesign GbR sind freibleibend, sofern sie nicht ausdrücklich als verbindlich
              bezeichnet sind.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Ein Vertrag kommt durch Annahme eines Angebots, durch schriftliche Bestätigung oder durch Beginn
              der Leistungserbringung zustande.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.14}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
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
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              5. Freistellung
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Der Auftraggeber stellt die G&amp;A Webdesign GbR von sämtlichen Ansprüchen Dritter frei, die
              aufgrund von vom Auftraggeber bereitgestellten Inhalten, Daten, Rechten oder Weisungen gegen die
              G&amp;A Webdesign GbR geltend gemacht werden. Dies umfasst auch angemessene Kosten der
              Rechtsverteidigung.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
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
          </Card>
        </FadeIn>

        <FadeIn delay={0.23}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              7. Hosting
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Hosting wird ausschließlich für von der G&amp;A Webdesign GbR erstellte Projekte angeboten.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Das Hosting bei vorhandener Domain kostet 10 EUR pro Monat. Bei gewünschter Domain-Beschaffung
              und Einrichtung beträgt das Hosting ebenfalls 10 EUR pro Monat, zuzüglich der tatsächlichen
              Domainkosten entsprechend der gewünschten Domain sowie einer einmaligen Einrichtungspauschale
              von 60 EUR.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Im Rahmen des Hostings wird mindestens einmal monatlich geprüft, ob die Webseite online erreichbar
              ist. Auftretende Probleme im Einflussbereich der G&amp;A Webdesign GbR werden bearbeitet. Bei
              Ausfällen der Webseite verpflichtet sich die G&amp;A Webdesign GbR, den Auftraggeber innerhalb von
              24 Stunden an Werktagen über den Ausfall und den bekannten Grund zu informieren.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Hosting-Verträge sind monatlich kündbar. Die Kündigung muss bis zum 15. eines Monats für das
              Ende desselben Monats erklärt werden. Der laufende Monat ist in jedem Fall vollständig zu
              vergüten.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Nach Beendigung des Hostings wird die Webseite zum Ablauf des Vertragszeitraums offline genommen.
              Der Quellcode wird dem Auftraggeber auf Wunsch herausgegeben. Unterstützungsleistungen für einen
              Umzug oder Wechsel des Hostings können gesondert vergütet werden.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.26}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              8. Drittanbieter, Domains und Fremdleistungen
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die G&amp;A Webdesign GbR nutzt je nach Projekt Drittanbieter und externe Dienste, insbesondere
              GitHub, Vercel, Strato, Cookie-Tools, Analyse-Tools, CMS-Dienste, EmailJS oder vergleichbare
              technische Anbieter.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Leistungen Dritter sind, soweit einschlägig, als Fremdleistungen zu verstehen. Die G&amp;A
              Webdesign GbR haftet nicht für Ausfälle, Preisänderungen, Leistungsänderungen oder Einstellung
              solcher Drittleistungen, soweit diese nicht im eigenen Verantwortungsbereich liegen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Werden für ein Projekt kostenpflichtige externe Dienste eingebunden – beispielsweise
              Datenbankdienste (z. B. Supabase), E-Mail-Dienste (z. B. EmailJS), Authentifizierungsdienste
              oder vergleichbare technische Infrastrukturleistungen –, werden die entstehenden Kosten
              im individuellen Angebot ausgewiesen. Der Auftraggeber stimmt mit Annahme des Angebots
              der Einbindung und der monatlichen Weitergabe dieser Kosten zu.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Derartige Drittkosten werden dem Auftraggeber monatlich gemäß dem im Angebot ausgewiesenen
              Betrag weiterberechnet. Dieser Betrag umfasst die anteiligen Kosten des jeweiligen Dienstes
              sowie eine Servicegebühr für Beschaffung, Einrichtung und Verwaltung. Da einzelne Dienste
              projektübergreifend genutzt werden können, erfolgt die Kalkulation auf Basis eines pauschalierten
              Anteils; der im Angebot genannte Betrag ist maßgeblich. Die Abrechnung beginnt mit Aufnahme
              des aktiven Betriebs des jeweiligen Dienstes. Ändern sich die Konditionen eines eingesetzten
              Drittdienstes wesentlich, informiert die G&amp;A Webdesign GbR den Auftraggeber rechtzeitig;
              der angepasste Betrag gilt ab dem folgenden Abrechnungsmonat. Ist der Auftraggeber mit der
              Anpassung nicht einverstanden, kann er den betreffenden Dienst mit einer Frist von 30 Tagen
              zum nächsten Monatsende abbestellen; die entsprechende Funktionalität entfällt in diesem Fall.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Domains werden grundsätzlich auf den Auftraggeber registriert. Domainkosten werden in
              tatsächlicher Höhe weiterberechnet.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.29}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              9. Wartungspakete für Webseiten
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-slate-200 text-[14px] font-medium mb-2">Basis – Preis gemäß aktueller Preisliste</p>
                <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1 pl-4 list-disc marker:text-sky-400">
                  <li>Überwachung</li>
                  <li>Meldung von Problemen</li>
                  <li>Beratung bei Problemen</li>
                  <li>Sicherheitsupdates</li>
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
                <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1 pl-4 list-disc marker:text-sky-400">
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
                <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1 pl-4 list-disc marker:text-sky-400">
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
              Reaktionszeiten von 48 Stunden und Behebungszeiten von 24 Stunden gelten innerhalb der
              Geschäftszeiten Montag bis Freitag von 10:30 Uhr bis 18:00 Uhr, soweit die Ursache des Problems
              im tatsächlichen Einflussbereich der G&amp;A Webdesign GbR liegt.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.32}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              10. CMS-Pakete
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-slate-200 text-[14px] font-medium mb-2">Nur CMS – Preis gemäß aktueller Preisliste</p>
                <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1 pl-4 list-disc marker:text-sky-400">
                  <li>Ein auf den Auftraggeber zugeschnittenes CMS</li>
                </ul>
              </div>
              <div
                className="h-px"
                style={{ background: "rgba(77,190,243,0.08)" }}
              />
              <div>
                <p className="text-slate-200 text-[14px] font-medium mb-2">Basis CMS – Preis gemäß aktueller Preisliste</p>
                <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1 pl-4 list-disc marker:text-sky-400">
                  <li>Individuelles CMS</li>
                  <li>CMS-Instandhaltung</li>
                  <li>Sicherheitsupdates</li>
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
                <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1 pl-4 list-disc marker:text-sky-400">
                  <li>1 Inhaltserweiterung pro Monat</li>
                </ul>
              </div>
            </div>

            <div
              className="h-px my-5"
              style={{ background: "rgba(77,190,243,0.08)" }}
            />

            <p className="text-slate-300 text-[14px] leading-relaxed">
              Backups und Versionsstände werden projektspezifisch insbesondere über GitHub-Repositories und,
              bei CMS-Projekten, zusätzlich über Strapi Cloud oder vergleichbare Systeme abgesichert.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Für Inhalte, die der Auftraggeber selbst im CMS erstellt, überarbeitet oder hochlädt, bleibt
              allein der Auftraggeber verantwortlich. Dies gilt insbesondere für Texte, Fotos, Videos,
              Dokumente und sonstige Medieninhalte.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.35}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              11. SEO-Grundleistungen
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

        <FadeIn delay={0.38}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              12. Vergütung und Zahlungsbedingungen
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Für die Erstellung von Webseiten gilt, sofern nicht anders vereinbart, folgende Zahlungsstaffel:
            </p>
            <ul className="text-slate-300 text-[14px] leading-relaxed space-y-2 pl-4 list-disc marker:text-sky-400 mt-3">
              <li>
                <strong className="text-slate-200">40 %</strong> der Gesamtvergütung werden als Anzahlung
                unmittelbar nach Vertragsschluss und Rechnungsstellung fällig. Die G&amp;A Webdesign GbR ist
                berechtigt, mit den Arbeiten erst nach vollständigem Zahlungseingang zu beginnen.
              </li>
              <li>
                <strong className="text-slate-200">60 %</strong> der Gesamtvergütung werden nach erfolgreicher
                Abnahme oder Eintritt der Abnahmefiktion und Erhalt der Schlussrechnung fällig.
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
          </Card>
        </FadeIn>

        <FadeIn delay={0.41}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              13. Zahlungsverzug, Sperrung und Wiederfreischaltung
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
              Fristsetzung Leistungen auszusetzen und die Webseite vorübergehend offline zu schalten.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Die Zahlungspflicht für die vereinbarten laufenden Leistungen bleibt während einer berechtigten
              Sperrung bestehen.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Für die Wiederfreischaltung nach Ausgleich offener Forderungen kann eine angemessene Gebühr
              gemäß aktueller Preisliste erhoben werden.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.44}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              14. Urheberrecht und Nutzungsrechte
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Jeder der Agentur erteilte Auftrag ist ein Werkvertrag, der auf die Einräumung von Nutzungsrechten
              an den Werkleistungen gerichtet ist. Ausgenommen hiervon ist die Dienstleistung des Hostings.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Alle im Rahmen des Projekts erstellten Werke, insbesondere Quellcode, Designs, Grafiken und
              technische Dokumentationen, bleiben urheberrechtlich im Eigentum der G&amp;A Webdesign GbR.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Der Auftraggeber erhält erst nach vollständiger Bezahlung der vereinbarten Vergütung ein
              einfaches, nicht übertragbares Nutzungsrecht an der erstellten Website. Der Auftraggeber erwirbt
              kein Eigentum an der Website oder am Quellcode, sondern lediglich ein Nutzungsrecht zur
              vertragsgemäßen Verwendung.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Eine Übertragung der Urheberrechte findet nicht statt. Eine Weitergabe des Quellcodes oder des
              Nutzungsrechts an Dritte, insbesondere an andere Agenturen oder Dienstleister, bedarf der
              vorherigen schriftlichen Zustimmung der G&amp;A Webdesign GbR und ist nur gegen Zahlung einer
              gesonderten Übergabepauschale möglich.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Im Falle einer Projektübergabe an Dritte wird eine Übergabepauschale fällig. Diese umfasst die
              Herausgabe des Quellcodes sowie der technischen Dokumentation. Die Höhe der Pauschale wird
              gesondert vereinbart.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Verwendete Open-Source-Komponenten und Drittinhalte unterliegen den jeweils geltenden
              Lizenzbedingungen der jeweiligen Rechteinhaber.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.47}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              15. Referenznutzung und Footer-Hinweis
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die G&amp;A Webdesign GbR ist berechtigt, abgeschlossene Projekte als Referenz zu verwenden und
              dabei insbesondere Name, Logo, Screenshot, Screencast und Projektbeschreibung des Auftraggebers
              auf der eigenen Website, Social Media oder Präsentationen zu veröffentlichen, soweit keine
              zwingenden berechtigten Interessen des Auftraggebers entgegenstehen. Dies gilt standardmäßig,
              sofern keine zusätzliche Vereinbarung mit dem Auftragnehmer schriftlich vereinbart wurde.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Die G&amp;A Webdesign GbR ist berechtigt, auf der erstellten Webseite im Footer einen
              standardisierten Hinweis wie „Erstellt von G&amp;A Webdesign" einschließlich verlinktem
              Logobutton auf die eigene Website anzubringen. Dieser Hinweis ist Bestandteil des
              Standardleistungsumfangs.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.5}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              16. Einsatz von KI-Tools
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
              Entwicklungsaufgabe erforderlich ist.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.53}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              17. Haftung
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Die G&amp;A Webdesign GbR haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei
              Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Bei leichter Fahrlässigkeit haftet die G&amp;A Webdesign GbR nur bei Verletzung wesentlicher
              Vertragspflichten, beschränkt auf den vertragstypischen, vorhersehbaren Schaden.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Keine Haftung besteht insbesondere für:
            </p>
            <ul className="text-slate-300 text-[14px] leading-relaxed space-y-1.5 pl-4 list-disc marker:text-sky-400 mt-3">
              <li>Vom Auftraggeber bereitgestellte oder selbst gepflegte Inhalte</li>
              <li>Rechtliche Zulässigkeit von Inhalten</li>
              <li>Rechtswidrige Nutzung der Website durch den Auftraggeber</li>
              <li>Änderungen durch den Auftraggeber oder Dritte</li>
              <li>Ausfälle, Störungen oder Leistungsänderungen von Drittanbietern außerhalb des eigenen Einflussbereichs</li>
              <li>Fehlende oder verspätete Mitwirkung des Auftraggebers</li>
              <li>Rechtliche Prüfung von Impressum, Datenschutzerklärung, Cookie-Texten oder sonstigen Rechtstexten, sofern nicht ausdrücklich vereinbart</li>
            </ul>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Ohne gesonderten Wartungsvertrag besteht nach Abnahme keine dauerhafte Pflicht zur Aktualisierung,
              Sicherheitsüberwachung, Kompatibilitätsanpassung oder Wiederherstellung der Webseite.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.56}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              18. Laufzeit und Kündigung laufender Leistungen
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Laufende Leistungen wie Hosting, Wartung und CMS-Pakete sind monatlich kündbar. Die Kündigung
              muss bis zum 15. eines Monats erklärt werden, um zum Ende desselben Monats wirksam zu werden.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={0.59}>
          <Card>
            <div className="text-sky-400 text-[12px] tracking-[0.25em] uppercase mb-4">
              19. Schlussbestimmungen
            </div>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
            </p>
            <p className="text-slate-300 text-[14px] leading-relaxed mt-3">
              Ist der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches
              Sondervermögen, ist der Sitz der G&amp;A Webdesign GbR Gerichtsstand für alle Streitigkeiten aus
              und im Zusammenhang mit dem Vertragsverhältnis, soweit gesetzlich zulässig.
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
