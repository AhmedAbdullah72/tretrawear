import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check } from "lucide-react";

const features = [
  "Heavy-weight 380gsm premium cotton",
  "Oversized drop-shoulder silhouette",
  "Custom embroidered branding",
  "Reinforced double-stitched seams",
  "Pre-shrunk & colorfast fabric",
  "Unisex fit — sizes S to 3XL",
];

export const ProductShowcase = () => {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Product Details</p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              CRAFTED FOR<br />
              <span className="text-primary">PERFECTION</span>
            </h2>
            <p className="font-body text-muted-foreground mb-8 max-w-md">
              Every TRETRA piece is designed with obsessive attention to detail. From fabric selection to final stitch — no compromise.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center bg-primary/10 border border-primary/20">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="font-body text-sm text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-on-scroll relative">
            <div className="aspect-[4/5] bg-card border border-border overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="font-heading text-2xl text-muted-foreground/30 mb-2">PRODUCT IMAGE</p>
                  <p className="font-body text-sm text-muted-foreground">Add products to your store to see them here</p>
                </div>
              </div>
            </div>
            {/* Accent corner */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/30 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
