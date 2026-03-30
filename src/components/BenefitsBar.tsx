import { Truck, RefreshCw, Shield, Headphones } from "lucide-react";
import { Marquee } from "./Marquee";

const benefits = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over 1,500 EGP" },
  { icon: RefreshCw, label: "Easy Returns", desc: "No questions, 14 days" },
  { icon: Shield, label: "Secure Checkout", desc: "Your info stays safe" },
  { icon: Headphones, label: "We're Here", desc: "Chat with us anytime" },
];

export const BenefitsBar = () => {
  return (
    <section className="bg-card border-b border-border">
      {/* Top marquee strip */}
      <div className="py-2 bg-foreground text-background">
        <Marquee
          items={["Pay When It Arrives", "At Your Door in 2–5 Days", "Changed Your Mind? 14-Day Exchange"]}
          speed="slow"
        />
      </div>
      {/* Benefits grid */}
      <div className="container py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-3 py-2 px-3 cursor-default group"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:shadow-md group-hover:shadow-primary/20">
                <b.icon className="h-4 w-4 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
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
