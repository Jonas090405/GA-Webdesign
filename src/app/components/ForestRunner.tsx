import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BLUE_400, blue400 } from "../../lib/tokens";
import { useCopy } from "../../i18n";

const COPY = {
  de: {
    hintNextTap: "Tippen für nächste Runde",
    hintNextKey: "Leertaste für neue Runde",
    hintJumpTap: "Tippen zum Springen",
    hintJumpKey: "Leertaste zum Springen",
    ariaRunningTap: "Sprungspiel läuft. Tippen springt, länger halten springt höher.",
    ariaRunningKey:
      "Sprungspiel läuft. Leertaste springt, kürzer drücken springt niedriger. Escape beendet.",
    ariaStart: "Sprungspiel starten.",
    best: "Rekord",
    points: "Punkte",
    newBest: " — neuer Rekord",
  },
  en: {
    hintNextTap: "Tap to play again",
    hintNextKey: "Press space to play again",
    hintJumpTap: "Tap to jump",
    hintJumpKey: "Press space to jump",
    ariaRunningTap: "Jump game running. Tap to jump, hold longer to jump higher.",
    ariaRunningKey:
      "Jump game running. Space jumps, a shorter press jumps lower. Escape ends the game.",
    ariaStart: "Start jump game.",
    best: "Best",
    points: "points",
    newBest: " — new best",
  },
};

/**
 * Schwarzwald-Runner — kleines Canvas-Spiel im Footer.
 *
 * Bewusst genügsam: Die Render-Schleife läuft ausschließlich während einer
 * laufenden Partie. Im Ruhezustand steht ein einziges statisches Bild, damit
 * der Footer auf jeder Unterseite keine Rechenzeit kostet.
 *
 * Damit es nicht eintönig wird, wechselt die Nacht: Sterne und Mond,
 * gelegentlich eine Sternschnuppe, Glühwürmchen im Nebel, Wetterphasen
 * (Schnee, dichter Nebel) und mit steigendem Punktestand neue Hindernisse.
 */

// Welt-Koordinaten: feste Höhe, Breite passt sich dem Container an.
// Alles wird in diesen Einheiten gezeichnet und erst beim Rendern skaliert.
// Himmel über dem Boden lässt auch beim höchsten Sprung das Geweih im Bild.
const WORLD_H = 202;
const GROUND_Y = 162;
const GROUND_COLOR = blue400(0.32);
const HUD_LEFT =
  "left-5 sm:left-8 lg:left-12 xl:left-16 2xl:left-20";
const HUD_RIGHT =
  "right-5 sm:right-8 lg:right-12 xl:right-16 2xl:right-20";
/** Weicher Übergang an den Viewport-Rändern, falls ein Hügel am Rand endet. */
const SCENE_EDGE_FADE = 56;
const SCENE_EDGE_COLOR = "rgb(10, 15, 20)";

// Physik in Einheiten pro Simulationsschritt. Die Simulation läuft immer mit
// festen 60 Schritten pro Sekunde – auch auf 120/144-Hz-Monitoren, die
// requestAnimationFrame öfter aufrufen. Gezeichnet wird zwischen zwei
// Schritten interpoliert, damit es auf schnellen Displays trotzdem gleitet.
const STEP_MS = 1000 / 60;
/** Nach Tab-Wechsel o. Ä. nicht sekundenlang nachsimulieren. */
const MAX_FRAME_MS = 100;

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

const DEER_X = 62;
/** Eule fliegt knapp über dem Geweih: Stehenbleiben passt, Springen nicht. */
const OWL_ALT = 58;
const OWL_SPEED = 1.12;
/** Alle so viele Punkte läuft ein Lichtimpuls über den Boden. */
const MILESTONE = 100;
/** Ab diesen Punkteständen kommen neue Hindernisse dazu. */
const TWIN_FROM = 60;
const OWL_FROM = 140;
/** Erste Wetterphase, danach Wechsel alle WEATHER_EVERY Punkte. */
const WEATHER_FROM = 180;
const WEATHER_EVERY = 220;

const HIGHSCORE_KEY = "ga-runner-highscore";

type Phase = "idle" | "running" | "over";

type ObstacleKind = "fir" | "stump" | "twin" | "owl";

/** `h2` ist die Höhe der zweiten Tanne bei "twin", sonst ungenutzt. */
type Obstacle = { x: number; w: number; h: number; h2: number; kind: ObstacleKind };

type Hill = { x: number; w: number; h: number };

type Star = { x: number; y: number; r: number; tw: number; ph: number };

type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number };

type Flake = { x: number; y: number; r: number; vy: number; ph: number };

type Firefly = { x: number; y: number; ph: number; f: number };

type Weather = "clear" | "snow" | "mist";

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
  stars: Star[];
  fireflies: Firefly[];
  flakes: Flake[];
  dust: Particle[];
  meteor: { x: number; y: number; life: number } | null;
  nextGap: number;
  shake: number;
  /** 0 → 1, solange der Lichtimpuls über den Boden läuft. */
  sweep: number;
  milestone: number;
  weather: Weather;
  /** Weiche Überblendung des Wetters, 0 = klar. */
  weatherMix: number;
  nextWeatherAt: number;
  // Stand des vorigen Schritts für die Interpolation beim Zeichnen
  prevT: number;
  prevDistance: number;
  prevDeerY: number;
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

function makeStars(width: number): Star[] {
  const count = Math.round(Math.min(90, width / 22));
  return Array.from({ length: count }, () => ({
    x: Math.random() * (width + 200),
    // Dichter oben, zum Horizont hin dünner
    y: 8 + Math.pow(Math.random(), 1.6) * (GROUND_Y - 70),
    r: Math.random() < 0.12 ? 1.2 : 0.7,
    tw: 0.02 + Math.random() * 0.05,
    ph: Math.random() * Math.PI * 2,
  }));
}

function makeFlakes(width: number): Flake[] {
  const count = Math.round(Math.min(110, width / 14));
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * GROUND_Y,
    r: 0.6 + Math.random() * 1.2,
    vy: 0.35 + Math.random() * 0.6,
    ph: Math.random() * Math.PI * 2,
  }));
}

function makeFireflies(width: number): Firefly[] {
  const count = Math.round(Math.min(16, width / 110));
  return Array.from({ length: count }, () => ({
    x: Math.random() * (width + 300),
    y: GROUND_Y - 10 - Math.random() * 44,
    ph: Math.random() * Math.PI * 2,
    f: 0.02 + Math.random() * 0.03,
  }));
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
    stars: makeStars(width),
    fireflies: makeFireflies(width),
    flakes: makeFlakes(width),
    dust: [],
    meteor: null,
    nextGap: 260,
    shake: 0,
    sweep: 0,
    milestone: 0,
    weather: "clear",
    weatherMix: 0,
    nextWeatherAt: WEATHER_FROM,
    prevT: 0,
    prevDistance: 0,
    prevDeerY: 0,
  };
}

/** Staub an den Hufen – beim Absprung wenig, bei der Landung mehr. */
function kickDust(st: GameState, amount: number) {
  for (let i = 0; i < amount; i++) {
    const max = 18 + Math.random() * 14;
    st.dust.push({
      x: DEER_X - 6 + Math.random() * 14,
      y: GROUND_Y - 1,
      vx: (Math.random() - 0.65) * 1.6,
      vy: -0.4 - Math.random() * 0.9,
      life: max,
      max,
      r: 0.8 + Math.random() * 1.3,
    });
  }
}

/** Nächstes Hindernis würfeln – die Auswahl wächst mit dem Punktestand. */
function spawnObstacle(st: GameState, width: number) {
  const score = st.distance / 10;
  const roll = Math.random();
  // Abstand schrumpft mit dem Tempo, bleibt aber immer überspringbar.
  const minGap = 128 + st.speed * 15;
  let gapExtra = 0;

  if (score >= OWL_FROM && roll < 0.16) {
    // Die Eule ist schneller als der Boden. Etwas weiter draußen starten und
    // danach mehr Luft lassen, damit das Reh nach einem Sprung sicher steht.
    st.obstacles.push({ x: width + 30 + st.speed * 26, w: 26, h: 14, h2: 0, kind: "owl" });
    gapExtra = st.speed * 24;
  } else if (score >= TWIN_FROM && roll < 0.34) {
    const h = 28 + Math.random() * 8;
    const h2 = 24 + Math.random() * 10;
    st.obstacles.push({ x: width + 30, w: h * 0.5 + 9 + h2 * 0.5, h, h2, kind: "twin" });
    gapExtra = 30;
  } else if (Math.random() < 0.62) {
    const h = 30 + Math.random() * 16;
    st.obstacles.push({ x: width + 30, w: h * 0.5, h, h2: 0, kind: "fir" });
  } else {
    const h = 17 + Math.random() * 7;
    st.obstacles.push({ x: width + 30, w: h * 0.86, h, h2: 0, kind: "stump" });
  }
  st.nextGap = minGap + gapExtra + Math.random() * 130;
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

/** Eule im Flug, Blick nach links zum Reh. `flap` schwingt zwischen −1 und 1. */
function drawOwl(ctx: CanvasRenderingContext2D, x: number, y: number, flap: number) {
  ctx.save();
  ctx.translate(x, y);
  const lift = flap * 7;
  // hinterer Flügel
  ctx.beginPath();
  ctx.moveTo(-1, -1);
  ctx.quadraticCurveTo(5, -6 - lift, 13, -3 - lift * 1.3);
  ctx.quadraticCurveTo(7, 0, -1, 2);
  ctx.closePath();
  ctx.fill();
  // Körper und Schwanz
  ctx.beginPath();
  ctx.ellipse(1, 0, 8, 5.4, -0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(8, -1);
  ctx.lineTo(13, 1.5);
  ctx.lineTo(8, 2.6);
  ctx.closePath();
  ctx.fill();
  // Kopf mit Federohren
  ctx.beginPath();
  ctx.arc(-6, -3, 4.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-9.4, -5.2);
  ctx.lineTo(-10.2, -9.6);
  ctx.lineTo(-7.2, -6.6);
  ctx.closePath();
  ctx.moveTo(-4.8, -6.6);
  ctx.lineTo(-3.8, -10.2);
  ctx.lineTo(-2.6, -5.8);
  ctx.closePath();
  ctx.fill();
  // vorderer Flügel, gegenläufig
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(4, 5 + lift * 0.6, 12, 3 + lift);
  ctx.quadraticCurveTo(6, 1, 0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/** Mondsichel: Kreis minus versetzter Kreis, darunter ein schwacher Hof. */
function drawMoon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const halo = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 4);
  halo.addColorStop(0, blue400(0.1));
  halo.addColorStop(1, blue400(0));
  ctx.fillStyle = halo;
  ctx.fillRect(x - r * 4, y - r * 4, r * 8, r * 8);

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.arc(x + r * 0.45, y - r * 0.2, r * 0.88, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(214, 239, 252, 0.6)";
  ctx.fill("evenodd");
  ctx.restore();
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

/** Wiederholende Position für Parallax-Ebenen, die über den Rand laufen. */
function wrap(x: number, span: number, pad: number) {
  return ((x % span) + span) % span - pad;
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
  const lastFrameRef = useRef(0);
  const accRef = useRef(0);

  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [milestone, setMilestone] = useState(0);
  const tap = useSyncExternalStore(subscribeTapInput, prefersTapInput, () => false);
  const t = useCopy(COPY);

  useEffect(() => {
    setBest(readHighscore());
  }, []);

  const setPhaseBoth = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  /**
   * Zeichnet einen kompletten Frame. `alpha` (0 … 1) liegt zwischen dem
   * vorigen und dem aktuellen Simulationsschritt.
   */
  const paint = useCallback((st: GameState, alpha = 1) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const w = widthRef.current;
    const dist = st.prevDistance + (st.distance - st.prevDistance) * alpha;
    const time = st.prevT + (st.t - st.prevT) * alpha;
    const deerY = st.prevDeerY + (st.deerY - st.prevDeerY) * alpha;
    // Alles, was mit dem Boden mitläuft, steht im Zustand schon am Ende des
    // Schritts – um den Rest zurückschieben.
    const lag = st.distance - dist;

    ctx.clearRect(0, 0, w, WORLD_H);

    const shakeY = st.shake > 0 ? (Math.random() - 0.5) * st.shake : 0;
    ctx.save();
    ctx.translate(0, shakeY);

    // Sterne – funkeln nur, solange die Zeit läuft
    for (const s of st.stars) {
      const sx = wrap(s.x - dist * 0.04, w + 200, 100);
      const a = 0.16 + 0.22 * (0.5 + 0.5 * Math.sin(time * s.tw + s.ph));
      ctx.fillStyle = blue400(a * (1 - st.weatherMix * 0.7));
      ctx.fillRect(sx, s.y, s.r, s.r);
    }

    // Sternschnuppe
    if (st.meteor) {
      const m = st.meteor;
      const a = Math.sin((m.life / 46) * Math.PI) * 0.7;
      const tail = ctx.createLinearGradient(m.x, m.y, m.x + 46, m.y - 16);
      tail.addColorStop(0, `rgba(214, 239, 252, ${a})`);
      tail.addColorStop(1, "rgba(214, 239, 252, 0)");
      ctx.strokeStyle = tail;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x + 46, m.y - 16);
      ctx.stroke();
    }

    // Mond, kaum Parallax
    drawMoon(ctx, wrap(w * 0.78 - dist * 0.01, w + 120, 60), 34, 11);

    // Ferne Hügelkette
    ctx.fillStyle = blue400(0.07);
    for (const h of st.hillsFar) {
      const hx = wrap(h.x - dist * 0.18, w + 500, 250);
      ctx.beginPath();
      ctx.moveTo(hx - h.w / 2, GROUND_Y);
      ctx.quadraticCurveTo(hx, GROUND_Y - h.h, hx + h.w / 2, GROUND_Y);
      ctx.closePath();
      ctx.fill();
    }

    // Nähere Hügelkette
    ctx.fillStyle = blue400(0.11);
    for (const h of st.hillsNear) {
      const hx = wrap(h.x - dist * 0.42, w + 400, 200);
      ctx.beginPath();
      ctx.moveTo(hx - h.w / 2, GROUND_Y);
      ctx.quadraticCurveTo(hx, GROUND_Y - h.h, hx + h.w / 2, GROUND_Y);
      ctx.closePath();
      ctx.fill();
    }

    // Nebelband über dem Grund – wächst in der Nebelphase an
    const mist = st.weather === "mist" ? st.weatherMix : 0;
    const fogH = 34 + mist * 46;
    const fog = ctx.createLinearGradient(0, GROUND_Y - fogH, 0, GROUND_Y);
    fog.addColorStop(0, blue400(0));
    fog.addColorStop(1, blue400(0.075 + mist * 0.09));
    ctx.fillStyle = fog;
    ctx.fillRect(0, GROUND_Y - fogH, w, fogH);

    // Glühwürmchen
    for (const f of st.fireflies) {
      const fx = wrap(f.x - dist * 0.55 + Math.sin(time * f.f + f.ph) * 10, w + 300, 150);
      const fy = f.y + Math.sin(time * f.f * 1.7 + f.ph) * 5;
      const blink = Math.max(0, Math.sin(time * f.f * 2.4 + f.ph));
      if (blink < 0.05) continue;
      const glow = ctx.createRadialGradient(fx, fy, 0, fx, fy, 6);
      glow.addColorStop(0, `rgba(214, 239, 252, ${0.75 * blink})`);
      glow.addColorStop(1, "rgba(214, 239, 252, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(fx - 6, fy - 6, 12, 12);
    }

    // Boden — dieselbe Farbe wie die Linie, die links und rechts aus dem
    // Spielfeld herausläuft.
    ctx.strokeStyle = GROUND_COLOR;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 0.5);
    ctx.lineTo(w, GROUND_Y + 0.5);
    ctx.stroke();

    // Lichtimpuls bei jedem Meilenstein
    if (st.sweep > 0) {
      const sx = st.sweep * (w + 240) - 120;
      const pulse = ctx.createLinearGradient(sx - 120, 0, sx + 120, 0);
      pulse.addColorStop(0, blue400(0));
      pulse.addColorStop(0.5, "rgba(214, 239, 252, 0.9)");
      pulse.addColorStop(1, blue400(0));
      ctx.strokeStyle = pulse;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sx - 120, GROUND_Y + 0.5);
      ctx.lineTo(sx + 120, GROUND_Y + 0.5);
      ctx.stroke();
    }

    // Bodenstriche als Tempo-Anzeige
    ctx.strokeStyle = blue400(0.2);
    ctx.lineWidth = 1;
    const tickSpacing = 46;
    const offset = dist % tickSpacing;
    for (let i = -1; i * tickSpacing - offset < w + tickSpacing; i++) {
      const tx = i * tickSpacing - offset;
      ctx.beginPath();
      ctx.moveTo(tx, GROUND_Y + 4);
      ctx.lineTo(tx + 13, GROUND_Y + 4);
      ctx.stroke();
    }

    // Hindernisse
    ctx.fillStyle = blue400(0.62);
    for (const o of st.obstacles) {
      if (o.kind === "owl") {
        const ox = o.x + lag * OWL_SPEED + o.w / 2;
        drawOwl(ctx, ox, GROUND_Y - OWL_ALT + Math.sin(time * 0.14) * 1.5, Math.sin(time * 0.38));
        continue;
      }
      const ox = o.x + lag;
      if (o.kind === "fir") drawFir(ctx, ox + o.w / 2, GROUND_Y, o.h);
      else if (o.kind === "stump") drawStump(ctx, ox + o.w / 2, GROUND_Y, o.h);
      else {
        drawFir(ctx, ox + o.h * 0.25, GROUND_Y, o.h);
        drawFir(ctx, ox + o.w - o.h2 * 0.25, GROUND_Y, o.h2);
      }
    }

    // Staub
    for (const p of st.dust) {
      ctx.fillStyle = blue400(0.45 * (p.life / p.max));
      ctx.beginPath();
      ctx.arc(p.x + lag, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Reh
    ctx.fillStyle = BLUE_400;
    ctx.strokeStyle = BLUE_400;
    drawDeer(ctx, DEER_X, GROUND_Y + deerY, time * 0.42, !st.grounded);

    // Schnee liegt vor der Szene
    if (st.weather === "snow" && st.weatherMix > 0) {
      ctx.fillStyle = `rgba(214, 239, 252, ${0.55 * st.weatherMix})`;
      for (const f of st.flakes) {
        const fx = wrap(f.x - dist * 0.3 * f.r + Math.sin(time * 0.03 + f.ph) * 6, w, 0);
        ctx.beginPath();
        ctx.arc(fx, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Keine harte Kante, wenn ein Hügel genau am Rand endet.
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
    const wrapEl = wrapRef.current;
    if (!canvas || !wrapEl) return;
    const cssW = Math.max(280, wrapEl.clientWidth);
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
    const wrapEl = wrapRef.current;
    if (!wrapEl) return;
    const ro = new ResizeObserver(resize);
    ro.observe(wrapEl);
    return () => ro.disconnect();
  }, [resize]);

  // Außerhalb des Viewports wird die Schleife angehalten.
  useEffect(() => {
    const wrapEl = wrapRef.current;
    if (!wrapEl) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "80px" },
    );
    io.observe(wrapEl);
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

  /** Ein Simulationsschritt. Liefert true, wenn das Reh getroffen wurde. */
  const update = useCallback((st: GameState): boolean => {
    const w = widthRef.current;

    st.prevT = st.t;
    st.prevDistance = st.distance;
    st.prevDeerY = st.deerY;

    st.t += 1;
    st.speed = Math.min(MAX_SPEED, START_SPEED + st.distance * SPEED_RAMP);
    st.distance += st.speed;
    if (st.shake > 0) st.shake *= 0.86;
    const score = st.distance / 10;

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
      if (!st.grounded) kickDust(st, 7);
      st.deerY = 0;
      st.deerV = 0;
      st.grounded = true;
      st.jumpAge = 0;
    }

    // Hindernisse nachrücken
    st.nextGap -= st.speed;
    if (st.nextGap <= 0) spawnObstacle(st, w);
    for (const o of st.obstacles) o.x -= o.kind === "owl" ? st.speed * OWL_SPEED : st.speed;
    st.obstacles = st.obstacles.filter((o) => o.x + o.w > -40);

    // Staub driftet mit dem Boden nach hinten und verglimmt
    for (const p of st.dust) {
      p.x += p.vx - st.speed;
      p.y += p.vy;
      p.vy += 0.03;
      p.life -= 1;
    }
    st.dust = st.dust.filter((p) => p.life > 0);

    // Meilenstein: Lichtimpuls über den Boden
    const reached = Math.floor(score / MILESTONE);
    if (reached > st.milestone) {
      st.milestone = reached;
      st.sweep = 0.001;
    }
    if (st.sweep > 0) st.sweep = st.sweep >= 1 ? 0 : st.sweep + 0.022;

    // Wetter wechselt in Etappen: klar → Schnee oder Nebel → klar → …
    // Das alte Wetter blendet erst ganz aus, bevor das neue übernimmt.
    const due = score >= st.nextWeatherAt;
    if (due && st.weatherMix <= 0) {
      st.weather = st.weather === "clear" ? (Math.random() < 0.5 ? "snow" : "mist") : "clear";
      st.nextWeatherAt = score + WEATHER_EVERY;
    }
    const fadingOut = score >= st.nextWeatherAt;
    const target = st.weather === "clear" || fadingOut ? 0 : 1;
    st.weatherMix += (target - st.weatherMix) * 0.02;
    if (Math.abs(target - st.weatherMix) < 0.002) st.weatherMix = target;
    if (st.weather === "snow" || st.weatherMix > 0) {
      for (const f of st.flakes) {
        f.y += f.vy;
        if (f.y > GROUND_Y + 4) {
          f.y = -4;
          f.x = Math.random() * w;
        }
      }
    }

    // Gelegentlich eine Sternschnuppe
    if (st.meteor) {
      st.meteor.x -= 5.5;
      st.meteor.y += 1.9;
      st.meteor.life -= 1;
      if (st.meteor.life <= 0) st.meteor = null;
    } else if (Math.random() < 1 / 540) {
      st.meteor = { x: w * (0.35 + Math.random() * 0.6), y: 10 + Math.random() * 30, life: 46 };
    }

    // Kollision — Hitbox bewusst kleiner als die Silhouette, damit knappe
    // Sprünge sich fair anfühlen statt frustrierend.
    const dLeft = DEER_X - 11;
    const dRight = DEER_X + 13;
    const dTop = GROUND_Y + st.deerY - 26;
    const dBottom = GROUND_Y + st.deerY;
    for (const o of st.obstacles) {
      let oLeft: number, oRight: number, oTop: number, oBottom: number;
      if (o.kind === "owl") {
        oLeft = o.x + 4;
        oRight = o.x + o.w - 4;
        oTop = GROUND_Y - OWL_ALT - 7;
        oBottom = GROUND_Y - OWL_ALT + 7;
      } else {
        const inset = o.kind === "twin" ? 0.12 : 0.2;
        oLeft = o.x + o.w * inset;
        oRight = o.x + o.w * (1 - inset);
        oTop = GROUND_Y - Math.max(o.h, o.h2) * 0.92;
        oBottom = GROUND_Y;
      }
      if (dRight > oLeft && dLeft < oRight && dBottom > oTop && dTop < oBottom) {
        st.shake = 9;
        return true;
      }
    }
    return false;
  }, []);

  const step = useCallback((now: number) => {
    const st = stateRef.current;
    if (!st || phaseRef.current !== "running") return;

    let frame = now - lastFrameRef.current;
    lastFrameRef.current = now;

    if (!visibleRef.current) {
      rafRef.current = requestAnimationFrame(step);
      return;
    }

    if (frame > MAX_FRAME_MS) frame = STEP_MS;
    accRef.current += frame;

    while (accRef.current >= STEP_MS) {
      accRef.current -= STEP_MS;
      if (update(st)) {
        // Getroffen: den Treffer-Frame ohne Interpolation zeigen
        st.prevT = st.t;
        st.prevDistance = st.distance;
        st.prevDeerY = st.deerY;
        paint(st);
        endGame(Math.floor(st.distance / 10));
        return;
      }
    }

    paint(st, accRef.current / STEP_MS);

    // Punktestand nur bei echter Änderung in React spiegeln.
    const s = Math.floor(st.distance / 10);
    setScore((prev) => (prev === s ? prev : s));
    setMilestone((prev) => (prev === st.milestone ? prev : st.milestone));

    rafRef.current = requestAnimationFrame(step);
  }, [endGame, paint, update]);

  const start = useCallback(() => {
    holdingRef.current = false;
    stateRef.current = createState(widthRef.current);
    setScore(0);
    setMilestone(0);
    setPhaseBoth("running");
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    lastFrameRef.current = performance.now();
    accRef.current = 0;
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
    kickDust(st, 3);
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
        ? t.hintNextTap
        : t.hintNextKey
      : tap
        ? t.hintJumpTap
        : t.hintJumpKey;

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
                ? t.ariaRunningTap
                : t.ariaRunningKey
              : t.ariaStart
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
            style={{ color: "var(--ink-300)" }}
          >
            {t.best} {best}
          </div>
        )}

        {phase === "running" && (
          <div
            // Neuer key je Meilenstein startet den kurzen Aufleucht-Effekt neu
            key={milestone}
            className={`pointer-events-none absolute top-2.5 sm:top-3 text-[14px] sm:text-[15px] 2xl:text-[16px] tabular-nums font-semibold text-right origin-right ${HUD_RIGHT} ${
              milestone > 0 ? "runner-milestone" : ""
            }`}
            style={{ color: "var(--ink-100)" }}
          >
            {score}
          </div>
        )}

        {/* Ruhe- und Ende-Zustand liegen als Overlay über dem Standbild. */}
        {phase !== "running" && (
          <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-3 sm:px-4">
            <div
              className="absolute inset-0"
              style={{ background: "rgb(var(--ink-950-rgb) / 0.55)" }}
            />
            <div className="relative max-w-[16rem] sm:max-w-md">
              {phase === "over" && (
                <p
                  className="text-[14px] sm:text-[16px] font-semibold mb-1 leading-snug text-balance text-ink-100"
                >
                  {score} {t.points}
                  {score > 0 && score >= best ? t.newBest : ""}
                </p>
              )}
              <p
                className="text-[12px] sm:text-[14px] leading-snug text-balance text-ink-300"
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
