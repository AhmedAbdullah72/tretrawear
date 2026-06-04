import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Terms of Service | TRETRA Wear"
      description="The ground rules for shopping with TRETRA Wear — short, simple, and fair. No lawyer-speak required."
      path="/terms"
    />
    <Navbar />
    <section className="pb-12 bg-foreground text-background" style={{ paddingTop: 'calc(96px + var(--banner-offset))' }}>
      <div className="container py-8">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-2">Legal</p>
        <h1 className="font-heading text-4xl md:text-5xl text-background">Terms of Service</h1>
      </div>
    </section>
    <section className="py-12">
      <div className="container max-w-3xl space-y-8">
        {/* Intro */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg text-foreground">The basics, no lawyer-speak.</h2>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            By shopping with us, you agree to a few ground rules. We've kept them short, simple, and fair — because nobody should need a law degree to buy a hoodie.
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 md:p-8 border border-border font-body text-sm text-muted-foreground space-y-6 leading-relaxed">
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Shopping with us</h2>
            <p>When you place an order on TRETRA, you're agreeing to these terms. They apply to everyone who visits or buys from our store — pretty standard stuff.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Prices & products</h2>
            <p>All prices are in Egyptian Pounds (EGP). We do our best to keep things accurate, but prices can change and we might retire products from time to time. Also — screens can be tricky, so colors might look slightly different in person. That's just how screens work.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Orders & payments</h2>
            <p>We process orders once payment is confirmed. All payments go through Shopify's secure system, so your card info is in safe hands. In rare cases, we might need to cancel an order — if that happens, we'll always let you know.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Shipping</h2>
            <p>
              Delivery times are estimates, not guarantees — sometimes things take a bit longer due to carrier delays or busy seasons. Check our{" "}
              <Link to="/shipping" className="text-primary hover:text-primary/80 underline transition-colors">Shipping Info</Link>
              {" "}page for the full rundown.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Returns</h2>
            <p>
              You've got 14 days from delivery to return unworn items with tags attached. Easy. Head over to our{" "}
              <Link to="/returns" className="text-primary hover:text-primary/80 underline transition-colors">Returns & Exchanges</Link>
              {" "}page for the details.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Our stuff is ours</h2>
            <p>Everything on this site — logos, designs, photos, text — belongs to TRETRA. Please don't copy, reuse, or redistribute it without asking. We put a lot of work into it.</p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h2 className="font-heading text-lg text-foreground mb-2">Something unclear?</h2>
          <p className="font-body text-sm text-muted-foreground mb-4">We'd rather explain it ourselves than have you guess — reach out anytime.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/201024888818?text=Hi%20TRETRA%2C%20I%20have%20a%20question%20about%20your%20terms"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] font-heading text-sm hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:info@tretrawear.com?subject=Terms%20Question"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary/10 text-primary font-heading text-sm hover:bg-primary/20 transition-colors border border-primary/20"
            >
              <Mail className="h-4 w-4" />
              info@tretrawear.com
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/60">Last updated: March 2026</p>
      </div>
    </section>
    <Footer />
  </div>
);

export default Terms;
