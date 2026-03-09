import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import lifestyleBg from "@/assets/lifestyle-summer-2.jpg";

export const VideoBanner = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={sectionRef} className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <motion.img
        src={lifestyleBg}
        alt="TRETRA summer streetwear editorial"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y: bgY }}
      />
      <div className="absolute inset-0 bg-foreground/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-transparent to-foreground/30" />

      <div className="relative h-full container flex flex-col items-center justify-center text-center z-10">
        {/* Play button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-primary hover:scale-110 transition-all duration-300 shadow-2xl shadow-primary/30">
            <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/60 mb-4"
        >
          Behind the Collection
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[0.9] mb-6"
        >
          MADE FOR<br />
          THE <span className="text-primary">STREETS</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-body text-sm text-primary-foreground/60 max-w-md mb-8"
        >
          From fabric to finish — every piece is crafted with intention. No shortcuts, no compromises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 bg-primary-foreground text-foreground font-heading text-sm tracking-wider uppercase px-7 py-3.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Explore Collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
