import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useScrollAnimation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 8 });
        setProducts(data?.data?.products?.edges || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="section-padding" ref={ref}>
      <div className="container">
        <div className="flex items-end justify-between mb-12 animate-on-scroll">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Our Collection</p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground">
              BEST <span className="text-primary">SELLERS</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 border border-border bg-card">
            <p className="font-heading text-2xl text-muted-foreground/30 mb-2">NO PRODUCTS YET</p>
            <p className="text-muted-foreground font-body text-sm">
              Add products to your Shopify store to display them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-on-scroll">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}

        <Link
          to="/shop"
          className="md:hidden flex items-center justify-center gap-2 mt-8 font-heading text-sm text-primary"
        >
          VIEW ALL PRODUCTS
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
