import { Users, TrendingUp, Package } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, value: "850+", label: "Happy Customers" },
  { icon: Package, value: "1,200+", label: "Orders Shipped" },
  { icon: TrendingUp, value: "96%", label: "Satisfaction Rate" },
];

export const SocialProof = () => {
  return (
    <section className="py-10 bg-foreground text-background overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-3">The Numbers</p>
          <h2 className="font-heading text-4xl md:text-5xl text-background">
            TRUSTED BY <span className="text-primary">THOUSANDS</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="text-center p-8"
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-primary/20 rounded-xl">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="font-heading text-4xl text-background mb-1">{stat.value}</p>
              <p className="font-body text-sm text-background/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
