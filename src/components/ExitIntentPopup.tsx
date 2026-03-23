import { useState, useEffect, useCallback } from "react";
import { X, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !sessionStorage.getItem("exit_popup_seen")) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("exit_popup_seen", "true");
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
            initial={{ opacity: 0, scale: 0.85, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-card rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-accent py-6 px-6 text-center">
              <Gift className="h-8 w-8 text-accent-foreground mx-auto mb-3" />
              <h2 className="font-heading text-2xl text-accent-foreground leading-tight">
                Wait! Don't Leave Yet 🎁
              </h2>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-accent-foreground/80 mt-1">
                Exclusive offer just for you
              </p>
            </div>

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/30 transition-colors"
              aria-label="Close popup"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 text-center space-y-4">
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Get <span className="font-semibold text-foreground">15% OFF</span> your first order! Use code <span className="font-heading text-primary">STAY15</span> at checkout.
              </p>

              <Link
                to="/shop"
                onClick={handleClose}
                className="inline-flex items-center justify-center w-full gap-2 bg-primary text-primary-foreground font-heading text-sm tracking-[0.15em] uppercase px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all duration-300"
              >
                Claim My Discount
              </Link>

              <button
                onClick={handleClose}
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                No thanks, I'll pass
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
