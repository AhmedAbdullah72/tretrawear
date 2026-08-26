import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { initMetaPixel } from "./lib/metaPixel";

// Async, non-render-blocking, once-per-document.
initMetaPixel();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Remove the pre-hydration loader once React has mounted
requestAnimationFrame(() => {
  document.getElementById("initial-loader")?.remove();
});
