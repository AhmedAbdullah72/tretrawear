import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQSection";

const FAQ = () => (
  <div className="min-h-screen bg-background">
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
