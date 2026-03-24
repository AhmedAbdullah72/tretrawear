import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingCartButton = () => {
  const items = useCartStore(state => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-cart"))}
            className="relative bg-foreground text-background p-4 shadow-xl hover:bg-foreground/90 transition-colors duration-200"
            aria-label={`View bag with ${totalItems} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-body w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
