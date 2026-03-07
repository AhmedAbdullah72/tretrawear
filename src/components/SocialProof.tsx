import { Star, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export const SocialProof = () => {
  return (
    <section className="section-padding bg-card overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Customer Love</p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">
            WHAT THEY <span className="text-primary">SAY</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 bg-background rounded-xl border border-border hover:border-primary/20 hover:shadow-md transition-all duration-500"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-muted-foreground/20" />
                ))}
              </div>
              <div className="flex items-start gap-2 mb-4">
                <MessageSquare className="h-4 w-4 text-muted-foreground/30 mt-0.5 flex-shrink-0" />
                <p className="font-body text-sm text-muted-foreground italic">
                  No reviews yet — be the first to share your experience.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <div className="w-8 h-8 rounded-full bg-secondary" />
                <div>
                  <div className="h-3 w-20 bg-secondary rounded" />
                  <div className="h-2 w-16 bg-secondary/50 rounded mt-1.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
