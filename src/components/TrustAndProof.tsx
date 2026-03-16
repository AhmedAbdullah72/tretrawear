import { ShieldCheck, Award, Leaf, Users, Package, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, value: "850+", label: "Happy Customers" },
  { icon: Package, value: "1,200+", label: "Orders Shipped" },
  { icon: TrendingUp, value: "96%", label: "Satisfaction Rate" },
];

const trustItems = [
  { icon: ShieldCheck, label: "Quality Guaranteed" },
  { icon: Award, label: "Premium Materials" },
  { icon: Leaf, label: "Ethically Made" },
];

export const TrustAndProof = () => {
  return (
    <section className="py-16 bg-foreground text-primary-foreground overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/50 mb-3">Why TRETRA</p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground">
            TRUSTED BY <span className="text-primary">THOUSANDS</span>
          </h2>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <p className="font-heading text-3xl md:text-4xl text-primary-foreground mb-1">{stat.value}</p>
              <p className="font-body text-xs text-primary-foreground/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust badges row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-center gap-6 md:gap-10 pt-8 border-t border-primary-foreground/10"
        >
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-primary" />
              <span className="font-body text-xs text-primary-foreground/60">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
