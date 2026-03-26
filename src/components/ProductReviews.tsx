import { Star, CheckCircle2 } from "lucide-react";

const allReviews = [
  {
    name: "يوسف ح.",
    date: "1 week ago",
    rating: 5,
    size: "L",
    text: "el quality di msh ma32ola bl se3r da wallahi. el wide-leg sweatpants t2eela bs msh 5ashna — relaxed fit mn 8eer ma tban wasa3. exactly eli kont 3ayzo 🔥",
    helpful: 31,
  },
  {
    name: "مريم ت.",
    date: "2 weeks ago",
    rating: 5,
    size: "M",
    text: "جبتها لخطيبي و حرفياً مش قالعها 😂 الخياطة متينة و اللون ما بهتش بعد ٣ غسلات. شكلها أغلى بكتير من سعرها — بطلب تاني أكيد",
    helpful: 24,
  },
  {
    name: "كريم إ.",
    date: "3 weeks ago",
    rating: 5,
    size: "XL",
    text: "garabet brands kteeer f masr bs TRETRA top tier bsgd. el oversized cut bta3 el sweatpants tamam — msh boxy w el drape zay ma ykoon. weslet alex f yomeen 💯",
    helpful: 19,
  },
  {
    name: "زياد أ.",
    date: "1 month ago",
    rating: 4,
    size: "2XL",
    text: "القماش تقيلة و حاسسها premium جداً. بس ٤ نجوم عشان كنت محتاج الsize chart يكون أوضح — كنت بين سايزين و اضطريت أبدل. بس خدمة العملاء كانت ممتازة",
    helpful: 14,
  },
  {
    name: "ندى م.",
    date: "1 month ago",
    rating: 5,
    size: "M",
    text: "labset el wide-leg sweatpants ma3 cropped jacket w kol el nas sa2aletni mneeen 🔥 el quality unreal bl se3r da — 7asa enha 7aga te3mel 3x aghla mn brands baranya. el packaging kan clean w premium",
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
