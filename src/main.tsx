import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Remove the pre-hydration loader once React has mounted
requestAnimationFrame(() => {
  document.getElementById("initial-loader")?.remove();
});
