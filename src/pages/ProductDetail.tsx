import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { Loader2, ChevronLeft, ShieldCheck, Minus, Plus, Ruler, Star } from "lucide-react";
import { SizeGuide } from "@/components/SizeGuide";
import { SizeRecommender } from "@/components/SizeRecommender";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getProductCopy } from "@/lib/productCopy";
import { ProductDetailTabs } from "@/components/ProductCopySections";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { StockUrgencyBadge } from "@/components/StockUrgencyBadge";
import { ProductReviews, getAverageRating, getTotalReviews } from "@/components/ProductReviews";
import { RelatedProducts } from "@/components/RelatedProducts";
import { CompleteTheLook } from "@/components/CompleteTheLook";
import { DeliveryEstimate } from "@/components/DeliveryEstimate";
import { ProductBundles } from "@/components/ProductBundles";
const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        setProduct(data?.data?.productByHandle || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (handle) fetchProduct();
    
    setSelectedOptions({});
    setQuantity(1);
  }, [handle]);

  // SEO: update document title & meta + JSON-LD
  useEffect(() => {
    if (!product) return;
    const copy = getProductCopy(product.title, product.handle);
    document.title = copy.seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", copy.seo.metaDescription);

    const variant = product.variants.edges[0]?.node;
    // Dynamic canonical URL
    const canonicalUrl = `${window.location.origin}/product/${product.handle}`;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.description || copy.seo.metaDescription,
      image: product.images.edges.map(e => e.node.url),
      brand: { "@type": "Brand", name: "TRETRA" },
      offers: {
        "@type": "Offer",
        url: canonicalUrl,
        priceCurrency: variant?.price.currencyCode || "EGP",
        price: variant?.price.amount || "0",
        availability: variant?.availableForSale
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: window.location.origin },
        { "@type": "ListItem", position: 2, name: "Shop", item: `${window.location.origin}/shop` },
        { "@type": "ListItem", position: 3, name: product.title, item: canonicalUrl },
      ],
    };

    let script = document.getElementById("product-jsonld") as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = "product-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify([schema, breadcrumbSchema]);

    return () => {
      script.remove();
      canonical.remove();
    };
  }, [product]);

  // Sticky bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    const btn = document.getElementById("main-add-to-cart");
    if (btn) observer.observe(btn);
    return () => observer.disconnect();
  }, [product]);

  // Initialize selectedOptions from first variant
  useEffect(() => {
    if (product && Object.keys(selectedOptions).length === 0) {
      const firstVariant = product.variants.edges[0]?.node;
      if (firstVariant) {
        const opts: Record<string, string> = {};
        firstVariant.selectedOptions.forEach(o => { opts[o.name] = o.value; });
        setSelectedOptions(opts);
      }
    }
  }, [product]);

  // Find the variant matching all selected options
  const selectedVariant = product
    ? (product.variants.edges.find(v =>
        Object.entries(selectedOptions).every(([name, value]) =>
          v.node.selectedOptions.some(o => o.name === name && o.value === value)
        )
      )?.node || product.variants.edges[0]?.node)
    : undefined;

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    const variant = selectedVariant;
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title, position: "top-center" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center py-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-foreground font-heading text-lg">Product not found</p>
          <Link to="/shop" className="text-primary underline mt-4 inline-block font-body">Back to shop</Link>
        </div>
      </div>
    );
  }

  const images = product.images.edges;
  const copy = getProductCopy(product.title, product.handle);
  const avgRating = getAverageRating(handle || "");
  const totalReviews = getTotalReviews(handle || "");

  // Find gallery image matching selected color by filename or variant image
  const selectedColor = selectedVariant?.selectedOptions?.find(o => o.name.toLowerCase() === "color")?.value;
  const variantImageIndex = (() => {
    // Primary: match color name in image filename/URL
    if (selectedColor) {
      const colorLower = selectedColor.toLowerCase();
      const idx = images.findIndex(img => img.node.url.toLowerCase().includes(colorLower));
      if (idx >= 0) return idx;
    }
    // Fallback: variant's assigned image
    const variantImageUrl = selectedVariant?.image?.url;
    if (variantImageUrl) {
      const idx = images.findIndex(img => img.node.url === variantImageUrl);
      if (idx >= 0) return idx;
    }
    return -1;
  })();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="bg-primary text-primary-foreground" style={{ paddingTop: 'calc(64px + var(--banner-offset))' }}>
        <div className="py-2">
          <Marquee items={["FREE SHIPPING OVER 1,500 EGP", "14-DAY RETURNS", "PREMIUM QUALITY"]} speed="slow" />
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <Link to="/shop" className="inline-flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ChevronLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductImageGallery
              images={images}
              imageAlts={copy.imageAlts}
              productTitle={product.title}
              scrollToIndex={variantImageIndex >= 0 ? variantImageIndex : undefined}
            />
          </motion.div>

          {/* === RESTRUCTURED INFO PANEL === */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {/* 1. TITLE + URGENCY */}
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-heading text-3xl md:text-4xl text-foreground">{product.title}</h1>
                <StockUrgencyBadge
                  handle={product.handle}
                  availableForSale={selectedVariant?.availableForSale}
                  variant="pdp"
                />
              </div>
              {/* Subtitle hook — fabric, fit, use */}
              <p className="font-body text-sm text-muted-foreground mt-1.5 tracking-wide uppercase">
                {copy.subtitle}
              </p>
            </div>

            {/* 2. PRICE */}
            <p className="font-heading text-2xl text-primary">
              {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
            </p>

            {/* 3. INLINE REVIEWS — clickable to scroll */}
            <button
              onClick={() => document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 group"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/20"}`}
                  />
                ))}
              </div>
              <span className="font-body text-sm text-muted-foreground group-hover:text-primary transition-colors">
                {avgRating} ({totalReviews} reviews)
              </span>
            </button>

            {/* 4. HOOK */}
            <p className="font-heading text-base text-foreground italic border-l-2 border-primary pl-4">
              {copy.hook}
            </p>

            {/* 5. VARIANTS + SIZE GUIDE */}
            {product.options.map((option) => (
              <div key={option.name}>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-heading text-xs tracking-wider text-foreground">{option.name}</label>
                  {option.name.toLowerCase() === "size" && (
                    <button
                      onClick={() => {
                        const dialog = document.getElementById("size-guide-trigger");
                        if (dialog) dialog.click();
                      }}
                      className="inline-flex items-center gap-1.5 font-heading text-xs text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-lg"
                    >
                      <Ruler className="h-3.5 w-3.5" />
                      Find Your Size
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const isSelected = selectedOptions[option.name] === value;
                    // Check if this option value has any available variant given other selections
                    const hasVariant = product.variants.edges.some(v =>
                      v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                    );
                    return (
                      <button
                        key={value}
                        onClick={() => {
                          if (!hasVariant) return;
                          setSelectedOptions(prev => ({ ...prev, [option.name]: value }));
                        }}
                        disabled={!hasVariant}
                        className={`px-4 py-2 text-sm font-body rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : hasVariant
                              ? "border-border text-foreground hover:border-primary/40 bg-card"
                              : "border-border text-muted-foreground/40 bg-muted cursor-not-allowed line-through"
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
                {option.name.toLowerCase() === "size" && (
                  <>
                    <div className="hidden"><SizeGuide /></div>
                    <div className="mt-3">
                      <SizeRecommender onSizeSelect={(size) => {
                        setSelectedOptions(prev => ({ ...prev, Size: size }));
                      }} />
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* 6. QUANTITY */}
            <div>
              <label className="font-heading text-xs tracking-wider text-foreground block mb-2">Quantity</label>
              <div className="inline-flex items-center border border-border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-body text-sm text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 7. ADD TO CART — bigger, bolder */}
            <Button
              id="main-add-to-cart"
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant?.availableForSale}
              className="w-full bg-primary text-primary-foreground font-heading text-base tracking-wider uppercase py-7 rounded-xl hover:bg-primary/90 shadow-xl shadow-primary/25 transition-all duration-300"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : !selectedVariant?.availableForSale ? (
                "Sold Out"
              ) : (
                "Add to Cart"
              )}
            </Button>

            {/* 7.5 DELIVERY ESTIMATE + TRUST SIGNALS (combined) */}
            <DeliveryEstimate />

            {/* 9. ALL DETAILS — compact tabs */}
            <ProductDetailTabs copy={copy} />

            {/* Security signal */}
            <div className="flex items-center justify-center gap-2 p-3 bg-card rounded-lg border border-border">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <p className="font-body text-xs text-muted-foreground">Secure checkout · Encrypted payments · Your data is safe</p>
            </div>
          </motion.div>
        </div>
      </div>

      <section id="reviews-section" className="max-w-7xl mx-auto px-4 py-12 md:py-16 border-t border-border">
        <ProductReviews handle={handle || ""} />
      </section>

      <ProductBundles
        currentHandle={handle || ""}
        currentTitle={product.title}
        currentPrice={parseFloat(selectedVariant?.price.amount || "0")}
        currencyCode={selectedVariant?.price.currencyCode || "EGP"}
      />

      <CompleteTheLook currentHandle={handle || ""} currentTitle={product.title} />
      <RelatedProducts currentHandle={handle || ""} />

      {/* Sticky Add to Cart */}
      {showStickyBar && selectedVariant && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border safe-bottom"
        >
          <div className="container flex items-center gap-4 py-3">
            {images[0]?.node && (
              <div className="hidden md:block w-12 h-12 rounded-lg overflow-hidden border border-border flex-shrink-0">
                <img src={images[0].node.url} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-heading text-sm text-foreground truncate">{product.title}</p>
              <p className="font-heading text-sm text-primary">
                {selectedVariant.price.currencyCode} {parseFloat(selectedVariant.price.amount).toFixed(2)}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {selectedVariant.selectedOptions?.map(opt => (
                <span key={opt.name} className="font-body text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                  {opt.value}
                </span>
              ))}
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant.availableForSale}
              className="bg-primary text-primary-foreground font-heading text-xs tracking-wider uppercase px-6 md:px-8 py-5 rounded-xl hover:bg-primary/90 flex-shrink-0 shadow-lg shadow-primary/20"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : !selectedVariant.availableForSale ? "Sold Out" : "Add to Cart"}
            </Button>
          </div>
        </motion.div>
      )}

      <Footer hideCta />
    </div>
  );
};

export default ProductDetail;