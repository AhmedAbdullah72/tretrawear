import { ShieldCheck, Award, Leaf, Lock } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Every piece undergoes rigorous quality testing before it reaches you." },
  { icon: Award, title: "Premium Materials", desc: "Heavy-weight cotton blends engineered for comfort and durability." },
  { icon: Leaf, title: "Ethically Made", desc: "Fair labor practices and sustainable manufacturing processes." },
  { icon: Lock, title: "Secure Checkout", desc: "Your payment data is protected with industry-standard encryption." },
];

export const TrustSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Why Choose Us</p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">
            BUILT ON <span className="text-primary">TRUST</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item) => (
            <div key={item.title} className="group text-center p-6 bg-card border border-border hover:border-primary/40 transition-all duration-500">
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg text-foreground mb-2">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
