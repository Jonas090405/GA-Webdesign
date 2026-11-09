import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { cn } from "./ui/utils";

// Schwere 3D-Szene (three.js / R3F) erst client-seitig nachladen,
// damit sie nicht das Initial-Bundle aufbläht und das Prerendering nicht blockiert.
const HeroModelsScene = lazy(() => import("./HeroModelsScene"));

// Ohne WebGL (Hardwarebeschleunigung aus, manche Firmen-/Headless-Browser)
// wirft three.js beim Erzeugen des Canvas – das würde die ganze Seite abräumen.
function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return gl !== null;
  } catch {
    return false;
  }
}

// Fängt Fehler der 3D-Szene ab, damit der Rest der Seite stehen bleibt.
class SceneBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function ModelSkeleton({ failed }: { failed: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="relative aspect-[3/4] flex items-center justify-center"
        >
          {/* Sanftes Glow-Platzhalter in Markenblau */}
          <div className="absolute h-2/3 w-2/3 rounded-full bg-gradient-to-b from-blue-400/15 to-transparent blur-2xl animate-pulse" />
          {/* Lade-Spinner – entfällt, wenn die Szene nicht laden kann */}
          {!failed && (
            <div className="h-9 w-9 rounded-full border-2 border-blue-400/20 border-t-blue-400/70 animate-spin" />
          )}
        </div>
      ))}
    </div>
  );
}

export function HeroModels({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (supportsWebGL()) setMounted(true);
    else setFailed(true);
  }, []);
  const handleReady = useCallback(() => setReady(true), []);
  const handleError = useCallback(() => setFailed(true), []);

  return (
    // Rein dekorativ -> für Screenreader ausgeblendet.
    <div className={cn("relative w-full", className)} aria-hidden="true">
      {/* Platzhalter: bleibt im Layout, blendet beim Laden sanft aus */}
      <div
        className={cn(
          "transition-opacity duration-700 ease-out",
          ready ? "opacity-0" : "opacity-100"
        )}
      >
        <ModelSkeleton failed={failed} />
      </div>

      {/* 3D-Szene: blendet ein, sobald beide Modelle gerendert sind */}
      {mounted && !failed && (
        <SceneBoundary onError={handleError}>
          <Suspense fallback={null}>
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                ready ? "opacity-100" : "opacity-0"
              )}
            >
              <HeroModelsScene onReady={handleReady} />
            </div>
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
