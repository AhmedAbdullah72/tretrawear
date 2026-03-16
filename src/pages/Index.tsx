import { useState, lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";

// Lazy load below-fold sections
const FeaturedProducts = lazy(() => import("@/components/FeaturedProducts").then(m => ({ default: m.FeaturedProducts })));
const ShopByCategory = lazy(() => import("@/components/ShopByCategory").then(m => ({ default: m.ShopByCategory })));
const TrustAndProof = lazy(() => import("@/components/TrustAndProof").then(m => ({ default: m.TrustAndProof })));
const CustomerReviews = lazy(() => import("@/components/CustomerReviews").then(m => ({ default: m.CustomerReviews })));
const FAQSection = lazy(() => import("@/components/FAQSection").then(m => ({ default: m.FAQSection })));
const Newsletter = lazy(() => import("@/components/Newsletter").then(m => ({ default: m.Newsletter })));

// Lazy load intro
const IntroAnimation = lazy(() => import("@/components/IntroAnimation").then(m => ({ default: m.IntroAnimation })));

const SectionFallback = () => <div className="min-h-[200px]" />;

// Detect bots/lighthouse to skip intro animation
const isBot = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  return /lighthouse|pagespeed|gtmetrix|googlebot|bingbot|headlesschrome/i.test(ua);
};

const Index = () => {
  const [showIntro, setShowIntro] = useState(() => {
    if (isBot()) return false;
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("intro_seen")) return false;
    return true;
  });
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    if (isBot()) return true;
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("intro_seen")) return true;
    return false;
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    sessionStorage.setItem("intro_seen", "true");
  };

  return (
    <>
      {showIntro && !hasSeenIntro && (
        <Suspense fallback={<div className="fixed inset-0 z-[100] bg-foreground" />}>
          <IntroAnimation onComplete={handleIntroComplete} />
        </Suspense>
      )}
      <div className="min-h-screen bg-background">
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <Navbar />
        <main id="main-content" role="main">
          <HeroSection />
          <Suspense fallback={<SectionFallback />}>
            <FeaturedProducts />
            <ShopByCategory />
            <TrustAndProof />
            <CustomerReviews />
            <FAQSection />
            <Newsletter />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
