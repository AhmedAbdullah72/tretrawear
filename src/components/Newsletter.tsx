import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Please enter your email." })
  .max(255, { message: "Email is too long." })
  .email({ message: "Please enter a valid email address." });

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Invalid email.", { position: "top-center" });
      return;
    }
    toast.success("You're on the list — we'll email you when new drops land.", { position: "top-center" });
    setEmail("");
  };

  return (
    <section className="py-8 md:py-10 bg-foreground text-background" aria-labelledby="newsletter-heading">
      <div className="container max-w-2xl">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="md:flex-1">
            <h2 id="newsletter-heading" className="font-heading text-xl md:text-2xl text-background">
              NEW DROPS FIRST
            </h2>
            <p className="font-body text-xs text-background/55 mt-1">
              One short email when a new collection lands. No spam.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex md:w-[22rem]" aria-label="Newsletter subscription">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              autoComplete="email"
              className="flex-1 min-w-0 bg-background/10 border border-background/20 rounded-l-lg px-4 py-3 font-body text-sm text-background placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wider uppercase px-5 py-3 rounded-r-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Join
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
