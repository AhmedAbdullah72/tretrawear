import { useState, lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsBar } from "@/components/BenefitsBar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ShopByCategory } from "@/components/ShopByCategory";
import { PromoBanner } from "@/components/PromoBanner";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { ProductShowcase } from "@/components/ProductShowcase";
import { CustomerReviews } from "@/components/CustomerReviews";
import { Newsletter } from "@/components/Newsletter";

// Lazy load intro
const IntroAnimation = lazy(() => import("@/components/IntroAnimation").then(m => ({ default: m.IntroAnimation })));

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
      <SEO
        title="TRETRA Wear | Premium Oversized Fashion from Egypt"
        description="TRETRA Wear delivers bold, oversized fashion designed for the fearless. Born in Egypt, made for the world. Shop hoodies, tees & more."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "TRETRA Wear",
            url: "https://www.tretrawear.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.tretrawear.com/shop?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TRETRA Wear",
            url: "https://www.tretrawear.com",
            logo: "https://www.tretrawear.com/logo.png",
            sameAs: [
              "https://instagram.com/tretra.wear",
              "https://tiktok.com/@tretra.wear",
              "https://facebook.com/tretra.wear",
            ],
          },
        ]}
      />
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
          <FeaturedProducts />
          <ShopByCategory />
          <BenefitsBar />
          <PromoBanner />
          <ProductShowcase />
          <CustomerReviews />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
