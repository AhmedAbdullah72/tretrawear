import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";

export const PromoBanner = () => {
  return (
    <section className="bg-primary">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="container py-3.5 md:py-4"
      >
        <Link
          to="/shop"
          className="flex items-center justify-center gap-3 group"
        >
          <Gift className="h-4 w-4 text-primary-foreground flex-shrink-0" />
          <p className="font-heading text-sm md:text-base text-primary-foreground tracking-wider">
            BUY 1 GET 1 FREE
            <span className="hidden sm:inline font-body text-xs text-primary-foreground/70 ml-2 tracking-normal">
              — Use code <span className="font-semibold text-primary-foreground">BUY1GET1</span> at checkout
            </span>
          </p>
          <ArrowRight className="h-4 w-4 text-primary-foreground flex-shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
};
