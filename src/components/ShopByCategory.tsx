import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { storefrontApiRequest, COLLECTIONS_QUERY, type ShopifyCollection } from "@/lib/shopify";

const bgClasses = ["bg-secondary", "bg-muted", "bg-surface", "bg-secondary"];

export const ShopByCategory = () => {
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await storefrontApiRequest(COLLECTIONS_QUERY, { first: 8 });
        const edges: ShopifyCollection[] = data?.data?.collections?.edges || [];
        // Only show collections that have an image
        setCollections(edges.filter((c) => c.node.image?.url).slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch collections:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!loading && collections.length === 0) return null;

  return (
    <section className="section-padding bg-card overflow-hidden" aria-labelledby="category-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-10"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-2">Find Your Fit</p>
          <h2 id="category-heading" className="font-heading text-2xl md:text-4xl text-foreground">
            EXPLORE BY <span className="text-primary">STYLE</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-secondary/40 animate-pulse" />
              ))
            : collections.map((col, i) => (
            <motion.div
              key={col.node.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/shop?category=${col.node.handle}`}
                className="group block rounded-2xl overflow-hidden relative"
                aria-label={`Shop ${col.node.title}`}
              >
                <div className={`${bgClasses[i % bgClasses.length]} aspect-square overflow-hidden transition-all duration-500`}>
                  <img
                    src={col.node.image!.url}
                    alt={col.node.image!.altText || col.node.title}
                    width={600}
                    height={800}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-transparent p-6 pt-24">
                  <h3 className="font-heading text-xl text-primary-foreground mb-1">{col.node.title}</h3>
                  <div className="flex items-center justify-between">
                    <p className="font-body text-xs text-primary-foreground/60">Shop the collection</p>
                    <span className="bg-primary text-primary-foreground font-heading text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400" aria-hidden="true">
                      Shop
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
