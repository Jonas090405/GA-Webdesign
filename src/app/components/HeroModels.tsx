import { Suspense, lazy, useEffect, useState } from "react";
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
          <div className="h-2/3 w-2/3 rounded-full bg-gradient-to-b from-[#4dbef3]/15 to-transparent blur-2xl animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function HeroModels({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    // Rein dekorativ -> für Screenreader ausgeblendet.
    <div className={cn("w-full", className)} aria-hidden="true">
      {mounted ? (
        <Suspense fallback={<ModelSkeleton />}>
          <HeroModelsScene />
        </Suspense>
      ) : (
        <ModelSkeleton />
      )}
    </div>
  );
}
