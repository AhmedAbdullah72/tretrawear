import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";

const FAQ = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="FAQ — Shipping, Sizing & Returns | TRETRA Wear"
      description="Answers to the most common questions about TRETRA Wear orders — shipping times, sizing, returns, payment, and care. Need more help? We're here."
      path="/faq"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How long does shipping take?", acceptedAnswer: { "@type": "Answer", text: "Most orders arrive within 2–5 business days anywhere in Egypt." } },
          { "@type": "Question", name: "Do you offer free shipping?", acceptedAnswer: { "@type": "Answer", text: "Yes — free shipping on all orders over 1,500 EGP, automatically applied at checkout." } },
          { "@type": "Question", name: "What is your return policy?", acceptedAnswer: { "@type": "Answer", text: "You have 14 days from delivery to return or exchange unworn, unwashed items with tags attached." } },
          { "@type": "Question", name: "How do I know my size?", acceptedAnswer: { "@type": "Answer", text: "Check our size guide — our pieces fit oversized by design. Stick to your usual size for a relaxed fit, or size down for a tailored look." } },
        ],
      }}
    />
    <Navbar />
    <section className="pb-12 bg-foreground text-background" style={{ paddingTop: 'calc(96px + var(--banner-offset))' }}>
      <div className="container py-8">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-2">Support</p>
        <h1 className="font-heading text-4xl md:text-5xl text-background">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
      </div>
    </section>
    <FAQSection />
    <Footer />
  </div>
);

export default FAQ;
