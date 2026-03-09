import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsBar } from "@/components/BenefitsBar";
import { SummerCollection } from "@/components/SummerCollection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { ProductShowcase } from "@/components/ProductShowcase";
import { TrustSection } from "@/components/TrustSection";
import { SocialProof } from "@/components/SocialProof";
import { FAQSection } from "@/components/FAQSection";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { IntroAnimation } from "@/components/IntroAnimation";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("intro_seen");
    if (seen) {
      setShowIntro(false);
      setHasSeenIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    sessionStorage.setItem("intro_seen", "true");
  };

  return (
    <>
      {showIntro && !hasSeenIntro && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <BenefitsBar />
        <SummerCollection />
        <FeaturedProducts />
        <UrgencyBanner />
        <ProductShowcase />
        <TrustSection />
        <SocialProof />
        <FAQSection />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default Index;
