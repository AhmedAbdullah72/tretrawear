import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const collections = [
  {
    title: "Wide-Leg Sweatpants",
    subtitle: "From 550 EGP",
    image: "/products/beige-wide-leg-sweatpants.webp",
    link: "/shop",
    bgClass: "bg-secondary",
  },
  {
    title: "Oversized T-Shirts",
    subtitle: "From 450 EGP",
    image: "/products/off-white-oversized-tee.png",
    link: "/shop",
    bgClass: "bg-muted",
  },
  {
    title: "Basic Essentials",
    subtitle: "From 350 EGP",
    image: "/products/black-basic-tee.png",
    link: "/shop",
    bgClass: "bg-surface",
  },
];

export const ShopByCategory = () => {
  return (
    <section className="section-padding bg-card overflow-hidden" aria-labelledby="category-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Collections</p>
          <h2 id="category-heading" className="font-heading text-4xl md:text-5xl text-foreground">
            SHOP BY <span className="text-primary">CATEGORY</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {collections.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={col.link}
                className="group block rounded-2xl overflow-hidden relative"
                aria-label={`Shop ${col.title} — ${col.subtitle}`}
              >
                <div className={`${col.bgClass} aspect-[3/4] flex items-center justify-center p-8 transition-all duration-500`}>
                  <img
                    src={col.image}
                    alt={col.title}
                    width={512}
                    height={512}
                    className="w-3/4 h-auto object-contain drop-shadow-xl transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-transparent p-6 pt-24">
                  <h3 className="font-heading text-xl text-primary-foreground mb-1">{col.title}</h3>
                  <div className="flex items-center justify-between">
                    <p className="font-body text-xs text-primary-foreground/60">{col.subtitle}</p>
                    <span className="bg-primary text-primary-foreground font-heading text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400" aria-hidden="true">
                      Shop
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
