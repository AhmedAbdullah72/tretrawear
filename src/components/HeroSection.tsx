import { Link } from "react-router-dom";
import { ArrowRight, Truck, RefreshCw, Shield, Headphones } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Marquee } from "./Marquee";
import heroImage from "@/assets/hero-summer.webp";

const benefits = [
  { icon: Truck, label: "Free Shipping", desc: "Over 1,500 EGP" },
  { icon: RefreshCw, label: "Easy Returns", desc: "14-day policy" },
  { icon: Shield, label: "Secure Payment", desc: "SSL encrypted" },
  { icon: Headphones, label: "24/7 Support", desc: "Always here" },
];

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.45, 0.8]);

  return (
    <section ref={ref} className="relative flex flex-col overflow-hidden bg-foreground">
      {/* Hero visual area — reduced to ~70vh */}
      <div className="relative min-h-[70vh] flex items-center overflow-hidden">
        <motion.img
          src={heroImage}
          alt="TRETRA Wear summer collection – oversized tees and wide-leg sweatpants"
          className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
          style={{ y: imageY, scale: imageScale, transformOrigin: "50% 15%" }}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
        />
        <motion.div
          className="absolute inset-0 bg-foreground"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/10" />

        <div className="relative container z-10">
          <motion.div className="max-w-2xl pt-20 md:pt-24 pb-16" style={{ y: textY }}>
            {/* BOGO promo badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm border border-primary px-4 py-1.5 rounded-full mb-6"
            >
              <span className="font-heading text-xs tracking-[0.2em] uppercase text-primary-foreground font-semibold">
                🔥 BUY 1 GET 1 FREE — Code: BUY1GET1
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-6xl md:text-8xl lg:text-9xl text-primary-foreground leading-[0.85] mb-6"
            >
              OWN<br />
              THE<br />
              <span className="text-primary">HEAT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-body text-base md:text-lg text-primary-foreground/70 max-w-md mb-8"
            >
              Wide-leg sweatpants, oversized tees & essentials — built for summer streets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
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
      </div>

      {/* Marquee strip */}
      <div className="py-2.5 bg-foreground border-t border-border/20 text-primary-foreground">
        <Marquee
          items={["FREE SHIPPING OVER 1,500 EGP", "BUY 1 GET 1 FREE", "SUMMER 2026", "PREMIUM QUALITY", "14-DAY RETURNS"]}
          speed="slow"
        />
      </div>

      {/* Benefits bar integrated */}
      <div className="bg-card border-b border-border">
        <div className="container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((b) => (
              <div key={b.label} className="flex items-center gap-3 py-1 px-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <b.icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-xs text-foreground">{b.label}</p>
                  <p className="font-body text-[11px] text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
