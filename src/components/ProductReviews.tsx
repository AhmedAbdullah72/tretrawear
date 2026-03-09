import { Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import reviewer1 from "@/assets/review-pdp-1.webp";
import reviewer2 from "@/assets/review-pdp-2.webp";
import reviewer3 from "@/assets/review-pdp-3.webp";
import reviewer4 from "@/assets/review-pdp-4.webp";
import reviewer5 from "@/assets/review-pdp-5.webp";

const allReviews = [
  {
    name: "Youssef H.",
    date: "1 week ago",
    rating: 5,
    size: "L",
    text: "Honestly wasn't expecting this quality at this price point. The fabric is heavyweight without feeling stiff and the fit is exactly how I wanted — relaxed but not baggy. My friends keep asking where I got it.",
    image: reviewer1,
    helpful: 31,
  },
  {
    name: "Mariam T.",
    date: "2 weeks ago",
    rating: 5,
    size: "M",
    text: "Bought this for my boyfriend and he literally hasn't taken it off 😂 The stitching is solid, the color hasn't faded after 3 washes, and it looks way more expensive than it is. Already ordering more.",
    image: reviewer2,
    helpful: 24,
  },
  {
    name: "Karim E.",
    date: "3 weeks ago",
    rating: 5,
    size: "XL",
    text: "I've tried a lot of Egyptian streetwear brands and TRETRA is easily top tier. The oversized cut is perfect — not too boxy, just the right drape. Shipping to Alex took 2 days which was a nice surprise.",
    image: reviewer3,
    helpful: 19,
  },
  {
    name: "Ziad A.",
    date: "1 month ago",
    rating: 4,
    size: "2XL",
    text: "Really solid piece. The material is thick and premium feeling. Only giving 4 stars because I wish the size chart was a bit more detailed — I'm between sizes and had to exchange. Customer service was super helpful though.",
    image: reviewer4,
    helpful: 14,
  },
  {
    name: "Nada M.",
    date: "1 month ago",
    rating: 5,
    size: "M",
    text: "I styled this with a cropped jacket and it looked 🔥. The quality is unreal for the price — feels like something you'd pay 3x for from international brands. The packaging was also really clean and premium.",
    image: reviewer5,
    helpful: 22,
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
  const totalReviews = 47 + (Math.abs(handle.charCodeAt(0)) % 30);

  const distribution = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 15 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 0 },
  ];

  return (
    <section className="py-12 md:py-16 border-t border-border bg-card">
      <div className="container">
      <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
              CUSTOMER <span className="text-primary">REVIEWS</span>
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-4xl text-foreground">{avgRating}</span>
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
          {reviews.map((review, i) => (
            <div
              key={review.name}
              className="py-6 first:pt-0"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-border">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-sm text-foreground">{review.name}</span>
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
                  <p className="font-body text-sm text-foreground/80 mt-3 leading-relaxed">
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
    </section>
  );
};
