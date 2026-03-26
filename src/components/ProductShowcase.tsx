import { Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import detailFabric from "@/assets/detail-fabric.webp";
import shadowHoodie from "@/assets/shadow-hoodie.webp";

const features = [
  "380gsm heavy-weight premium cotton",
  "Wide-leg & oversized silhouettes",
  "Pre-shrunk & colorfast fabric",
  "Reinforced double-stitched seams",
  "Elastic waistbands with drawstring",
  "Unisex fit — sizes M to 2XL",
];

export const ProductShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={sectionRef} className="section-padding bg-card overflow-hidden" aria-labelledby="showcase-heading">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Why It Hits Different</p>
            <h2 id="showcase-heading" className="font-heading text-2xl md:text-4xl text-foreground mb-4">
              BUILT TO<br />
              <span className="text-primary">LAST</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-5 max-w-md">
              We're picky about quality so you don't have to be. Every piece is made to feel as good on day 100 as it does on day 1.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Product features">
              {features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 flex items-center justify-center bg-primary/10 rounded-full flex-shrink-0" aria-hidden="true">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="font-body text-sm text-foreground">{f}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] bg-secondary rounded-2xl overflow-hidden shadow-xl">
                <motion.img
                  src={shadowHoodie}
                  alt="TRETRA hoodie detail showing premium stitching and fabric quality"
                  className="w-full h-full object-cover"
                  style={{ y: imageY }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="aspect-[3/4] bg-secondary rounded-2xl overflow-hidden shadow-xl mt-8">
                <img
                  src={detailFabric}
                  alt="Premium 380GSM cotton fabric texture close-up"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" aria-hidden="true" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-2xl -z-10" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
