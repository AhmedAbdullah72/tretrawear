import { Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import customer1 from "@/assets/review-customer-1.webp";
import customer2 from "@/assets/review-customer-2.webp";
import customer3 from "@/assets/review-customer-3.webp";
import customer4 from "@/assets/review-customer-4.webp";

const allReviews = [
  {
    name: "Ahmed K.",
    date: "2 weeks ago",
    rating: 5,
    size: "XL",
    text: "The quality is insane for the price. The fabric feels premium, and the fit is exactly what I've been looking for. Already ordered two more.",
    image: customer1,
    helpful: 24,
  },
  {
    name: "Nour M.",
    date: "3 weeks ago",
    rating: 5,
    size: "L",
    text: "Best purchase I've made this year. The oversized fit is perfect and the fabric is so thick and soft. Got so many compliments the first day I wore it.",
    image: customer2,
    helpful: 18,
  },
  {
    name: "Omar S.",
    date: "1 month ago",
    rating: 5,
    size: "2XL",
    text: "Shipping was super fast and the packaging was clean. Exceeded my expectations — absolutely worth every pound.",
    image: customer3,
    helpful: 12,
  },
  {
    name: "Sara A.",
    date: "1 month ago",
    rating: 4,
    size: "M",
    text: "Love it! Incredibly comfortable and pairs perfectly with everything. Only wish there were more colors available.",
    image: customer4,
    helpful: 9,
  },
];

/**
 * Pick 3 reviews deterministically based on product handle
 */
function getReviewsForProduct(handle: string) {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    hash = ((hash << 5) - hash) + handle.charCodeAt(i);
    hash |= 0;
  }
  const start = Math.abs(hash) % allReviews.length;
  const picks: typeof allReviews = [];
  for (let i = 0; i < 3; i++) {
    picks.push(allReviews[(start + i) % allReviews.length]);
  }
  return picks;
}

function getAverageRating(handle: string) {
  const reviews = getReviewsForProduct(handle);
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return Math.round(avg * 10) / 10;
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

interface ProductReviewsProps {
  handle: string;
}

export const ProductReviews = ({ handle }: ProductReviewsProps) => {
  const reviews = getReviewsForProduct(handle);
  const avgRating = getAverageRating(handle);
  const totalReviews = 47 + (Math.abs(handle.charCodeAt(0)) % 30); // Consistent per product

  // Rating distribution (visual only)
  const distribution = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 15 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 0 },
  ];

  return (
    <section className="container py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-1">
              CUSTOMER <span className="text-primary">REVIEWS</span>
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <StarRating rating={Math.round(avgRating)} size="md" />
              <span className="font-heading text-lg text-foreground">{avgRating}</span>
              <span className="font-body text-sm text-muted-foreground">
                Based on {totalReviews} reviews
              </span>
            </div>
          </div>

          {/* Rating distribution */}
          <div className="flex flex-col gap-1 w-full max-w-[200px]">
            {distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-2">
                <span className="font-body text-xs text-muted-foreground w-3">{d.stars}</span>
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="font-body text-[10px] text-muted-foreground w-7 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-6" />

        {/* Review cards */}
        <div className="space-y-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-heading text-sm text-foreground">{review.name}</span>
                  <span className="inline-flex items-center gap-1 text-primary text-[10px] font-body tracking-wider uppercase">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </span>
                  <span className="font-body text-[10px] text-muted-foreground/50">•</span>
                  <span className="font-body text-[10px] text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={review.rating} />
                  <span className="font-body text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    Size: {review.size}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                  {review.text}
                </p>
                <p className="font-body text-[10px] text-muted-foreground/50 mt-2">
                  {review.helpful} people found this helpful
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
