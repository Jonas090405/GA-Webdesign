import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Quote, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LazyVideo } from "./LazyVideo";
import { Card } from "./Card";
import { TertiaryButton } from "./Button";

type Testimonial = {
  show: boolean; // ← false = Testimonial ausblenden
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
  features?: string[];
  comingSoon?: boolean;
  testimonial?: Testimonial;
};

export function PortfolioSlider({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [testimonialOpen, setTestimonialOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = (delta: number) => {
    setDirection(delta);
    setIndex((i) => (i + delta + projects.length) % projects.length);
    setTestimonialOpen(false);
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

  const single = projects.length <= 1;
  const project = projects[index];
  const t = project.testimonial;

  return (
    <>
      <div>
        {!single && (
          <div className="mb-6 flex justify-end gap-3">
            <SliderBtn onClick={() => go(-1)} aria="Vorheriges Projekt">
              <ChevronLeft size={18} className="xl:!h-5 xl:!w-5 2xl:!h-6 2xl:!w-6" />
            </SliderBtn>
            <SliderBtn onClick={() => go(1)} aria="Nächstes Projekt">
              <ChevronRight size={18} className="xl:!h-5 xl:!w-5 2xl:!h-6 2xl:!w-6" />
            </SliderBtn>
          </div>
        )}

        <div
          className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] md:rounded-[36px] 2xl:rounded-[44px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction === 0 ? 0 : direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card
                className="rounded-[28px] sm:rounded-[32px] md:rounded-[36px] 2xl:rounded-[44px]"
                innerClassName="p-3 sm:p-4 md:p-5 xl:p-6 2xl:p-8 overflow-hidden"
              >
                <div className={`grid gap-6 md:gap-10 xl:gap-12 ${(project.video || project.image) ? "md:grid-cols-[2fr_3fr]" : ""}`}>
                  {/* Mobile: media ohne Rahmen */}
                  {(project.video || project.image) && (
                    <div className="md:hidden aspect-video overflow-hidden rounded-2xl">
                      {project.video ? (
                        <LazyVideo
                          src={project.video}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageWithFallback
                          src={project.image!}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  )}

                  {/* Text — links auf Desktop */}
                  <div className={`flex flex-col justify-center overflow-hidden ${(project.video || project.image) ? "py-2 md:py-6 xl:py-8" : "px-4 py-6 sm:px-8 md:px-12 xl:px-16 2xl:px-20"}`}>
                    <div className="text-sky-400 text-[12px] xl:text-[13px] 2xl:text-[15px] tracking-[0.2em] uppercase mb-3">
                      {project.tag}
                    </div>
                    <h3 className="text-white text-[22px] sm:text-[28px] xl:text-[34px] 2xl:text-[40px] mb-3 xl:mb-4 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-[14px] sm:text-[15px] xl:text-[16px] 2xl:text-[18px] leading-relaxed">
                      {project.desc}
                    </p>

                    {t?.show && (
                      <>
                        {/* Mobile: Button → Popup */}
                        <div className="md:hidden mt-4">
                          <TertiaryButton onClick={() => setTestimonialOpen(true)}>
                            <Quote size={13} className="mr-0.5" />
                            Kundenstimme lesen
                          </TertiaryButton>
                        </div>

                        {/* Desktop: Inline */}
                        <div className="hidden md:block mt-5 xl:mt-6 pt-5 xl:pt-6 border-t border-white/10">
                          <TestimonialContent t={t} />
                        </div>
                      </>
                    )}

                    {project.url && (
                      <a
                        href={project.url}
                        target={project.url.startsWith("/") ? "_self" : "_blank"}
                        rel="noreferrer"
                        className="group/btn mt-6 xl:mt-8 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full px-4 xl:px-5 2xl:px-6 py-2 2xl:py-3 text-[13px] xl:text-[14px] 2xl:text-[16px] font-medium transition-all duration-300"
                        style={{
                          background: "rgba(77, 190, 243, 0.07)",
                          border: "1px solid rgba(77, 190, 243, 0.2)",
                          color: "rgba(200, 235, 255, 0.85)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(77, 190, 243, 0.13)";
                          e.currentTarget.style.borderColor = "rgba(77, 190, 243, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(77, 190, 243, 0.07)";
                          e.currentTarget.style.borderColor = "rgba(77, 190, 243, 0.2)";
                        }}
                      >
                        {project.urlLabel ?? "Webseite öffnen"}
                        <ExternalLink
                          size={13}
                          className="xl:!h-4 xl:!w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        />
                      </a>
                    )}
                  </div>

                  {/* Desktop: macOS Browser-Rahmen rechts */}
                  {(project.video || project.image) && (
                    <div className="hidden md:flex items-center">
                      <MacOSBrowserFrame url={project.url}>
                        {project.video ? (
                          <LazyVideo
                            src={project.video}
                            className="w-full block scale-[1.10]"
                          />
                        ) : (
                          <ImageWithFallback
                            src={project.image!}
                            alt={project.title}
                            className="w-full block"
                          />
                        )}
                      </MacOSBrowserFrame>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {!single && (
          <div className="mt-5 2xl:mt-7 flex justify-center gap-1.5 2xl:gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                  setTestimonialOpen(false);
                }}
                className={`h-1.5 2xl:h-2 cursor-pointer rounded-full transition-all ${
                  i === index ? "w-8 2xl:w-10 bg-sky-400" : "w-1.5 2xl:w-2 bg-white/20"
                }`}
                aria-label={`Projekt ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Testimonial Popup */}
      <AnimatePresence>
        {testimonialOpen && t?.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-end justify-center p-4 md:hidden"
            style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", background: "rgba(6,12,16,0.72)" }}
            onClick={() => setTestimonialOpen(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  y: { type: "spring", damping: 32, stiffness: 280, mass: 0.8 },
                  opacity: { duration: 0.18, ease: "easeOut" },
                },
              }}
              exit={{
                y: 80,
                opacity: 0,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
              className="relative w-full max-w-md rounded-2xl p-5"
              style={{
                background: "linear-gradient(135deg, rgba(16,24,27,0.98) 0%, rgba(10,17,22,0.99) 100%)",
                border: "1px solid rgba(77,190,243,0.18)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setTestimonialOpen(false)}
                aria-label="Kundenstimme schließen"
                className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <X size={15} aria-hidden />
              </button>

              <p className="text-[11px] tracking-[0.2em] uppercase text-sky-400 mb-4">Kundenstimme</p>
              <TestimonialContent t={t} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TestimonialContent({ t }: { t: Testimonial }) {
  return (
    <div className="flex items-start gap-3 xl:gap-4">
      {t.avatar && (
        <img
          src={t.avatar}
          alt={t.name}
          loading="lazy"
          decoding="async"
          className="shrink-0 w-11 h-11 xl:w-13 xl:h-13 2xl:w-15 2xl:h-15 rounded-full object-cover object-top"
          style={{
            border: "1.5px solid rgba(77,190,243,0.35)",
            boxShadow: "0 0 0 3px rgba(77,190,243,0.08)",
          }}
        />
      )}
      <div>
        <p className="text-slate-300 text-[13px] xl:text-[14px] 2xl:text-[16px] leading-relaxed italic">
          „{t.quote}"
        </p>
        <p className="mt-2 text-[11px] xl:text-[12px] 2xl:text-[13px] text-slate-500">
          — {t.name}, {t.role} · {t.company}
        </p>
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
        className="flex items-center gap-3 px-4"
        style={{
          height: "36px",
          background:
            "linear-gradient(180deg, rgba(52,57,63,0.98) 0%, rgba(36,41,46,0.99) 100%)",
          borderBottom: "1px solid rgba(0,0,0,0.35)",
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-[5px] shrink-0">
          <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        {/* URL-Leiste */}
        <div className="flex-1 flex justify-center">
          <div
            className="px-3 py-[3px] rounded-md text-[11px] text-slate-400 max-w-[220px] truncate text-center"
            style={{
              background: "rgba(0,0,0,0.28)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {displayUrl}
          </div>
        </div>
        {/* Balance */}
        <div className="w-[46px] shrink-0" />
      </div>
      {/* Inhalt */}
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
      className="inline-flex h-12 w-12 sm:h-10 sm:w-10 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-300 hover:border-sky-400/40 hover:text-sky-300 active:scale-95"
    >
      {children}
    </button>
  );
}
