import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play, X } from "lucide-react";
import lifestyleBg from "@/assets/lifestyle-summer-2.webp";

export const VideoBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <>
      <section ref={sectionRef} className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <motion.img
          src={lifestyleBg}
          alt="TRETRA summer fashion editorial"
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
            <button
              onClick={() => setIsOpen(true)}
              className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 shadow-2xl shadow-primary/30"
              aria-label="Play video"
            >
              <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
            </button>
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

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-foreground/60 backdrop-blur-sm flex items-center justify-center hover:bg-foreground transition-colors"
                aria-label="Close video"
              >
                <X className="h-5 w-5 text-primary-foreground" />
              </button>
              {/* Replace this src with your YouTube/TikTok embed URL */}
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                title="TRETRA Wear — Behind the Collection"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
