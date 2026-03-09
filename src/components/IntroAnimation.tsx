import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExiting(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const exitTimer = setTimeout(onComplete, 600);
      return () => clearTimeout(exitTimer);
    }
  }, [isExiting, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-foreground flex items-center justify-center overflow-hidden"
        >
          {/* Animated accent shapes */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.15, 0.08] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute w-[500px] h-[500px] rounded-full bg-primary blur-3xl"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.8, 1.4], opacity: [0, 0.1, 0.05] }}
            transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
            className="absolute w-[600px] h-[600px] rounded-full bg-primary/50 blur-3xl translate-x-32 -translate-y-20"
          />

          {/* Brand name */}
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.25em" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-6xl md:text-8xl lg:text-9xl text-primary-foreground"
            >
              TRETRA
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-4 h-px w-24 md:w-32 bg-primary origin-center"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/50 mt-5"
            >
              Wear Your Identity
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
