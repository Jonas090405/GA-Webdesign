import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Play } from "lucide-react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { FadeIn } from "../FadeIn";
import { PrimaryButton } from "../Button";
import { BrowserFrame, PhoneFrame } from "../BrowserFrame";
import { LazyVideo } from "../LazyVideo";
import { ProjectServiceGrid } from "../ProjectServices";
import {
  PROJECTS,
  type PhotoSpan,
  type Production,
  type ProductionFilm,
  type ProductionPhoto,
  type Project,
  type SolutionBlock,
  findProject,
  isVisible,
  localizeProject,
  projectPath,
} from "../../../content/projects";
import { localizePath, useCopy, useLang, useLocalePath } from "../../../i18n";

const COPY = {
  de: {
    metaTitleSuffix: " – Case Study | G&A Webdesign",
    metaFallbackTitle: "Projekte | G&A Webdesign",
    crumbHome: "Startseite",
    crumbProjects: "Projekte",
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
    production: "Foto & Video",
    playFilm: "Film abspielen",
    watchOnYoutube: "Auf YouTube ansehen",
    youtubeNote: "Beim Abspielen lädt der Film von YouTube, dein Browser überträgt dabei Daten an Google.",
    youtubePrivacy: "Mehr in der Datenschutzerklärung",
    result: "Ergebnis",
    resultPending: "Was hat sich für den Kunden verändert?",
    testimonialPending: "Kundenstimme (Zitat, Name, Rolle)",
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
    crumbHome: "Home",
    crumbProjects: "Projects",
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
    production: "Photo & video",
    playFilm: "Play film",
    watchOnYoutube: "Watch on YouTube",
    youtubeNote: "When you press play, the film loads from YouTube and your browser sends data to Google.",
    youtubePrivacy: "More in the privacy policy",
    result: "Result",
    resultPending: "What changed for the client?",
    testimonialPending: "Client testimonial (quote, name, role)",
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

  // Breadcrumb für Google: Startseite › Projekte › Projekt (Prerender übernimmt das Script im <head>)
  useEffect(() => {
    if (!project || !visible) return;
    const base = "https://ga-webdesign.de";
    const url = (p: string) => `${base}${p === "/" ? "/" : p}`;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "breadcrumb-ld";
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.crumbHome, item: url(localizePath("/", lang)) },
        { "@type": "ListItem", position: 2, name: t.crumbProjects, item: url(localizePath("/projekte", lang)) },
        { "@type": "ListItem", position: 3, name: project.title, item: url(projectPath(project, lang)) },
      ],
    });
    document.getElementById("breadcrumb-ld")?.remove();
    document.head.appendChild(el);
    return () => el.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.slug, lang, visible]);

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
              <LazyVideo src={project.video} poster={project.cover.src} className="block w-full" />
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
            <div className="mt-8 sm:mt-10">
              <ProjectServiceGrid ids={project.services} label={t.servicesLabel} />
            </div>
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
                    <PhoneFrame src={m.src} alt={m.alt} video={m.video} />
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
          </div>
        </section>

        {cs.production && <ProductionSection production={cs.production} />}

        <Result project={project} />

        <section className={CONTAINER}>
          <div className="border-t border-line py-16 sm:py-24 xl:py-32">
          {next ? <NextProject project={next} /> : <ClosingCta />}
          </div>
        </section>

        {/* Auch mit Folgeprojekt bleibt der Weg zum Erstgespräch auf der Seite */}
        {next && (
          <section className={CONTAINER}>
            <div className="border-t border-line py-16 sm:py-24 xl:py-32">
              <ClosingCta />
            </div>
          </section>
        )}
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
            {s.video ? (
              <div className="relative aspect-[1440/900]">
                <LazyVideo src={s.video} poster={s.src} className="absolute inset-0 block h-full w-full object-cover" />
                <span className="sr-only">{s.alt}</span>
              </div>
            ) : (
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                width={1440}
                height={900}
                className="block w-full h-auto"
              />
            )}
          </BrowserFrame>
        ))}
      </div>
    </FadeIn>
  );
}

/** Raster-Flächen der Fotos (feste Klassen, damit Tailwind sie findet). */
const SPAN_BASE: Record<PhotoSpan["base"], string> = {
  "1x1": "",
  "1x2": "row-span-2",
  "2x1": "col-span-2",
  "2x2": "col-span-2 row-span-2",
};
const SPAN_LG: Record<PhotoSpan["lg"], string> = {
  "4x1": "lg:col-span-4 lg:row-span-1",
  "4x2": "lg:col-span-4 lg:row-span-2",
  "8x1": "lg:col-span-8 lg:row-span-1",
  "8x2": "lg:col-span-8 lg:row-span-2",
};

const TILE = "relative overflow-hidden rounded-[var(--radius-lg)] border border-blue-400/12 bg-ink-900";

/**
 * Foto- und Videoproduktion: Text wie bei Ausgangslage, darunter die fertigen
 * Filme (eingebettet, Link darunter) oder ein stummer Ausschnitt aus dem Dreh,
 * dann die Fotos in einem Raster mit fester Zeilenhöhe. Jedes Foto gibt in
 * projects.ts an, wie viele Spalten und Zeilen es belegt.
 */
function ProductionSection({ production: p }: { production: Production }) {
  const t = useCopy(COPY);
  const lp = useLocalePath();
  const films = p.films ?? [];

  return (
    <section aria-labelledby="foto-video" className={CONTAINER}>
      <div className="border-t border-line py-16 sm:py-24 xl:py-32">
        <FadeIn className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <h2 id="foto-video" className="lg:col-span-4 text-white text-[clamp(28px,3.6vw,52px)] leading-[1.08] tracking-tight">
            {t.production}
          </h2>
          <div className="lg:col-span-8">
            <Paragraphs text={p.text} />
          </div>
        </FadeIn>

        {films.length > 0 && (
          <FadeIn className="mt-12 sm:mt-16">
            <div className={`grid gap-8 sm:gap-6 xl:gap-8 ${films.length > 1 ? "lg:grid-cols-2" : ""}`}>
              {films.map((f) => (
                <YouTubeFilm key={f.youtubeId} film={f} />
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-[13px] leading-relaxed text-ink-400">
              {t.youtubeNote}{" "}
              <Link to={lp("/datenschutz")} className="text-ink-300 underline underline-offset-4 decoration-ink-600 hover:text-blue-200">
                {t.youtubePrivacy}
              </Link>
            </p>
          </FadeIn>
        )}

        {p.loop && (
          <FadeIn className={`${TILE} mt-12 sm:mt-16 aspect-video`}>
            <LazyVideo src={p.loop.video} poster={p.loop.src} className="absolute inset-0 block h-full w-full object-cover" />
            <span className="sr-only">{p.loop.alt}</span>
          </FadeIn>
        )}

        <FadeIn
          className={`grid grid-flow-dense grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 xl:gap-5 auto-rows-[44vw] sm:auto-rows-[38vw] lg:auto-rows-[clamp(200px,21vw,340px)] ${
            // Direkt unter dem Ausschnitt wie ein Raster, unter den Filmen mit Luft
            p.loop ? "mt-3 sm:mt-4 xl:mt-5" : "mt-12 sm:mt-16"
          }`}
        >
          {p.photos.map((ph) => (
            <ProductionPhotoTile key={ph.src} photo={ph} />
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

function ProductionPhotoTile({ photo }: { photo: ProductionPhoto }) {
  const sources = photo.sources ?? [];
  const wide = photo.span.lg.startsWith("8");
  const full = photo.span.base.startsWith("2");
  return (
    <figure className={`${TILE} ${SPAN_BASE[photo.span.base]} ${SPAN_LG[photo.span.lg]}`}>
      <img
        src={photo.src}
        srcSet={sources.length ? sources.map((s) => `${s.src} ${s.width}w`).join(", ") : undefined}
        sizes={`(min-width: 1024px) ${wide ? "66vw" : "33vw"}, ${full ? "100vw" : "50vw"}`}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={photo.focus ? { objectPosition: photo.focus } : undefined}
      />
    </figure>
  );
}

/**
 * YouTube-Film ohne Vorab-Verbindung: Bis zum Klick steht nur das eigene
 * Vorschaubild da, erst dann wird der Player (youtube-nocookie) geladen.
 */
function YouTubeFilm({ film }: { film: ProductionFilm }) {
  const t = useCopy(COPY);
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${film.youtubeId}`;

  return (
    <figure>
      <div className={`${TILE} aspect-video`}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0&playsinline=1`}
            title={film.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 block h-full w-full cursor-pointer focus-visible:outline-none"
            aria-label={`${t.playFilm}: ${film.title}`}
          >
            <img
              src={film.poster}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-transparent" />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex h-16 w-16 sm:h-20 sm:w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-800 text-white shadow-[0_12px_32px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-blue-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-ink-950"
            >
              <Play size={24} className="ml-1 fill-current" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="text-[16px] xl:text-[18px] text-white">{film.title}</span>
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className="group/link inline-flex items-center gap-1.5 text-[14px] font-medium text-blue-200 transition-colors duration-200 hover:text-blue-100"
        >
          {t.watchOnYoutube}
          <ExternalLink
            size={13}
            aria-hidden
            className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      </figcaption>
    </figure>
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

          {t === undefined && import.meta.env.DEV && (
            <div className="mt-14 sm:mt-16">
              <Pending hint={copy.testimonialPending} />
            </div>
          )}

          {t && (
            <figure className={result || import.meta.env.DEV ? "mt-14 sm:mt-16" : ""}>
              <blockquote
                className={`font-[family-name:var(--font-display)] text-white tracking-tight max-w-3xl space-y-5 ${
                  // Lange Kundenstimmen etwas kleiner, damit sie nicht wie eine Headline-Wand wirken
                  t.quote.length > 320
                    ? "text-[clamp(18px,1.6vw,23px)] leading-[1.45]"
                    : "text-[clamp(20px,2.2vw,30px)] leading-[1.3]"
                }`}
              >
                {t.quote.split(/\n\s*\n/).map((para, i, all) => (
                  <p key={i}>
                    {i === 0 && copy.quoteOpen}
                    {para}
                    {i === all.length - 1 && copy.quoteClose}
                  </p>
                ))}
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
      <PrimaryButton to={lp("/kontakt")}>{t.ctaButton}</PrimaryButton>
    </FadeIn>
  );
}
