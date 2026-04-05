import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Use public paths so images can be preloaded from HTML <head>
const heroImage = "/hero-summer.webp";
const heroImageMobile = "/hero-summer-mobile.webp";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-foreground">
      <picture>
        <source media="(max-width: 767px)" srcSet={heroImageMobile} />
        <source media="(min-width: 768px)" srcSet={heroImage} />
        <img
          src={heroImage}
          alt="TRETRA Wear summer collection – oversized tees and wide-leg sweatpants"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_15%]"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </picture>
      <div className="absolute inset-0 bg-foreground/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/10" />

      <div className="relative container z-10">
        <div className="max-w-2xl pt-20 md:pt-24">
          <div className="hidden md:inline-block bg-primary/20 backdrop-blur-sm border border-primary/30 px-4 py-1.5 rounded-full mb-6">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground font-semibold">
              New Summer Drops — Just Landed
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-8xl lg:text-9xl text-primary-foreground leading-[0.85] mb-4 md:mb-6">
            DRESS<br />
            HOW YOU<br />
            <span className="text-primary">FEEL</span>
          </h1>

          <p className="font-body text-sm md:text-lg text-primary-foreground/70 max-w-md mb-6 md:mb-8">
            Comfort that keeps up with your life. Oversized fits, heavyweight cotton, zero compromise.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading text-base md:text-lg tracking-wider uppercase px-6 md:px-8 py-3.5 md:py-4 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25"
            >
              See What's New
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground font-heading text-base md:text-lg tracking-wider uppercase px-6 md:px-8 py-3.5 md:py-4 rounded-lg hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300 backdrop-blur-sm"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator - CSS only */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-fade-in-delayed">
        <span className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/50">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary-foreground/50 to-transparent animate-bounce-subtle" />
      </div>
    </section>
  );
};
