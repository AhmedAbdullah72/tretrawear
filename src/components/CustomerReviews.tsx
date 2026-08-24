import { motion } from "framer-motion";
import { Star } from "lucide-react";

/**
 * Homepage customer reviews.
 *
 * DATA INTEGRITY NOTICE
 * ---------------------
 * The quotes that previously lived here were design placeholders written
 * during the build. Their origin could not be traced to genuine customer
 * feedback (no order records, no Instagram/Facebook/WhatsApp source, no
 * imported review export), so they are NOT rendered as verified testimonials.
 *
 * To bring this section live, paste real, attributable customer feedback into
 * `reviews` below (first name or initials only, short quote, real rating).
 * Do not add invented names, ratings, counts or "verified buyer" badges.
 * While the array is empty the section renders nothing.
 */
export interface HomepageReview {
  /** First name or initials only. */
  name: string;
  /** Real rating given by the customer, 1-5. */
  rating: number;
  /** The customer's own words. */
  text: string;
  /** Optional genuine product reference, e.g. "Black Polo Summer Set". */
  product?: string;
}

export const reviews: HomepageReview[] = [];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
};

export const CustomerReviews = () => {
  // No verified review data on file — render nothing rather than placeholders.
  if (reviews.length === 0) return null;

  const shown = reviews.slice(0, 3);

  return (
    <section className="py-8 md:py-12 bg-background overflow-hidden" aria-labelledby="reviews-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <h2 id="reviews-heading" className="font-display text-2xl md:text-3xl text-foreground">
            REAL PEOPLE, <span className="text-primary">REAL TALK</span>
          </h2>
          <p className="font-body text-xs text-muted-foreground mt-2">
            What our customers are saying
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {shown.map((review) => (
            <div
              key={review.name + review.text.slice(0, 12)}
              className="p-4 rounded-lg border border-border bg-card"
            >
              <StarRating rating={review.rating} />
              <p className="font-body text-sm text-foreground mt-2 leading-relaxed" dir="auto">
                "{review.text}"
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-body font-semibold text-[10px] text-primary">{getInitials(review.name)}</span>
                </div>
                <span className="font-body text-xs text-muted-foreground">{review.name}</span>
                {review.product && (
                  <span className="font-body text-[10px] text-muted-foreground/70 ml-auto truncate">
                    {review.product}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
