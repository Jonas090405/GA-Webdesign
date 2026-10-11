import { Link, useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { FadeIn } from "../FadeIn";
import { PrimaryButton } from "../Button";
import { BrowserFrame } from "../BrowserFrame";
import { ProjectActions } from "../ProjectActions";
import { PROJECTS, type Project, isVisible, projectPath } from "../../../content/projects";

export function Portfolio() {
  const navigate = useNavigate();
  usePageMeta({
    title: "Projekte & Case Studies | G&A Webdesign",
    description:
      "Kundenprojekte von G&A Webdesign mit Case Study: Ausgangslage, Lösung und Ergebnis – moderne Webseiten für Unternehmen aus dem Schwarzwald.",
    path: "/projekte",
  });

  return (
    <main
      id="main-content"
      className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-12 xl:pb-20 2xl:pb-28"
    >
      <FadeIn>
        <h1 className="text-white text-[clamp(32px,6vw,84px)] tracking-tight leading-[1.05] max-w-4xl 2xl:max-w-5xl">
          Projekte, die <span className="text-blue-400">für sich sprechen.</span>
        </h1>
        <p className="mt-5 sm:mt-6 max-w-2xl 2xl:max-w-3xl text-[15px] sm:text-[17px] 2xl:text-[19px] text-ink-300 leading-relaxed">
          Unsere Kundenprojekte – jeweils mit Case Study: wo das Problem lag, was wir gebaut
          haben und was es gebracht hat.
        </p>
      </FadeIn>

      <div className="mt-16 sm:mt-20 xl:mt-28 space-y-20 sm:space-y-28 xl:space-y-36">
        {PROJECTS.map((p, i) => (
          <ProjectTeaser key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>

      {/* Hochschulprojekte & Eigenarbeiten */}
      <FadeIn>
        <section
          aria-labelledby="eigenarbeiten"
          className="mt-24 sm:mt-32 xl:mt-40 border-t border-line pt-14 sm:pt-16 2xl:pt-20"
        >
          <h2
            id="eigenarbeiten"
            className="text-white text-[24px] sm:text-[30px] 2xl:text-[38px] tracking-tight mb-3"
          >
            Hochschulprojekte &amp; Eigenarbeiten
          </h2>
          <p className="text-ink-300 text-[14px] sm:text-[15px] 2xl:text-[17px] leading-relaxed max-w-xl 2xl:max-w-2xl mb-7">
            Im Laufe meines Studiums und durch private Nebenprojekte sind zahlreiche Arbeiten
            entstanden. Diese findest du gebündelt in meinem persönlichen Portfolio.
          </p>
          <a
            href="https://portfolio.ga-webdesign.de"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-6 py-3 text-blue-200 transition-colors duration-200 hover:bg-blue-400/20"
          >
            Persönliches Portfolio öffnen
            <ExternalLink
              size={16}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <div className="mt-24 2xl:mt-32 text-center">
          <h2 className="text-white text-[28px] xl:text-[34px] 2xl:text-[42px] tracking-tight mb-3">
            Dein Projekt soll das nächste sein.
          </h2>
          <p className="text-ink-300 text-[15px] xl:text-[16px] 2xl:text-[18px] mb-8 max-w-xl 2xl:max-w-2xl mx-auto">
            Sag uns, was du dir vorstellst – das erste Gespräch ist kostenlos und unverbindlich.
          </p>
          <PrimaryButton onClick={() => navigate("/kontakt")}>Projekt anfragen</PrimaryButton>
        </div>
      </FadeIn>
    </main>
  );
}

/**
 * Ein Projekt in der Übersicht: Screen auf der einen, Text auf der anderen
 * Seite. Jedes zweite Projekt spiegelt die Seiten, damit die Liste bei
 * mehreren Projekten nicht monoton wird.
 */
function ProjectTeaser({ project, flip }: { project: Project; flip: boolean }) {
  const href = isVisible(project) ? projectPath(project) : project.url;
  const internal = isVisible(project);

  const screen = (
    <BrowserFrame url={project.url} className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
      <img
        src={project.cover.src}
        alt={project.cover.alt}
        loading="lazy"
        decoding="async"
        width={1440}
        height={900}
        className="block w-full h-auto"
      />
    </BrowserFrame>
  );

  return (
    <FadeIn>
      <article className="grid gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-12 lg:items-center">
        <div className={`group lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
          {href && internal ? (
            <Link to={href} tabIndex={-1} aria-hidden>
              {screen}
            </Link>
          ) : (
            screen
          )}
        </div>

        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <h2 className="text-white text-[clamp(28px,3.6vw,52px)] leading-[1.05] tracking-tight">
            {project.title}
          </h2>
          <p className="mt-3 text-[13px] xl:text-[14px] text-ink-400">
            {project.industry} · {project.location} · {project.year}
          </p>
          <p className="mt-5 text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed text-ink-300">
            {project.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Leistungen in diesem Projekt">
            {project.services.map((s) => (
              <li
                key={s}
                className="rounded-full border border-blue-400/15 bg-blue-400/[0.06] px-3 py-1 text-[12px] xl:text-[13px] text-ink-200"
              >
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ProjectActions project={project} noMargin align="start" />
          </div>
        </div>
      </article>
    </FadeIn>
  );
}
