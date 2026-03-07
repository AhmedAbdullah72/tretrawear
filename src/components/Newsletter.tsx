import { useState } from "react";
import { toast } from "sonner";

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
    <section className="py-20 md:py-28 bg-card">
      <div className="container max-w-xl text-center">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Stay Connected</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Join the Movement
        </h2>
        <p className="font-body text-sm text-muted-foreground mb-8">
          Get early access to new drops, exclusive offers, and street culture content.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="flex-1 bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wider uppercase px-6 py-3 hover:bg-primary/90 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};
