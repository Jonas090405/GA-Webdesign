import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { PrimaryButton } from "../Button";
import { FadeIn } from "../FadeIn";
import { Palette, Code2, Rocket, CheckCircle2, MessageCircle, PenTool, RefreshCw, CheckSquare, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const timelineSteps = [
  {
    icon: MessageCircle,
    step: "1",
    title: "Erstgespräch",
    desc: "Wir reden ganz entspannt über dein Projekt. Was brauchst du? Was soll die Website können? Wie soll sie aussehen? Du musst kein Experte sein – ich erkläre alles verständlich und höre erst mal zu.",
    tag: "kostenlos & unverbindlich",
  },
  {
    icon: PenTool,
    step: "2",
    title: "Design & Umsetzung",
    desc: "Ich erstelle das Design und setze alles technisch um. Dabei habe ich deine Wünsche, deine Kunden und dein Ziel immer im Blick.",
    tag: "du musst nichts tun",
  },
  {
    icon: MessageCircle,
    step: "3",
    title: "2. Gespräch – Dein Feedback",
    desc: "Ich zeige dir, wie deine Website bisher aussieht. Du sagst mir direkt, was dir gefällt und was du gerne anders hättest. Kein Vorwissen nötig – dein Gefühl zählt.",
    tag: "deine Meinung ist wichtig",
  },
  {
    icon: RefreshCw,
    step: "4",
    title: "1. Überarbeitung",
    desc: "Dein Feedback setze ich Schritt für Schritt um. Ich passe an, verfeinere und verbessere.",
    tag: "auf deinen Wunsch abgestimmt",
  },
  {
    icon: CheckSquare,
    step: "5",
    title: "3. Gespräch – Letzter Check",
    desc: "Wir gehen gemeinsam alles durch: Design, Texte, alle Funktionen. Jetzt ist noch Zeit für letzte Wünsche, bevor die Website live geht.",
    tag: "alles unter Kontrolle",
  },
  {
    icon: RefreshCw,
    step: "6",
    title: "2. Überarbeitung",
    desc: "Hier kümmere ich mich um den Feinschliff und die letzten Details. Deine finalen Wünsche aus dem letzten Check werden punktgenau umgesetzt.",
    tag: "der letzte feinschliff",
  },
  {
    icon: Globe,
    step: "7",
    title: "Fertig – deine Website ist live",
    desc: "Deine Website geht online – fertig eingerichtet, auf deiner Domain, direkt nutzbar. Ich kümmere mich um Hosting, Domain und alles Technische. Du bekommst eine fertige Website und musst nichts selbst einrichten.",
    tag: "komplett fertig & gehostet",
  },
];

const blocks = [
  {
    Icon: Palette,
    title: "Design",
    lead: "So, wie du dir das vorstellst.",
    points: [
      "Individuelles Design – kein vorgefertigtes Template",
      "Gut bedienbar & schön auf allen Geräten",
      "Auf deine Marke angepasst",
      "Leicht verständlich für deine Kunden",
    ],
  },
  {
    Icon: Code2,
    title: "Entwicklung",
    lead: "Schnell, stabil & zukunftssicher.",
    points: [
      "Modernste Technik im Hintergrund",
      "Schnelle Ladezeiten",
      "Gut bei Google auffindbar",
      "Funktionen, auf deine Bedürfnisse angepasst",
    ],
  },
  {
    Icon: Rocket,
    title: "Deployment",
    lead: "Du musst dich um nichts kümmern.",
    points: [
      "Domain-Setup & Hosting inklusive",
      "DSGVO-konform eingerichtet",
      "Fertig live auf deiner Wunsch-Domain",
      "Ich bin auch nach dem Launch da",
    ],
  },
];

export function Leistungen() {
  const navigate = useNavigate();
  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-6 pt-36 sm:pt-44 pb-12">
      <FadeIn>
        <SectionLabel>Leistungen</SectionLabel>
        <h1 className="text-white text-[clamp(36px,6vw,72px)] tracking-tight leading-[1.05] max-w-3xl">
          Deine Website – fertig, ohne Stress.
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] text-slate-400 leading-relaxed">
          Du bekommst alles aus einer Hand: Design, Technik und Veröffentlichung.
          Kein Hin und Her mit verschiedenen Anbietern – ich mache das für dich.
        </p>
      </FadeIn>

      {/* Service cards */}
      <div className="mt-16 grid gap-6 md:grid-cols-3 items-stretch">
        {blocks.map(({ Icon, title, lead, points }, i) => (
          <FadeIn key={title} delay={i * 0.08} className="h-full">
            <Card className="h-full">
              <div className="flex flex-col h-full">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-sky-600/10 border border-sky-400/20">
                  <Icon size={22} className="text-sky-400" />
                </div>
                <h3 className="text-white text-[22px] mb-1">{title}</h3>
                <p className="text-slate-400 text-[14px] mb-5">{lead}</p>
                <ul className="space-y-2.5">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-slate-300 text-[14px]">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sky-400" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Extra services */}
      <FadeIn>
        <div className="mt-14">
          <h2 className="text-white text-[clamp(22px,3vw,32px)] tracking-tight max-w-xl mb-3">
            Du brauchst noch etwas anderes?
          </h2>
          <p className="text-slate-400 text-[15px] leading-relaxed max-w-xl mb-7">
            Kein Problem – sag mir, was du brauchst, und wir finden gemeinsam eine Lösung.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {[
              "Google Analytics Tracking",
              "Content Management System",
              "Admin Panel",
              "Mehrsprachigkeit",
              "Online-Shop",
              "Buchungssystem",
              "Newsletter-Integration",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full px-4 py-1.5 text-[13px] text-sky-300"
                style={{
                  background: "rgba(77, 190, 243, 0.07)",
                  border: "1px solid rgba(77, 190, 243, 0.18)",
                }}
              >
                {item}
              </span>
            ))}
            <span
              className="rounded-full px-4 py-1.5 text-[13px] text-slate-500"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              & vieles mehr …
            </span>
          </div>
        </div>
      </FadeIn>

      {/* Timeline */}
      <div className="mt-24">
        <FadeIn>
          <SectionLabel>So läuft es ab</SectionLabel>
          <h2 className="text-white text-[clamp(28px,4vw,44px)] tracking-tight max-w-2xl mb-4">
            Von der ersten Idee bis zur fertigen Website.
          </h2>
          <p className="text-slate-400 text-[15px] leading-relaxed max-w-xl mb-14">
            Du weißt jederzeit, wo wir stehen. Kein Fachchinesisch, kein Rätselraten –
            ich halte dich bei jedem Schritt auf dem Laufenden.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-6 bottom-6 w-px bg-sky-400/15" />

          <div className="space-y-0">
            {timelineSteps.map(({ icon: Icon, step, title, desc, tag }, i) => (
              <FadeIn key={step} delay={i * 0.07}>
                <div className="relative flex gap-8 sm:gap-14 pb-32 sm:pb-48 last:pb-0">
                  {/* Circle */}
                  <div className="relative z-10 shrink-0 flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-[#0f2440] border border-sky-400/40 flex items-center justify-center">
                      <Icon size={20} className="text-sky-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 pb-6">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-sky-400 text-[11px] tracking-[0.2em] uppercase">
                        Schritt {step}
                      </span>
                      <span className="rounded-full bg-sky-400/10 border border-sky-400/20 px-2.5 py-0.5 text-[11px] text-sky-300">
                        {tag}
                      </span>
                    </div>
                    <h3 className="text-white text-[22px] sm:text-[26px] mb-4">{title}</h3>
                    <p className="text-slate-400 text-[15px] sm:text-[16px] leading-[1.85] max-w-2xl">
                      {desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>


      {/* CTA */}
      <FadeIn>
        <div className="mt-16 text-center">
          <h2 className="text-white text-[28px] mb-3">
            Bereit loszulegen?
          </h2>
          <p className="text-slate-400 text-[15px] mb-8 max-w-xl mx-auto">
            Erzähl mir kurz von deinem Projekt – das Erstgespräch ist kostenlos und unverbindlich.
          </p>
          <PrimaryButton onClick={() => navigate("/kontakt")}>
            Projekt anfragen
          </PrimaryButton>
        </div>
      </FadeIn>
    </main>
  );
}