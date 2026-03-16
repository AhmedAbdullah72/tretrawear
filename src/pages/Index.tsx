import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";

// Lazy load below-fold sections
const PromoBanner = lazy(() => import("@/components/PromoBanner").then(m => ({ default: m.PromoBanner })));
const FeaturedProducts = lazy(() => import("@/components/FeaturedProducts").then(m => ({ default: m.FeaturedProducts })));
const ShopByCategory = lazy(() => import("@/components/ShopByCategory").then(m => ({ default: m.ShopByCategory })));
const SummerCollection = lazy(() => import("@/components/SummerCollection").then(m => ({ default: m.SummerCollection })));
const CustomerReviews = lazy(() => import("@/components/CustomerReviews").then(m => ({ default: m.CustomerReviews })));
const Newsletter = lazy(() => import("@/components/Newsletter").then(m => ({ default: m.Newsletter })));

const SectionFallback = () => <div className="min-h-[200px]" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <Navbar />
      <main id="main-content" role="main">
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <PromoBanner />
          <FeaturedProducts />
          <ShopByCategory />
          <SummerCollection />
          <CustomerReviews />
          <Newsletter />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
