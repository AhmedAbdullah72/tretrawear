import { useEffect, useState } from "react";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  currentHandle: string;
}

export const RelatedProducts = ({ currentHandle }: RelatedProductsProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 5 });
        const all: ShopifyProduct[] = data?.data?.products?.edges || [];
        setProducts(all.filter((p) => p.node.handle !== currentHandle).slice(0, 4));
      } catch (e) {
        console.error("Failed to fetch related products:", e);
      }
    };
    fetch();
  }, [currentHandle]);

  if (products.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <div className="container">
        <div
          className="mb-8"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-2">Complete The Look</p>
          <h2 className="font-display text-3xl text-foreground">
            YOU MAY ALSO <span className="text-primary">LIKE</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <div
              key={product.node.id}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
