import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome to the crew!", { position: "top-center" });
      setEmail("");
    }
  };

  return (
    <section className="py-20 md:py-28 bg-foreground text-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container max-w-xl text-center"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-4">Stay Connected</p>
        <h2 className="font-heading text-3xl md:text-4xl text-background mb-3">
          Join the Movement
        </h2>
        <p className="font-body text-sm text-background/60 mb-8">
          Get early access to new drops, exclusive offers, and street culture content.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="flex-1 bg-background/10 border border-background/20 rounded-l-lg px-4 py-3 font-body text-sm text-background placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wider uppercase px-6 py-3 rounded-r-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
  );
};
