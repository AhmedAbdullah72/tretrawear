import { Link } from "react-router-dom";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";

export const LifestyleSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden group">
            <img src={lifestyle1} alt="Streetwear lifestyle" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Oversize Collection</p>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Street Ready</h3>
              <Link to="/shop" className="inline-block font-body text-sm text-foreground underline underline-offset-4 hover:text-primary transition-colors">
                Explore
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden group">
            <img src={lifestyle2} alt="Urban fashion" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">New Arrivals</p>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Urban Essentials</h3>
              <Link to="/shop" className="inline-block font-body text-sm text-foreground underline underline-offset-4 hover:text-primary transition-colors">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
