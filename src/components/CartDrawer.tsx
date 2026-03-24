import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
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
      const filtered = all.filter(
        (p) => !cartItemIds.includes(p.node.id)
      );
      setProducts(filtered.slice(0, 4));
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [cartItemIds.join(",")]);

  return products;
};

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

  const remaining = FREE_SHIPPING_THRESHOLD - totalPrice;
  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const qualifiesForFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative p-2 hover:text-primary transition-colors">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground border-0">
              {totalItems}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-card border-border p-0">
        {/* Header */}
        <div className="flex-shrink-0 px-5 pt-5 pb-3 border-b border-border">
          <SheetHeader className="text-left">
            <SheetTitle className="font-heading text-foreground flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart
              {totalItems > 0 && (
                <span className="text-xs font-body font-normal bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              )}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {totalItems === 0 ? "Your cart is empty" : `${totalItems} items in your cart`}
            </SheetDescription>
          </SheetHeader>

          {/* Free shipping progress — only when cart has items */}
          {items.length > 0 && (
            <div className="mt-2">
              <div className="h-1 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <p className="font-body text-[11px] text-muted-foreground text-center mt-1">
                {remaining > 0 ? (
                  <>Add <span className="font-semibold text-foreground">EGP {remaining.toFixed(0)}</span> for free shipping</>
                ) : (
                  <span className="text-primary font-semibold">✓ Free shipping!</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Cart items */}
        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center px-5">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground/40" />
                </div>
                <div>
                  <p className="font-heading text-foreground mb-1">Your cart is empty</p>
                  <p className="font-body text-sm text-muted-foreground">Discover our latest collection</p>
                </div>
                <Link
                  to="/shop"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-sm tracking-wider uppercase px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-5 py-3 min-h-0">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.variantId}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-3 p-3 mb-3 bg-background rounded-xl border border-border"
                    >
                      {/* Product image */}
                      <Link
                        to={`/product/${item.product.node.handle}`}
                        onClick={() => setIsOpen(false)}
                        className="w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0 group"
                      >
                        {item.product.node.images?.edges?.[0]?.node ? (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <ShoppingCart className="h-5 w-5" />
                          </div>
                        )}
                      </Link>

                      {/* Product info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <Link
                            to={`/product/${item.product.node.handle}`}
                            onClick={() => setIsOpen(false)}
                            className="font-heading font-medium text-sm text-foreground hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.product.node.title}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.selectedOptions.map(o => o.value).join(' · ')}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-0.5 bg-secondary/50 rounded-full p-0.5">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-heading font-semibold text-foreground">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="font-heading font-semibold text-sm text-foreground">
                            {item.price.currencyCode} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="self-start p-1 text-muted-foreground/50 hover:text-destructive transition-colors"
                        aria-label={`Remove ${item.product.node.title}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Recommended products — compact */}
                {recommended.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <h3 className="font-heading text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">Complete Your Look</h3>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {recommended.slice(0, 3).map((product) => {
                        const variant = product.node.variants.edges[0]?.node;
                        const img = product.node.images.edges[0]?.node;
                        if (!variant?.availableForSale) return null;
                        const handleQuickAdd = async () => {
                          await addItem({
                            product,
                            variantId: variant.id,
                            variantTitle: variant.title,
                            price: variant.price,
                            quantity: 1,
                            selectedOptions: variant.selectedOptions || [],
                          });
                          toast.success("Added!", { description: product.node.title, position: "top-center" });
                        };
                        return (
                          <div key={product.node.id} className="flex-shrink-0 flex items-center gap-2 bg-secondary/30 rounded-lg p-1.5 pr-3">
                            <Link
                              to={`/product/${product.node.handle}`}
                              onClick={() => setIsOpen(false)}
                              className="w-10 h-10 bg-secondary rounded-md overflow-hidden flex-shrink-0"
                            >
                              {img && <img src={img.url} alt={product.node.title} className="w-full h-full object-cover" loading="lazy" />}
                            </Link>
                            <div className="min-w-0">
                              <p className="font-heading text-[10px] text-foreground line-clamp-1 leading-tight">{product.node.title}</p>
                              <button
                                onClick={handleQuickAdd}
                                disabled={isLoading}
                                className="text-[10px] font-heading text-primary hover:underline disabled:opacity-50 mt-0.5"
                              >
                                + Add · {variant.price.currencyCode} {parseFloat(variant.price.amount).toFixed(0)}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer — clean & compact */}
              <div className="flex-shrink-0 px-5 pb-4 pt-3 border-t border-border bg-card space-y-2.5">
                {/* Total + discount hint inline */}
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-heading text-sm font-semibold text-foreground">Total</span>
                    <span className="font-body text-[10px] text-muted-foreground ml-2">
                      Code <span className="text-primary font-medium">WELCOME20</span> at checkout
                    </span>
                  </div>
                  <span className="font-heading text-base font-bold text-foreground">{items[0]?.price.currencyCode} {totalPrice.toFixed(2)}</span>
                </div>

                {/* Checkout button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-11 text-sm font-heading tracking-wider uppercase"
                  size="lg"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Checkout
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                    </>
                  )}
                </Button>

                {/* Trust signals — single line */}
                <p className="text-center font-body text-[10px] text-muted-foreground/50">
                  Secure Payment · 2-5 Day Delivery · 14-Day Exchange
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
