import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { ContainerScroll } from "./ui/container-scroll-animation";

type Testimonial = {
  show: boolean;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
};

type Project = {
  image: string | null;
  video?: string | null;
  tag: string;
  title: string;
  desc: string;
  url?: string;
  urlLabel?: string;
  testimonial?: Testimonial;
};

export function PortfolioScrollSection({
  projects,
  hideTag = false,
}: {
  projects: Project[];
  hideTag?: boolean;
}) {
  const mediaProjects = projects.filter((p) => p.video || p.image);

  return (
    <div>
      {/* Desktop: 3D Scroll-Animation, ein Projekt nach dem anderen */}
      <div className="hidden md:block">
        {mediaProjects.map((project, i) => {
          const t = project.testimonial;
          return (
            <div key={i}>
              <ContainerScroll titleComponent={<ProjectTitle project={project} index={i} hideTag={hideTag} />}>
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    className="w-full block scale-[1.10]"
                  />
                ) : (
                  <img
                    src={project.image!}
                    alt={project.title}
                    className="w-full h-auto block"
                  />
                )}
              </ContainerScroll>

              {/* Button + Quote direkt unter dem Screen, über der Karte via z-20 */}
              <div className="relative z-20 flex flex-col items-center text-center -mt-[4.5rem] pb-16 px-4">
                {project.url && <OpenButton project={project} />}
                {t?.show && <TestimonialBlock t={t} />}
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
  const t = project.testimonial;

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

            {project.url && (
              <div className="flex justify-start px-0 mt-6 mb-5">
                <OpenButton project={project} noMargin />
              </div>
            )}

            <div>
              <MacOSBrowserFrame url={project.url}>
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    className="w-full block scale-[1.10]"
                  />
                ) : (
                  <img
                    src={project.image!}
                    alt={project.title}
                    className="w-full block"
                  />
                )}
              </MacOSBrowserFrame>
            </div>

            {t?.show && (
              <div className="text-left mt-7 px-2">
                <TestimonialBlock t={t} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {!single && (
        <div className="mt-7 flex items-center justify-center gap-5">
          <SliderBtn onClick={() => go(-1)} aria="Vorheriges Projekt">
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
                  i === index ? "w-8 bg-sky-400" : "w-1.5 bg-white/20"
                }`}
                aria-label={`Projekt ${i + 1}`}
              />
            ))}
          </div>
          <SliderBtn onClick={() => go(1)} aria="Nächstes Projekt">
            <ChevronRight size={18} />
          </SliderBtn>
        </div>
      )}
    </div>
  );
}

function OpenButton({ project, noMargin = false }: { project: Project; noMargin?: boolean }) {
  return (
    <a
      href={project.url}
      target={project.url?.startsWith("/") ? "_self" : "_blank"}
      rel="noreferrer"
      className={`group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] sm:text-[14px] font-medium transition-all duration-300 ${noMargin ? "" : "mb-8"}`}
      style={{
        background: "rgba(77,190,243,0.08)",
        border: "1px solid rgba(77,190,243,0.22)",
        color: "rgba(200,235,255,0.85)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(77,190,243,0.15)";
        e.currentTarget.style.borderColor = "rgba(77,190,243,0.42)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(77,190,243,0.08)";
        e.currentTarget.style.borderColor = "rgba(77,190,243,0.22)";
      }}
    >
      {project.urlLabel ?? "Webseite öffnen"}
      <ExternalLink
        size={13}
        className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
      />
    </a>
  );
}

function ProjectTitle({ project, index, hideTag = false }: { project: Project; index: number; hideTag?: boolean }) {
  return (
    <div className="text-left md:text-center px-0 md:px-4">
      {!hideTag && (
        <div className="flex items-center justify-start md:justify-center gap-3 mb-4">
          <span
            className="text-[11px] tracking-[0.3em] uppercase font-mono tabular-nums"
            style={{ color: "rgba(77,190,243,0.45)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="w-8 h-px" style={{ background: "rgba(77,190,243,0.2)" }} />
          <span className="text-[11px] tracking-[0.22em] uppercase text-sky-400">
            {project.tag}
          </span>
        </div>
      )}

      <h2 className="text-white text-[clamp(22px,3.5vw,48px)] tracking-tight font-semibold mb-3 leading-[1.05]">
        {project.title}
      </h2>

      <p className="text-slate-400 text-[13px] sm:text-[14px] leading-relaxed max-w-lg md:mx-auto">
        {project.desc}
      </p>
    </div>
  );
}

export function TestimonialBlock({ t }: { t: Testimonial }) {
  return (
    <div className="max-w-2xl md:mx-auto text-left md:text-center">
      <p className="text-slate-300 text-[13px] sm:text-[14px] leading-relaxed italic mb-4">
        „{t.quote}"
      </p>
      <div className="flex items-center justify-start md:justify-center gap-2.5">
        {t.avatar && (
          <img
            src={t.avatar}
            alt={t.name}
            className="w-7 h-7 rounded-full object-cover object-top shrink-0"
            style={{ border: "1.5px solid rgba(77,190,243,0.35)" }}
          />
        )}
        <span className="text-[11px] text-slate-500">
          {t.name} · {t.role}, {t.company}
        </span>
      </div>
    </div>
  );
}

function MacOSBrowserFrame({
  children,
  url,
}: {
  children: React.ReactNode;
  url?: string;
}) {
  const displayUrl = url
    ? url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
    : "vorschau";

  return (
    <div
      className="w-full overflow-hidden rounded-xl"
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow:
          "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Titelleiste */}
      <div
        className="flex items-center gap-3 px-3.5"
        style={{
          height: "34px",
          background:
            "linear-gradient(180deg, rgba(52,57,63,0.98) 0%, rgba(36,41,46,0.99) 100%)",
          borderBottom: "1px solid rgba(0,0,0,0.35)",
        }}
      >
        <div className="flex items-center gap-[5px] shrink-0">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div className="flex-1 flex justify-center">
          <div
            className="px-3 py-[3px] rounded-md text-[10px] text-slate-400 max-w-[180px] truncate text-center"
            style={{
              background: "rgba(0,0,0,0.28)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {displayUrl}
          </div>
        </div>
        <div className="w-[40px] shrink-0" />
      </div>
      <div className="overflow-hidden">{children}</div>
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
      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-300 hover:border-sky-400/40 hover:text-sky-300 active:scale-95"
    >
      {children}
    </button>
  );
}
