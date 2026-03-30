import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RefreshCw, CheckCircle, XCircle, MessageCircle, Mail, ArrowRight } from "lucide-react";

const Returns = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pb-12 bg-foreground text-background" style={{ paddingTop: 'calc(96px + var(--banner-offset))' }}>
      <div className="container py-8">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-2">Support</p>
        <h1 className="font-heading text-4xl md:text-5xl text-background">Returns & Exchanges</h1>
      </div>
    </section>
    <section className="py-12">
      <div className="container max-w-3xl space-y-8">
        {/* Promise block */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <RefreshCw className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg text-foreground">Changed your mind? No stress.</h2>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            We get it — sometimes things don't work out. You've got <strong className="text-foreground">14 days</strong> from delivery to return or exchange your order. 
            Just make sure it's unworn, unwashed, and the tags are still on. That's it. No drama.
          </p>
        </div>

        {/* Eligible / Not Eligible */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl p-5 border border-border">
            <CheckCircle className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-heading text-sm text-foreground mb-2">We'll take it back if…</h3>
            <ul className="font-body text-sm text-muted-foreground space-y-1.5">
              <li>• It's unworn with the tags still on</li>
              <li>• It's in the original packaging</li>
              <li>• You reach out within 14 days</li>
              <li>• You got the wrong size or it arrived defective</li>
            </ul>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <XCircle className="h-5 w-5 text-destructive mb-3" />
            <h3 className="font-heading text-sm text-foreground mb-2">We can't accept it if…</h3>
            <ul className="font-body text-sm text-muted-foreground space-y-1.5">
              <li>• It's been worn or washed</li>
              <li>• The tags have been removed</li>
              <li>• It was bought on sale or clearance</li>
              <li>• More than 14 days have passed</li>
            </ul>
          </div>
        </div>

        {/* How to return */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h2 className="font-heading text-lg text-foreground mb-4">Here's how it works</h2>
          <ol className="font-body text-sm text-muted-foreground space-y-4 leading-relaxed">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-heading text-xs flex items-center justify-center">1</span>
              <span>Send us a message on WhatsApp or email with your order number — tell us what's up.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-heading text-xs flex items-center justify-center">2</span>
              <span>We'll sort it out and give you return or exchange instructions right away.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-heading text-xs flex items-center justify-center">3</span>
              <span>Ship it back in its original packaging — we'll handle the rest.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-heading text-xs flex items-center justify-center">4</span>
              <span>Your refund hits your account within 5–7 business days once we receive it.</span>
            </li>
          </ol>
        </div>

        {/* Contact block */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h2 className="font-heading text-lg text-foreground mb-2">Need to start a return?</h2>
          <p className="font-body text-sm text-muted-foreground mb-4">Reach out however you're comfortable — we reply fast.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/201024888818?text=Hi%20TRETRA%2C%20I%27d%20like%20to%20start%20a%20return%20for%20my%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] font-heading text-sm hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:info@tretrawear.com?subject=Return%20Request&body=Hi%20TRETRA%2C%20I%27d%20like%20to%20return%20my%20order.%20Order%20number%3A%20"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary/10 text-primary font-heading text-sm hover:bg-primary/20 transition-colors border border-primary/20"
            >
              <Mail className="h-4 w-4" />
              info@tretrawear.com
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Returns;
