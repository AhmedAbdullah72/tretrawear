import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Use public paths so images can be preloaded from HTML <head>
const heroImage = "/hero-summer.webp";
const heroImageMobile = "/hero-summer-mobile.webp";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[72vh] md:min-h-[88vh] flex items-center overflow-hidden bg-foreground">
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
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/10" />

      <div className="relative container z-10">
        <div className="max-w-2xl pt-12 md:pt-20">
          <h1 className="font-heading text-[2.75rem] sm:text-5xl md:text-8xl lg:text-9xl text-primary-foreground leading-[0.85] mb-3 md:mb-5">
            <span className="sr-only">TRETRA Wear — Premium Egyptian Streetwear. </span>
            DRESS<br />
            HOW YOU<br />
            <span className="text-primary">FEEL</span>
          </h1>

          <p className="font-body text-sm md:text-lg text-primary-foreground/75 max-w-md mb-6 md:mb-8">
            Oversized summer fits in breathable cotton. Made in Egypt.
          </p>

          <Link
            to="/shop"
            className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading text-base md:text-lg tracking-wider uppercase px-7 md:px-9 py-3.5 md:py-4 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Shop Now
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
