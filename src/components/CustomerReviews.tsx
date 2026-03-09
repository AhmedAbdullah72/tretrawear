import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import customer1 from "@/assets/review-customer-1.jpg";
import customer2 from "@/assets/review-customer-2.jpg";
import customer3 from "@/assets/review-customer-3.jpg";
import customer4 from "@/assets/review-customer-4.jpg";

const reviews = [
  {
    name: "Ahmed K.",
    location: "Cairo, Egypt",
    rating: 5,
    product: "Beige Wide-Leg Sweatpants",
    text: "The quality is insane for the price. The 380GSM cotton feels premium, and the wide-leg fit is exactly what I've been looking for. Already ordered two more colors.",
    image: customer1,
    verified: true,
  },
  {
    name: "Nour M.",
    location: "Alexandria, Egypt",
    rating: 5,
    product: "Shadow Hoodie",
    text: "Best hoodie I've ever owned. The oversized fit is perfect and the fabric is so thick and soft. Got so many compliments the first day I wore it. Will definitely be buying more.",
    image: customer2,
    verified: true,
  },
  {
    name: "Omar S.",
    location: "Giza, Egypt",
    rating: 5,
    product: "Mint Green Fur-Lined Hoodie",
    text: "Shipping was super fast and the packaging was clean. The hoodie exceeded my expectations — the fur lining is cozy without being too warm. Absolutely worth every pound.",
    image: customer3,
    verified: true,
  },
  {
    name: "Sara A.",
    location: "Cairo, Egypt",
    rating: 4,
    product: "Beige Wide-Leg Sweatpants + White Tee",
    text: "Love the whole set! The sweatpants are incredibly comfortable and the oversized tee pairs perfectly. The only reason it's not 5 stars is I wish there were more colors available.",
    image: customer4,
    verified: true,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

export const CustomerReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((i) => (i + 1) % reviews.length);
  const prev = () => setActiveIndex((i) => (i - 1 + reviews.length) % reviews.length);

  return (
    <section className="section-padding bg-background overflow-hidden">
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
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">
            WHAT THEY <span className="text-primary">SAY</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-body text-sm text-muted-foreground">
              4.9/5 from 850+ reviews
            </span>
          </div>
        </motion.div>

        {/* Featured review — large */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* Customer photo */}
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img
                  src={reviews[activeIndex].image}
                  alt={`${reviews[activeIndex].name} wearing TRETRA`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-body text-xs text-primary-foreground/70 bg-foreground/40 backdrop-blur-sm px-3 py-1.5 rounded-full inline-block">
                    Purchased: {reviews[activeIndex].product}
                  </p>
                </div>
              </div>

              {/* Review content */}
              <div className="flex flex-col justify-center">
                <Quote className="h-10 w-10 text-primary/20 mb-4 rotate-180" />
                <StarRating rating={reviews[activeIndex].rating} />
                <p className="font-body text-lg md:text-xl text-foreground leading-relaxed mt-4 mb-6">
                  "{reviews[activeIndex].text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
                    <img
                      src={reviews[activeIndex].image}
                      alt={reviews[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-heading text-sm text-foreground">
                      {reviews[activeIndex].name}
                      {reviews[activeIndex].verified && (
                        <span className="ml-2 font-body text-[10px] tracking-wider uppercase text-primary font-semibold">
                          ✓ Verified
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
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4 text-foreground" />
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
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4 text-foreground" />
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
              className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                i === activeIndex
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30 bg-card"
              }`}
            >
              <StarRating rating={review.rating} />
              <p className="font-body text-sm text-foreground mt-3 line-clamp-2">
                "{review.text}"
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
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
