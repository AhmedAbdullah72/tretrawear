import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Marquee } from "@/components/Marquee";
import { SEO } from "@/components/SEO";

import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";

type Category = "all" | "wide-leg-sweatpants" | "t-shirt" | "best-sellers" | "new-drops";
type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "wide-leg-sweatpants", label: "Wide-Leg Sweatpants" },
  { value: "t-shirt", label: "T-Shirts" },
  { value: "best-sellers", label: "Best Sellers" },
  { value: "new-drops", label: "New Drops" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc", label: "A → Z" },
];

const NEW_DROPS_DAYS = 45;

function matchesCategory(product: ShopifyProduct, category: Category, allProducts: ShopifyProduct[]): boolean {
  if (category === "all") return true;
  const node = product.node;
  const title = node.title.toLowerCase();
  const type = (node.productType || "").toLowerCase();
  const tags = (node.tags || []).map((t) => t.toLowerCase());

  if (category === "wide-leg-sweatpants") {
    return title.includes("wide-leg") || title.includes("wide leg") || title.includes("sweatpants") || type.includes("sweatpants");
  }
  if (category === "t-shirt") {
    return title.includes("t-shirt") || title.includes("tee") || title.includes("tshirt") || type.includes("t-shirt");
  }
  if (category === "best-sellers") {
    // Only trust the explicit Shopify tag — no fuzzy fallback
    return tags.includes("best-seller");
  }
  if (category === "new-drops") {
    if (tags.some((t) => t.includes("new"))) return true;
    if (node.createdAt) {
      const days = (Date.now() - new Date(node.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      return days <= NEW_DROPS_DAYS;
    }
    return false;
  }
  return false;
}

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const initialCategory = (searchParams.get("category") as Category) || "all";
  const [category, setCategoryState] = useState<Category>(
    CATEGORIES.some((c) => c.value === initialCategory) ? initialCategory : "all"
  );
  const [sort, setSort] = useState<SortOption>("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const setCategory = (next: Category) => {
    setCategoryState(next);
    const params = new URLSearchParams(searchParams);
    if (next === "all") params.delete("category");
    else params.set("category", next);
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 20 });
        setProducts(data?.data?.products?.edges || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Only show categories that actually have products
  const availableCategories = useMemo(() => {
    if (!products.length) return CATEGORIES;
    return CATEGORIES.filter(
      (c) => c.value === "all" || products.some((p) => matchesCategory(p, c.value, products))
    );
  }, [products]);

  // If current category no longer has products, fall back to "all"
  useEffect(() => {
    if (!loading && !availableCategories.some((c) => c.value === category)) {
      setCategoryState("all");
    }
  }, [availableCategories, category, loading]);

  const filtered = useMemo(() => {
    let result = products.filter((p) => matchesCategory(p, category, products));

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
        break;
      case "price-desc":
        result.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
        break;
      case "name-asc":
        result.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
    }

    return result;
  }, [products, category, sort]);

  const activeFilterCount = (category !== "all" ? 1 : 0) + (sort !== "default" ? 1 : 0);

  const itemListSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "TRETRA Wear — All Products",
    itemListElement: filtered.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.tretrawear.com/product/${p.node.handle}`,
      name: p.node.title,
    })),
  }), [filtered]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Shop All Products | TRETRA Wear"
        description="Shop the full TRETRA Wear collection — oversized hoodies, half-zips, fur-lined essentials, DTF-printed tees, and wide-leg sweatpants. Free shipping over 1,500 EGP."
        path="/shop"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Shop All Products",
            url: "https://www.tretrawear.com/shop",
          },
          itemListSchema,
        ]}
      />
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <Navbar />
      <main id="main-content" role="main">
      {/* Shop Hero */}
      <section className="bg-foreground text-background" style={{ paddingTop: 'calc(64px + var(--banner-offset))' }}>
        <div className="py-2 bg-primary text-primary-foreground">
          <Marquee items={["FREE SHIPPING OVER 1,500 EGP", "NEW ARRIVALS", "PREMIUM FASHION"]} speed="slow" />
        </div>
        <div className="container py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-2">Browse</p>
            <h1 className="font-heading text-5xl md:text-6xl text-background">
              ALL <span className="text-primary">PRODUCTS</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {/* Desktop Categories */}
            <div className="hidden md:flex items-center gap-2">
              {availableCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`font-body text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                    category === cat.value
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden flex items-center gap-2 font-body text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-border text-foreground"
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="hidden md:flex items-center gap-2">
              <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="font-body text-xs bg-transparent border border-border rounded-full px-4 py-2 text-foreground focus:outline-none focus:border-foreground cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden mb-6"
              >
                <div className="bg-card border border-border rounded-xl p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm">Filters</span>
                    <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                      <X size={18} className="text-muted-foreground" />
                    </button>
                  </div>

                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-3">Category</p>
                    <div className="flex flex-wrap gap-2">
                      {availableCategories.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => setCategory(cat.value)}
                          className={`font-body text-xs tracking-wider uppercase px-3 py-1.5 rounded-full border transition-all duration-300 ${
                            category === cat.value
                              ? "bg-foreground text-background border-foreground"
                              : "bg-transparent text-muted-foreground border-border"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-3">Sort By</p>
                    <div className="flex flex-wrap gap-2">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setSort(opt.value)}
                          className={`font-body text-xs tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300 ${
                            sort === opt.value
                              ? "bg-foreground text-background border-foreground"
                              : "bg-transparent text-muted-foreground border-border"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => { setCategory("all"); setSort("default"); }}
                      className="font-body text-xs text-primary underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count */}
          {!loading && (
            <p className="font-body text-xs text-muted-foreground mb-6">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              {category !== "all" && (
                <span className="inline-flex items-center gap-1 ml-2 bg-secondary text-foreground px-2 py-0.5 rounded-full">
                  {CATEGORIES.find((c) => c.value === category)?.label}
                  <button onClick={() => setCategory("all")} aria-label="Remove category filter">
                    <X size={12} />
                  </button>
                </span>
              )}
            </p>
          )}

          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-xl border border-border">
              <p className="font-heading text-lg text-foreground mb-2">No products found</p>
              <p className="font-body text-sm text-muted-foreground">
                {category !== "all"
                  ? "Try a different category or clear filters."
                  : "Add products to your store to see them here."}
              </p>
              {category !== "all" && (
                <button
                  onClick={() => setCategory("all")}
                  className="mt-4 font-body text-sm text-primary underline"
                >
                  Show all products
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.node.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
