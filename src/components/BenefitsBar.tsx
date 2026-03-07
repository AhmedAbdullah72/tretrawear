import { Truck, RefreshCw, Shield, Headphones } from "lucide-react";

const benefits = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over 500 EGP" },
  { icon: RefreshCw, label: "Easy Returns", desc: "14-day return policy" },
  { icon: Shield, label: "Secure Payment", desc: "SSL encrypted checkout" },
  { icon: Headphones, label: "24/7 Support", desc: "Always here for you" },
];

export const BenefitsBar = () => {
  return (
    <section className="border-y border-border bg-card">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {benefits.map((b, i) => (
            <div
              key={b.label}
              className={`flex items-center gap-3 py-5 px-4 ${i < benefits.length - 1 ? "md:border-r border-border" : ""} ${i < 2 ? "border-b md:border-b-0 border-border" : ""}`}
            >
              <b.icon className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-heading text-sm text-foreground">{b.label}</p>
                <p className="font-body text-xs text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
