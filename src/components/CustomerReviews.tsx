import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";

const reviews = [
  {
    name: "أحمد ك.",
    rating: 5,
    text: "el wide-leg sweatpants di 7aga tanya wallahi — comfortable gdn w labsetha barra marten already. kol as7aby bys2alo mneen 🔥",
    verified: true,
  },
  {
    name: "نور م.",
    rating: 5,
    text: "القماش تقيل بس ناعم جداً من جوا، مش زي أي حاجة تانية جربتها. الfit بتاع الsweatpants مظبوط أوي 💯",
    verified: true,
  },
  {
    name: "عمر س.",
    rating: 5,
    text: "wasalet f yomeen w el packaging kan premium 3la el a5er. el sweatpants mesh wasa3 mesh daye2 — zay ma tkoon metfasal 3aleek 🔥",
    verified: true,
  },
];

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
  const parts = name.split(" ");
  return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
};

export const CustomerReviews = () => {
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
          <h2 id="reviews-heading" className="font-heading text-2xl md:text-3xl text-foreground">
            REAL PEOPLE, <span className="text-primary">REAL TALK</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              ))}
            </div>
            <span className="font-body text-xs text-muted-foreground">4.9/5 · 850+ reviews</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-4 rounded-lg border border-border bg-card"
            >
              <StarRating rating={review.rating} />
              <p className="font-body text-sm text-foreground mt-2 leading-relaxed" dir="auto">
                "{review.text}"
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-heading text-[10px] text-primary">{getInitials(review.name)}</span>
                </div>
                <span className="font-body text-xs text-muted-foreground">{review.name}</span>
                {review.verified && (
                  <CheckCircle2 className="h-3 w-3 text-primary ml-auto" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
