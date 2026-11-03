import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useFrameTrack } from "./ui/use-frame-track";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectActions } from "./ProjectActions";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { LazyVideo } from "./LazyVideo";
import { BrowserFrame } from "./BrowserFrame";

import { type Project, isVisible, localizeProject, projectPath } from "../../content/projects";
import { useCopy, useLang } from "../../i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

/** React 18 kennt `inert` noch nicht als Prop – so bleibt es typsicher. */
const inertProps = (hidden: boolean) => (hidden ? ({ inert: "" } as Record<string, string>) : {});

const COPY = {
  de: {
    carousel: "Projekte",
    prev: "Vorheriges Projekt",
    next: "Nächstes Projekt",
    project: "Projekt",
    quoteOpen: "„",
    quoteClose: "“",
  },
  en: {
    carousel: "Projects",
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
      {/* Desktop: eine 3D-Bühne, das Projekt darin wechselt per Pfeil und Punkten */}
      <div className="hidden md:block">
        <DesktopStage projects={mediaProjects} hideTag={hideTag} />
      </div>

      {/* Mobile: macOS-Carousel */}
      <div className="md:hidden">
        <MobileCarousel projects={mediaProjects} hideTag={hideTag} />
      </div>
    </div>
  );
}

/**
 * Eine Bühne für alle Projekte: Beim Wechsel wischt der ganze Rahmen zur
 * Seite, der nächste fährt herein. Titel und Panel liegen gestapelt im selben Grid-Feld, damit
 * die Höhe beim Wechsel nicht springt (die höchste Variante gibt sie vor).
 */
function DesktopStage({ projects, hideTag = false }: { projects: Project[]; hideTag?: boolean }) {
  const { index, direction, go, select } = useSlider(projects.length);
  const copy = useCopy(COPY);
  const single = projects.length <= 1;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (single) return;
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <section aria-roledescription="carousel" aria-label={copy.carousel} onKeyDown={onKeyDown}>
      <ContainerScroll
        slides={projects.map((p, i) => (
          <ScreenMedia key={p.slug} project={p} active={i === index} />
        ))}
        slideIndex={index}
        slideDirection={direction}
        aside={
          !single && (
            <>
              {/* Ab lg neben dem Screen, darunter am Rand über dem Bild */}
              <div className="absolute left-3 lg:-left-20 xl:-left-24 top-1/2 z-30 -translate-y-1/2">
                <SliderBtn onClick={() => go(-1)} aria={copy.prev} size="lg">
                  <ChevronLeft size={22} />
                </SliderBtn>
              </div>
              <div className="absolute right-3 lg:-right-20 xl:-right-24 top-1/2 z-30 -translate-y-1/2">
                <SliderBtn onClick={() => go(1)} aria={copy.next} size="lg">
                  <ChevronRight size={22} />
                </SliderBtn>
              </div>
            </>
          )
        }
        titleComponent={
          <Stack index={index}>
            {projects.map((p, i) => (
              <ProjectTitle key={p.slug} project={p} index={i} hideTag={hideTag} />
            ))}
          </Stack>
        }
      >
      </ContainerScroll>

      {/* Zitat + Aktionen direkt unter dem Screen (z-20 über dem Scroll-Container) */}
      <div className="relative z-20 mx-auto max-w-5xl -mt-[4.5rem] pb-16 px-2 md:px-10">
        <Stack index={index}>
          {projects.map((p) => (
            <ProjectPanel key={p.slug} project={p} />
          ))}
        </Stack>

        {!single && (
          <SliderControls
            count={projects.length}
            index={index}
            labels={projects.map((p) => p.title)}
            onGo={go}
            onSelect={select}
            arrows={false}
            className="mt-12"
          />
        )}
      </div>
    </section>
  );
}

/**
 * Index plus Bewegungsrichtung des letzten Wechsels (1 = alles fährt nach
 * rechts, -1 = nach links). Pfeile bewegen in ihre Richtung, Wischen folgt
 * dem Finger – deshalb lässt sich `move` getrennt vom Schritt angeben.
 */
function useSlider(count: number) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const go = (delta: number, move: number = delta) =>
    setState(([i]) => [(i + delta + count) % count, move]);
  const select = (i: number) => setState(([cur]) => (i === cur ? [cur, 0] : [i, i > cur ? 1 : -1]));
  return { index, direction, go, select };
}

/** Screen-Inhalt im festen Format des Projektvideos; Screenshots oben bündig beschnitten. */
function ScreenMedia({ project, active = true }: { project: Project; active?: boolean }) {
  return (
    <div className="relative aspect-[1400/708] overflow-hidden bg-zinc-900">
      {project.video ? (
        <LazyVideo
          src={project.video}
          poster={project.cover.src}
          paused={!active}
          className="pointer-events-none absolute inset-0 block h-full w-full object-cover object-top"
        />
      ) : (
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="pointer-events-none absolute inset-0 block h-full w-full select-none object-cover object-top"
        />
      )}
    </div>
  );
}

/**
 * Mobil: dieselbe Schiene wie am Desktop. Die Rahmen hängen am Finger
 * (vertikales Scrollen bleibt frei), losgelassen entscheiden Weg oder Tempo.
 */
function MobileTrack({
  projects,
  index,
  direction,
  onSwipe,
}: {
  projects: Project[];
  index: number;
  direction: number;
  onSwipe?: (delta: number, move: number) => void;
}) {
  const track = useFrameTrack(projects.length, index, direction);
  const start = useRef<{ x: number; y: number; t: number; axis?: "x" | "y" } | null>(null);
  const dx = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!onSwipe || e.pointerType === "mouse") return;
    start.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    dx.current = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s) return;
    const mx = e.clientX - s.x;
    const my = e.clientY - s.y;
    if (!s.axis && Math.hypot(mx, my) > 8) s.axis = Math.abs(mx) > Math.abs(my) ? "x" : "y";
    if (s.axis !== "x") return;
    dx.current = mx;
    track.drag(mx);
  };
  const onPointerEnd = () => {
    const s = start.current;
    start.current = null;
    if (!s || s.axis !== "x" || !onSwipe) return;
    const v = dx.current / Math.max(1, performance.now() - s.t); // px pro ms
    // Zug nach links: nächstes Projekt, alles fährt nach links (und umgekehrt)
    if (dx.current < -60 || v < -0.5) onSwipe(1, -1);
    else if (dx.current > 60 || v > 0.5) onSwipe(-1, 1);
    else track.release();
  };

  return (
    <div
      className="grid"
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      {projects.map((p, i) => (
        <div
          key={p.slug}
          ref={track.setRef(i)}
          className="[grid-area:1/1] w-full will-change-transform"
          style={track.initialStyle(i)}
          aria-hidden={i !== index}
        >
          <BrowserFrame url={p.url}>
            <ScreenMedia project={p} active={i === index} />
          </BrowserFrame>
        </div>
      ))}
    </div>
  );
}

/** Legt alle Kinder übereinander; nur das aktive ist sichtbar und bedienbar. */
function Stack({ index, children }: { index: number; children: React.ReactNode[] }) {
  return (
    <div className="grid">
      {children.map((child, i) => {
        const active = i === index;
        return (
          <motion.div
            key={i}
            className="[grid-area:1/1]"
            initial={false}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
            transition={{ duration: active ? 0.5 : 0.25, ease: EASE, delay: active ? 0.12 : 0 }}
            style={{ pointerEvents: active ? "auto" : "none" }}
            aria-hidden={!active}
            {...inertProps(!active)}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}

/** Pfeile und Punkte, gemeinsam für Desktop-Bühne und Mobile-Carousel. */
function SliderControls({
  count,
  index,
  labels,
  onGo,
  onSelect,
  arrows = true,
  className = "",
}: {
  count: number;
  index: number;
  labels: string[];
  onGo: (delta: number) => void;
  onSelect: (i: number) => void;
  /** false = nur Punkte (Pfeile sitzen dann woanders, z. B. neben dem Screen). */
  arrows?: boolean;
  className?: string;
}) {
  const copy = useCopy(COPY);
  return (
    <div className={`flex items-center justify-center gap-5 ${className}`}>
      {arrows && (
        <SliderBtn onClick={() => onGo(-1)} aria={copy.prev}>
          <ChevronLeft size={18} />
        </SliderBtn>
      )}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-brand" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`${copy.project} ${i + 1}: ${labels[i]}`}
            aria-current={i === index ? "true" : undefined}
          />
        ))}
      </div>
      {arrows && (
        <SliderBtn onClick={() => onGo(1)} aria={copy.next}>
          <ChevronRight size={18} />
        </SliderBtn>
      )}
    </div>
  );
}

/**
 * Mobile: gleiches Prinzip wie die Desktop-Bühne. Titel und Panels aller
 * Projekte bleiben gestapelt im DOM (Case-Study-Links crawlbar, Pfeile
 * springen nicht unter dem Daumen weg), nur das Bild wechselt.
 */
function MobileCarousel({ projects, hideTag = false }: { projects: Project[]; hideTag?: boolean }) {
  const { index, direction, go, select } = useSlider(projects.length);
  const single = projects.length <= 1;

  return (
    <div>
      <Stack index={index}>
        {projects.map((p, i) => (
          <ProjectTitle key={p.slug} project={p} index={i} hideTag={hideTag} />
        ))}
      </Stack>

      <div className="mt-6">
        <MobileTrack projects={projects} index={index} direction={direction} onSwipe={single ? undefined : go} />
      </div>

      {/* Steuerleiste direkt unter dem Screen: Punkte links, Pfeile rechts – klar getrennt vom Text darunter */}
      {!single && (
        <MobileControls
          count={projects.length}
          index={index}
          labels={projects.map((p) => p.title)}
          onGo={go}
          onSelect={select}
        />
      )}

      <div className={single ? "mt-6" : "mt-8"}>
        <Stack index={index}>
          {projects.map((p) => (
            <ProjectPanel key={p.slug} project={p} />
          ))}
        </Stack>
      </div>
    </div>
  );
}

function MobileControls({
  count,
  index,
  labels,
  onGo,
  onSelect,
}: {
  count: number;
  index: number;
  labels: string[];
  onGo: (delta: number) => void;
  onSelect: (i: number) => void;
}) {
  const copy = useCopy(COPY);
  return (
    <div className="mt-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }, (_, i) => (
          // Großes Tippziel (44 px), sichtbar nur der schmale Punkt
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`${copy.project} ${i + 1}: ${labels[i]}`}
            aria-current={i === index ? "true" : undefined}
            className="-my-3 flex h-11 cursor-pointer items-center px-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-brand" : "w-1.5 bg-white/25"
              }`}
            />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <SliderBtn onClick={() => onGo(-1)} aria={copy.prev}>
          <ChevronLeft size={18} />
        </SliderBtn>
        <SliderBtn onClick={() => onGo(1)} aria={copy.next}>
          <ChevronRight size={18} />
        </SliderBtn>
      </div>
    </div>
  );
}

function ProjectTitle({ project, index, hideTag = false }: { project: Project; index: number; hideTag?: boolean }) {
  const lang = useLang();
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
        {isVisible(project) ? (
          <Link
            to={projectPath(project, lang)}
            className="rounded-md outline-none transition-colors duration-200 hover:text-blue-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            {project.title}
          </Link>
        ) : (
          project.title
        )}
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
            {quoteOpen}{t.short ?? t.quote}{quoteClose}
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
  size = "md",
}: {
  children: React.ReactNode;
  onClick: () => void;
  aria: string;
  /** lg = neben dem Screen: größer und mit dunklem Grund, falls es über dem Bild liegt. */
  size?: "md" | "lg";
}) {
  const base =
    "inline-flex cursor-pointer items-center justify-center rounded-full border text-ink-100 transition-all duration-300 hover:border-brand/40 hover:text-brand-light active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400";
  const look =
    size === "lg"
      ? "h-14 w-14 border-white/15 bg-ink-950/70 backdrop-blur-sm lg:bg-white/5 lg:backdrop-blur-none hover:bg-blue-400/10"
      : "h-11 w-11 border-white/10 bg-white/5";
  return (
    <button type="button" onClick={onClick} aria-label={aria} className={`${base} ${look}`}>
      {children}
    </button>
  );
}
