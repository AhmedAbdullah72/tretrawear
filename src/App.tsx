import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { useMetaPageViews } from "@/hooks/useMetaPageViews";

import { lazy, Suspense } from "react";

// Eager load Index for fastest home page
import Index from "./pages/Index";

// Lazy load all other routes
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Returns = lazy(() => import("./pages/Returns"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const SizeGuide = lazy(() => import("./pages/SizeGuide"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

/** Must live inside <BrowserRouter> to read location. Renders nothing. */
const MetaRouteTracker = () => {
  useMetaPageViews();
  return null;
};

const AppContent = () => {
  useCartSync();
  return (
    <BrowserRouter>
      <MetaRouteTracker />
      <AnnouncementBar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      
      {/* Exit-intent STAY5 promotion disabled (P1 Step 2 promo cleanup).
          Component kept in codebase for a future A/B test. */}
      <WhatsAppButton />
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
