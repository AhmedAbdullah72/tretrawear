import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { ProductGridSkeleton } from "./ProductCardSkeleton";

const isPurchasable = (p: ShopifyProduct) =>
  (p.node.variants?.edges || []).some((v) => v.node.availableForSale);

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 12 });
        setProducts(data?.data?.products?.edges || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Prime homepage space is reserved for products that can actually be bought.
  const available = useMemo(() => products.filter(isPurchasable).slice(0, 6), [products]);

  return (
    <section id="featured" className="section-padding bg-background scroll-mt-24">
      <div className="container">
        <div className="flex items-end justify-between mb-6 md:mb-10">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-2">Summer '26</p>
            <h2 className="font-heading text-2xl md:text-4xl text-foreground">
              SHOP THE <span className="text-primary">COLLECTION</span>
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
          <ProductGridSkeleton count={3} />
        ) : available.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-xl bg-card">
            <p className="font-heading text-2xl text-muted-foreground/30 mb-2">RESTOCKING SOON</p>
            <Link to="/shop" className="font-body text-sm text-primary underline">
              Browse the full catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {available.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}

        <Link
          to="/shop"
          className="md:hidden flex items-center justify-center gap-2 mt-6 font-heading text-sm text-primary"
        >
          VIEW ALL PRODUCTS
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
