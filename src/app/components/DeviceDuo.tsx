import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Lock, ArrowUpRight } from "lucide-react";
import { cn } from "./ui/utils";

/**
 * Statische Live-Vorschau: die erste Sektion eines echten Projekts, dargestellt
 * auf Laptop + Smartphone. Nicht scrollbar – gezeigt wird nur der Hero.
 *
 * Kniff: Ein iframe *ist* für die eingebettete Seite der Viewport. Damit der
 * Laptop das echte Desktop-Layout (1440) und das Handy das echte Mobil-Layout
 * (390) zeigt, rendern wir mit fester Logik-Breite und skalieren per `scale()`
 * exakt in den jeweiligen Frame.
 */

// 1:1-Nachbau der ersten GCN-Sektion – eigenständig, leicht, same-origin.
const DEMO_URL = "/gcn-hero.html";

interface ScreenProps {
  logicalW: number;
  logicalH: number;
  title: string;
  className?: string;
  /** iframe-Load um X ms verzögern, damit die Requests gestaffelt starten. */
  delay?: number;
}

function Screen({ logicalW, logicalH, title, className, delay = 0 }: ScreenProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Skalierungsfaktor als CSS-Variable auf dem Wrapper – vererbt sich ans
  // iframe, egal wann dieses mountet. ResizeObserver hält ihn fluide aktuell.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const apply = () =>
      wrap.style.setProperty("--s", String(wrap.clientWidth / logicalW));
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [logicalW]);

  // iframe erst laden, wenn der Haupt-Thread frei ist -> schützt den LCP.
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idle = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if (w.requestIdleCallback) {
        idle = w.requestIdleCallback(() => setMounted(true), { timeout: 1600 });
      } else {
        timer = setTimeout(() => setMounted(true), 300);
      }
    };
    timer = setTimeout(start, delay);
    return () => {
      if (timer) clearTimeout(timer);
      if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle);
    };
  }, [delay]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden", className)}
      style={{ background: "#000" }}
    >
      {/* Skeleton: markenblauer Glow + Spinner, bis das iframe geladen hat */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out",
          loaded ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="absolute h-2/3 w-2/3 rounded-full bg-gradient-to-b from-[#4dbef3]/15 to-transparent blur-2xl" />
        <div className="h-8 w-8 rounded-full border-2 border-[#4dbef3]/20 border-t-[#4dbef3]/70 animate-spin" />
      </div>

      {mounted && (
        <iframe
          src={DEMO_URL}
          title={title}
          tabIndex={-1}
          aria-hidden="true"
          loading="lazy"
          scrolling="no"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-700 ease-out",
            loaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            width: logicalW,
            height: logicalH,
            transform: "scale(var(--s, 0.3))",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Bildschirm-Glanz – dezente Glas-Reflexion für Device-Realismus */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(125deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 38%)",
        }}
      />
    </div>
  );
}

export function DeviceDuo({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // Tilt (Parallax) ----------------------------------------------------------
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltSpring = { stiffness: 140, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), tiltSpring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), tiltSpring);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    },
    [px, py]
  );
  const onLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  return (
    <div className={cn("w-full", className)}>
      <div
        className="relative w-full"
        role="img"
        aria-label="Vorschau der Startseite unseres Kundenprojekts GCN-Fahrzeughandel – dargestellt auf Laptop und Smartphone"
      >
        {/* Weicher Marken-Glow als Bodenlicht unter den Geräten */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-8 -bottom-6 top-8 -z-10"
          style={{
            background:
              "radial-gradient(60% 55% at 58% 45%, rgba(77,190,243,0.20), transparent 70%)",
            filter: "blur(28px)",
          }}
        />

        <div
          className="[perspective:1500px]"
          onPointerMove={reduce ? undefined : onMove}
          onPointerLeave={reduce ? undefined : onLeave}
        >
          {/* Statische 3/4-Grundhaltung … */}
          <div
            className="relative [transform-style:preserve-3d]"
            style={{ transform: "rotateX(4deg) rotateY(-8deg)" }}
          >
            {/* … plus interaktiver Tilt-Delta (deaktiviert bei reduced-motion) */}
            <motion.div
              className="relative [transform-style:preserve-3d]"
              style={reduce ? undefined : { rotateX, rotateY }}
            >
              {/* ── Laptop ─────────────────────────────────────────── */}
              <div className="relative [transform-style:preserve-3d]">
                {/* Deckel + Bezel */}
                <div
                  className="relative rounded-[16px] p-[1.5%]"
                  style={{
                    background:
                      "linear-gradient(150deg, #222c35 0%, #0d1319 55%, #171f27 100%)",
                    boxShadow:
                      "0 34px 60px -24px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(120,180,220,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="absolute left-1/2 top-[5px] h-[3px] w-[3px] -translate-x-1/2 rounded-full"
                    style={{ background: "rgba(160,200,230,0.35)" }}
                  />

                  {/* Browserfenster: Toolbar mit echter URL + Screen */}
                  <div className="relative flex aspect-[16/10] flex-col overflow-hidden rounded-[9px]">
                    <BrowserBar />
                    <Screen
                      logicalW={1440}
                      logicalH={900}
                      title="GCN-Fahrzeughandel – Desktop-Ansicht"
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Basis / Scharnier */}
                <div
                  className="relative mx-auto h-[12px] rounded-b-[11px] sm:h-[14px] xl:h-[16px]"
                  style={{
                    width: "112%",
                    marginLeft: "-6%",
                    background:
                      "linear-gradient(180deg, #2b353e 0%, #0c1116 100%)",
                    boxShadow: "0 24px 30px -16px rgba(0,0,0,0.6)",
                  }}
                >
                  <div
                    className="absolute left-1/2 top-0 h-[3px] w-[15%] -translate-x-1/2 rounded-b-[4px]"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                  />
                </div>
              </div>

              {/* ── Smartphone (nach vorn versetzt -> Parallax-Tiefe) ── */}
              <div
                className="absolute [transform-style:preserve-3d]"
                style={{
                  left: "-4%",
                  bottom: "-5%",
                  width: "22%",
                  transform: "translateZ(62px)",
                }}
              >
                <div
                  className="relative rounded-[26px] p-[4.5%]"
                  style={{
                    background:
                      "linear-gradient(150deg, #232d36 0%, #0b1015 60%, #161e26 100%)",
                    boxShadow:
                      "0 30px 46px -18px rgba(0,0,0,0.72), inset 0 0 0 1px rgba(120,180,220,0.14)",
                  }}
                >
                  <div className="relative">
                    <Screen
                      logicalW={390}
                      logicalH={845}
                      title="GCN-Fahrzeughandel – Mobil-Ansicht"
                      className="rounded-[18px] aspect-[390/845]"
                      delay={280}
                    />
                    {/* Dynamic-Island / Notch */}
                    <div
                      className="absolute left-1/2 top-[2.5%] z-10 h-[3.4%] w-[34%] -translate-x-1/2 rounded-full"
                      style={{ background: "#000" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Projekt-Caption – benennt es als echtes, von uns gebautes Kundenprojekt */}
      <figcaption className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-[13px] xl:text-[14px] leading-relaxed">
        <span style={{ color: "rgba(180,210,230,0.7)" }}>
          <span className="text-white/90">GCN-Fahrzeughandel</span> – Fahrzeugsuche
          &amp; Kunden-Dashboard.
        </span>
        <a
          href="https://gcn-fahrzeughandel.de/"
          target="_blank"
          rel="noreferrer"
          className="group/link inline-flex items-center gap-1 font-medium transition-colors duration-200"
          style={{ color: "rgba(125,211,252,0.9)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(186,230,253,1)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(125,211,252,0.9)")}
        >
          Projekt ansehen
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            aria-hidden
          />
        </a>
      </figcaption>
    </div>
  );
}

/** Minimale Browser-Toolbar mit echter Domain – das stärkste „echte-Website“-Signal. */
function BrowserBar() {
  return (
    <div
      className="flex shrink-0 items-center gap-[3%] px-[3%] py-[1.4%]"
      style={{
        background: "linear-gradient(180deg, #1a222a 0%, #141b21 100%)",
        borderBottom: "1px solid rgba(120,180,220,0.10)",
      }}
    >
      {/* Ampel-Punkte */}
      <div className="flex items-center gap-[6px]">
        <span className="h-[7px] w-[7px] rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-[7px] w-[7px] rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-[7px] w-[7px] rounded-full" style={{ background: "#28c840" }} />
      </div>
      {/* Adressfeld mit echter URL */}
      <div
        className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full px-2.5 py-[3px]"
        style={{ background: "rgba(6,11,16,0.6)" }}
      >
        <Lock size={9} style={{ color: "rgba(150,190,220,0.6)" }} />
        <span
          className="truncate text-[10px] xl:text-[11px] tracking-tight"
          style={{ color: "rgba(200,225,240,0.75)" }}
        >
          gcn-fahrzeughandel.de
        </span>
      </div>
    </div>
  );
}
