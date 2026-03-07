import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsBar } from "@/components/BenefitsBar";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { ProductShowcase } from "@/components/ProductShowcase";
import { TrustSection } from "@/components/TrustSection";
import { SocialProof } from "@/components/SocialProof";
import { FAQSection } from "@/components/FAQSection";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BenefitsBar />
      <FeaturedProducts />
      <UrgencyBanner />
      <ProductShowcase />
      <TrustSection />
      <SocialProof />
      <FAQSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
