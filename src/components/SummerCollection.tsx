import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const SummerCollection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 6, query: "tag:summer" });
        setProducts(data?.data?.products?.edges || []);
      } catch (error) {
        console.error("Failed to fetch summer products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section className="section-padding bg-foreground text-primary-foreground">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-6 md:mb-10"
        >
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">New Arrivals</p>
            <h2 className="font-heading text-2xl md:text-4xl text-primary-foreground">
              SUMMER <span className="text-primary">2026</span>
            </h2>
            <p className="font-body text-sm text-primary-foreground/50 mt-3 max-w-md">
              Wide-leg sweatpants, oversized tees & everyday basics — engineered for the heat.
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-2 font-body text-sm text-primary-foreground/60 hover:text-primary transition-colors group"
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.node.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <Link
          to="/shop"
          className="md:hidden flex items-center justify-center gap-2 mt-8 font-heading text-sm text-primary"
        >
          VIEW ALL SUMMER
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
