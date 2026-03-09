import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-summer.jpg";

const AnimatedText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const letters = text.split("");
  
  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.08,
            ease: [0.165, 0.84, 0.44, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

const FloatingWord = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 80 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 1.2,
      delay,
      ease: [0.165, 0.84, 0.44, 1],
    }}
    className="inline-block"
  >
    <motion.span
      animate={{ 
        y: [0, -4, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay * 2,
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  </motion.span>
);

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.45, 0.8]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-foreground">
      <motion.img
        src={heroImage}
        alt="TRETRA Wear summer collection – oversized tees and wide-leg sweatpants"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y: imageY, scale: imageScale }}
      />
      <motion.div
        className="absolute inset-0 bg-foreground"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/10" />

      <div className="relative container z-10">
        <motion.div className="max-w-2xl pt-20 md:pt-24" style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-primary/20 backdrop-blur-sm border border-primary/30 px-4 py-1.5 rounded-full mb-6"
          >
            <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground font-semibold">
              Summer Collection 2026
            </span>
          </motion.div>

          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-primary-foreground leading-[0.85] mb-6 overflow-hidden">
            <span className="block overflow-hidden">
              <FloatingWord delay={0.1}>
                <AnimatedText text="OWN" delay={0.1} />
              </FloatingWord>
            </span>
            <span className="block overflow-hidden">
              <FloatingWord delay={0.25}>
                <AnimatedText text="THE" delay={0.25} />
              </FloatingWord>
            </span>
            <span className="block overflow-hidden">
              <FloatingWord delay={0.4}>
                <AnimatedText text="HEAT" delay={0.4} className="text-primary" />
              </FloatingWord>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="font-body text-base md:text-lg text-primary-foreground/70 max-w-md mb-8"
          >
            Wide-leg sweatpants, oversized tees & essentials — built for summer streets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading text-lg tracking-wider uppercase px-8 py-4 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25"
            >
              Shop Summer
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground font-heading text-lg tracking-wider uppercase px-8 py-4 rounded-lg hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300 backdrop-blur-sm"
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
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
