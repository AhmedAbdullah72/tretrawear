import { ShieldCheck, Award, Leaf, Lock } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Tested on every piece." },
  { icon: Award, title: "Premium Materials", desc: "Heavy-weight cotton." },
  { icon: Leaf, title: "Ethically Made", desc: "Sustainable process." },
  { icon: Lock, title: "Secure Checkout", desc: "Encrypted payments." },
];

export const TrustSection = () => {
  return (
    <section className="py-6 md:py-8 bg-background overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all duration-500"
            >
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-lg group-hover:bg-primary transition-all duration-500">
                <item.icon className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <div>
                <h3 className="font-heading text-xs text-foreground">{item.title}</h3>
                <p className="font-body text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
