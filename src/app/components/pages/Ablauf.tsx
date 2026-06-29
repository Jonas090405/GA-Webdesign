import { useRef } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { SectionLabel } from "../SectionLabel";
import { PrimaryButton } from "../Button";
import { FadeIn } from "../FadeIn";
import { MessageCircle, PenTool, RefreshCw, Globe, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScroll, useTransform, motion } from "motion/react";
import type { MotionValue } from "motion/react";

const timelineSteps = [
  {
    icon: MessageCircle,
    step: "1",
    title: "Kennenlerngespräch",
    tag: "kostenlos & unverbindlich",
  },
  {
    icon: PenTool,
    step: "2",
    title: "Design & Konzept",
    desc: "Nachdem alle vertraglichen Details geklärt sind, entwickeln wir auf Basis der Anforderungen ein individuelles Designkonzept. In diesem Schritt liegt die visuelle Gestaltung im Vordergrund – wir definieren, wie dein Unternehmen nach außen wirkt.",
    tag: "individuelles Design",
  },
  {
    icon: MessageCircle,
    step: "3",
    title: "1. Feedbackrunde",
    desc: "Wir zeigen dir, wie deine Seite aussehen wird und wie sie strukturiert ist. Du sagst uns direkt, was dir gefällt und was du gerne anders hättest. Hier zählt dein Gefühl.",
    tag: "deine Meinung ist wichtig",
  },
  {
    icon: Code2,
    step: "4",
    title: "Technische Umsetzung",
    desc: "Wir setzen dein Feedback direkt um und integrieren alle gewünschten Funktionen. In diesem Schritt liegt der Fokus auf der Funktionalität, Schnelligkeit und Sichtbarkeit deiner Webseite.",
    tag: "sauber & modern",
  },
  {
    icon: MessageCircle,
    step: "5",
    title: "2. Feedbackrunde",
    desc: "Wir gehen gemeinsam die fertige Webseite durch. Wir testen alle Funktionen, prüfen die Texte auf dem Handy und am PC und schauen uns das Gesamtergebnis im Detail an.",
    tag: "alles unter Kontrolle",
  },
  {
    icon: RefreshCw,
    step: "6",
    title: "Feinschliff & Korrekturen",
    desc: "Hier kümmern wir uns um den letzten Feinschliff. Deine finalen Wünsche aus dem letzten Check werden punktgenau umgesetzt, damit alles bereit für den Start ist.",
    tag: "der letzte Feinschliff",
  },
  {
    icon: Globe,
    step: "7",
    title: "Fertig – deine Webseite ist live",
    desc: "Deine Webseite geht online – fertig eingerichtet, auf deiner Domain, direkt nutzbar. Wir kümmern uns um Hosting, Domain und alles Technische. Du bekommst ein fertiges Ergebnis.",
    tag: "komplett fertig & gehostet",
  },
];

const TOTAL = timelineSteps.length;

// ─── Dot ─────────────────────────────────────────────────────────────────────
function TimelineDot({
  Icon,
  pathLength,
  activated,
}: {
  Icon: React.ElementType;
  pathLength: MotionValue<number>;
  activated: MotionValue<number>;
}) {
  const r = 20;
  const grayOpacity = useTransform(activated, [0, 1], [1, 0]);

  // Jede Hälfte füllt 0→0.5 → beide treffen sich bei 6 Uhr (unten)
  const halfPath   = useTransform(pathLength, [0, 1], [0, 0.5]);
  // Linke Hälfte: pathOffset startet bei 1.0 (= 12 Uhr) und sinkt mit halfPath
  // → Stroke wächst von 12 Uhr nach links (gegen Uhrzeigersinn)
  const leftOffset = useTransform(halfPath, (v) => 1 - v);
  // Minimale Überlappung bei 12 Uhr (oben) — verhindert Sub-Pixel-Lücke
  // zwischen dem Ende der linken und dem Start der rechten Hälfte
  const leftLength = useTransform(halfPath, (v) => v <= 0.001 ? 0 : v + 0.008);

  return (
    <div className="relative shrink-0 h-12 w-12 xl:h-14 xl:w-14">

      {/* Alles in einem SVG — rotate(-90deg) = Startpunkt bei 12 Uhr */}
      <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full"
        style={{ transform: "rotate(-90deg)" }}>

        {/* Grauer Hintergrundring */}
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(100,115,130,0.45)" strokeWidth="1.5" />

        {/* Rechte Hälfte — 12 Uhr → im Uhrzeigersinn → 6 Uhr */}
        <motion.circle cx="24" cy="24" r={r} fill="none" stroke="#4dbef3"
          strokeWidth="1.5" strokeLinecap="butt"
          style={{ pathLength: halfPath }} />

        {/* Linke Hälfte — 12 Uhr → gegen Uhrzeigersinn → 6 Uhr */}
        <motion.circle cx="24" cy="24" r={r} fill="none" stroke="#4dbef3"
          strokeWidth="1.5" strokeLinecap="butt"
          style={{ pathLength: leftLength, pathOffset: leftOffset }} />
      </svg>

      {/* Hintergrund */}
      <div className="absolute inset-[5px] rounded-full" style={{ background: "rgb(18,26,34)" }} />
      <motion.div className="absolute inset-[5px] rounded-full" style={{ background: "#0c1825", opacity: activated }} />

      {/* Graues Icon */}
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: grayOpacity }}>
        <Icon size={18} className="xl:!w-5 xl:!h-5" style={{ color: "rgba(90,110,130,0.5)" }} />
      </motion.div>

      {/* Blaues Icon */}
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: activated }}>
        <Icon size={18} className="xl:!w-5 xl:!h-5" style={{ color: "#4dbef3" }} />
      </motion.div>
    </div>
  );
}

// ─── ContentBlock ─────────────────────────────────────────────────────────────
function ContentBlock({
  step, tag, title, desc, align = "left",
}: {
  step: string; tag: string; title: string; desc: string; align?: "left" | "right";
}) {
  const right = align === "right";
  return (
    <div>
      <div className={`flex flex-wrap items-center gap-2.5 mb-3 ${right ? "justify-end" : ""}`}>
        <span className="text-sky-400 text-[11px] 2xl:text-[12px] tracking-[0.2em] uppercase font-medium">
          Schritt {step}
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] 2xl:text-[12px] text-sky-300"
          style={{ background: "rgba(77,190,243,0.08)", border: "1px solid rgba(77,190,243,0.2)" }}
        >
          {tag}
        </span>
      </div>
      <h3 className={`text-white text-[20px] sm:text-[23px] xl:text-[25px] 2xl:text-[28px] mb-3 tracking-tight leading-snug ${right ? "text-right" : ""}`}>
        {title}
      </h3>
      <p className={`text-slate-400 text-[14px] sm:text-[15px] 2xl:text-[16px] leading-relaxed text-pretty ${right ? "text-right" : ""}`}>
        {desc}
      </p>
    </div>
  );
}

// ─── Step — empfängt den geteilten scrollYProgress + seinen threshold ─────────
function TimelineStep({
  icon: Icon, step, title, desc, tag, index, isLast, scrollYProgress, threshold,
}: {
  icon: React.ElementType; step: string; title: string; desc: string;
  tag: string; index: number; isLast: boolean;
  scrollYProgress: MotionValue<number>; threshold: number;
}) {
  // strokeEnd = genau wenn die Linie den Dot erreicht (= threshold)
  // strokeStart = 6% früher → Stroke ist fertig, sobald die Linie ankommt
  const STROKE_DUR = 0.06;
  const sEnd   = Math.min(1, threshold);
  const sStart = Math.max(0, sEnd - STROKE_DUR);
  // Letzter Dot: sStart kann = sEnd sein → minimalen Bereich sicherstellen
  const sStartSafe = Math.min(sStart, sEnd - 0.001);

  const pathLength = useTransform(scrollYProgress, [sStartSafe, sEnd], [0, 1], { clamp: true });

  const aStart = sEnd;
  const aEnd   = Math.min(1, aStart + 0.03);
  const aStartSafe = Math.min(aStart, aEnd - 0.001);
  const activated  = useTransform(scrollYProgress, [aStartSafe, aEnd], [0, 1], { clamp: true });

  return (
    <div className={isLast ? "" : "pb-14 sm:pb-20 xl:pb-24 2xl:pb-28"}>
      {/* Mobile */}
      <div className="md:hidden flex items-start gap-6">
        <TimelineDot Icon={Icon} pathLength={pathLength} activated={activated} />
        <div className="pt-1">
          <ContentBlock step={step} tag={tag} title={title} desc={desc} />
        </div>
      </div>

      {/* Desktop: alternierend links/rechts */}
      <div className="hidden md:grid grid-cols-[1fr_56px_1fr] items-start gap-x-8 xl:gap-x-14 2xl:gap-x-20">
        <div className="pt-1">
          {index % 2 === 0 && <ContentBlock step={step} tag={tag} title={title} desc={desc} align="right" />}
        </div>
        <div className="flex justify-center">
          <TimelineDot Icon={Icon} pathLength={pathLength} activated={activated} />
        </div>
        <div className="pt-1">
          {index % 2 === 1 && <ContentBlock step={step} tag={tag} title={title} desc={desc} />}
        </div>
      </div>
    </div>
  );
}

// ─── Linie + Steps ────────────────────────────────────────────────────────────
function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 0 wenn erster Dot Viewport-Mitte erreicht → 1 wenn letzter Dot Viewport-Mitte erreicht
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 75%"],
  });

  return (
    <div ref={containerRef} className="relative mt-14">
      {/* Statische Hintergrundlinie */}
      <div className="absolute top-6 w-px bg-sky-400/[0.12] md:hidden"
        style={{ left: "24px", height: "calc(100% - 48px)" }} />
      <div className="absolute top-6 w-px bg-sky-400/[0.12] hidden md:block"
        style={{ left: "50%", transform: "translateX(-50%)", height: "calc(100% - 48px)" }} />

      {/* Animierte Fülllinie — gleicher scrollYProgress wie die Dots */}
      <motion.div className="absolute top-6 w-px origin-top md:hidden"
        style={{
          left: "24px",
          height: "calc(100% - 48px)",
          scaleY: scrollYProgress,
          background: "linear-gradient(to bottom, #4dbef3, #006999)",
        }} />
      <motion.div className="absolute top-6 w-px origin-top hidden md:block"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          height: "calc(100% - 48px)",
          scaleY: scrollYProgress,
          background: "linear-gradient(to bottom, #4dbef3, #006999)",
        }} />

      {/* Steps — alle bekommen denselben scrollYProgress */}
      <div>
        {timelineSteps.map(({ icon, step, title, desc, tag }, i) => (
          <TimelineStep
            key={step}
            icon={icon}
            step={step}
            title={title}
            desc={desc}
            tag={tag}
            index={i}
            isLast={i === TOTAL - 1}
            scrollYProgress={scrollYProgress}
            threshold={i / (TOTAL - 1)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function Ablauf() {
  usePageMeta({
    title: "Ablauf | G&A Webdesign",
    description: "So läuft die Zusammenarbeit ab – von der ersten Idee bis zur fertigen Webseite. 7 klare Schritte, transparenter Prozess.",
    path: "/ablauf",
  });
  const navigate = useNavigate();

  return (
    <main id="main-content" className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-12 xl:pb-20 2xl:pb-28">
      <FadeIn>
        <SectionLabel>So läuft es ab</SectionLabel>
        <h1 className="text-white text-[clamp(36px,6vw,84px)] tracking-tight leading-[1.05] max-w-4xl 2xl:max-w-5xl">
          Von der ersten Idee bis zur{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #4dbef3 0%, #006999 100%)" }}
          >
            fertigen Webseite.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl 2xl:max-w-3xl text-[16px] xl:text-[18px] 2xl:text-[20px] text-slate-400 leading-relaxed">
          Du weißt jederzeit, wo wir stehen. Regelmäßige Feedbackschleifen stellen sicher,
          dass wir am Ende genau das Ergebnis haben, das du dir vorstellst.
        </p>
      </FadeIn>

      <ProcessTimeline />

      {/* CTA */}
      <FadeIn>
        <div className="mt-20 2xl:mt-28 text-center">
          <h2 className="text-white text-[28px] xl:text-[34px] 2xl:text-[42px] mb-3">
            Bereit loszulegen?
          </h2>
          <p className="text-slate-400 text-[15px] xl:text-[16px] 2xl:text-[18px] mb-8 max-w-xl 2xl:max-w-2xl mx-auto">
            Erzähl uns kurz von deinem Projekt – das Erstgespräch ist kostenlos und unverbindlich.
          </p>
          <PrimaryButton onClick={() => navigate("/kontakt")}>
            Projekt anfragen
          </PrimaryButton>
        </div>
      </FadeIn>
    </main>
  );
}
