import { ShieldCheck, Award, Leaf, Lock } from "lucide-react";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Why Choose Us</p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">
            BUILT ON <span className="text-primary">TRUST</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group text-center p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-500"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg text-foreground mb-2">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
