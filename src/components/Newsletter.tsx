import { Send } from "lucide-react";

/**
 * Compact newsletter block.
 *
 * INTEGRATION NOTICE
 * ------------------
 * There is currently NO newsletter backend connected (no Shopify email
 * marketing consent API call, no Klaviyo/Mailchimp/Brevo, no database table).
 * The previous version validated the email and showed a success toast without
 * storing or transmitting anything — a false success state.
 *
 * Until a real integration is approved and wired up, the form is presented as
 * not-yet-open: nothing is collected, nothing is promised, and no success
 * message is shown.
 */
export const Newsletter = () => {
  return (
    <section className="py-8 md:py-10 bg-foreground text-background" aria-labelledby="newsletter-heading">
      <div className="container max-w-2xl">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="md:flex-1">
            <h2 id="newsletter-heading" className="font-display text-xl md:text-2xl text-background">
              NEW DROPS FIRST
            </h2>
            <p className="font-body text-xs text-background/55 mt-1">
              Updates on new drops and releases. Sign-ups open soon.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex md:w-[22rem]"
            aria-label="Newsletter subscription"
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Sign-ups open soon"
              autoComplete="email"
              disabled
              aria-disabled="true"
              className="flex-1 min-w-0 bg-background/10 border border-background/20 rounded-l-lg px-4 py-3 font-body text-sm text-background placeholder:text-background/40 focus:outline-none disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled
              aria-disabled="true"
              className="bg-primary/60 text-primary-foreground font-body font-semibold text-sm tracking-[0.06em] uppercase px-5 py-3 rounded-r-lg flex items-center gap-2 cursor-not-allowed"
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
