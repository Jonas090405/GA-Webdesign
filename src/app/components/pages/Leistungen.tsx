import { useState } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { PrimaryButton } from "../Button";
import { FadeIn } from "../FadeIn";
import { Palette, Code2, Rocket, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ServiceCardBg, type BgKey } from "../ServiceCardBg";

const blocks: { Icon: React.ElementType; title: string; lead: string; points: string[]; bgKey: BgKey }[] = [
  {
    Icon: Palette,
    bgKey: "design",
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
    bgKey: "code",
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
    bgKey: "rocket",
    title: "Deployment",
    lead: "Du musst dich um nichts kümmern.",
    points: [
      "Domain-Setup & Hosting inklusive",
      "DSGVO-konform eingerichtet",
      "Fertig live auf deiner Wunsch-Domain",
      "Wir sind auch nach dem Launch da",
    ],
  },
];

function LeistungenCard({
  Icon, title, lead, points, bgKey, i,
}: {
  Icon: React.ElementType; title: string; lead: string;
  points: string[]; bgKey: BgKey; i: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={i * 0.08} className="h-full">
      <div
        className="h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Card className="h-full">
          <div className="flex flex-col h-full">
            <ServiceCardBg bgKey={bgKey} hovered={hovered} />
            <div className="relative z-10 flex flex-col h-full">
              <div
                className="mb-5 inline-flex h-12 w-12 2xl:h-16 2xl:w-16 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, rgba(0,105,153,0.25) 0%, rgba(77,190,243,0.12) 100%)", border: "1px solid rgba(77,190,243,0.20)" }}
              >
                <Icon size={22} className="text-sky-400 2xl:!h-7 2xl:!w-7" />
              </div>
              <h3 className="text-white text-[22px] 2xl:text-[26px] mb-1">{title}</h3>
              <p className="text-slate-400 text-[14px] 2xl:text-[16px] mb-5">{lead}</p>
              <ul className="space-y-2.5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-slate-300 text-[14px] 2xl:text-[16px]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sky-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </FadeIn>
  );
}

export function Leistungen() {
  usePageMeta({
    title: "Leistungen | G&A Webdesign",
    description: "Webdesign, Entwicklung & Deployment aus einer Hand. Individuelles Design, schnelle Ladezeiten und alles fertig live – inkl. Hosting & SEO.",
    path: "/leistungen",
  });
  const navigate = useNavigate();
  return (
    <main className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-12 xl:pb-20 2xl:pb-28">
      <FadeIn>
        <SectionLabel>Leistungen</SectionLabel>
        <h1 className="text-white text-[clamp(36px,6vw,84px)] tracking-tight leading-[1.05] max-w-4xl 2xl:max-w-5xl">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #4dbef3 0%, #006999 100%)",
            }}
          >
            Deine Website
          </span>{" "}
          – fertig, ohne Stress.
        </h1>
        <p className="mt-6 max-w-2xl 2xl:max-w-3xl text-[16px] xl:text-[18px] 2xl:text-[20px] text-slate-400 leading-relaxed">
          Du bekommst alles aus einer Hand: von der Gestaltung über die technische Umsetzung bis hin zur Veröffentlichung. Wir kümmern uns um den gesamten Ablauf für dich.</p>
      </FadeIn>

      {/* Service cards */}
      <div className="mt-16 2xl:mt-20 grid gap-6 2xl:gap-8 md:grid-cols-3 items-stretch">
        {blocks.map(({ Icon, title, lead, points, bgKey }, i) => (
          <LeistungenCard key={title} Icon={Icon} title={title} lead={lead} points={points} bgKey={bgKey} i={i} />
        ))}
      </div>

      {/* Extra services */}
      <FadeIn>
        <div className="mt-14 2xl:mt-20">
          <h2 className="text-white text-[clamp(22px,3vw,40px)] tracking-tight max-w-xl 2xl:max-w-2xl mb-3">
            Du brauchst noch etwas anderes?
          </h2>
          <p className="text-slate-400 text-[15px] 2xl:text-[17px] leading-relaxed max-w-xl 2xl:max-w-2xl mb-7">
            Kein Problem – sag uns, was du brauchst, und wir finden gemeinsam eine Lösung.
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
                className="tag-pill rounded-full px-4 py-1.5 xl:px-5 2xl:px-6 2xl:py-2 text-[13px] 2xl:text-[15px] text-sky-300"
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

      {/* CTA → Ablauf */}
      <FadeIn>
        <div className="mt-16 2xl:mt-24 text-center">
          <h2 className="text-white text-[28px] xl:text-[34px] 2xl:text-[42px] mb-3">
            Wie läuft die Zusammenarbeit ab?
          </h2>
          <p className="text-slate-400 text-[15px] xl:text-[16px] 2xl:text-[18px] mb-8 max-w-xl 2xl:max-w-2xl mx-auto">
            Von der ersten Anfrage bis zur fertigen Website – in 8 transparenten Schritten.
          </p>
          <PrimaryButton onClick={() => navigate("/ablauf")}>
            Ablauf ansehen
          </PrimaryButton>
        </div>
      </FadeIn>
    </main>
  );
}