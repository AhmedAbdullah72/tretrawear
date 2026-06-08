import { useEffect, useState } from "react";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Plus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Maps product categories to complementary categories for cross-sell
const pairings: Record<string, string[]> = {
  sweatpants: ["oversized", "basic"],
  "wide-leg": ["oversized", "basic"],
  oversized: ["sweatpants", "wide-leg", "basic"],
  basic: ["sweatpants", "wide-leg", "oversized"],
  hoodie: ["sweatpants", "wide-leg", "basic"],
};

function findPairKey(handle: string, title: string): string | null {
  const lower = (handle + " " + title).toLowerCase();
  for (const key of Object.keys(pairings)) {
    if (lower.includes(key)) return key;
  }
  return null;
}

interface CompleteTheLookProps {
  currentHandle: string;
  currentTitle: string;
}

export const CompleteTheLook = ({ currentHandle, currentTitle }: CompleteTheLookProps) => {
  const [suggestions, setSuggestions] = useState<ShopifyProduct[]>([]);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    const fetchPairings = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 12 });
        const all: ShopifyProduct[] = data?.data?.products?.edges || [];
        const pairKey = findPairKey(currentHandle, currentTitle);

        if (!pairKey) {
          // Show any 2 non-current products
          setSuggestions(all.filter((p) => p.node.handle !== currentHandle).slice(0, 2));
          return;
        }

        const targets = pairings[pairKey] || [];
        const matched = all.filter((p) => {
          if (p.node.handle === currentHandle) return false;
          const lower = (p.node.handle + " " + p.node.title).toLowerCase();
          return targets.some((t) => lower.includes(t));
        });

        setSuggestions(matched.slice(0, 2));
      } catch (e) {
        console.error("Failed to fetch pairings:", e);
      }
    };
    fetchPairings();
  }, [currentHandle, currentTitle]);

  if (suggestions.length === 0) return null;

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
    toast.success("Added to cart", {
      description: product.node.title,
      position: "top-center",
    });
  };

  return (
    <section className="py-10 md:py-14 border-t border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-2">
            Wear It With
          </p>
          <h2 className="font-heading text-2xl md:text-3xl text-foreground">
            COMPLETE THE <span className="text-primary">LOOK</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            These go perfectly together — trust us, your future self will thank you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {suggestions.map((product, i) => {
            const image = product.node.images.edges[0]?.node;
            const price = product.node.priceRange.minVariantPrice;

            return (
              <motion.div
                key={product.node.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300"
              >
                <Link
                  to={`/product/${product.node.handle}`}
                  className="block aspect-square overflow-hidden bg-muted relative"
                >
                  {image && (
                    <img
                      src={image.url}
                      alt={image.altText || product.node.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.node.handle}`}>
                    <h3 className="font-heading text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                      {product.node.title}
                    </h3>
                  </Link>
                  <p className="font-heading text-sm text-primary mb-3">
                    {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                  </p>
                  <Button
                    onClick={() => handleQuickAdd(product)}
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                    className="w-full font-heading text-xs tracking-wider uppercase gap-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Quick Add
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
