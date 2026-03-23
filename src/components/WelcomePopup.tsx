import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("welcome_popup_seen")) return;
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("welcome_popup_seen", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-card rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent */}
            <div className="bg-primary py-6 px-6 text-center">
              <Sparkles className="h-8 w-8 text-primary-foreground mx-auto mb-3" />
              <h2 className="font-heading text-3xl text-primary-foreground leading-tight">
                20% OFF
              </h2>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-primary-foreground/80 mt-1">
                New Collection
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
              aria-label="Close popup"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content */}
            <div className="p-6 text-center space-y-4">
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Welcome to <span className="font-semibold text-foreground">Tretra</span>! Grab 20% off wide-leg sweatpants, oversized tees & everyday basics.
              </p>

              <Link
                to="/shop"
                onClick={handleClose}
                className="inline-flex items-center justify-center w-full gap-2 bg-primary text-primary-foreground font-heading text-sm tracking-[0.15em] uppercase px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all duration-300"
              >
                Shop the Offer
              </Link>

              <button
                onClick={handleClose}
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                No thanks, I'll browse
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
