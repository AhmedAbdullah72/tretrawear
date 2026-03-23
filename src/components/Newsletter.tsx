import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Send, Gift } from "lucide-react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome to the crew! Check your inbox for 10% off.", { position: "top-center" });
      setEmail("");
    }
  };

  return (
    <section className="py-10 md:py-14 bg-foreground text-background overflow-hidden" aria-labelledby="newsletter-heading">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="container max-w-xl text-center"
      >
        <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
          <Gift className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          <span className="font-body text-xs tracking-[0.2em] uppercase text-primary font-semibold">
            Get 10% Off
          </span>
        </div>
        <h2 id="newsletter-heading" className="font-heading text-3xl md:text-4xl text-background mb-3">
          Join the Movement
        </h2>
        <p className="font-body text-sm text-background/60 mb-8">
          Subscribe for early access to new drops, exclusive offers, and 10% off your first order.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-0" aria-label="Newsletter subscription">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            autoComplete="email"
            className="flex-1 bg-background/10 border border-background/20 rounded-l-lg px-4 py-3 font-body text-sm text-background placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wider uppercase px-6 py-3 rounded-r-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Subscribe
          </button>
        </form>
        <p className="font-body text-[11px] text-background/30 mt-3">
          No spam. Unsubscribe anytime. By subscribing you agree to our privacy policy.
        </p>
      </motion.div>
    </section>
  );
};
