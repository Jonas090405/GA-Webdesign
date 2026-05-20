import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import "./styles/index.css";

const rootElement = document.getElementById("root")!;

// Always use createRoot — pre-rendered HTML is only for SEO crawlers,
// not for true SSR hydration. hydrateRoot + Framer Motion causes #418/#425.
createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);