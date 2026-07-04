import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "motion/react";
import App from "./app/App.tsx";
import "./styles/index.css";

const rootElement = document.getElementById("root")!;

// Always use createRoot — pre-rendered HTML is only for SEO crawlers,
// not for true SSR hydration. hydrateRoot + Framer Motion causes #418/#425.
// MotionConfig reducedMotion="user": respektiert die OS-Einstellung
// "Bewegung reduzieren" auch für JS-Animationen (CSS deckt globals.css ab).
createRoot(rootElement).render(
  <BrowserRouter>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </BrowserRouter>
);