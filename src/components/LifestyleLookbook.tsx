import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import lifestyleImg1 from "@/assets/lifestyle-summer-1.jpg";
import lifestyleImg2 from "@/assets/lifestyle-summer-2.jpg";
import detailImg from "@/assets/detail-fabric.jpg";
import flatlayImg from "@/assets/flatlay-summer.jpg";

export const LifestyleLookbook = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallax1 = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section ref={sectionRef} className="section-padding bg-background overflow-hidden" aria-labelledby="lookbook-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">The Lookbook</p>
          <h2 id="lookbook-heading" className="font-heading text-4xl md:text-5xl text-foreground">
            STREET <span className="text-primary">STORIES</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            Summer essentials captured in their natural habitat — the streets.
          </p>
        </motion.div>

        {/* Asymmetric image grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4">
          {/* Large lifestyle image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="col-span-2 md:col-span-7 row-span-2"
          >
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full rounded-2xl overflow-hidden group cursor-pointer">
              <motion.img
                src={lifestyleImg1}
                alt="Summer lifestyle — oversized tees and wide-leg sweatpants on urban streets"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ y: parallax1 }}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-heading text-lg text-primary-foreground">Summer '26 Lookbook</p>
                <p className="font-body text-xs text-primary-foreground/70">Wide-leg sweatpants + Oversized tee</p>
              </div>
            </div>
          </motion.div>

          {/* Fabric detail */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 md:col-span-5"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <motion.img
                src={detailImg}
                alt="Premium 380GSM cotton fabric texture close-up"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                style={{ y: parallax2 }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Flatlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 md:col-span-5"
          >
            <div className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer">
              <img
                src={flatlayImg}
                alt="TRETRA summer essentials flat lay — t-shirt, sweatpants, and sneakers"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-500 flex items-center justify-center">
                <Link
                  to="/shop"
                  className="bg-primary text-primary-foreground font-heading text-xs tracking-wider uppercase px-5 py-2.5 rounded-full opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 flex items-center gap-2"
                >
                  Shop the Look
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
