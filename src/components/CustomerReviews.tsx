import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";

const reviews = [
  {
    name: "أحمد ك.",
    location: "القاهرة",
    rating: 5,
    product: "Beige Wide-Leg Sweatpants",
    text: "El quality deh mesh tabi3ya wallahi 🔥 El oma2 te2eel w el fit oversized bas mesh baggy — exactly زي ما كنت عايز. As7abi kollohom byes2alo mn feen.",
    verified: true,
  },
  {
    name: "نور م.",
    location: "الإسكندرية",
    rating: 5,
    product: "Shadow Hoodie",
    text: "أحسن hoodie gebtaha fi 7ayati. الخامة سميكة وناعمة وال fit مظبوط أوي. اتمدحت فيه أول يوم لبسته — هشتري ألوان تاني أكيد.",
    verified: true,
  },
  {
    name: "عمر س.",
    location: "الجيزة",
    rating: 5,
    product: "Mint Green Fur-Lined Hoodie",
    text: "El shipping kan fast gidan w el packaging clean أوي. El hoodie a7san mn elli kont mtwq3o — el fur lining دافي من غير ما يحسسك بحر. Worth every pound 💯",
    verified: true,
  },
  {
    name: "سارة أ.",
    location: "القاهرة",
    rating: 4,
    product: "Beige Wide-Leg Sweatpants + White Tee",
    text: "El set kolaha game 🙌 el sweatpants comfortable gidan w el oversized tee btetla3 ma3ahom perfect. بس كنت اتمنى يكون في ألوان أكتر — ده السبب الوحيد ملهاش 5 stars.",
    verified: true,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

const getInitials = (name: string) => {
  const parts = name.split(" ");
  return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
};

export const CustomerReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((i) => (i + 1) % reviews.length);
  const prev = () => setActiveIndex((i) => (i - 1 + reviews.length) % reviews.length);

  return (
    <section className="section-padding bg-background overflow-hidden" aria-labelledby="reviews-heading">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
            Real Customers
          </p>
          <h2 id="reviews-heading" className="font-heading text-4xl md:text-5xl text-foreground">
            WHAT THEY <span className="text-primary">SAY</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5" role="img" aria-label="4.9 out of 5 stars average rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              ))}
            </div>
            <span className="font-body text-sm text-muted-foreground">
              4.9/5 from 850+ reviews
            </span>
          </div>
        </motion.div>

        {/* Featured review */}
        <div className="relative max-w-5xl mx-auto" role="region" aria-label="Customer reviews carousel" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex flex-col justify-center">
                <Quote className="h-10 w-10 text-primary/20 mb-4 rotate-180" aria-hidden="true" />
                <StarRating rating={reviews[activeIndex].rating} />
                <blockquote className="font-body text-lg md:text-xl text-foreground leading-relaxed mt-4 mb-6" dir="auto">
                  "{reviews[activeIndex].text}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ring-2 ring-primary/20">
                    <span className="font-heading text-sm text-primary">{getInitials(reviews[activeIndex].name)}</span>
                  </div>
                  <div>
                    <p className="font-heading text-sm text-foreground">
                      {reviews[activeIndex].name}
                      {reviews[activeIndex].verified && (
                        <span className="ml-2 inline-flex items-center gap-1 font-body text-[10px] tracking-wider uppercase text-primary font-semibold">
                          <CheckCircle2 className="h-3 w-3" /> Verified
                        </span>
                      )}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {reviews[activeIndex].location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10" role="navigation" aria-label="Review navigation">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4 text-foreground" aria-hidden="true" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4 text-foreground" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mini review cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
        >
          {reviews.map((review, i) => (
            <button
              key={review.name}
              onClick={() => setActiveIndex(i)}
              aria-label={`Read review by ${review.name}: ${review.rating} stars`}
              className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                i === activeIndex
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30 bg-card"
              }`}
            >
              <StarRating rating={review.rating} />
              <p className="font-body text-sm text-foreground mt-3 line-clamp-2" dir="auto">
                "{review.text}"
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-heading text-[10px] text-primary">{getInitials(review.name)}</span>
                </div>
                <span className="font-body text-xs text-muted-foreground">{review.name}</span>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
