import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

// Use public paths so images can be preloaded from HTML <head>
const heroImage = "/hero-summer.webp";
const heroImageMobile = "/hero-summer-mobile.webp";

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "40%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.45, 0.8]);

  // Simplified animation config to reduce main-thread work
  const fadeIn = { opacity: 1, y: 0 };
  const hidden = { opacity: 0, y: 20 };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-foreground">
      <picture>
        <source media="(max-width: 767px)" srcSet={heroImageMobile} />
        <source media="(min-width: 768px)" srcSet={heroImage} />
        <motion.img
          src={heroImage}
          alt="TRETRA Wear summer collection – oversized tees and wide-leg sweatpants"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_15%]"
          style={{ y: imageY, scale: imageScale, transformOrigin: "50% 15%" }}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </picture>
      <motion.div
        className="absolute inset-0 bg-foreground"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/10" />

      <div className="relative container z-10">
        <motion.div className="max-w-2xl pt-20 md:pt-24" style={{ y: textY }}>
          <motion.div
            initial={hidden}
            animate={fadeIn}
            transition={{ duration: 0.4 }}
            className="hidden md:inline-block bg-primary/20 backdrop-blur-sm border border-primary/30 px-4 py-1.5 rounded-full mb-6"
          >
            <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground font-semibold">
              New Summer Drops — Just Landed
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-5xl md:text-8xl lg:text-9xl text-primary-foreground leading-[0.85] mb-4 md:mb-6"
          >
            DRESS<br />
            HOW YOU<br />
            <span className="text-primary">FEEL</span>
          </motion.h1>

          <motion.p
            initial={hidden}
            animate={fadeIn}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-body text-sm md:text-lg text-primary-foreground/70 max-w-md mb-6 md:mb-8"
          >
            Comfort that keeps up with your life. Oversized fits, heavyweight cotton, zero compromise.
          </motion.p>

          <motion.div
            initial={hidden}
            animate={fadeIn}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading text-base md:text-lg tracking-wider uppercase px-6 md:px-8 py-3.5 md:py-4 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25"
            >
              See What's New
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground font-heading text-base md:text-lg tracking-wider uppercase px-6 md:px-8 py-3.5 md:py-4 rounded-lg hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300 backdrop-blur-sm"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-primary-foreground/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};
