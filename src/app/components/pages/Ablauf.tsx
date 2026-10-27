import { useRef } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { PrimaryButton } from "../Button";
import { FadeIn } from "../FadeIn";
import { MessageCircle, PenTool, RefreshCw, Globe, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCopy, useLocalePath } from "../../../i18n";
import { useScroll, useSpring, useTransform, motion } from "motion/react";
import type { MotionValue } from "motion/react";

const TIMELINE_STEPS = {
  de: [
    {
      icon: MessageCircle,
      step: "1",
      title: "Kennenlerngespräch",
      desc: "Wir lernen uns kennen – und gehen dabei direkt ins Detail. Du erzählst uns, wer du bist, was du machst und was du dir für deine Webseite vorstellst. Gemeinsam klären wir, welche Seiten, Funktionen und Inhalte du brauchst, und definieren den genauen Umfang – damit am Ende keine Überraschungen entstehen. Kein Fachwissen nötig: Wir stellen die richtigen Fragen und hören erst mal zu.",
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
  ],
  en: [
    {
      icon: MessageCircle,
      step: "1",
      title: "Intro call",
      desc: "We get to know each other and get straight into the details. Tell us who you are, what you do and what you have in mind for your website. Together we work out which pages, features and content you need and pin down the exact scope, so there are no surprises at the end. You don't need any tech know-how: we ask the right questions and listen first.",
      tag: "free & no obligation",
    },
    {
      icon: PenTool,
      step: "2",
      title: "Design & concept",
      desc: "Once all the contract details are settled, we create a custom design concept based on your requirements. This step is all about the look – we define how your business comes across to the outside world.",
      tag: "custom design",
    },
    {
      icon: MessageCircle,
      step: "3",
      title: "Feedback round 1",
      desc: "We show you what your site will look like and how it's structured. You tell us straight away what you like and what you'd change. Here, your gut feeling counts.",
      tag: "your opinion matters",
    },
    {
      icon: Code2,
      step: "4",
      title: "Development",
      desc: "We put your feedback into practice right away and build in every feature you want. This step focuses on how well your website works, how fast it loads and how easily people find it.",
      tag: "clean & modern",
    },
    {
      icon: MessageCircle,
      step: "5",
      title: "Feedback round 2",
      desc: "We go through the finished website together. We test every feature, check the copy on phone and desktop and take a close look at the result as a whole.",
      tag: "everything in check",
    },
    {
      icon: RefreshCw,
      step: "6",
      title: "Fine-tuning & fixes",
      desc: "This is where we add the final polish. Your last requests from the final check get done exactly as you asked, so everything is ready for launch.",
      tag: "the final polish",
    },
    {
      icon: Globe,
      step: "7",
      title: "Done – your website is live",
      desc: "Your website goes online: fully set up, on your domain and ready to use. We take care of hosting, the domain and all the technical stuff. You get a finished result.",
      tag: "fully done & hosted",
    },
  ],
};

const TOTAL = TIMELINE_STEPS.de.length;

const COPY = {
  de: {
    metaTitle: "Ablauf | G&A Webdesign",
    metaDescription: "So läuft die Zusammenarbeit ab – von der ersten Idee bis zur fertigen Webseite. 7 klare Schritte, transparenter Prozess.",
    step: "Schritt",
    h1: "Von der ersten Idee bis zur",
    h1Accent: "fertigen Webseite.",
    lead: "Du weißt jederzeit, wo wir stehen. Regelmäßige Feedbackschleifen stellen sicher, dass wir am Ende genau das Ergebnis haben, das du dir vorstellst.",
    ctaTitle: "Bereit loszulegen?",
    ctaText: "Erzähl uns kurz von deinem Projekt – das Erstgespräch ist kostenlos und unverbindlich.",
    ctaButton: "Projekt anfragen",
  },
  en: {
    metaTitle: "Process | G&A Webdesign",
    metaDescription: "How working with us goes – from the first idea to the finished website. 7 clear steps, a transparent process.",
    step: "Step",
    h1: "From the first idea to the",
    h1Accent: "finished website.",
    lead: "You always know where things stand. Regular feedback rounds make sure we end up with exactly the result you have in mind.",
    ctaTitle: "Ready to get started?",
    ctaText: "Tell us a little about your project – the first call is free and there's no obligation.",
    ctaButton: "Start your project",
  },
};

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

  // Lichtring: läuft einmal nach außen, während der Schritt erreicht wird
  const ringScale = useTransform(activated, [0, 1], [1, 1.7]);
  const ringOpacity = useTransform(activated, [0, 0.35, 1], [0, 0.55, 0]);

  return (
    <div className="relative shrink-0 h-12 w-12 xl:h-14 xl:w-14">
      <motion.div
        aria-hidden
        className="absolute inset-[3px] rounded-full border border-blue-400"
        style={{ scale: ringScale, opacity: ringOpacity }}
      />

      {/* Alles in einem SVG — rotate(-90deg) = Startpunkt bei 12 Uhr */}
      <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full"
        style={{ transform: "rotate(-90deg)" }}>

        {/* Grauer Hintergrundring */}
        <circle cx="24" cy="24" r={r} fill="none" className="stroke-ink-600" strokeWidth="1.5" />

        {/* Rechte Hälfte — 12 Uhr → im Uhrzeigersinn → 6 Uhr */}
        <motion.circle cx="24" cy="24" r={r} fill="none" className="stroke-blue-400"
          strokeWidth="1.5" strokeLinecap="butt"
          style={{ pathLength: halfPath }} />

        {/* Linke Hälfte — 12 Uhr → gegen Uhrzeigersinn → 6 Uhr */}
        <motion.circle cx="24" cy="24" r={r} fill="none" className="stroke-blue-400"
          strokeWidth="1.5" strokeLinecap="butt"
          style={{ pathLength: leftLength, pathOffset: leftOffset }} />
      </svg>

      {/* Hintergrund */}
      <div className="absolute inset-[5px] rounded-full" style={{ background: "rgb(18,26,34)" }} />
      <motion.div className="absolute inset-[5px] rounded-full" style={{ background: "#0c1825", opacity: activated }} />

      {/* Graues Icon */}
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: grayOpacity }}>
        <Icon size={18} className="xl:!w-5 xl:!h-5 text-ink-400" />
      </motion.div>

      {/* Blaues Icon */}
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: activated }}>
        <Icon size={18} className="xl:!w-5 xl:!h-5 text-blue-400" />
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
  const t = useCopy(COPY);
  return (
    <div>
      <div className={`flex flex-wrap items-center gap-2.5 mb-3 ${right ? "justify-end" : ""}`}>
        <span className="text-brand text-[12px] xl:text-[13px] 2xl:text-[14px] tracking-[0.16em] font-medium">
          {t.step} {step}
        </span>
        <span
          className="rounded-full px-3 py-1 text-[12px] xl:text-[13px] 2xl:text-[14px] text-brand-light"
          style={{ background: "rgb(var(--blue-400-rgb) / 0.08)", border: "1px solid rgb(var(--blue-400-rgb) / 0.2)" }}
        >
          {tag}
        </span>
      </div>
      <h3 className={`text-white text-[20px] sm:text-[23px] xl:text-[25px] 2xl:text-[28px] mb-3 tracking-tight leading-snug ${right ? "text-right" : ""}`}>
        {title}
      </h3>
      <p className={`text-ink-300 text-[14px] sm:text-[15px] 2xl:text-[16px] leading-relaxed text-pretty ${right ? "text-right" : ""}`}>
        {desc}
      </p>
    </div>
  );
}

// Slide-in der Content-Blöcke: smooth, aber snappy (steile Ease-Out-Kurve)
const slideIn = (fromX: number) => ({
  initial: { opacity: 0, x: fromX },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-15% 0px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
});

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
        <motion.div className="pt-1" {...slideIn(28)}>
          <ContentBlock step={step} tag={tag} title={title} desc={desc} />
        </motion.div>
      </div>

      {/* Desktop: alternierend links/rechts — Blöcke wischen von ihrer Seite rein */}
      <div className="hidden md:grid grid-cols-[1fr_56px_1fr] items-start gap-x-8 xl:gap-x-14 2xl:gap-x-20">
        <div className="pt-1">
          {index % 2 === 0 && (
            <motion.div {...slideIn(-72)}>
              <ContentBlock step={step} tag={tag} title={title} desc={desc} align="right" />
            </motion.div>
          )}
        </div>
        <div className="flex justify-center">
          <TimelineDot Icon={Icon} pathLength={pathLength} activated={activated} />
        </div>
        <div className="pt-1">
          {index % 2 === 1 && (
            <motion.div {...slideIn(72)}>
              <ContentBlock step={step} tag={tag} title={title} desc={desc} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Linie + Steps ────────────────────────────────────────────────────────────
function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineSteps = useCopy(TIMELINE_STEPS);

  // 0 wenn erster Dot Viewport-Mitte erreicht → 1 wenn letzter Dot Viewport-Mitte erreicht
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 75%"],
  });
  // Feder statt 1:1-Kopplung: Mausräder scrollen in Stufen, die Linie soll
  // trotzdem gleiten. Dots und Linie lesen denselben geglätteten Wert.
  const scrollYProgress = useSpring(rawProgress, { stiffness: 140, damping: 30, mass: 0.5, restDelta: 0.0005 });
  const headY = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const headOpacity = useTransform(scrollYProgress, [0, 0.015, 0.985, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative mt-14">
      {/* Statische Hintergrundlinie */}
      <div className="absolute top-6 w-px bg-brand/[0.12] md:hidden"
        style={{ left: "24px", height: "calc(100% - 48px)" }} />
      <div className="absolute top-6 w-px bg-brand/[0.12] hidden md:block"
        style={{ left: "50%", transform: "translateX(-50%)", height: "calc(100% - 48px)" }} />

      {/* Animierte Fülllinie — gleicher scrollYProgress wie die Dots. Hell an
          der Spitze, nach oben hin verglimmend wie eine Lichtspur. */}
      {(["left-6 md:hidden", "left-1/2 hidden md:block"] as const).map((pos) => (
        <div key={pos} aria-hidden className={`pointer-events-none absolute top-6 ${pos}`}
          style={{ height: "calc(100% - 48px)" }}>
          <motion.div className="absolute inset-y-0 w-px -translate-x-1/2 origin-top"
            style={{
              scaleY: scrollYProgress,
              background: "linear-gradient(to bottom, rgb(var(--blue-400-rgb) / 0.2), var(--blue-400))",
            }} />
          {/* Spitze: kurzes, etwas dickeres Linienstück, das nach oben ausläuft */}
          <motion.div className="absolute inset-x-0 top-0 h-full" style={{ y: headY, opacity: headOpacity }}>
            <span className="absolute left-0 top-0 h-14 w-[2px] -translate-x-1/2 -translate-y-full rounded-full"
              style={{ background: "linear-gradient(to bottom, transparent, var(--blue-300))" }} />
          </motion.div>
        </div>
      ))}

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
  const t = useCopy(COPY);
  const lp = useLocalePath();
  usePageMeta({
    title: t.metaTitle,
    description: t.metaDescription,
  });
  const navigate = useNavigate();

  return (
    <main id="main-content" className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-12 xl:pb-20 2xl:pb-28">
      <FadeIn>
        <h1 className="text-white text-[clamp(36px,6vw,84px)] tracking-tight leading-[1.05] max-w-4xl 2xl:max-w-5xl">
          {t.h1}{" "}
          <span
            className="text-blue-400"
          >
            {t.h1Accent}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl 2xl:max-w-3xl text-[16px] xl:text-[18px] 2xl:text-[20px] text-ink-300 leading-relaxed">
          {t.lead}
        </p>
      </FadeIn>

      <ProcessTimeline />

      {/* CTA */}
      <FadeIn>
        <div className="mt-20 2xl:mt-28 text-center">
          <h2 className="text-white text-[28px] xl:text-[34px] 2xl:text-[42px] mb-3">
            {t.ctaTitle}
          </h2>
          <p className="text-ink-300 text-[15px] xl:text-[16px] 2xl:text-[18px] mb-8 max-w-xl 2xl:max-w-2xl mx-auto">
            {t.ctaText}
          </p>
          <PrimaryButton onClick={() => navigate(lp("/kontakt"))}>
            {t.ctaButton}
          </PrimaryButton>
        </div>
      </FadeIn>
    </main>
  );
}
