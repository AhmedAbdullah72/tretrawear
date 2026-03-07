import { Truck, RefreshCw, Shield, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over 500 EGP" },
  { icon: RefreshCw, label: "Easy Returns", desc: "14-day return policy" },
  { icon: Shield, label: "Secure Payment", desc: "SSL encrypted checkout" },
  { icon: Headphones, label: "24/7 Support", desc: "Always here for you" },
];

export const BenefitsBar = () => {
  return (
    <section className="py-6 bg-card border-b border-border">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3 py-3 px-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <b.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-heading text-sm text-foreground">{b.label}</p>
                <p className="font-body text-xs text-muted-foreground">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
