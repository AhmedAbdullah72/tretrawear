import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ShopByCategory } from "@/components/ShopByCategory";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { ProductShowcase } from "@/components/ProductShowcase";
import { CustomerReviews } from "@/components/CustomerReviews";
import { Newsletter } from "@/components/Newsletter";


const Index = () => {
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
      <div className="min-h-screen bg-background">
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <Navbar />
        <main id="main-content" role="main">
          <HeroSection />
          <FeaturedProducts />
          <ShopByCategory />
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
