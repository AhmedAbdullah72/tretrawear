import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-streetwear.jpg";

export const HeroSection = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-end overflow-hidden">
      <img
        src={heroImage}
        alt="Tretra Wear streetwear collection"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      
      <div className="relative container pb-16 md:pb-24">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3 animate-fade-in">
          Bold. Comfortable. Designed for you.
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] mb-6 animate-slide-up">
          Express<br />Your Style
        </h1>
        <Link
          to="/shop"
          className="inline-block bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wider uppercase px-8 py-4 hover:bg-primary/90 transition-colors animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};
