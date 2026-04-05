import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const FloatingCartButton = () => {
  const items = useCartStore(state => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-20 right-6 z-40 animate-scale-in">
      <button
        onClick={() => {
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
    </div>
  );
};
