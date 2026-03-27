import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, ShieldCheck, Truck, RotateCcw, Tag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FREE_SHIPPING_THRESHOLD = 1500;

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

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
        <button className="relative p-2 hover:text-primary transition-colors" aria-label="Shopping cart">
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
            <div className="mt-3 bg-background rounded-lg p-3">
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <p className="font-body text-xs text-muted-foreground text-center mt-1.5">
                {remaining > 0 ? (
                  <>Add <span className="font-semibold text-foreground">EGP {remaining.toFixed(0)}</span> more for <span className="font-semibold text-primary">free shipping</span></>
                ) : (
                  <span className="text-primary font-semibold">🎉 You qualify for free shipping!</span>
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
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-5 pb-5 pt-3 border-t border-border bg-card space-y-3">
                {/* Discount hint */}
                <div className="flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-lg px-3 py-2">
                  <Tag className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  <p className="font-body text-xs text-muted-foreground">
                    Use code <span className="font-semibold text-primary">WELCOME20</span> for 20% off at checkout
                  </p>
                </div>

                {/* Order summary */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-body text-muted-foreground">Subtotal</span>
                    <span className="font-body text-foreground">{items[0]?.price.currencyCode} {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-body text-muted-foreground">Shipping</span>
                    <span className={`font-body ${qualifiesForFreeShipping ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                      {qualifiesForFreeShipping ? "Free" : "Calculated at checkout"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="font-heading text-base font-semibold text-foreground">Total</span>
                  <span className="font-heading text-lg font-bold text-foreground">{items[0]?.price.currencyCode} {totalPrice.toFixed(2)}</span>
                </div>

                {/* Checkout button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-sm font-heading tracking-wider uppercase shadow-lg shadow-primary/20"
                  size="lg"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Secure Checkout
                      <ExternalLink className="w-3.5 h-3.5 ml-2" />
                    </>
                  )}
                </Button>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-4 pt-1">
                  <div className="flex items-center gap-1 text-muted-foreground/60">
                    <ShieldCheck className="h-3 w-3" />
                    <span className="font-body text-[10px]">Secure</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground/60">
                    <Truck className="h-3 w-3" />
                    <span className="font-body text-[10px]">2-5 Day Delivery</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground/60">
                    <RotateCcw className="h-3 w-3" />
                    <span className="font-body text-[10px]">14-Day Exchange</span>
                  </div>
                </div>

                {/* Continue shopping */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center font-body text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
