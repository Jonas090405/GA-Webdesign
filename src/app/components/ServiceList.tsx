/**
 * ServiceList — alle Leistungen als aufklappbare Zeilen, gruppiert.
 *
 * Jede Zeile zeigt Illustration, Titel und einen Satz; ein Klick klappt die
 * genaue Beschreibung auf. Die Details bleiben auch zugeklappt im DOM, damit
 * Prerender und Suchmaschinen den vollen Text sehen (zugeklappt per `inert`
 * aus Tab-Reihenfolge und Screenreader genommen).
 *
 * Es ist immer höchstens eine Leistung offen. /leistungen#seo öffnet die
 * passende Zeile direkt.
 */
import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { FadeIn } from "./FadeIn";
import { CheckItem } from "./CheckItem";
import { TertiaryButton } from "./Button";
import { MEDIA, SERVICE_GROUPS, type Service, type ServiceId } from "../../content/services";
import { useCopy, useLocalePath } from "../../i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  de: { ask: "Dazu anfragen", prices: "Pakete und Preise ansehen" },
  en: { ask: "Ask about this", prices: "See plans and prices" },
};

function isServiceId(id: string): id is ServiceId {
  return id in MEDIA;
}

export function ServiceList() {
  const groups = useCopy(SERVICE_GROUPS);
  const { hash } = useLocation();
  const [openId, setOpenId] = useState<ServiceId | null>(null);

  // Anker aus der URL öffnet die Leistung und scrollt hin – erst nach dem
  // Seitenübergang, sonst setzt App.tsx die Scrollposition wieder auf 0.
  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    if (!isServiceId(id)) return;
    setOpenId(id);
    const timer = window.setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
      500,
    );
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <div className="space-y-20 xl:space-y-28">
      {groups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-heading`}
          className="scroll-mt-32 grid gap-6 sm:gap-8 lg:gap-16 2xl:gap-24 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start"
        >
          <FadeIn className="lg:sticky lg:top-32">
            <h2
              id={`${group.id}-heading`}
              className="text-white text-[clamp(26px,3.4vw,46px)] tracking-tight leading-[1.08] text-balance"
            >
              {group.title}
            </h2>
            <p className="mt-3 max-w-sm 2xl:max-w-md text-ink-300 text-[15px] xl:text-[16px] 2xl:text-[18px] leading-relaxed">
              {group.lead}
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <ul className="border-b border-blue-400/10">
              {group.items.map((service) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  open={openId === service.id}
                  onToggle={() => setOpenId((cur) => (cur === service.id ? null : service.id))}
                />
              ))}
            </ul>
          </FadeIn>
        </section>
      ))}
    </div>
  );
}

// ─── Zeile ─────────────────────────────────────────────────────────────────────

/** Inhalt erscheint gestaffelt und wird beim Einblenden scharf. */
const panelContent: Variants = {
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};
const panelItem: Variants = {
  closed: { opacity: 0, y: 10, filter: "blur(6px)", transition: { duration: 0.18 } },
  open: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: EASE } },
};

function ServiceRow({
  service,
  open,
  onToggle,
}: {
  service: Service;
  open: boolean;
  onToggle: () => void;
}) {
  const t = useCopy(COPY);
  const navigate = useNavigate();
  const lp = useLocalePath();
  const media = MEDIA[service.id];
  const btnId = `${service.id}-toggle`;
  const panelId = `${service.id}-details`;
  const twoLists = service.lists.length > 1;

  return (
    <li id={service.id} className="relative scroll-mt-32 border-t border-blue-400/10">
      {/* Lichtlinie: läuft beim Öffnen über die Oberkante der Zeile */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -top-px left-0 h-px w-full origin-left"
        style={{
          background:
            "linear-gradient(90deg, var(--blue-400) 0%, rgb(var(--blue-400-rgb) / 0.35) 55%, transparent 100%)",
        }}
        initial={false}
        animate={{ scaleX: open ? 1 : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: open ? 0.7 : 0.3, ease: EASE }}
      />

      {/* Kopfzeile: der Button spannt sich per ::after über die ganze Zeile */}
      <div className="group relative flex items-center gap-4 sm:gap-6 py-4 sm:py-5 xl:py-6 rounded-xl has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-blue-400">
        <span className="relative shrink-0 h-[72px] w-[72px] sm:h-28 sm:w-28 xl:h-32 xl:w-32">
          <img
            src={media.src}
            alt=""
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              media.onBlack ? "mix-blend-screen" : ""
            } ${open ? "scale-110" : "group-hover:scale-105"}`}
          />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h3 className="tracking-tight">
              {/* theme.css setzt Buttons auf Fließtextgröße – Größe daher hier */}
              <button
                id={btnId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={onToggle}
                className={`cursor-pointer text-left text-[20px] sm:text-[23px] xl:text-[26px] 2xl:text-[28px] font-medium leading-tight outline-none transition-colors duration-200 after:absolute after:inset-0 after:content-[''] ${
                  open ? "text-blue-100" : "text-white group-hover:text-blue-100"
                }`}
              >
                {service.title}
              </button>
            </h3>
          </div>
          <p className="mt-1.5 text-ink-300 text-[14px] xl:text-[15px] 2xl:text-[16px] leading-snug">
            {service.lead}
          </p>
        </div>

        <Chevron open={open} />
      </div>

      {/* Details */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: open ? 0.5 : 0.35, ease: EASE }}
        className="overflow-hidden"
        {...({ inert: open ? undefined : "" } as object)}
      >
        <motion.div
          variants={panelContent}
          initial={false}
          animate={open ? "open" : "closed"}
          className="pb-8 xl:pb-10 sm:pl-[136px] xl:pl-[152px] sm:pr-16"
        >
          <motion.p
            variants={panelItem}
            className="max-w-2xl text-ink-200 text-[15px] xl:text-[16px] 2xl:text-[17px] leading-relaxed"
          >
            {service.body}
          </motion.p>

          <div className={`mt-6 xl:mt-7 grid gap-6 xl:gap-8 ${twoLists ? "md:grid-cols-2" : ""}`}>
            {service.lists.map((list, i) => (
              <motion.div key={list.title ?? i} variants={panelItem}>
                {list.title && (
                  <p className="mb-3 text-white text-[14px] xl:text-[15px] font-medium">{list.title}</p>
                )}
                <ul className={`grid gap-2.5 ${twoLists ? "" : "sm:grid-cols-2 sm:gap-x-8"}`}>
                  {list.points.map((point) => (
                    <CheckItem key={point} className="text-ink-200 text-[14px] xl:text-[15px]">
                      {point}
                    </CheckItem>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {service.note && (
            <motion.p
              variants={panelItem}
              className="mt-6 max-w-2xl text-ink-400 text-[13px] xl:text-[14px] leading-relaxed"
            >
              {service.note}
            </motion.p>
          )}

          <motion.div variants={panelItem} className="mt-6">
            {service.linkToPrices ? (
              <TertiaryButton href="#preise">{t.prices}</TertiaryButton>
            ) : (
              <TertiaryButton onClick={() => navigate(lp("/kontakt"))}>{t.ask}</TertiaryButton>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </li>
  );
}

// ─── Chevron ───────────────────────────────────────────────────────────────────

const CHEVRON_DOWN = "M7 10 L12 15 L17 10";
const CHEVRON_UP = "M7 14 L12 9 L17 14";

/**
 * Chevron, der sich beim Öffnen umbiegt statt sich zu drehen: die Spitze
 * wandert per Feder nach oben (mit leichtem Überschwingen). Beim Hover wird
 * der Kreis nur heller; erst beim Öffnen zeichnet sich der Lichtring einmal
 * komplett um den Knopf.
 */
function Chevron({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative grid shrink-0 place-items-center h-10 w-10 sm:h-12 sm:w-12">
      <span
        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          open ? "bg-blue-400/[0.12]" : "bg-transparent group-hover:bg-blue-400/[0.08]"
        }`}
      />
      <svg viewBox="0 0 48 48" fill="none" className="absolute inset-0 h-full w-full -rotate-90">
        <circle
          cx="24"
          cy="24"
          r="23"
          strokeWidth="1"
          className="stroke-blue-400/20 transition-[stroke] duration-300 group-hover:stroke-blue-400/50"
        />
        <circle
          cx="24"
          cy="24"
          r="23"
          pathLength={1}
          strokeDasharray="1"
          stroke="var(--blue-400)"
          strokeWidth="1.5"
          strokeLinecap="round"
          // Zu: zusätzlich ausgeblendet, sonst bleibt das runde Linienende als Punkt stehen
          className={`transition-[stroke-dashoffset,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "[stroke-dashoffset:0] opacity-100" : "[stroke-dashoffset:1] opacity-0"
          }`}
        />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`relative h-5 w-5 text-blue-400 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"
        }`}
      >
        <motion.path
          initial={false}
          animate={{ d: open ? CHEVRON_UP : CHEVRON_DOWN }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
