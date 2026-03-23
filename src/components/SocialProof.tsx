import { Users, TrendingUp, Package } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, value: "850+", label: "Happy Customers" },
  { icon: Package, value: "1,200+", label: "Orders Shipped" },
  { icon: TrendingUp, value: "96%", label: "Satisfaction Rate" },
];

export const SocialProof = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-foreground via-foreground to-primary/90 text-background overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-3">The Numbers</p>
          <h2 className="font-heading text-2xl md:text-4xl text-background">
            TRUSTED BY <span className="text-primary-foreground">THOUSANDS</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="text-center p-4 md:p-6"
            >
              <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center bg-primary/20 rounded-xl">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="font-heading text-2xl md:text-3xl text-background mb-1">{stat.value}</p>
              <p className="font-body text-sm text-background/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
