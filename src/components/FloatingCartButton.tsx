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
          className="fixed bottom-20 right-6 z-40"
        >
          <button
            onClick={() => {
              // Trigger the cart drawer by dispatching a custom event
              window.dispatchEvent(new CustomEvent("open-cart"));
            }}
            className="relative bg-primary text-primary-foreground p-4 rounded-full shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors duration-200"
            aria-label={`View cart with ${totalItems} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] font-heading w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
