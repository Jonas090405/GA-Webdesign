import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectActions } from "./ProjectActions";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { LazyVideo } from "./LazyVideo";
import { BrowserFrame } from "./BrowserFrame";

import { type Project, localizeProject } from "../../content/projects";
import { useCopy, useLang } from "../../i18n";

const COPY = {
  de: {
    prev: "Vorheriges Projekt",
    next: "Nächstes Projekt",
    project: "Projekt",
    quoteOpen: "„",
    quoteClose: "“",
  },
  en: {
    prev: "Previous project",
    next: "Next project",
    project: "Project",
    quoteOpen: "“",
    quoteClose: "”",
  },
};

export function PortfolioScrollSection({
  projects,
  hideTag = false,
}: {
  projects: Project[];
  hideTag?: boolean;
}) {
  // Texte in der Sprache der URL – so kann die Startseite die deutschen Daten durchreichen.
  const lang = useLang();
  const mediaProjects = projects.map((p) => localizeProject(p, lang));

  return (
    <div>
      {/* Desktop: 3D Scroll-Animation, ein Projekt nach dem anderen */}
      <div className="hidden md:block">
        {mediaProjects.map((project, i) => {
          return (
            <div key={i}>
              <ContainerScroll titleComponent={<ProjectTitle project={project} index={i} hideTag={hideTag} />}>
                {project.video ? (
                  <LazyVideo
                    src={project.video}
                    className="w-full block"
                  />
                ) : (
                  <img
                    src={project.cover.src}
                    alt={project.cover.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block"
                  />
                )}
              </ContainerScroll>

              {/* Zitat + Aktionen in einer Karte, direkt unter dem Screen (z-20 über dem Scroll-Container) */}
              <div className="relative z-20 mx-auto max-w-5xl -mt-[4.5rem] pb-16 px-2 md:px-10">
                <ProjectPanel project={project} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: macOS-Carousel */}
      <div className="md:hidden">
        <MobileCarousel projects={mediaProjects} hideTag={hideTag} />
      </div>
    </div>
  );
}

function MobileCarousel({ projects, hideTag = false }: { projects: Project[]; hideTag?: boolean }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const copy = useCopy(COPY);

  const single = projects.length <= 1;

  const go = (delta: number) => {
    setDirection(delta);
    setIndex((i) => (i + delta + projects.length) % projects.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const project = projects[index];

  return (
    <div>
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction === 0 ? 0 : direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectTitle project={project} index={index} hideTag={hideTag} />

            <div className="mt-6" />

            <div>
              <BrowserFrame url={project.url}>
                {project.video ? (
                  <LazyVideo
                    src={project.video}
                    className="w-full block"
                  />
                ) : (
                  <img
                    src={project.cover.src}
                    alt={project.cover.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full block"
                  />
                )}
              </BrowserFrame>
            </div>

            <div className="mt-6">
              <ProjectPanel project={project} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {!single && (
        <div className="mt-7 flex items-center justify-center gap-5">
          <SliderBtn onClick={() => go(-1)} aria={copy.prev}>
            <ChevronLeft size={18} />
          </SliderBtn>
          <div className="flex items-center gap-1.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 cursor-pointer rounded-full transition-all ${
                  i === index ? "w-8 bg-brand" : "w-1.5 bg-white/20"
                }`}
                aria-label={`${copy.project} ${i + 1}`}
              />
            ))}
          </div>
          <SliderBtn onClick={() => go(1)} aria={copy.next}>
            <ChevronRight size={18} />
          </SliderBtn>
        </div>
      )}
    </div>
  );
}

function ProjectTitle({ project, index, hideTag = false }: { project: Project; index: number; hideTag?: boolean }) {
  return (
    <div className="text-left md:text-center px-0 md:px-4">
      {!hideTag && (
        <div className="flex items-center justify-start md:justify-center gap-3 mb-4">
          <span
            className="text-[11px] tracking-[0.3em] font-mono tabular-nums"
            style={{ color: "rgb(var(--blue-400-rgb) / 0.45)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="w-8 h-px" style={{ background: "rgb(var(--blue-400-rgb) / 0.2)" }} />
          <span className="text-[11px] tracking-[0.22em] text-brand">
            {project.industry} · {project.year}
          </span>
        </div>
      )}

      <h2 className="text-white text-[clamp(22px,3.5vw,48px)] tracking-tight font-semibold mb-3 leading-[1.05]">
        {project.title}
      </h2>

      <p className="text-ink-300 text-[13px] sm:text-[14px] leading-relaxed max-w-lg md:mx-auto">
        {project.summary}
      </p>
    </div>
  );
}

/**
 * Unter dem Projekt-Screen: Kundenstimme links, Aktionen rechts
 * (mobil untereinander). Bewusst ohne eigenen Container – der Screen
 * darüber ist schon die Bühne.
 */
function ProjectPanel({ project }: { project: Project }) {
  const t = project.testimonial;
  const { quoteOpen, quoteClose } = useCopy(COPY);
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12 xl:gap-20">
      {t ? (
        <figure>
          <blockquote className="font-[family-name:var(--font-display)] text-white text-[17px] sm:text-[19px] xl:text-[21px] leading-[1.45] tracking-tight">
            {quoteOpen}{t.quote}{quoteClose}
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            {t.avatar && (
              <img
                src={t.avatar}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-9 w-9 shrink-0 rounded-full object-cover object-top border border-blue-400/35"
              />
            )}
            <span className="text-[13px] leading-snug">
              <span className="block font-medium text-white">{t.name}</span>
              <span className="block text-ink-400">
                {t.role}, {t.company}
              </span>
            </span>
          </figcaption>
        </figure>
      ) : (
        <p className="text-[15px] leading-relaxed text-ink-300">{project.summary}</p>
      )}

      <div className="md:min-w-[220px]">
        <ProjectActions project={project} noMargin stacked />
      </div>
    </div>
  );
}

function SliderBtn({
  children,
  onClick,
  aria,
}: {
  children: React.ReactNode;
  onClick: () => void;
  aria: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={aria}
      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-100 transition-all duration-300 hover:border-brand/40 hover:text-brand-light active:scale-95"
    >
      {children}
    </button>
  );
}
