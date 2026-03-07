import { Truck, RefreshCw, Shield, Headphones } from "lucide-react";
import { Marquee } from "./Marquee";

const benefits = [
  { icon: Truck, label: "Free Shipping", desc: "Orders over 500 EGP" },
  { icon: RefreshCw, label: "Easy Returns", desc: "14-day policy" },
  { icon: Shield, label: "Secure Payment", desc: "SSL encrypted" },
  { icon: Headphones, label: "24/7 Support", desc: "Always here" },
];

export const BenefitsBar = () => {
  return (
    <section className="bg-card border-b border-border">
      {/* Top marquee strip */}
      <div className="py-2 bg-foreground text-background">
        <Marquee
          items={["FREE SHIPPING OVER 500 EGP", "NEW COLLECTION 2026", "PREMIUM QUALITY", "14-DAY RETURNS"]}
          speed="slow"
        />
      </div>
      {/* Benefits grid */}
      <div className="container py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((b) => (
            <div key={b.label} className="flex items-center gap-3 py-2 px-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <b.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-heading text-xs text-foreground">{b.label}</p>
                <p className="font-body text-[11px] text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
