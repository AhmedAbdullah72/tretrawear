import { Star, CheckCircle2 } from "lucide-react";

const allReviews = [
  {
    name: "يوسف ح.",
    date: "من أسبوع",
    rating: 5,
    size: "L",
    text: "Wallahi mesh msa2a2 en el quality deh b el se3r da. El oma2 te2eel bas mesh stiff وال fit relaxed bs mesh baggy — بالظبط اللي كنت عايزه. As7abi kollohom byes2alo mn feen 🔥",
    helpful: 31,
  },
  {
    name: "مريم ت.",
    date: "من أسبوعين",
    rating: 5,
    size: "M",
    text: "Gebtaha le 5atibi w literally mesh 2al3ha 😂 El stitching solid w el loun ma2le4sh ba3d 3 ghassalat. Shaklaha a8la mn se3rha b keteer — already ordering more.",
    helpful: 24,
  },
  {
    name: "كريم إ.",
    date: "من 3 أسابيع",
    rating: 5,
    size: "XL",
    text: "Garrabt brands keteer fi Egypt w TRETRA easily top tier. El oversized cut perfect — مش boxy أوي، el drape 3ala ba3do. El shipping l Alex geh fi yomain وده كان surprise لطيف.",
    helpful: 19,
  },
  {
    name: "زياد أ.",
    date: "من شهر",
    rating: 4,
    size: "2XL",
    text: "Really solid piece. الخامة تقيلة و premium feeling. بس هديها 4 stars 3ashan kont 3ayez el size chart yeb2a more detailed — ana been sizes w e7tagt ab3at exchange. Customer service كانوا helpful جداً.",
    helpful: 14,
  },
  {
    name: "ندى م.",
    date: "من شهر",
    rating: 5,
    size: "M",
    text: "Styled it with cropped jacket w tl3et na2r 🔥 El quality مش طبيعية لل price — 7assa enaha 7aga td3 3aleeha 3x mn international brands. El packaging kaman clean w premium أوي.",
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
  const totalReviews = 47 + (Math.abs(handle.charCodeAt(0)) % 30);

  const distribution = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 15 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 0 },
  ];

  return (
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
        {reviews.map((review) => (
          <div key={review.name} className="py-6 first:pt-0">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ring-2 ring-primary/20">
                <span className="font-heading text-sm text-primary">{getInitials(review.name)}</span>
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
                <p className="font-body text-sm text-foreground/80 mt-3 leading-relaxed" dir="auto">
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
