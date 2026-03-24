import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, X, Minus, Plus, ArrowRight, Loader2, Lock } from "lucide-react";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { storefrontApiRequest, PRODUCTS_QUERY } from "@/lib/shopify";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const FREE_SHIPPING_THRESHOLD = 1500;

const useRecommendedProducts = (cartItemIds: string[]) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    if (cartItemIds.length === 0) return;
    let cancelled = false;
    storefrontApiRequest(PRODUCTS_QUERY, { first: 10 }).then((data) => {
      if (cancelled || !data?.data?.products?.edges) return;
      const all: ShopifyProduct[] = data.data.products.edges;
      const filtered = all.filter((p) => !cartItemIds.includes(p.node.id));
      setProducts(filtered.slice(0, 4));
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [cartItemIds.join(",")]);

  return products;
};

/* ── Cart Item ─────────────────────────────────────── */
const CartItem = ({
  item,
  onClose,
  onUpdate,
  onRemove,
}: {
  item: ReturnType<typeof useCartStore.getState>["items"][0];
  onClose: () => void;
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) => {
  const img = item.product.node.images?.edges?.[0]?.node;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, height: 0, overflow: "hidden" }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 py-5 border-b border-border last:border-b-0"
    >
      {/* Image */}
      <Link
        to={`/product/${item.product.node.handle}`}
        onClick={onClose}
        className="w-[88px] h-[110px] bg-secondary/40 flex-shrink-0 overflow-hidden"
      >
        {img ? (
          <img
            src={img.url}
            alt={item.product.node.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
            <ShoppingBag className="h-6 w-6" />
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex justify-between items-start gap-2">
            <Link
              to={`/product/${item.product.node.handle}`}
              onClick={onClose}
              className="font-heading text-[13px] font-medium text-foreground leading-tight hover:underline underline-offset-2 line-clamp-2"
            >
              {item.product.node.title}
            </Link>
            <button
              onClick={() => onRemove(item.variantId)}
              className="p-0.5 text-muted-foreground/40 hover:text-foreground transition-colors flex-shrink-0"
              aria-label={`Remove ${item.product.node.title}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="font-body text-[11px] text-muted-foreground mt-1 tracking-wide">
            {item.selectedOptions.map(o => o.value).join(" / ")}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Qty */}
          <div className="flex items-center border border-border">
            <button
              onClick={() => onUpdate(item.variantId, item.quantity - 1)}
              className="h-8 w-8 flex items-center justify-center hover:bg-secondary/50 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-xs font-body text-foreground select-none">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdate(item.variantId, item.quantity + 1)}
              className="h-8 w-8 flex items-center justify-center hover:bg-secondary/50 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}
          <p className="font-body text-[13px] font-medium text-foreground tracking-wide">
            {item.price.currencyCode} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Recommended Strip ────────────────────────────── */
const RecommendedStrip = ({
  products,
  isLoading,
  onAdd,
  onClose,
}: {
  products: ShopifyProduct[];
  isLoading: boolean;
  onAdd: (p: ShopifyProduct) => void;
  onClose: () => void;
}) => {
  if (products.length === 0) return null;

  return (
    <div className="pt-5 mt-1">
      <p className="font-heading text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
        You may also like
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
        {products.slice(0, 4).map((product) => {
          const variant = product.node.variants.edges[0]?.node;
          const img = product.node.images.edges[0]?.node;
          if (!variant?.availableForSale) return null;

          return (
            <div key={product.node.id} className="flex-shrink-0 w-[100px] group">
              <Link
                to={`/product/${product.node.handle}`}
                onClick={onClose}
                className="block aspect-[3/4] bg-secondary/40 overflow-hidden mb-2"
              >
                {img && (
                  <img
                    src={img.url}
                    alt={product.node.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
              </Link>
              <p className="font-body text-[10px] text-foreground line-clamp-1 leading-tight">
                {product.node.title}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="font-body text-[10px] text-muted-foreground">
                  {variant.price.currencyCode} {parseFloat(variant.price.amount).toFixed(0)}
                </span>
                <button
                  onClick={() => onAdd(product)}
                  disabled={isLoading}
                  className="font-body text-[10px] text-primary hover:underline underline-offset-2 disabled:opacity-40"
                >
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Main Drawer ──────────────────────────────────── */
export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart, addItem } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const cartProductIds = items.map(i => i.product.node.id);
  const recommended = useRecommendedProducts(cartProductIds);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-cart", handler);
    return () => window.removeEventListener("open-cart", handler);
  }, []);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  const handleQuickAdd = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to bag", { description: product.node.title, position: "top-center" });
  };

  const remaining = FREE_SHIPPING_THRESHOLD - totalPrice;
  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative p-2 hover:text-primary transition-colors">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-[18px] w-[18px] rounded-full bg-foreground text-background text-[10px] font-body flex items-center justify-center leading-none">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-[420px] flex flex-col h-full bg-card border-l border-border p-0">
        {/* ─── Header ─── */}
        <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-border">
          <SheetHeader className="text-left">
            <SheetTitle className="font-heading text-lg tracking-[0.04em] uppercase text-foreground">
              Shopping Bag
              {totalItems > 0 && (
                <span className="text-muted-foreground font-normal ml-2">({totalItems})</span>
              )}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {totalItems === 0 ? "Your bag is empty" : `${totalItems} items in your bag`}
            </SheetDescription>
          </SheetHeader>

          {/* Free shipping bar */}
          {items.length > 0 && (
            <div className="mt-3">
              <div className="h-[2px] bg-border overflow-hidden">
                <motion.div
                  className="h-full bg-foreground"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="font-body text-[11px] text-muted-foreground mt-1.5">
                {remaining > 0 ? (
                  <>
                    <span className="text-foreground font-medium">EGP {remaining.toFixed(0)}</span> away from free shipping
                  </>
                ) : (
                  <span className="text-foreground">You qualify for complimentary shipping</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* ─── Body ─── */}
        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <ShoppingBag className="h-10 w-10 text-border mb-5 stroke-[1.2]" />
              <p className="font-heading text-sm tracking-[0.04em] uppercase text-foreground mb-1">
                Your bag is empty
              </p>
              <p className="font-body text-[13px] text-muted-foreground mb-6">
                Add items to get started
              </p>
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 font-heading text-[12px] tracking-[0.15em] uppercase text-foreground border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                Continue Shopping
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <>
              {/* Items list */}
              <div className="flex-1 overflow-y-auto px-6 min-h-0">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <CartItem
                      key={item.variantId}
                      item={item}
                      onClose={() => setIsOpen(false)}
                      onUpdate={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </AnimatePresence>

                {/* Recommended */}
                <RecommendedStrip
                  products={recommended}
                  isLoading={isLoading}
                  onAdd={handleQuickAdd}
                  onClose={() => setIsOpen(false)}
                />
              </div>

              {/* ─── Footer ─── */}
              <div className="flex-shrink-0 border-t border-border bg-card">
                {/* Promo hint */}
                <div className="px-6 py-2.5 bg-secondary/30 border-b border-border">
                  <p className="font-body text-[11px] text-center text-muted-foreground tracking-wide">
                    Use code <span className="font-medium text-foreground">WELCOME20</span> for 20% off your first order
                  </p>
                </div>

                <div className="px-6 pt-4 pb-5 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="font-heading text-[13px] tracking-[0.06em] uppercase text-foreground">
                      Subtotal
                    </span>
                    <span className="font-body text-[15px] font-medium text-foreground">
                      {items[0]?.price.currencyCode} {totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <p className="font-body text-[11px] text-muted-foreground leading-relaxed">
                    Shipping & taxes calculated at checkout
                  </p>

                  {/* Checkout CTA */}
                  <button
                    onClick={handleCheckout}
                    disabled={items.length === 0 || isLoading || isSyncing}
                    className="w-full bg-foreground text-background font-heading text-[12px] tracking-[0.15em] uppercase h-12 flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isLoading || isSyncing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Lock className="h-3 w-3" />
                        Checkout
                      </>
                    )}
                  </button>

                  {/* Continue shopping */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center font-body text-[11px] tracking-wide text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
