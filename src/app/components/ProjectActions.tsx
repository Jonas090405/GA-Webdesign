import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { type Project, isVisible, projectPath } from "../../content/projects";

/** „Case Study lesen“ (wenn sichtbar) und „Webseite öffnen“. */
export function ProjectActions({
  project,
  noMargin = false,
  align = "center",
  stacked = false,
}: {
  project: Project;
  noMargin?: boolean;
  /** `center` zentriert ab md, `start` bleibt linksbündig. */
  align?: "center" | "start";
  /** Untereinander und gleich breit, z. B. in der Projekt-Karte. */
  stacked?: boolean;
}) {
  const caseStudy = isVisible(project);
  if (!caseStudy && !project.url) return null;
  return (
    <div
      className={`flex ${
        stacked
          ? "flex-col items-stretch gap-3"
          : `flex-wrap items-center justify-start ${align === "center" ? "md:justify-center" : ""} gap-x-5 gap-y-3`
      } ${noMargin ? "" : "mb-8"}`}
    >
      {caseStudy && (
        <Link
          to={projectPath(project)}
          className="group/btn inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] sm:text-[14px] font-medium text-white transition-[filter] duration-200 hover:brightness-110"
          style={{ background: "var(--gradient-cta)" }}
        >
          Case Study lesen
          <ArrowRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden />
        </Link>
      )}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="group/btn inline-flex items-center justify-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-5 py-2.5 text-[13px] sm:text-[14px] font-medium text-ink-100 transition-colors duration-300 hover:border-blue-400/40 hover:bg-blue-400/[0.15]"
        >
          Webseite öffnen
          <ExternalLink
            size={13}
            aria-hidden
            className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </a>
      )}
    </div>
  );
}
