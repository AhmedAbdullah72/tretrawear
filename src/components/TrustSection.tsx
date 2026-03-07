import { ShieldCheck, Award, Leaf, Lock } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Rigorous quality testing on every piece." },
  { icon: Award, title: "Premium Materials", desc: "Heavy-weight cotton engineered for comfort." },
  { icon: Leaf, title: "Ethically Made", desc: "Sustainable manufacturing processes." },
  { icon: Lock, title: "Secure Checkout", desc: "Industry-standard payment encryption." },
];

export const TrustSection = () => {
  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Why Choose Us</p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">
            BUILT ON <span className="text-primary">TRUST</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group text-center p-6 md:p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-500"
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <item.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="font-heading text-base text-foreground mb-1">{item.title}</h3>
              <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
