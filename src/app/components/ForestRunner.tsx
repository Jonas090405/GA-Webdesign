import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Schwarzwald-Runner — kleines Canvas-Spiel im Footer.
 *
 * Bewusst genügsam: Die Render-Schleife läuft ausschließlich während einer
 * laufenden Partie. Im Ruhezustand steht ein einziges statisches Bild, damit
 * der Footer auf jeder Unterseite keine Rechenzeit kostet.
 */

// Welt-Koordinaten: feste Höhe, Breite passt sich dem Container an.
// Alles wird in diesen Einheiten gezeichnet und erst beim Rendern skaliert.
// Himmel über dem Boden lässt auch beim höchsten Sprung das Geweih im Bild.
const WORLD_H = 202;
const GROUND_Y = 162;
const GROUND_COLOR = "rgba(77, 190, 243, 0.32)";
const HUD_LEFT =
  "left-5 sm:left-8 lg:left-12 xl:left-16 2xl:left-20";
const HUD_RIGHT =
  "right-5 sm:right-8 lg:right-12 xl:right-16 2xl:right-20";
/** Weicher Übergang an den Viewport-Rändern, falls ein Hügel am Rand endet. */
const SCENE_EDGE_FADE = 56;
const SCENE_EDGE_COLOR = "rgb(10, 15, 20)";

const GRAVITY = 0.62;
// Kurzes Antippen startet niedrig. Halten hebt weiter an, aber nur ein
// kurzes Fenster lang — danach ist die Sprunghöhe gedeckelt.
const JUMP_V_MIN = -6.8;
const JUMP_V_MAX = -12.4;
const JUMP_LIFT = 0.7;
const JUMP_LIFT_DELAY = 2;
const JUMP_LIFT_FRAMES = 10;
const START_SPEED = 3.6;
const MAX_SPEED = 8.2;
const SPEED_RAMP = 0.00028;

const HIGHSCORE_KEY = "ga-runner-highscore";

type Phase = "idle" | "running" | "over";

type Obstacle = { x: number; w: number; h: number; kind: 0 | 1 };

type Hill = { x: number; w: number; h: number };

type GameState = {
  t: number;
  speed: number;
  distance: number;
  deerY: number;
  deerV: number;
  grounded: boolean;
  /** Frames seit dem Absprung, steuert das Höhen-Fenster beim Halten. */
  jumpAge: number;
  obstacles: Obstacle[];
  hillsFar: Hill[];
  hillsNear: Hill[];
  nextGap: number;
  shake: number;
};

function readHighscore(): number {
  try {
    const raw = localStorage.getItem(HIGHSCORE_KEY);
    const n = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}

function prefersTapInput(): boolean {
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

function subscribeTapInput(onChange: () => void) {
  const queries = ["(max-width: 767px)", "(hover: none)", "(pointer: coarse)"].map((query) =>
    window.matchMedia(query),
  );
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

function writeHighscore(value: number) {
  try {
    localStorage.setItem(HIGHSCORE_KEY, String(value));
  } catch {
    /* Private Modus o. Ä. — Highscore ist dann eben flüchtig. */
  }
}

function makeHills(width: number, count: number, minH: number, maxH: number): Hill[] {
  const hills: Hill[] = [];
  let x = 0;
  for (let i = 0; i < count; i++) {
    const w = 90 + Math.random() * 130;
    hills.push({ x, w, h: minH + Math.random() * (maxH - minH) });
    x += w * (0.62 + Math.random() * 0.2);
    if (x > width + 400) break;
  }
  return hills;
}

function createState(width: number): GameState {
  return {
    t: 0,
    speed: START_SPEED,
    distance: 0,
    deerY: 0,
    deerV: 0,
    grounded: true,
    jumpAge: 0,
    obstacles: [],
    hillsFar: makeHills(width, 14, 26, 46),
    hillsNear: makeHills(width, 12, 16, 30),
    nextGap: 260,
    shake: 0,
  };
}

/** Tanne als Silhouette — drei gestaffelte Lagen auf einem Stamm. */
function drawFir(ctx: CanvasRenderingContext2D, x: number, baseY: number, h: number) {
  const w = h * 0.52;
  ctx.beginPath();
  ctx.moveTo(x - w * 0.14, baseY);
  ctx.lineTo(x + w * 0.14, baseY);
  ctx.lineTo(x + w * 0.14, baseY - h * 0.2);
  ctx.lineTo(x - w * 0.14, baseY - h * 0.2);
  ctx.closePath();
  ctx.fill();

  const tiers = 3;
  for (let i = 0; i < tiers; i++) {
    const tierTop = baseY - h * (0.34 + i * 0.22);
    const tierBottom = baseY - h * (0.1 + i * 0.22);
    const spread = (w / 2) * (1 - i * 0.24);
    ctx.beginPath();
    ctx.moveTo(x, tierTop - h * 0.14);
    ctx.lineTo(x + spread, tierBottom);
    ctx.lineTo(x + spread * 0.42, tierBottom);
    ctx.lineTo(x + spread * 0.66, tierBottom + h * 0.05);
    ctx.lineTo(x - spread * 0.66, tierBottom + h * 0.05);
    ctx.lineTo(x - spread * 0.42, tierBottom);
    ctx.lineTo(x - spread, tierBottom);
    ctx.closePath();
    ctx.fill();
  }
}

/** Baumstumpf — das flachere Hindernis, muss knapper übersprungen werden. */
function drawStump(ctx: CanvasRenderingContext2D, x: number, baseY: number, h: number) {
  const w = h * 0.86;
  ctx.beginPath();
  ctx.moveTo(x - w / 2, baseY);
  ctx.lineTo(x - w / 2 + w * 0.08, baseY - h);
  ctx.lineTo(x + w / 2 - w * 0.08, baseY - h);
  ctx.lineTo(x + w / 2, baseY);
  ctx.closePath();
  ctx.fill();
  // abgebrochener Ast
  ctx.beginPath();
  ctx.moveTo(x + w / 2 - w * 0.1, baseY - h * 0.62);
  ctx.lineTo(x + w * 0.92, baseY - h * 0.94);
  ctx.lineTo(x + w * 0.92, baseY - h * 0.7);
  ctx.lineTo(x + w / 2 - w * 0.1, baseY - h * 0.42);
  ctx.closePath();
  ctx.fill();
}

/**
 * Reh in Seitenansicht. Die Beine laufen über eine Sinusphase; in der Luft
 * werden sie gestreckt, damit der Sprung auch ohne Sound spürbar wird.
 */
function drawDeer(
  ctx: CanvasRenderingContext2D,
  x: number,
  baseY: number,
  phase: number,
  airborne: boolean,
) {
  const s = 1.0;
  const bodyY = baseY - 20 * s;

  ctx.save();
  ctx.translate(x, bodyY);

  // Beine
  ctx.lineWidth = 2.6 * s;
  ctx.lineCap = "round";
  const swing = airborne ? 0 : Math.sin(phase) * 3.4;
  const swing2 = airborne ? 0 : Math.sin(phase + Math.PI) * 3.4;
  const legSpread = airborne ? 5.5 : 0;

  const legs: [number, number, number][] = [
    [-7, swing - legSpread, 1],
    [-5.5, swing2 - legSpread * 0.6, 0.9],
    [7, swing2 + legSpread, 1],
    [8.5, swing + legSpread * 0.6, 0.9],
  ];
  for (const [lx, sw, len] of legs) {
    ctx.beginPath();
    ctx.moveTo(lx, 2);
    ctx.lineTo(lx + sw * 0.5, 10 * len);
    ctx.lineTo(lx + sw, 19 * len);
    ctx.stroke();
  }

  // Rumpf
  ctx.beginPath();
  ctx.ellipse(0, 0, 13 * s, 7.4 * s, -0.06, 0, Math.PI * 2);
  ctx.fill();

  // Hals
  ctx.beginPath();
  ctx.moveTo(7, -3.5);
  ctx.lineTo(12.4, -14.6);
  ctx.lineTo(16.2, -13.4);
  ctx.lineTo(11.6, -1.6);
  ctx.closePath();
  ctx.fill();

  // Kopf
  ctx.beginPath();
  ctx.ellipse(15.8, -16.4, 5.2, 3.1, -0.34, 0, Math.PI * 2);
  ctx.fill();

  // Lauscher
  ctx.beginPath();
  ctx.ellipse(13.4, -19.6, 2.5, 1.25, -0.95, 0, Math.PI * 2);
  ctx.fill();

  // Geweih
  ctx.lineWidth = 1.5 * s;
  ctx.beginPath();
  ctx.moveTo(16.4, -19.2);
  ctx.lineTo(18.4, -25.4);
  ctx.moveTo(18.4, -25.4);
  ctx.lineTo(16.2, -24.2);
  ctx.moveTo(18.4, -25.4);
  ctx.lineTo(21.2, -26.2);
  ctx.moveTo(14.8, -19.4);
  ctx.lineTo(14.2, -24.4);
  ctx.moveTo(14.2, -24.4);
  ctx.lineTo(12.2, -25.6);
  ctx.stroke();

  // Wedel
  ctx.beginPath();
  ctx.ellipse(-13.2, -3.4, 2.7, 3.4, 0.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

type ForestRunnerProps = {
  className?: string;
};

export function ForestRunner({ className = "" }: ForestRunnerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<GameState | null>(null);
  const rafRef = useRef<number | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const widthRef = useRef(600);
  const visibleRef = useRef(true);
  const holdingRef = useRef(false);

  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const tap = useSyncExternalStore(subscribeTapInput, prefersTapInput, () => false);

  useEffect(() => {
    setBest(readHighscore());
  }, []);

  const setPhaseBoth = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  /** Zeichnet einen kompletten Frame aus dem übergebenen Zustand. */
  const paint = useCallback((st: GameState) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const w = widthRef.current;
    ctx.clearRect(0, 0, w, WORLD_H);

    const shakeY = st.shake > 0 ? (Math.random() - 0.5) * st.shake : 0;
    ctx.save();
    ctx.translate(0, shakeY);

    // Ferne Hügelkette
    ctx.fillStyle = "rgba(77, 190, 243, 0.07)";
    for (const h of st.hillsFar) {
      const hx = ((h.x - st.distance * 0.18) % (w + 500) + w + 500) % (w + 500) - 250;
      ctx.beginPath();
      ctx.moveTo(hx - h.w / 2, GROUND_Y);
      ctx.quadraticCurveTo(hx, GROUND_Y - h.h, hx + h.w / 2, GROUND_Y);
      ctx.closePath();
      ctx.fill();
    }

    // Nähere Hügelkette
    ctx.fillStyle = "rgba(77, 190, 243, 0.11)";
    for (const h of st.hillsNear) {
      const hx = ((h.x - st.distance * 0.42) % (w + 400) + w + 400) % (w + 400) - 200;
      ctx.beginPath();
      ctx.moveTo(hx - h.w / 2, GROUND_Y);
      ctx.quadraticCurveTo(hx, GROUND_Y - h.h, hx + h.w / 2, GROUND_Y);
      ctx.closePath();
      ctx.fill();
    }

    // Nebelband über dem Grund
    const fog = ctx.createLinearGradient(0, GROUND_Y - 34, 0, GROUND_Y);
    fog.addColorStop(0, "rgba(77, 190, 243, 0)");
    fog.addColorStop(1, "rgba(77, 190, 243, 0.075)");
    ctx.fillStyle = fog;
    ctx.fillRect(0, GROUND_Y - 34, w, 34);

    // Boden — dieselbe Farbe wie die Linie, die links und rechts aus dem
    // Spielfeld herausläuft.
    ctx.strokeStyle = GROUND_COLOR;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 0.5);
    ctx.lineTo(w, GROUND_Y + 0.5);
    ctx.stroke();

    // Bodenstriche als Tempo-Anzeige
    ctx.strokeStyle = "rgba(77, 190, 243, 0.2)";
    const tickSpacing = 46;
    const offset = st.distance % tickSpacing;
    for (let i = -1; i * tickSpacing - offset < w + tickSpacing; i++) {
      const tx = i * tickSpacing - offset;
      ctx.beginPath();
      ctx.moveTo(tx, GROUND_Y + 4);
      ctx.lineTo(tx + 13, GROUND_Y + 4);
      ctx.stroke();
    }

    // Hindernisse
    ctx.fillStyle = "rgba(77, 190, 243, 0.62)";
    for (const o of st.obstacles) {
      if (o.kind === 0) drawFir(ctx, o.x + o.w / 2, GROUND_Y, o.h);
      else drawStump(ctx, o.x + o.w / 2, GROUND_Y, o.h);
    }

    // Reh
    ctx.fillStyle = "#4dbef3";
    ctx.strokeStyle = "#4dbef3";
    drawDeer(ctx, 62, GROUND_Y + st.deerY, st.t * 0.42, !st.grounded);

    // Keine harte Kante, wenn ein Hügel genau am Rand endet.
    ctx.fillStyle = SCENE_EDGE_COLOR;
    const fadeL = ctx.createLinearGradient(0, 0, SCENE_EDGE_FADE, 0);
    fadeL.addColorStop(0, SCENE_EDGE_COLOR);
    fadeL.addColorStop(1, "rgba(10, 15, 20, 0)");
    ctx.fillStyle = fadeL;
    ctx.fillRect(0, 0, SCENE_EDGE_FADE, GROUND_Y);
    const fadeR = ctx.createLinearGradient(w - SCENE_EDGE_FADE, 0, w, 0);
    fadeR.addColorStop(0, "rgba(10, 15, 20, 0)");
    fadeR.addColorStop(1, SCENE_EDGE_COLOR);
    ctx.fillStyle = fadeR;
    ctx.fillRect(w - SCENE_EDGE_FADE, 0, SCENE_EDGE_FADE, GROUND_Y);

    ctx.restore();
  }, []);

  /** Setzt die Canvas-Auflösung auf die Gerätepixel und zeichnet neu. */
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const cssW = Math.max(280, wrap.clientWidth);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    widthRef.current = cssW;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(WORLD_H * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!stateRef.current) stateRef.current = createState(cssW);
    paint(stateRef.current);
  }, [paint]);

  useEffect(() => {
    resize();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [resize]);

  // Außerhalb des Viewports wird die Schleife angehalten.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "80px" },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  const endGame = useCallback(
    (finalScore: number) => {
      holdingRef.current = false;
      setPhaseBoth("over");
      setScore(finalScore);
      setBest((prevBest) => {
        if (finalScore > prevBest) {
          writeHighscore(finalScore);
          return finalScore;
        }
        return prevBest;
      });
    },
    [setPhaseBoth],
  );

  const step = useCallback(() => {
    const st = stateRef.current;
    if (!st || phaseRef.current !== "running") return;

    if (!visibleRef.current) {
      rafRef.current = requestAnimationFrame(step);
      return;
    }

    const w = widthRef.current;

    st.t += 1;
    st.speed = Math.min(MAX_SPEED, START_SPEED + st.distance * SPEED_RAMP);
    st.distance += st.speed;
    if (st.shake > 0) st.shake *= 0.86;

    // Sprungphysik. Halten gibt nach dem Absprung noch Auftrieb, aber nur
    // für ein festes Fenster — länger gedrückt wird nicht höher.
    st.deerV += GRAVITY;
    if (
      holdingRef.current &&
      st.jumpAge >= JUMP_LIFT_DELAY &&
      st.jumpAge < JUMP_LIFT_DELAY + JUMP_LIFT_FRAMES &&
      st.deerV < 0
    ) {
      st.deerV = Math.max(JUMP_V_MAX, st.deerV - JUMP_LIFT);
    }
    st.deerY += st.deerV;
    if (!st.grounded) st.jumpAge += 1;
    if (st.deerY >= 0) {
      st.deerY = 0;
      st.deerV = 0;
      st.grounded = true;
      st.jumpAge = 0;
    }

    // Hindernisse nachrücken
    st.nextGap -= st.speed;
    if (st.nextGap <= 0) {
      const kind: 0 | 1 = Math.random() < 0.62 ? 0 : 1;
      const h = kind === 0 ? 30 + Math.random() * 16 : 17 + Math.random() * 7;
      st.obstacles.push({ x: w + 30, w: kind === 0 ? h * 0.5 : h * 0.86, h, kind });
      // Abstand schrumpft mit dem Tempo, bleibt aber immer überspringbar.
      const minGap = 128 + st.speed * 15;
      st.nextGap = minGap + Math.random() * 130;
    }
    for (const o of st.obstacles) o.x -= st.speed;
    st.obstacles = st.obstacles.filter((o) => o.x + o.w > -40);

    // Kollision — Hitbox bewusst kleiner als die Silhouette, damit knappe
    // Sprünge sich fair anfühlen statt frustrierend.
    const dLeft = 62 - 11;
    const dRight = 62 + 13;
    const dTop = GROUND_Y + st.deerY - 26;
    const dBottom = GROUND_Y + st.deerY;
    for (const o of st.obstacles) {
      const oLeft = o.x + o.w * 0.2;
      const oRight = o.x + o.w * 0.8;
      const oTop = GROUND_Y - o.h * 0.92;
      if (dRight > oLeft && dLeft < oRight && dBottom > oTop && dTop < GROUND_Y) {
        st.shake = 9;
        paint(st);
        endGame(Math.floor(st.distance / 10));
        return;
      }
    }

    paint(st);

    // Punktestand nur bei echter Änderung in React spiegeln.
    const s = Math.floor(st.distance / 10);
    setScore((prev) => (prev === s ? prev : s));

    rafRef.current = requestAnimationFrame(step);
  }, [endGame, paint]);

  const start = useCallback(() => {
    holdingRef.current = false;
    stateRef.current = createState(widthRef.current);
    setScore(0);
    setPhaseBoth("running");
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
  }, [setPhaseBoth, step]);

  const releaseJump = useCallback(() => {
    holdingRef.current = false;
  }, []);

  const jump = useCallback(() => {
    const st = stateRef.current;
    if (!st || phaseRef.current !== "running" || !st.grounded) return;
    st.deerV = JUMP_V_MIN;
    st.grounded = false;
    st.jumpAge = 0;
    holdingRef.current = true;
  }, []);

  /** Ein Eingabekanal für Maus, Touch, Stift und Tastatur. */
  const handleAction = useCallback(() => {
    if (phaseRef.current === "running") jump();
    else start();
  }, [jump, start]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const isTypingTarget = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    return (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      target.isContentEditable
    );
  };

  // Leertaste global, solange das Spiel sichtbar ist — sonst müsste das
  // Canvas nach Game Over erneut fokussiert werden.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!visibleRef.current || isTypingTarget(e.target)) return;

      const space =
        e.code === "Space" || e.code === "ArrowUp" || e.key === " ";
      const enter = e.key === "Enter";

      if (space || enter) {
        const current = phaseRef.current;
        if (current === "running") {
          e.preventDefault();
          if (e.repeat) return;
          jump();
        } else if (current === "idle" || current === "over") {
          e.preventDefault();
          if (e.repeat) return;
          start();
        }
        return;
      }

      if (e.code === "Escape" && phaseRef.current === "running") {
        holdingRef.current = false;
        setPhaseBoth("idle");
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (stateRef.current) paint(stateRef.current);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.key === " ") {
        holdingRef.current = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      holdingRef.current = false;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [jump, paint, setPhaseBoth, start]);

  const hint =
    phase === "over"
      ? tap
        ? "Tippen für nächste Runde"
        : "Leertaste für neue Runde"
      : tap
        ? "Tippen zum Springen"
        : "Leertaste zum Springen";

  return (
    <div className={className}>
      <div ref={wrapRef} className="relative w-full">
        <canvas
          ref={canvasRef}
          role="button"
          tabIndex={0}
          aria-label={
            phase === "running"
              ? tap
                ? "Sprungspiel läuft. Tippen springt, länger halten springt höher."
                : "Sprungspiel läuft. Leertaste springt, kürzer drücken springt niedriger. Escape beendet."
              : "Sprungspiel starten."
          }
          className="block w-full cursor-pointer touch-manipulation focus:outline-none"
          style={{ height: WORLD_H }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.currentTarget.focus();
            e.currentTarget.setPointerCapture(e.pointerId);
            handleAction();
          }}
          onPointerUp={releaseJump}
          onPointerCancel={releaseJump}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " " || e.code === "Space") {
              e.preventDefault();
              e.stopPropagation();
              if (e.repeat) return;
              handleAction();
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === " " || e.code === "Space" || e.code === "ArrowUp") {
              releaseJump();
            }
          }}
        />

        {/* Punktestand — als DOM statt Canvas, damit die Ziffern die
            Projekt-Typografie erben und gestochen scharf bleiben. */}
        {best > 0 && (
          <div
            className={`pointer-events-none absolute top-2.5 sm:top-3 z-10 text-[11px] sm:text-[12px] 2xl:text-[13px] tabular-nums ${HUD_LEFT}`}
            style={{ color: "rgba(170, 200, 220, 0.55)" }}
          >
            Rekord {best}
          </div>
        )}

        {phase === "running" && (
          <div
            className={`pointer-events-none absolute top-2.5 sm:top-3 text-[14px] sm:text-[15px] 2xl:text-[16px] tabular-nums font-semibold text-right ${HUD_RIGHT}`}
            style={{ color: "rgba(200, 228, 245, 0.85)" }}
          >
            {score}
          </div>
        )}

        {/* Ruhe- und Ende-Zustand liegen als Overlay über dem Standbild. */}
        {phase !== "running" && (
          <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-3 sm:px-4">
            <div
              className="absolute inset-0"
              style={{ background: "rgba(10, 15, 20, 0.55)" }}
            />
            <div className="relative max-w-[16rem] sm:max-w-md">
              {phase === "over" && (
                <p
                  className="text-[14px] sm:text-[16px] font-semibold mb-1 leading-snug text-balance"
                  style={{ color: "rgba(215, 236, 250, 0.95)" }}
                >
                  {score} Punkte
                  {score > 0 && score >= best ? " — neuer Rekord" : ""}
                </p>
              )}
              <p
                className="text-[12px] sm:text-[14px] leading-snug text-balance"
                style={{ color: "rgba(170, 200, 220, 0.72)" }}
              >
                {hint}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
