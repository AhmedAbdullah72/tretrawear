import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { LifestyleSection } from "@/components/LifestyleSection";
import { BrandStory } from "@/components/BrandStory";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <LifestyleSection />
      <BrandStory />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
