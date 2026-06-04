import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Truck, Clock, Package, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";

const Shipping = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Shipping Info | TRETRA Wear"
      description="Free shipping on orders over 1,500 EGP across Egypt. Most orders arrive in 2–5 business days with tracking. Read our full shipping policy."
      path="/shipping"
    />
    <Navbar />
    <section className="pb-12 bg-foreground text-background" style={{ paddingTop: 'calc(96px + var(--banner-offset))' }}>
      <div className="container py-8">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-2">Support</p>
        <h1 className="font-heading text-4xl md:text-5xl text-background">Shipping Info</h1>
      </div>
    </section>
    <section className="py-12">
      <div className="container max-w-3xl space-y-8">
        {/* Quick facts */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h2 className="font-heading text-lg text-foreground mb-2">The short version?</h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            We ship all over Egypt. Orders over <strong className="text-foreground">1,500 EGP</strong> ship free — no codes, no tricks. 
            Most orders land at your door within <strong className="text-foreground">2–5 business days</strong>. Simple as that.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over 1,500 EGP — automatically applied at checkout." },
            { icon: Clock, title: "2–5 Business Days", desc: "That's how fast we get it to you, anywhere in Egypt." },
            { icon: Package, title: "Order Tracking", desc: "You'll get a tracking number by email as soon as it ships." },
          ].map((item) => (
            <div key={item.title} className="p-5 bg-card rounded-xl border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading text-sm text-foreground mb-1">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h2 className="font-heading text-lg text-foreground mb-4">Here's what happens after you order</h2>
          <ol className="font-body text-sm text-muted-foreground space-y-4 leading-relaxed">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-heading text-xs flex items-center justify-center">1</span>
              <span>We process your order within 1–2 business days. Orders on weekends or holidays? We'll get to them first thing next business day.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-heading text-xs flex items-center justify-center">2</span>
              <span>Once it's packed and shipped, you'll get an email with your tracking number. Give it up to 24 hours to start updating.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-heading text-xs flex items-center justify-center">3</span>
              <span>Sit back — your order is on its way. Most deliveries arrive within 2–5 business days.</span>
            </li>
          </ol>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h2 className="font-heading text-lg text-foreground mb-2">Got a question about your order?</h2>
          <p className="font-body text-sm text-muted-foreground mb-4">We're always around — hit us up and we'll sort it out.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/201024888818?text=Hi%20TRETRA%2C%20I%20have%20a%20question%20about%20my%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] font-heading text-sm hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:info@tretrawear.com?subject=Order%20Question"
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

export default Shipping;
