import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Truck, Clock, Package } from "lucide-react";

const Shipping = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pb-12 bg-foreground text-background" style={{ paddingTop: 'calc(96px + var(--banner-offset))' }}>
      <div className="container py-8">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-2">Support</p>
        <h1 className="font-heading text-4xl md:text-5xl text-background">Shipping Info</h1>
      </div>
    </section>
    <section className="py-12">
      <div className="container max-w-3xl space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Truck, title: "Free Domestic Shipping", desc: "Orders over 1,500 EGP ship free within Egypt." },
            { icon: Clock, title: "2–4 Business Days", desc: "Domestic delivery within Egypt." },
            { icon: Package, title: "Order Tracking", desc: "Tracking number sent via email once shipped." },
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
        <div className="bg-card rounded-xl p-6 border border-border">
          <h2 className="font-heading text-lg text-foreground mb-3">Shipping Policy</h2>
          <div className="font-body text-sm text-muted-foreground space-y-3 leading-relaxed">
            <p>All orders are processed within 1–2 business days. Orders placed on weekends or holidays are processed the next business day.</p>
            <p>Once your order ships, you'll receive an email with a tracking number. Please allow up to 24 hours for tracking information to update.</p>
            <p>TRETRA is not responsible for delays caused by local postal services.</p>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Shipping;
