import { Check } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Heavy-weight 380gsm premium cotton",
  "Oversized drop-shoulder silhouette",
  "Custom embroidered branding",
  "Reinforced double-stitched seams",
  "Pre-shrunk & colorfast fabric",
  "Unisex fit — sizes S to 3XL",
];

export const ProductShowcase = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Product Details</p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              CRAFTED FOR<br />
              <span className="text-primary">PERFECTION</span>
            </h2>
            <p className="font-body text-muted-foreground mb-8 max-w-md">
              Every TRETRA piece is designed with obsessive attention to detail. From fabric selection to final stitch — no compromise.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 flex items-center justify-center bg-primary/10 rounded-full">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="font-body text-sm text-foreground">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-secondary rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="font-heading text-2xl text-muted-foreground/30 mb-2">PRODUCT IMAGE</p>
                  <p className="font-body text-sm text-muted-foreground">Add products to your store to see them here</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
