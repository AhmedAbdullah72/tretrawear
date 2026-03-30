import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, MessageCircle, Mail, ArrowRight } from "lucide-react";

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
      <div className="container max-w-3xl space-y-8">
        {/* Intro */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg text-foreground">Your privacy matters to us. For real.</h2>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            We're not into shady stuff. Here's a plain-English breakdown of what we collect, why we collect it, and how we keep it safe. No legal jargon, no fine print tricks.
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 md:p-8 border border-border font-body text-sm text-muted-foreground space-y-6 leading-relaxed">
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">What we collect</h2>
            <p>When you place an order, we grab the basics — your name, email, shipping address, and payment details. We also use cookies to remember your cart and make the site work better for you. That's it.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">What we do with it</h2>
            <p>We use your info to get your order to you, send you shipping updates, and make our products better. We <strong className="text-foreground">never</strong> sell your personal data to anyone. Period.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">How we keep it safe</h2>
            <p>Every transaction is encrypted with SSL. Your payment info goes through Shopify's secure payment system — we never store card details on our end. Your data stays locked down.</p>
          </div>
          <div>
            <h2 className="font-heading text-base text-foreground mb-2">Cookies — the digital kind</h2>
            <p>We use cookies to remember your cart, save your preferences, and understand how people use the site. You can turn them off in your browser settings anytime — though your cart might forget you.</p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h2 className="font-heading text-lg text-foreground mb-2">Questions about your data?</h2>
          <p className="font-body text-sm text-muted-foreground mb-4">We're happy to explain anything — just reach out.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/201024888818?text=Hi%20TRETRA%2C%20I%20have%20a%20question%20about%20my%20privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] font-heading text-sm hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:info@tretrawear.com?subject=Privacy%20Question"
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

export default Privacy;
