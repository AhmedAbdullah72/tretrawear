import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-streetwear.jpg";

export const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <img
        src={heroImage}
        alt="TRETRA Wear streetwear collection"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />

      <div className="relative container">
        <div className="max-w-2xl">
          <div className="inline-block bg-primary/20 border border-primary/40 px-4 py-1.5 mb-6 animate-fade-in">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-primary font-semibold">
              New Collection 2026
            </span>
          </div>

          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-foreground leading-[0.85] mb-6 animate-slide-up">
            WEAR<br />
            YOUR<br />
            <span className="text-primary">IDENTITY</span>
          </h1>

          <p className="font-body text-base md:text-lg text-muted-foreground max-w-md mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Bold streetwear engineered for those who refuse to blend in. Premium quality. Unapologetic style.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading text-lg tracking-wider uppercase px-8 py-4 hover:bg-primary/90 transition-all duration-300"
            >
              Shop Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 border border-foreground/30 text-foreground font-heading text-lg tracking-wider uppercase px-8 py-4 hover:border-primary hover:text-primary transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-glow">
        <span className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
};
