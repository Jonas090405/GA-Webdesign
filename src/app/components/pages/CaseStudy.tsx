import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { FadeIn } from "../FadeIn";
import { PrimaryButton } from "../Button";
import { BrowserFrame, PhoneFrame } from "../BrowserFrame";
import { LazyVideo } from "../LazyVideo";
import {
  PROJECTS,
  type Project,
  type SolutionBlock,
  findProject,
  isVisible,
  localizeProject,
  projectPath,
} from "../../../content/projects";
import { useCopy, useLang, useLocalePath } from "../../../i18n";

const COPY = {
  de: {
    metaTitleSuffix: " – Case Study | G&A Webdesign",
    metaFallbackTitle: "Projekte | G&A Webdesign",
    client: "Kunde",
    industry: "Branche",
    location: "Standort",
    year: "Jahr",
    allProjects: "Alle Projekte",
    viewWebsite: "Webseite ansehen",
    challenge: "Ausgangslage",
    challengePending: "Wie sah es vorher aus, was hat gefehlt?",
    goal: "Ziel",
    solution: "Was wir gebaut haben",
    servicesLabel: "Leistungen in diesem Projekt",
    mobileTitle: "Auf dem Smartphone",
    mobileText: "Jede Ansicht ist für kleine Bildschirme eigens gestaltet, nicht nur verkleinert.",
    result: "Ergebnis",
    resultPending: "Was hat sich für den Kunden verändert?",
    pendingPrefix: "Text folgt: ",
    pendingNote: "Nur lokal sichtbar · einzutragen in src/content/projects.ts",
    quoteOpen: "„",
    quoteClose: "“",
    nextProject: "Nächstes Projekt",
    readCaseStudy: "Case Study lesen",
    ctaTitle: "Dein Projekt soll das nächste sein.",
    ctaText: "Sag uns, was du dir vorstellst – das erste Gespräch ist kostenlos und unverbindlich.",
    ctaButton: "Projekt anfragen",
  },
  en: {
    metaTitleSuffix: " – Case study | G&A Webdesign",
    metaFallbackTitle: "Projects | G&A Webdesign",
    client: "Client",
    industry: "Industry",
    location: "Location",
    year: "Year",
    allProjects: "All projects",
    viewWebsite: "View website",
    challenge: "Starting point",
    challengePending: "What was it like before, and what was missing?",
    goal: "Goal",
    solution: "What we built",
    servicesLabel: "Services in this project",
    mobileTitle: "On mobile",
    mobileText: "Every view is designed specifically for small screens, not just scaled down.",
    result: "Result",
    resultPending: "What changed for the client?",
    pendingPrefix: "Text to come: ",
    pendingNote: "Only visible locally · add it in src/content/projects.ts",
    quoteOpen: "“",
    quoteClose: "”",
    nextProject: "Next project",
    readCaseStudy: "Read case study",
    ctaTitle: "Your project could be next.",
    ctaText: "Tell us what you have in mind. The first conversation is free and comes with no obligation.",
    ctaButton: "Start your project",
  },
};

const CONTAINER =
  "mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20";

/**
 * Case Study eines Projekts. Inhalte kommen aus src/content/projects.ts.
 *
 * Leere Texte zeigen lokal einen gestrichelten Platzhalter und werden live
 * ausgeblendet. Unveröffentlichte Projekte leiten live auf /projekte um.
 */
export function CaseStudy() {
  const { slug } = useParams();
  const lang = useLang();
  const lp = useLocalePath();
  const t = useCopy(COPY);
  const found = findProject(slug);
  const project = found ? localizeProject(found, lang) : undefined;
  const visible = project ? isVisible(project) : false;

  usePageMeta({
    title: project ? `${project.title}${t.metaTitleSuffix}` : t.metaFallbackTitle,
    description: project?.summary ?? "",
  });

  if (!project || !visible) return <Navigate to={lp("/projekte")} replace />;

  const { caseStudy: cs } = project;
  const next = nextProject(project);

  return (
    <main id="main-content">
      <article>
        <Header project={project} />

        <FadeIn className={`${CONTAINER} mt-14 sm:mt-20 mb-16 sm:mb-24`}>
          <BrowserFrame url={project.url}>
            {project.video ? (
              <LazyVideo src={project.video} className="block w-full" />
            ) : (
              <img
                src={project.cover.src}
                alt={project.cover.alt}
                decoding="async"
                width={1440}
                height={900}
                className="block w-full h-auto"
              />
            )}
          </BrowserFrame>
        </FadeIn>

        <ProseSection id="ausgangslage" title={t.challenge} text={cs.challenge} pending={t.challengePending} />
        {cs.goal && <ProseSection id="ziel" title={t.goal} text={cs.goal} />}

        <section aria-labelledby="loesung" className={CONTAINER}>
          <div className="border-t border-line py-16 sm:py-24 xl:py-32">
          <FadeIn>
            <h2 id="loesung" className="text-white text-[clamp(28px,4.5vw,64px)] leading-[1.08] tracking-tight">
              {t.solution}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={t.servicesLabel}>
              {project.services.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-blue-400/15 bg-blue-400/[0.06] px-3 py-1 text-[12px] xl:text-[13px] text-ink-200"
                >
                  {s}
                </li>
              ))}
            </ul>
          </FadeIn>

          <div className="mt-14 sm:mt-20 space-y-20 sm:space-y-28">
            {cs.solution.map((block, i) => (
              <Solution key={block.title} block={block} index={i} url={project.url} />
            ))}
          </div>

          {cs.mobile && cs.mobile.length > 0 && (
            <FadeIn className="mt-20 sm:mt-28">
              <h3 className="text-white text-[22px] sm:text-[26px] xl:text-[30px] tracking-tight">
                {t.mobileTitle}
              </h3>
              <p className="mt-3 max-w-xl text-[15px] xl:text-[16px] leading-relaxed text-ink-300">
                {t.mobileText}
              </p>
              {/* Mobile: horizontal wischen, ab sm nebeneinander */}
              <div className="mt-8 -mx-5 px-5 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-3 gap-5 sm:gap-6 xl:gap-10 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-2">
                {cs.mobile.map((m) => (
                  <div key={m.src} className="w-[62%] shrink-0 sm:w-auto snap-center">
                    <PhoneFrame src={m.src} alt={m.alt} />
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
          </div>
        </section>

        <Result project={project} />

        <section className={CONTAINER}>
          <div className="border-t border-line py-16 sm:py-24 xl:py-32">
          {next ? <NextProject project={next} /> : <ClosingCta />}
          </div>
        </section>
      </article>
    </main>
  );
}

function Header({ project }: { project: Project }) {
  const t = useCopy(COPY);
  const lp = useLocalePath();
  const meta: [string, string][] = [
    [t.client, project.client],
    [t.industry, project.industry],
    [t.location, project.location],
    [t.year, project.year],
  ];

  return (
    <header className={`${CONTAINER} pt-32 sm:pt-40 lg:pt-48 xl:pt-56`}>
      <FadeIn>
        <Link
          to={lp("/projekte")}
          className="group inline-flex items-center gap-2 text-[13px] xl:text-[14px] font-medium text-ink-400 transition-colors duration-200 hover:text-blue-400 focus-visible:text-blue-400"
        >
          <ArrowLeft size={14} aria-hidden className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          {t.allProjects}
        </Link>

        <h1 className="mt-8 text-white text-[clamp(36px,7vw,104px)] leading-[1.02] tracking-tight max-w-5xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-3xl text-[16px] sm:text-[18px] xl:text-[21px] leading-relaxed text-ink-200">
          {project.summary}
        </p>

        <dl className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 border-t border-line pt-6 max-w-5xl">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[12px] xl:text-[13px] text-ink-400">{k}</dt>
              <dd className="mt-1 text-[14px] xl:text-[16px] text-white">{v}</dd>
            </div>
          ))}
        </dl>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group/btn mt-10 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-6 py-3 text-[14px] xl:text-[15px] font-medium text-ink-100 transition-colors duration-300 hover:border-blue-400/40 hover:bg-blue-400/[0.15]"
          >
            {t.viewWebsite}
            <ExternalLink
              size={14}
              aria-hidden
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </a>
        )}
      </FadeIn>
    </header>
  );
}

/** Überschrift links, Fließtext rechts. Leerer Text: lokal Platzhalter, live ausgeblendet. */
function ProseSection({
  id,
  title,
  text,
  pending,
}: {
  id: string;
  title: string;
  text: string;
  pending?: string;
}) {
  if (!text && !import.meta.env.DEV) return null;

  return (
    <section aria-labelledby={id} className={CONTAINER}>
          <div className="border-t border-line py-16 sm:py-24 xl:py-32">
      <FadeIn className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <h2 id={id} className="lg:col-span-4 text-white text-[clamp(28px,3.6vw,52px)] leading-[1.08] tracking-tight">
          {title}
        </h2>
        <div className="lg:col-span-8">
          {text ? <Paragraphs text={text} /> : <Pending hint={pending ?? title} />}
        </div>
      </FadeIn>
      </div>
    </section>
  );
}

/** Absätze aus Leerzeilen im Text. */
function Paragraphs({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`space-y-5 max-w-2xl ${className}`}>
      {text.split(/\n\s*\n/).map((para, i) => (
        <p key={i} className="text-[16px] sm:text-[18px] xl:text-[20px] leading-relaxed text-ink-200">
          {para}
        </p>
      ))}
    </div>
  );
}

function Pending({ hint }: { hint: string }) {
  const t = useCopy(COPY);
  return (
    <div className="rounded-xl border border-dashed border-blue-400/40 bg-blue-400/[0.04] px-5 py-4 max-w-2xl">
      <p className="text-[15px] text-blue-200">{t.pendingPrefix}{hint}</p>
      <p className="mt-1 text-[12px] text-ink-400">
        {t.pendingNote}
      </p>
    </div>
  );
}

function Solution({ block, index, url }: { block: SolutionBlock; index: number; url?: string }) {
  const screens = block.screens ?? [];
  const flip = index % 2 === 1;

  if (screens.length === 0) {
    return (
      <FadeIn className="grid gap-4 lg:grid-cols-12 lg:gap-12">
        <h3 className="lg:col-span-4 text-white text-[22px] sm:text-[26px] xl:text-[30px] leading-[1.15] tracking-tight">
          {block.title}
        </h3>
        <p className="lg:col-span-8 max-w-2xl text-[15px] sm:text-[17px] xl:text-[18px] leading-relaxed text-ink-300">
          {block.text}
        </p>
      </FadeIn>
    );
  }

  return (
    <FadeIn className="grid gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16 lg:items-center">
      <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
        <h3 className="text-white text-[22px] sm:text-[26px] xl:text-[30px] leading-[1.15] tracking-tight">
          {block.title}
        </h3>
        <p className="mt-4 text-[15px] sm:text-[17px] xl:text-[18px] leading-relaxed text-ink-300">
          {block.text}
        </p>
      </div>
      <div className={`lg:col-span-7 space-y-6 ${flip ? "lg:order-1" : ""}`}>
        {screens.map((s) => (
          <BrowserFrame key={s.src} url={url}>
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              decoding="async"
              width={1440}
              height={900}
              className="block w-full h-auto"
            />
          </BrowserFrame>
        ))}
      </div>
    </FadeIn>
  );
}

function Result({ project }: { project: Project }) {
  const copy = useCopy(COPY);
  const { result } = project.caseStudy;
  const t = project.testimonial;
  if (!result && !t && !import.meta.env.DEV) return null;

  return (
    <section aria-labelledby="ergebnis" className={CONTAINER}>
          <div className="border-t border-line py-16 sm:py-24 xl:py-32">
      <FadeIn className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <h2 id="ergebnis" className="lg:col-span-4 text-white text-[clamp(28px,3.6vw,52px)] leading-[1.08] tracking-tight">
          {copy.result}
        </h2>
        <div className="lg:col-span-8">
          {result ? <Paragraphs text={result} /> : import.meta.env.DEV && <Pending hint={copy.resultPending} />}

          {t && (
            <figure className={result || import.meta.env.DEV ? "mt-14 sm:mt-16" : ""}>
              <blockquote className="font-[family-name:var(--font-display)] text-white text-[clamp(20px,2.2vw,30px)] leading-[1.3] tracking-tight max-w-3xl">
                {copy.quoteOpen}{t.quote}{copy.quoteClose}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                {t.avatar && (
                  <img
                    src={t.avatar}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-11 w-11 rounded-full object-cover object-top border border-blue-400/35"
                  />
                )}
                <span>
                  <span className="block text-[15px] text-white font-medium">{t.name}</span>
                  <span className="block text-[13px] text-ink-400">
                    {t.role}, {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          )}
        </div>
      </FadeIn>
      </div>
    </section>
  );
}

/** Nächstes sichtbares Projekt, im Kreis. Null, wenn es nur eins gibt. */
function nextProject(current: Project): Project | null {
  const list = PROJECTS.filter(isVisible);
  if (list.length < 2) return null;
  const i = list.findIndex((p) => p.slug === current.slug);
  return list[(i + 1) % list.length];
}

function NextProject({ project: raw }: { project: Project }) {
  const t = useCopy(COPY);
  const lang = useLang();
  const project = localizeProject(raw, lang);
  return (
    <FadeIn>
      <Link to={projectPath(project, lang)} className="group grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="text-[13px] xl:text-[14px] text-ink-400">{t.nextProject}</p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-white text-[clamp(28px,4vw,56px)] leading-[1.05] tracking-tight transition-colors duration-200 group-hover:text-blue-200">
            {project.title}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-blue-200">
            {t.readCaseStudy}
            <ArrowRight size={14} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
        <div className="lg:col-span-7">
          <BrowserFrame url={project.url} className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
            <img src={project.cover.src} alt="" loading="lazy" decoding="async" className="block w-full h-auto" />
          </BrowserFrame>
        </div>
      </Link>
    </FadeIn>
  );
}

function ClosingCta() {
  const navigate = useNavigate();
  const t = useCopy(COPY);
  const lp = useLocalePath();
  return (
    <FadeIn className="text-center">
      <h2 className="text-white text-[28px] xl:text-[36px] 2xl:text-[44px] tracking-tight mb-3">
        {t.ctaTitle}
      </h2>
      <p className="text-ink-300 text-[15px] xl:text-[16px] 2xl:text-[18px] mb-8 max-w-xl 2xl:max-w-2xl mx-auto">
        {t.ctaText}
      </p>
      <PrimaryButton onClick={() => navigate(lp("/kontakt"))}>{t.ctaButton}</PrimaryButton>
    </FadeIn>
  );
}
