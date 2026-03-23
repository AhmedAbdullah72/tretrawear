import { useState, useEffect, lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsBar } from "@/components/BenefitsBar";
import { Footer } from "@/components/Footer";

// Lazy load below-fold sections
const SummerCollection = lazy(() => import("@/components/SummerCollection").then(m => ({ default: m.SummerCollection })));
const ShopByCategory = lazy(() => import("@/components/ShopByCategory").then(m => ({ default: m.ShopByCategory })));
const LifestyleLookbook = lazy(() => import("@/components/LifestyleLookbook").then(m => ({ default: m.LifestyleLookbook })));
const PromoBanner = lazy(() => import("@/components/PromoBanner").then(m => ({ default: m.PromoBanner })));
const FeaturedProducts = lazy(() => import("@/components/FeaturedProducts").then(m => ({ default: m.FeaturedProducts })));
const UrgencyBanner = lazy(() => import("@/components/UrgencyBanner").then(m => ({ default: m.UrgencyBanner })));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase").then(m => ({ default: m.ProductShowcase })));
const TrustSection = lazy(() => import("@/components/TrustSection").then(m => ({ default: m.TrustSection })));
const SocialProof = lazy(() => import("@/components/SocialProof").then(m => ({ default: m.SocialProof })));
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
    // Skip intro for bots and returning visitors
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
          <BenefitsBar />
          <Suspense fallback={<SectionFallback />}>
            <SummerCollection />
            <ShopByCategory />
            {/* LifestyleLookbook removed */}
            <PromoBanner />
            <FeaturedProducts />
            <UrgencyBanner />
            <ProductShowcase />
            <TrustSection />
            <SocialProof />
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
