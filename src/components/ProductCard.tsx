import { forwardRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Loader2, Eye, X, Ruler, ChevronDown } from "lucide-react";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = forwardRef<HTMLAnchorElement, ProductCardProps>(({ product }, ref) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const [quickView, setQuickView] = useState(false);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const hoverImage = node.images.edges[1]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants.edges[0]?.node;
  const isBestSeller = (node.tags || []).map((t) => t.toLowerCase()).includes("best-seller");

  const variants = node.variants.edges.map((e) => e.node);
  const firstAvailable = variants.find((v) => v.availableForSale) || variants[0];
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(firstAvailable?.id);
  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === selectedVariantId) || firstAvailable,
    [selectedVariantId, variants, firstAvailable]
  );
  const hasMultipleVariants = variants.length > 1;
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const sizeGuide = [
    { size: "M", chest: "102", length: "72", shoulder: "50" },
    { size: "L", chest: "108", length: "74", shoulder: "52" },
    { size: "XL", chest: "114", length: "76", shoulder: "54" },
    { size: "2XL", chest: "120", length: "78", shoulder: "56" },
  ];

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
    toast.success("Added to cart", {
      description: node.title,
      position: "top-center",
      action: {
        label: "View Cart",
        onClick: () => window.dispatchEvent(new CustomEvent("open-cart")),
      },
    });
  };

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedVariant) return;
    if (!selectedVariant.availableForSale) {
      toast.error("This size is sold out", { position: "top-center" });
      return;
    }
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to cart", {
      description: `${node.title} — ${selectedVariant.title}`,
      position: "top-center",
      action: {
        label: "View Cart",
        onClick: () => window.dispatchEvent(new CustomEvent("open-cart")),
      },
    });
    setQuickView(false);
  };

  const openQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickView(true);
  };

  return (
    <>
    <Link ref={ref} to={`/product/${node.handle}`} className="group block">
      <div className="relative aspect-[3/4] bg-secondary rounded-xl overflow-hidden mb-3 shadow-sm group-hover:shadow-lg transition-all duration-500">
        {image ? (
          <>
            <img
              src={image.url + (image.url.includes('cdn.shopify.com') ? '&width=400' : '')}
              srcSet={image.url.includes('cdn.shopify.com') ? `${image.url}&width=200 200w, ${image.url}&width=400 400w, ${image.url}&width=600 600w` : undefined}
              alt={image.altText || node.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoverImage ? 'md:group-hover:opacity-0' : 'group-hover:scale-105'}`}
              loading="lazy"
              decoding="async"
              width="400"
              height="533"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {hoverImage && (
              <img
                src={hoverImage.url + (hoverImage.url.includes('cdn.shopify.com') ? '&width=400' : '')}
                alt={hoverImage.altText || node.title}
                className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                loading="lazy"
                decoding="async"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body text-sm">
            No image
          </div>
        )}

        {/* View Product affordance on hover (desktop) */}
        <div className="absolute inset-x-0 bottom-0 hidden md:flex items-center justify-center gap-2 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={openQuickView}
            className="inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-sm text-foreground font-heading text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md border border-border hover:bg-background transition-colors"
            aria-label={`Quick view ${node.title}`}
          >
            <Eye className="h-3 w-3" /> Quick View
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isLoading || !firstVariant?.availableForSale}
          aria-label={`Add ${node.title} to cart`}
          className="absolute bottom-3 right-3 bg-primary text-primary-foreground p-3 rounded-full opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 hover:bg-primary/90 disabled:opacity-50 shadow-lg"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ShoppingCart className="h-4 w-4" aria-hidden="true" />}
        </button>

        {!firstVariant?.availableForSale && (
          <div className="absolute top-3 left-3 bg-foreground text-background text-xs font-heading px-3 py-1 rounded-full">
            SOLD OUT
          </div>
        )}

        {isBestSeller && firstVariant?.availableForSale && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-heading tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
            Best Seller
          </div>
        )}
      </div>

      <h3 className="font-heading text-sm text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
        {node.title}
      </h3>
      <p className="font-body text-sm text-muted-foreground mt-1">
        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
      </p>
    </Link>

    {quickView && (
      <div
        className="fixed inset-0 z-[100] bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        onClick={() => setQuickView(false)}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${node.title}`}
      >
        <div
          className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl grid md:grid-cols-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="aspect-[3/4] bg-secondary overflow-hidden">
            {image && (
              <img src={image.url} alt={image.altText || node.title} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="p-6 flex flex-col overflow-y-auto">
            <button
              onClick={() => setQuickView(false)}
              className="self-end p-1 text-muted-foreground hover:text-foreground"
              aria-label="Close quick view"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-heading text-2xl text-foreground mt-2">{node.title}</h3>
            <p className="font-heading text-xl text-primary mt-2">
              {(selectedVariant?.price || price).currencyCode} {parseFloat((selectedVariant?.price || price).amount).toFixed(2)}
            </p>
            {node.description && (
              <p className="font-body text-sm text-muted-foreground mt-3 line-clamp-4">
                {node.description}
              </p>
            )}

            {hasMultipleVariants && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-heading text-xs tracking-wider uppercase text-foreground">
                    Size: <span className="text-muted-foreground">{selectedVariant?.title}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide((s) => !s)}
                    aria-expanded={showSizeGuide}
                    className="inline-flex items-center gap-1 font-body text-[11px] text-primary hover:text-primary/80 underline underline-offset-2"
                  >
                    <Ruler className="h-3 w-3" />
                    Size Guide
                    <ChevronDown className={`h-3 w-3 transition-transform ${showSizeGuide ? "rotate-180" : ""}`} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => {
                    const isSelected = v.id === selectedVariant?.id;
                    const soldOut = !v.availableForSale;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        aria-pressed={isSelected}
                        aria-label={`${v.title}${soldOut ? " (sold out)" : ""}`}
                        className={`relative min-w-[3rem] px-3 py-2 rounded-lg border font-body text-xs tracking-wider uppercase transition-all ${
                          isSelected
                            ? "bg-foreground text-background border-foreground"
                            : "bg-transparent text-foreground border-border hover:border-foreground"
                        } ${soldOut ? "opacity-50" : ""}`}
                      >
                        {v.title}
                        {soldOut && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          >
                            <span className="block w-full h-px bg-current rotate-[-20deg]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {selectedVariant && !selectedVariant.availableForSale && (
                  <p className="mt-2 font-body text-[11px] uppercase tracking-wider text-primary">This size is sold out</p>
                )}

                {showSizeGuide && (
                  <div className="mt-4 rounded-lg border border-border overflow-hidden animate-fade-in">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-foreground text-background">
                          <th className="font-heading py-2 px-2 text-left">Size</th>
                          <th className="font-heading py-2 px-2 text-center">Chest</th>
                          <th className="font-heading py-2 px-2 text-center">Length</th>
                          <th className="font-heading py-2 px-2 text-center">Shoulder</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeGuide.map((row) => {
                          const isActive = selectedVariant?.title?.toUpperCase() === row.size;
                          return (
                            <tr
                              key={row.size}
                              className={`border-t border-border ${isActive ? "bg-primary/10" : "bg-background"}`}
                            >
                              <td className={`font-heading py-2 px-2 ${isActive ? "text-primary" : "text-foreground"}`}>{row.size}</td>
                              <td className="font-body py-2 px-2 text-center text-foreground">{row.chest}</td>
                              <td className="font-body py-2 px-2 text-center text-foreground">{row.length}</td>
                              <td className="font-body py-2 px-2 text-center text-foreground">{row.shoulder}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <p className="font-body text-[10px] text-muted-foreground px-2 py-1.5 bg-card">
                      Measurements in cm. Relaxed oversized fit — true to size.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2 mt-6 pt-4">
              <button
                onClick={handleQuickAdd}
                disabled={isLoading || !selectedVariant?.availableForSale}
                className="w-full bg-primary text-primary-foreground font-heading text-sm tracking-wider uppercase py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : !selectedVariant?.availableForSale ? "Sold Out" : <><ShoppingCart className="h-4 w-4" /> Add to Cart</>}
              </button>
              <Link
                to={`/product/${node.handle}`}
                onClick={() => setQuickView(false)}
                className="w-full text-center border border-border text-foreground font-heading text-sm tracking-wider uppercase py-3 rounded-lg hover:bg-secondary transition-colors"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
});

ProductCard.displayName = "ProductCard";
