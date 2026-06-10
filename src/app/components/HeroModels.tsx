import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { cn } from "./ui/utils";

// Schwere 3D-Szene (three.js / R3F) erst client-seitig nachladen,
// damit sie nicht das Initial-Bundle aufbläht und das Prerendering nicht blockiert.
const HeroModelsScene = lazy(() => import("./HeroModelsScene"));

function ModelSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="relative aspect-[3/4] flex items-center justify-center"
        >
          {/* Sanftes Glow-Platzhalter in Markenblau */}
          <div className="absolute h-2/3 w-2/3 rounded-full bg-gradient-to-b from-[#4dbef3]/15 to-transparent blur-2xl animate-pulse" />
          {/* Lade-Spinner */}
          <div className="h-9 w-9 rounded-full border-2 border-[#4dbef3]/20 border-t-[#4dbef3]/70 animate-spin" />
        </div>
      ))}
    </div>
  );
}

export function HeroModels({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setMounted(true), []);
  const handleReady = useCallback(() => setReady(true), []);

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
        <ModelSkeleton />
      </div>

      {/* 3D-Szene: blendet ein, sobald beide Modelle gerendert sind */}
      {mounted && (
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
      )}
    </div>
  );
}
