import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import flatlaySummer from "@/assets/flatlay-summer.webp";
import lifestyleSummer from "@/assets/tretra-wear-hero.png";

export const ProductShowcase = () => {
  return (
    <section className="section-padding bg-card overflow-hidden" aria-labelledby="showcase-heading">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Summer '26</p>
            <h2 id="showcase-heading" className="font-heading text-3xl md:text-5xl text-foreground mb-4 leading-[0.9]">
              BUILT FOR<br />
              <span className="text-primary">SUMMER</span>
            </h2>
            <p className="font-body text-sm md:text-base text-muted-foreground mb-6 max-w-md">
              Lightweight breathable cotton, relaxed oversized cuts and colors made for Egyptian heat —
              pieces that keep their shape from morning coffee to late-night walks.
            </p>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-sm md:text-base tracking-wider uppercase px-6 py-3.5 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Explore Summer '26
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square bg-secondary rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={lifestyleSummer}
                  alt="TRETRA summer collection lifestyle shot"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="aspect-[3/4] bg-secondary rounded-2xl overflow-hidden shadow-xl mt-8">
                <img
                  src={flatlaySummer}
                  alt="Summer collection flatlay showing lightweight tees"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" aria-hidden="true" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-2xl -z-10" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};
