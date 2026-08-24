import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { Loader2, ChevronRight, Star } from "lucide-react";
import { ProductDetailSkeleton } from "@/components/ProductDetailSkeleton";
import { SizeGuide } from "@/components/SizeGuide";
import { SizeRecommender } from "@/components/SizeRecommender";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getProductCopy } from "@/lib/productCopy";
import { ProductAccordions } from "@/components/ProductAccordions";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import {
  ProductReviews,
  getAverageRating,
  getTotalReviews,
  hasGenuineReviews,
} from "@/components/ProductReviews";
import { RelatedProducts } from "@/components/RelatedProducts";
import { CompleteTheLook } from "@/components/CompleteTheLook";
import { DeliveryEstimate } from "@/components/DeliveryEstimate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";

/** Short, human fit descriptor pulled from the existing product copy. */
const getFitLabel = (text: string): string => {
  const match = text.match(/(oversized|boxy fit|boxy|relaxed|wide[- ]leg|regular)/i);
  if (!match) return "True to size";
  const word = match[0].toLowerCase().replace("wide leg", "wide-leg");
  const label = word.charAt(0).toUpperCase() + word.slice(1);
  return /fit$/i.test(label) ? label : `${label} fit`;
};

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [missingOption, setMissingOption] = useState<string | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  // Product Details may start open on desktop only; mobile keeps all collapsed.
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
  );
  const optionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
    setMissingOption(null);
  }, [handle]);

  // Only auto-select an option that has exactly one legitimate value. Anything
  // with a real choice stays unselected so the customer makes it deliberately.
  useEffect(() => {
    if (!product) return;
    const preset: Record<string, string> = {};
    product.options.forEach((option) => {
      if (option.values.length === 1) preset[option.name] = option.values[0];
    });
    setSelectedOptions(preset);
  }, [product]);

  const variants = useMemo(
    () => (product ? product.variants.edges.map((e) => e.node) : []),
    [product]
  );

  const productSoldOut = variants.length > 0 && variants.every((v) => !v.availableForSale);

  const allOptionsSelected = !!product && product.options.every((o) => selectedOptions[o.name]);

  // A variant only resolves once every option is chosen — never fall back to
  // "first variant", which is how wrong-size orders happen.
  const selectedVariant = useMemo(() => {
    if (!product || !allOptionsSelected) return undefined;
    return variants.find((v) =>
      Object.entries(selectedOptions).every(([name, value]) =>
        v.selectedOptions.some((o) => o.name === name && o.value === value)
      )
    );
  }, [product, variants, selectedOptions, allOptionsSelected]);

  // Price shown before a variant resolves: the lowest variant price, so the
  // price block never renders empty or shifts layout.
  const displayVariant = selectedVariant ?? variants[0];

  /** Is this option value reachable given the other current selections? */
  const isValueAvailable = (optionName: string, value: string) =>
    variants.some(
      (v) =>
        v.availableForSale &&
        v.selectedOptions.some((o) => o.name === optionName && o.value === value) &&
        Object.entries(selectedOptions).every(
          ([name, selected]) =>
            name === optionName ||
            v.selectedOptions.some((o) => o.name === name && o.value === selected)
        )
    );

  const firstMissingOption = () =>
    product?.options.find((o) => !selectedOptions[o.name])?.name ?? null;

  const handleAddToCart = async () => {
    if (!product || productSoldOut) return;

    // Required variant not chosen: point at the selector instead of failing quietly.
    const missing = firstMissingOption();
    if (missing) {
      setMissingOption(missing);
      const el = optionRefs.current[missing];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      (el?.querySelector("button:not([disabled])") as HTMLButtonElement | null)?.focus();
      return;
    }
    if (!selectedVariant?.availableForSale) return;

    setMissingOption(null);
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title, position: "top-center" });
    // Quantity lives in the drawer, so open it right after a successful add.
    window.dispatchEvent(new CustomEvent("open-cart"));
  };

  // Sticky CTA shows only while the main CTA is off screen — never both at once.
  useEffect(() => {
    if (!product || productSoldOut) return;
    const btn = document.getElementById("main-add-to-cart");
    if (!btn) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(btn);
    return () => observer.disconnect();
  }, [product, productSoldOut]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-foreground font-heading text-lg">Product not found</p>
          <Link to="/shop" className="text-primary underline mt-4 inline-block font-body">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images.edges;
  const copy = getProductCopy(product.title, product.handle);
  const showReviews = hasGenuineReviews(handle || "");
  const avgRating = getAverageRating(handle || "");
  const totalReviews = getTotalReviews(handle || "");

  const compareAt = displayVariant?.compareAtPrice;
  const savings = compareAt
    ? parseFloat(compareAt.amount) - parseFloat(displayVariant.price.amount)
    : 0;
  const onSale = !!compareAt && savings > 0;

  const fitLabel = copy.singleSize
    ? `${copy.singleSize.label} · ${copy.singleSize.fit}`
    : getFitLabel(`${copy.specs.size} ${copy.subtitle}`);

  const hasSizeOption = product.options.some((o) => o.name.toLowerCase() === "size");

  // Gallery follows the chosen colour when we can match it to an image.
  const selectedColor = selectedOptions["Color"] ?? selectedOptions["Colour"];
  const variantImageIndex = (() => {
    if (selectedColor) {
      const colorLower = selectedColor.toLowerCase();
      const idx = images.findIndex((img) => img.node.url.toLowerCase().includes(colorLower));
      if (idx >= 0) return idx;
    }
    const variantImageUrl = selectedVariant?.image?.url;
    if (variantImageUrl) {
      const idx = images.findIndex((img) => img.node.url === variantImageUrl);
      if (idx >= 0) return idx;
    }
    return -1;
  })();

  const ctaLabel = productSoldOut
    ? "Sold Out"
    : !allOptionsSelected
      ? `Select ${(firstMissingOption() || "options").toLowerCase()}`
      : !selectedVariant?.availableForSale
        ? "Unavailable"
        : "Add to Cart";

  const ctaDisabled = isLoading || productSoldOut || (allOptionsSelected && !selectedVariant?.availableForSale);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={copy.seo.title}
        description={copy.seo.metaDescription}
        path={`/product/${product.handle}`}
        ogType="product"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description || copy.seo.metaDescription,
            image: product.images.edges.map((e) => e.node.url),
            brand: { "@type": "Brand", name: "TRETRA" },
            aggregateRating:
              totalReviews > 0
                ? {
                    "@type": "AggregateRating",
                    ratingValue: avgRating,
                    reviewCount: totalReviews,
                  }
                : undefined,
            offers: {
              "@type": "Offer",
              url: `https://www.tretrawear.com/product/${product.handle}`,
              priceCurrency: displayVariant?.price.currencyCode || "EGP",
              price: displayVariant?.price.amount || "0",
              availability: productSoldOut
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.tretrawear.com" },
              { "@type": "ListItem", position: 2, name: "Shop", item: "https://www.tretrawear.com/shop" },
              {
                "@type": "ListItem",
                position: 3,
                name: product.title,
                item: `https://www.tretrawear.com/product/${product.handle}`,
              },
            ],
          },
          ...(copy.faqs && copy.faqs.length > 0
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: copy.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                },
              ]
            : []),
        ]}
      />
      <Navbar />

      <div
        className="container pb-10 md:pb-14"
        style={{ paddingTop: "calc(64px + var(--banner-offset))" }}
      >
        <nav aria-label="Breadcrumb" className="mb-2 md:mb-4">
          <ol className="flex items-center gap-1 font-body text-xs text-muted-foreground leading-none">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
            <li>
              <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
            <li
              className="text-foreground/80 font-body text-xs truncate max-w-[150px] md:max-w-[240px]"
              aria-current="page"
            >
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 md:items-start">
          {/* GALLERY */}
          <div className="md:sticky md:top-24">
            <ProductImageGallery
              images={images}
              imageAlts={copy.imageAlts}
              productTitle={product.title}
              scrollToIndex={variantImageIndex >= 0 ? variantImageIndex : undefined}
            />
          </div>

          {/* PURCHASE PANEL — no entrance animation, interactive on paint */}
          <div>
            {/* 1. TITLE */}
            <h1 className="font-heading text-2xl md:text-4xl text-foreground leading-tight">
              {product.title}
            </h1>

            {/* 2. REVIEW SUMMARY — genuine reviews only */}
            {showReviews && (
              <button
                onClick={() =>
                  document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 group mt-2"
                aria-label={`See ${totalReviews} reviews`}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(avgRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-body text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {avgRating} ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                </span>
              </button>
            )}

            <p className="font-body text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
              {copy.subtitle}
            </p>

            {/* 3. PRICE */}
            <div className="flex items-center gap-3 flex-wrap mt-4">
              <span className="font-heading text-2xl md:text-3xl text-primary">
                {displayVariant?.price.currencyCode}{" "}
                {parseFloat(displayVariant?.price.amount || "0").toFixed(2)}
              </span>
              {onSale && (
                <>
                  <span className="font-heading text-lg text-muted-foreground line-through">
                    {compareAt.currencyCode} {parseFloat(compareAt.amount).toFixed(2)}
                  </span>
                  <span className="font-heading text-xs tracking-wider text-primary-foreground bg-primary px-2.5 py-1 rounded-full">
                    Save {displayVariant.price.currencyCode} {savings.toFixed(0)}
                  </span>
                </>
              )}
            </div>

            {/* 4 + 5. VARIANT SELECTION */}
            {!productSoldOut &&
              product.options
                .filter((option) => option.values.length > 1 || option.values[0] !== "Default Title")
                .map((option) => {
                  const isColor = /colou?r/i.test(option.name);
                  const single = option.values.length === 1;
                  return (
                    <div
                      key={option.name}
                      ref={(el) => { optionRefs.current[option.name] = el; }}
                      className="mt-5"
                    >
                      <div className="flex items-baseline justify-between mb-2">
                        <label className="font-heading text-xs tracking-wider text-foreground">
                          {option.name}
                          {selectedOptions[option.name] && (
                            <span className="font-body text-muted-foreground normal-case tracking-normal ml-2">
                              {selectedOptions[option.name]}
                            </span>
                          )}
                        </label>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const isSelected = selectedOptions[option.name] === value;
                          const available = isValueAvailable(option.name, value);
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => {
                                if (!available) return;
                                setSelectedOptions((prev) => ({ ...prev, [option.name]: value }));
                                setMissingOption(null);
                              }}
                              disabled={!available || single}
                              aria-pressed={isSelected}
                              className={`min-h-[44px] min-w-[44px] px-4 font-body text-sm rounded-lg border-2 transition-colors duration-150 ${
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : available
                                    ? "border-border bg-card text-foreground hover:border-primary/50"
                                    : "border-dashed border-border bg-muted/60 text-muted-foreground/70 cursor-not-allowed line-through decoration-muted-foreground/60"
                              }`}
                            >
                              {isColor ? value : value}
                            </button>
                          );
                        })}
                      </div>

                      {missingOption === option.name && (
                        <p
                          role="alert"
                          className="font-body text-xs text-primary mt-2"
                        >
                          Please choose a {option.name.toLowerCase()} to continue.
                        </p>
                      )}
                    </div>
                  );
                })}

            {/* 6. CONCISE FIT GUIDANCE */}
            <div className="flex items-center gap-2 mt-4 font-body text-xs text-muted-foreground">
              <span className="text-foreground font-semibold">{fitLabel}</span>
              {hasSizeOption && !copy.singleSize && (
                <>
                  <span aria-hidden="true">·</span>
                  <SizeGuide />
                </>
              )}
            </div>

            {/* 7. PRIMARY ADD TO CART */}
            <Button
              id="main-add-to-cart"
              onClick={handleAddToCart}
              disabled={ctaDisabled}
              size="lg"
              className="w-full mt-4 bg-primary text-primary-foreground font-heading text-base tracking-wider uppercase h-14 rounded-xl hover:bg-primary/90 disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : ctaLabel}
            </Button>

            {productSoldOut && (
              <p className="font-body text-xs text-muted-foreground text-center mt-2">
                This piece is currently out of stock.{" "}
                <Link to="/shop" className="text-primary underline underline-offset-2">
                  Browse the collection
                </Link>
              </p>
            )}

            {/* 8. CONCISE PURCHASE REASSURANCE */}
            {!productSoldOut && (
              <div className="mt-3">
                <DeliveryEstimate compact />
              </div>
            )}

            {/* 9. SECONDARY CONTENT */}
            <div className="mt-8">
              <ProductAccordions
                copy={copy}
                defaultOpen={isDesktop ? "details" : undefined}
                sizeHelper={
                  hasSizeOption && !copy.singleSize ? (
                    <SizeRecommender
                      onSizeSelect={(size) => {
                        setSelectedOptions((prev) => ({ ...prev, Size: size }));
                        setMissingOption(null);
                      }}
                    />
                  ) : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>

      {copy.faqs && copy.faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 py-12 md:py-16 border-t border-border">
          <h2 className="font-heading text-xl md:text-2xl text-foreground mb-4">
            Questions about this piece
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {copy.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
                <AccordionTrigger className="font-heading text-sm tracking-wide text-foreground text-left hover:no-underline hover:text-primary py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {showReviews && (
        <section
          id="reviews-section"
          className="max-w-7xl mx-auto px-4 py-12 md:py-16 border-t border-border"
        >
          <ProductReviews handle={handle || ""} />
        </section>
      )}

      <CompleteTheLook currentHandle={handle || ""} currentTitle={product.title} />
      <RelatedProducts currentHandle={handle || ""} />

      {/* STICKY MOBILE ADD TO CART — only while the main CTA is off screen */}
      {showStickyBar && !productSoldOut && (
        <div
          id="sticky-atc"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border safe-bottom"
        >
          <div className="container flex items-center gap-3 py-2.5">
            <div className="flex-1 min-w-0">
              <p className="font-heading text-xs text-foreground truncate">{product.title}</p>
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm text-primary">
                  {displayVariant?.price.currencyCode}{" "}
                  {parseFloat(displayVariant?.price.amount || "0").toFixed(2)}
                </span>
                {allOptionsSelected ? (
                  selectedVariant && (
                    <span className="font-body text-[11px] text-muted-foreground truncate">
                      {selectedVariant.selectedOptions.map((o) => o.value).join(" · ")}
                    </span>
                  )
                ) : (
                  <span className="font-body text-[11px] text-muted-foreground">
                    {(firstMissingOption() || "").toLowerCase()} not selected
                  </span>
                )}
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={ctaDisabled}
              className="bg-primary text-primary-foreground font-heading text-xs tracking-wider uppercase px-6 h-12 rounded-xl hover:bg-primary/90 flex-shrink-0"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : ctaLabel}
            </Button>
          </div>
        </div>
      )}

      <Footer hideCta />
    </div>
  );
};

export default ProductDetail;
