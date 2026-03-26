import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pb-12 bg-foreground text-background" style={{ paddingTop: 'calc(96px + var(--banner-offset))' }}>
      <div className="container py-8">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-2">Legal</p>
        <h1 className="font-heading text-4xl md:text-5xl text-background">Terms of Service</h1>
      </div>
    </section>
    <section className="py-12">
      <div className="container max-w-3xl">
        <div className="bg-card rounded-xl p-6 md:p-8 border border-border font-body text-sm text-muted-foreground space-y-6 leading-relaxed">
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">General</h2>
            <p>By accessing and placing an order with TRETRA Wear, you confirm that you agree to these Terms of Service. These terms apply to all visitors, users, and customers of the store.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Products & Pricing</h2>
            <p>All prices are listed in Egyptian Pounds (EGP) and are subject to change without notice. We reserve the right to modify or discontinue any product at any time. Colors may vary slightly from images displayed on screen.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Orders & Payment</h2>
            <p>We reserve the right to refuse any order. Payment must be received in full before order processing. All payments are processed securely through Shopify Payments.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Shipping & Delivery</h2>
            <p>Shipping times are estimates and are not guaranteed. TRETRA is not liable for delays due to customs, weather, or carrier issues. Please review our Shipping Info page for details.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Returns & Refunds</h2>
            <p>Returns are accepted within 14 days of delivery for unworn items with original tags. Please review our Returns page for the complete return policy.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Intellectual Property</h2>
            <p>All content on this site — including logos, designs, text, and graphics — is the property of TRETRA Wear and is protected by copyright law. Unauthorized use is prohibited.</p>
          </div>
          <p className="text-xs text-muted-foreground/60">Last updated: March 2026</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Terms;
