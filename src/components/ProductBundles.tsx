import { useEffect, useState } from "react";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Package, Copy, Check, ShoppingBag, Tag, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Countdown hook — resets every 6 hours from midnight
function useBundleCountdown() {
  const getTimeLeft = () => {
    const now = new Date();
    const hours = now.getHours();
    const nextReset = new Date(now);
    const cycleHour = Math.ceil((hours + 1) / 6) * 6;
    nextReset.setHours(cycleHour, 0, 0, 0);
    const diff = Math.max(0, nextReset.getTime() - now.getTime());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { h, m, s };
  };
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Bundle tier definitions with real Shopify discount codes
const quantityTiers = [
  { qty: 2, discount: 10, code: "BUNDLE2", label: "Buy 2", saving: "Save 10%" },
  { qty: 3, discount: 15, code: "BUNDLE3", label: "Buy 3", saving: "Save 15%" },
];

// Category pairings for mix & match
const mixMatchPairings: Record<string, string[]> = {
  sweatpants: ["oversized", "basic"],
  "wide-leg": ["oversized", "basic"],
  oversized: ["sweatpants", "wide-leg"],
  basic: ["sweatpants", "wide-leg"],
  hoodie: ["sweatpants", "wide-leg", "basic"],
};

function getCategoryKey(handle: string, title: string): string | null {
  const lower = (handle + " " + title).toLowerCase();
  for (const key of Object.keys(mixMatchPairings)) {
    if (lower.includes(key)) return key;
  }
  return null;
}

interface ProductBundlesProps {
  currentHandle: string;
  currentTitle: string;
  currentPrice: number;
  currencyCode: string;
}

export const ProductBundles = ({
  currentHandle,
  currentTitle,
  currentPrice,
  currencyCode,
}: ProductBundlesProps) => {
  const [mixProducts, setMixProducts] = useState<ShopifyProduct[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 20 });
        const all: ShopifyProduct[] = data?.data?.products?.edges || [];
        const catKey = getCategoryKey(currentHandle, currentTitle);
        if (!catKey) return;
        const targets = mixMatchPairings[catKey] || [];
        const matches = all.filter((p) => {
          if (p.node.handle === currentHandle) return false;
          const lower = (p.node.handle + " " + p.node.title).toLowerCase();
          return targets.some((t) => lower.includes(t));
        });
        setMixProducts(matches.slice(0, 3));
      } catch (e) {
        console.error("Failed to load mix products:", e);
      }
    };
    fetchProducts();
  }, [currentHandle, currentTitle]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Discount code copied!", {
      description: `Use "${code}" at checkout`,
      position: "top-center",
    });
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleAddMixItem = async (product: ShopifyProduct) => {
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
    toast.success("Added to cart", {
      description: product.node.title,
      position: "top-center",
    });
  };

  const countdown = useBundleCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Section Header + Countdown */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-primary" />
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
              Bundle & Save
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-lg">
            <Clock className="h-4 w-4" />
            <span className="font-heading text-sm tracking-wider">
              Ends in {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
            </span>
          </div>
        </div>

        {/* Quantity Discount Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {quantityTiers.map((tier) => {
            const totalOriginal = currentPrice * tier.qty;
            const totalDiscounted = totalOriginal * (1 - tier.discount / 100);
            const youSave = totalOriginal - totalDiscounted;

            return (
              <motion.div
                key={tier.code}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-xl border-2 border-primary/20 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Best value badge for highest tier */}
                {tier.qty === 3 && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground font-heading text-[10px] tracking-wider uppercase px-3 py-1 rounded-bl-lg">
                    Best Value
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-heading text-lg text-foreground">
                      {tier.label}{" "}
                      <span className="text-primary">{tier.saving}</span>
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-2xl text-primary">
                        {currencyCode}{" "}
                        {totalDiscounted.toFixed(2)}
                      </span>
                      <span className="font-body text-sm text-muted-foreground line-through">
                        {currencyCode} {totalOriginal.toFixed(2)}
                      </span>
                    </div>
                    <p className="font-body text-xs text-muted-foreground">
                      You save {currencyCode} {youSave.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Tag className="h-8 w-8 text-primary/40" />
                  </div>
                </div>

                {/* Discount Code */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 bg-secondary/80 rounded-lg px-3 py-2 flex items-center justify-between">
                    <span className="font-heading text-sm tracking-wider text-foreground">
                      {tier.code}
                    </span>
                    <button
                      onClick={() => handleCopyCode(tier.code)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      {copiedCode === tier.code ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <span className="font-body text-xs text-muted-foreground whitespace-nowrap">
                    Use at checkout
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mix & Match Section */}
        {mixProducts.length > 0 && (
          <div>
            <h3 className="font-heading text-lg text-foreground mb-4 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Mix & Match — Pair with
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mixProducts.map((product) => {
                const variant = product.node.variants.edges[0]?.node;
                const price = parseFloat(variant?.price.amount || "0");
                const image = product.node.images.edges[0]?.node;
                const bundlePrice = (currentPrice + price) * 0.9;

                return (
                  <motion.div
                    key={product.node.handle}
                    whileHover={{ y: -4 }}
                    className="rounded-xl border border-border bg-card overflow-hidden group"
                  >
                    <Link to={`/product/${product.node.handle}`}>
                      <div className="aspect-square overflow-hidden bg-secondary/30">
                        {image && (
                          <img
                            src={image.url}
                            alt={image.altText || product.node.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </Link>
                    <div className="p-3 space-y-2">
                      <Link to={`/product/${product.node.handle}`}>
                        <p className="font-heading text-sm text-foreground truncate group-hover:text-primary transition-colors">
                          {product.node.title}
                        </p>
                      </Link>
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading text-sm text-primary">
                          {currencyCode} {price.toFixed(2)}
                        </span>
                      </div>
                      <div className="bg-primary/10 rounded-lg px-2 py-1.5">
                        <p className="font-body text-[11px] text-primary text-center">
                          Bundle: {currencyCode} {bundlePrice.toFixed(2)}{" "}
                          <span className="line-through text-muted-foreground">
                            {currencyCode} {(currentPrice + price).toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <Button
                        onClick={() => handleAddMixItem(product)}
                        disabled={isLoading}
                        variant="outline"
                        size="sm"
                        className="w-full font-heading text-xs tracking-wider uppercase"
                      >
                        Add to Bundle
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <p className="font-body text-xs text-muted-foreground text-center mt-4">
              Add 2+ items and use code <button onClick={() => handleCopyCode("BUNDLE2")} className="font-heading text-primary hover:underline cursor-pointer">BUNDLE2</button> for 10% off, or <button onClick={() => handleCopyCode("BUNDLE3")} className="font-heading text-primary hover:underline cursor-pointer">BUNDLE3</button> for 15% off 3+ items
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
};
