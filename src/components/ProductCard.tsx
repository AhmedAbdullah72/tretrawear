import { forwardRef, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { shopifyImg, shopifySrcSet } from "@/lib/shopify";
import { toast } from "sonner";
import { itemFromProduct, trackSelectItem } from "@/lib/analytics";

interface ProductCardProps {
  product: ShopifyProduct;
  /** GA4 item_list_name, e.g. "shop_grid". Omit to skip select_item. */
  listName?: string;
  /** Zero-based position within the list. */
  index?: number;
}



export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({ product, listName, index }, ref) => {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const { node } = product;

  const image = node.images.edges[0]?.node;
  const hoverImage = node.images.edges[1]?.node;
  const variants = useMemo(() => node.variants.edges.map((e) => e.node), [node]);
  const available = useMemo(() => variants.filter((v) => v.availableForSale), [variants]);
  const optionDims = useMemo(
    () => (node.options || []).filter((o) => (o.values?.length || 0) > 1),
    [node.options]
  );

  // Behavior classification driven strictly by live Shopify data.
  const behavior: "A" | "B" | "C" | "D" =
    available.length === 0
      ? "D"
      : optionDims.length >= 2
        ? "C"
        : optionDims.length === 1
          ? "B"
          : "A";

  const sizeOptionName = optionDims[0]?.name;
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const selected = variants.find((v) => v.id === selectedId);

  // Price shown = cheapest purchasable variant (falls back to range minimum).
  const priceVariant =
    selected ||
    available.slice().sort((a, b) => parseFloat(a.price.amount) - parseFloat(b.price.amount))[0] ||
    variants[0];
  const price = priceVariant?.price || node.priceRange.minVariantPrice;
  const compareAt = priceVariant?.compareAtPrice;
  const onSale =
    !!compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount) && behavior !== "D";

  // NEW comes strictly from the merchandising tag set in Shopify ("new-arrival").
  // No date/index inference.
  const isNew = (node.tags || []).some((t) => t.toLowerCase() === "new-arrival");

  // Single badge, priority: SOLD OUT > SALE > NEW
  const badge = behavior === "D" ? "SOLD OUT" : onSale ? "SALE" : isNew ? "NEW" : null;

  // select_item — user-initiated click on a merchandising list card only.
  const onSelect = () => {
    if (!listName) return;
    trackSelectItem(itemFromProduct(node, { variant: selected, index }), listName);
  };

  const fmt = (a: { currencyCode: string; amount: string }) =>
    `${a.currencyCode} ${parseFloat(a.amount).toFixed(2)}`;

  const add = async (variant: (typeof variants)[number]) => {
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", {
      description: behavior === "A" ? node.title : `${node.title} — ${variant.title}`,
      position: "top-center",
    });
    window.dispatchEvent(new CustomEvent("open-cart"));
  };

  const onDirectAdd = async () => {
    const v = available[0];
    if (v) await add(v);
  };

  const onSizedAdd = async () => {
    if (!selected) {
      toast.error(`Please select a ${(sizeOptionName || "option").toLowerCase()}`, {
        position: "top-center",
      });
      return;
    }
    if (!selected.availableForSale) return;
    await add(selected);
  };

  return (
    <div ref={ref} className="group flex flex-col">
      <Link
        to={`/product/${node.handle}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        aria-label={`View ${node.title}`}
        onClick={onSelect}
      >
        <div className="relative aspect-[3/4] bg-secondary rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
          {image ? (
            <>
              <img
                src={shopifyImg(image.url, 800)}
                srcSet={shopifySrcSet(image.url)}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                alt={image.altText || node.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  hoverImage ? "md:group-hover:opacity-0" : ""
                } ${behavior === "D" ? "opacity-60" : ""}`}
                loading="lazy"
                decoding="async"
                width="600"
                height="800"
              />
              {hoverImage && (
                <img
                  src={shopifyImg(hoverImage.url, 800)}
                  srcSet={shopifySrcSet(hoverImage.url)}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  alt=""
                  aria-hidden="true"
                  className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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

          {badge && (
            <span
              className={`absolute top-3 left-3 font-body font-semibold text-[10.5px] tracking-[0.04em] uppercase px-2.5 py-1 rounded-full ${
                badge === "SOLD OUT"
                  ? "bg-muted text-muted-foreground"
                  : badge === "SALE"
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground text-background"
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        <h3 className="font-body font-semibold text-[15px] md:text-base text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug tracking-[-0.01em] mt-3">
          {node.title}
        </h3>
      </Link>

      <p className="font-body nums text-sm mt-1.5 flex flex-wrap items-baseline gap-x-2">
        <span className={`font-semibold whitespace-nowrap ${behavior === "D" ? "text-muted-foreground" : "text-foreground"}`}>
          {fmt(price)}
        </span>
        {onSale && compareAt && (
          <span className="text-xs font-normal text-muted-foreground line-through whitespace-nowrap">{fmt(compareAt)}</span>
        )}
      </p>

      {/* Behavior B — explicit single-option select, no auto-selection */}
      {behavior === "B" && (
        <div className="mt-2 grid grid-cols-4 gap-1" role="group" aria-label={`Select ${sizeOptionName}`}>
          {variants.map((v) => {
            const value = v.selectedOptions?.[0]?.value || v.title;
            const soldOut = !v.availableForSale;
            const isSel = v.id === selectedId;
            return (
              <button
                key={v.id}
                type="button"
                disabled={soldOut}
                onClick={() => setSelectedId(v.id)}
                aria-pressed={isSel}
                aria-label={`${sizeOptionName} ${value}${soldOut ? " (sold out)" : ""}`}
                className={`min-h-[44px] md:min-h-0 md:h-9 px-1 rounded-md border font-body font-medium text-[13px] uppercase tracking-[0.02em] transition-colors ${
                  isSel
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground border-border hover:border-foreground"
                } ${soldOut ? "opacity-40 line-through cursor-not-allowed hover:border-border" : ""}`}
              >
                {value}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-2">
        {behavior === "A" && (
          <button
            type="button"
            onClick={onDirectAdd}
            disabled={isLoading}
            className="w-full h-10 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-[13px] tracking-[0.06em] uppercase hover:bg-primary/90 disabled:opacity-50 transition-colors inline-flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : "Add to Cart"}
          </button>
        )}

        {behavior === "B" && (
          <button
            type="button"
            onClick={onSizedAdd}
            disabled={isLoading || !selected}
            className="w-full h-10 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-[13px] tracking-[0.06em] uppercase hover:bg-primary/90 disabled:opacity-40 transition-colors inline-flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : selected ? (
              "Add to Cart"
            ) : (
              `Select ${sizeOptionName}`
            )}
          </button>
        )}

        {behavior === "C" && (
          <Link
            to={`/product/${node.handle}`}
            onClick={onSelect}
            className="w-full h-10 rounded-lg border border-foreground text-foreground font-body font-semibold text-[13px] tracking-[0.06em] uppercase hover:bg-foreground hover:text-background transition-colors inline-flex items-center justify-center"
          >
            View Product
          </Link>
        )}

        {behavior === "D" && (
          <button
            type="button"
            disabled
            aria-label={`${node.title} is sold out`}
            className="w-full h-10 rounded-lg border border-border text-muted-foreground font-body font-semibold text-[13px] tracking-[0.06em] uppercase cursor-not-allowed"
          >
            Sold Out
          </button>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";
