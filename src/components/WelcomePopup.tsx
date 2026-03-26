import { useState, useEffect, createContext, useContext } from "react";
import { X, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Context to let Navbar know the banner height
export const WelcomeBannerContext = createContext({ bannerVisible: false });

export const useWelcomeBanner = () => useContext(WelcomeBannerContext);

export const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("welcome_banner_dismissed")) return;
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("welcome_banner_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-[55] overflow-hidden"
        >
          <div className="bg-primary text-primary-foreground">
            <div className="container flex items-center justify-center gap-3 py-2.5 px-4 relative">
              <Tag className="h-3.5 w-3.5 flex-shrink-0 hidden sm:block" />
              <p className="font-body text-xs sm:text-sm text-center">
                Welcome! Use code{" "}
                <span className="font-heading tracking-wider">WELCOME20</span>{" "}
                for 20% off your first order
              </p>
              <Link
                to="/shop"
                onClick={handleDismiss}
                className="font-heading text-xs tracking-wider uppercase bg-primary-foreground text-primary px-3 py-1 rounded-full hover:bg-primary-foreground/90 transition-colors flex-shrink-0 hidden sm:inline-flex"
              >
                Shop Now
              </Link>
              <button
                onClick={handleDismiss}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
                aria-label="Dismiss welcome banner"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const WELCOME_BANNER_HEIGHT = 40; // px, approximate height of the banner
