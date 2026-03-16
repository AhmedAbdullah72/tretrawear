import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";

export const PromoBanner = () => {
  return (
    <section className="py-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="bg-primary relative"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container relative z-10 py-14 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center md:justify-start gap-2 mb-4"
              >
                <Gift className="h-5 w-5 text-primary-foreground" />
                <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/80">
                  Limited Time Offer
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-[0.9] mb-3"
              >
                BUY 1<br />GET 1 FREE
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-body text-sm text-primary-foreground/70 max-w-sm"
              >
                Use code <span className="font-semibold text-primary-foreground bg-primary-foreground/10 px-2 py-0.5 rounded">BUY1GET1</span> at checkout. Mix and match across the entire collection.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 bg-primary-foreground text-foreground font-heading text-lg tracking-wider uppercase px-10 py-4 rounded-full hover:bg-primary-foreground/90 transition-all duration-300 shadow-2xl shadow-foreground/20"
              >
                Shop Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
