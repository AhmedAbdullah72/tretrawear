import { Star, CheckCircle2 } from "lucide-react";

/**
 * PDP reviews.
 *
 * DATA INTEGRITY NOTICE
 * ---------------------
 * The entries that previously lived here were copywriting placeholders created
 * during the build. No order records, screenshots or platform export back them,
 * so they are NOT rendered as customer reviews and no aggregate rating is
 * derived from them (which also removes the AggregateRating from the product
 * structured data).
 *
 * To activate reviews later, add REAL, attributable, product-specific entries
 * under the exact Shopify handle below. Never borrow another product's reviews
 * and never synthesise ratings, counts or "verified" badges.
 */
interface ProductReview {
  name: string;
  date: string;
  rating: number;
  size: string;
  text: string;
  helpful: number;
}

/** Per-product review overrides — keyed by Shopify product handle. */
const productReviewsOverrides: Record<string, ProductReview[]> = {};

/**
 * Reviews are only ever real, product-specific entries supplied for that exact
 * handle. Products without collected feedback return an empty list — we never
 * borrow another product's reviews or synthesise an aggregate.
 */
function getReviewsForProduct(handle: string) {
  return productReviewsOverrides[handle] ?? [];
}

/** True only when this product has genuine, product-specific reviews. */
export function hasGenuineReviews(handle: string) {
  return getReviewsForProduct(handle).length > 0;
}

export function getAverageRating(handle: string) {
  const reviews = getReviewsForProduct(handle);
  if (reviews.length === 0) return 0;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return Math.round(avg * 10) / 10;
}

/** Actual number of reviews on file for this product. */
export function getTotalReviews(handle: string) {
  return getReviewsForProduct(handle).length;
}

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`${size === "md" ? "h-5 w-5" : "h-3.5 w-3.5"} ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/20"
        }`}
      />
    ))}
  </div>
);

const getInitials = (name: string) => {
  const parts = name.split(" ");
  return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
};

interface ProductReviewsProps {
  handle: string;
}

export const ProductReviews = ({ handle }: ProductReviewsProps) => {
  const reviews = getReviewsForProduct(handle);
  const avgRating = getAverageRating(handle);
  const totalReviews = getTotalReviews(handle);

  // No genuine reviews for this product: render nothing rather than an empty
  // state or a borrowed aggregate.
  if (totalReviews === 0) return null;

  // Distribution is computed from the real ratings on file, never assumed.
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    pct: Math.round((reviews.filter((r) => r.rating === stars).length / totalReviews) * 100),
  }));

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
        <div>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
            COMMUNITY <span className="text-primary">REVIEWS</span>
          </h2>
          <p className="font-body text-xs text-muted-foreground mb-2 max-w-md">
            Shared experiences from TRETRA customers across our collection.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl text-foreground">{avgRating}</span>
              <span className="font-body text-sm text-muted-foreground">/ 5</span>
            </div>
            <div>
              <StarRating rating={Math.round(avgRating)} size="md" />
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                Based on {totalReviews} reviews
              </p>
            </div>
          </div>
        </div>

        {/* Rating distribution */}
        <div className="flex flex-col gap-1.5 w-full max-w-[220px]">
          {distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-2">
              <span className="font-body text-xs text-muted-foreground w-3">{d.stars}</span>
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 flex-shrink-0" />
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
              <span className="font-body text-[10px] text-muted-foreground w-7 text-right">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-0 divide-y divide-border">
        {reviews.map((review) => (
          <div key={review.name} className="py-6 first:pt-0">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ring-2 ring-primary/20">
                <span className="font-body font-semibold text-sm text-primary">{getInitials(review.name)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-body font-semibold text-sm text-foreground">{review.name}</span>
                    <span className="inline-flex items-center gap-1 text-primary text-[10px] font-body tracking-wider uppercase font-semibold">
                      <CheckCircle2 className="h-3 w-3" /> Verified Buyer
                    </span>
                  </div>
                  <span className="font-body text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <StarRating rating={review.rating} />
                  <span className="font-body text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    Size: {review.size}
                  </span>
                </div>
                <p className="font-body text-sm text-foreground/80 mt-3 leading-relaxed break-words overflow-wrap-anywhere" dir="auto" style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>
                  {review.text}
                </p>
                <p className="font-body text-[11px] text-muted-foreground mt-3">
                  👍 {review.helpful} people found this helpful
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
