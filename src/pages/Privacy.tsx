import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pb-12 bg-foreground text-background" style={{ paddingTop: 'calc(96px + var(--banner-offset))' }}>
      <div className="container py-8">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-2">Legal</p>
        <h1 className="font-heading text-4xl md:text-5xl text-background">Privacy Policy</h1>
      </div>
    </section>
    <section className="py-12">
      <div className="container max-w-3xl">
        <div className="bg-card rounded-xl p-6 md:p-8 border border-border font-body text-sm text-muted-foreground space-y-6 leading-relaxed">
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Information We Collect</h2>
            <p>When you make a purchase, we collect your name, email, shipping address, and payment information. We also collect browsing data through cookies to improve your experience.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">How We Use Your Information</h2>
            <p>We use your information to process orders, send shipping updates, and improve our products and services. We never sell your personal data to third parties.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Data Security</h2>
            <p>All transactions are encrypted using SSL technology. Your payment information is processed securely through Shopify Payments and is never stored on our servers.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Cookies</h2>
            <p>We use cookies to remember your cart, preferences, and to analyze site traffic. You can disable cookies in your browser settings at any time.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Contact Us</h2>
            <p>If you have questions about this policy, reach out to us via Instagram DM @tretra.wear or email us at support@tretra.com.</p>
          </div>
          <p className="text-xs text-muted-foreground/60">Last updated: March 2026</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Privacy;
