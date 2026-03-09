import { Link } from "react-router-dom";
import { ArrowRight, Gem, Heart, Leaf, Shield } from "lucide-react";
import logo from "@/assets/logo.png";

const brandValues = [
  { icon: Gem, label: "Premium Quality", desc: "380GSM heavyweight fabrics" },
  { icon: Heart, label: "Made with Love", desc: "Designed in Cairo, Egypt" },
  { icon: Leaf, label: "Conscious Fashion", desc: "Durable pieces, less waste" },
  { icon: Shield, label: "Trusted by 850+", desc: "Verified happy customers" },
];

const WHATSAPP_URL = "https://wa.me/201024888818?text=Hi%20TRETRA!%20I%20have%20a%20question";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      {/* Brand values grid */}
      <div className="border-b border-border">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {brandValues.map((v) => (
              <div key={v.label} className="text-center">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-heading text-xs tracking-wider text-foreground">{v.label}</p>
                <p className="font-body text-[11px] text-muted-foreground mt-1">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA banner */}
      <div className="bg-primary">
        <div className="container py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-heading text-xl md:text-2xl text-primary-foreground">
              READY TO LEVEL UP YOUR WARDROBE?
            </h3>
            <p className="font-body text-sm text-primary-foreground/70 mt-1">
              Explore the full collection — free shipping over 1,500 EGP.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading text-sm tracking-wider uppercase px-8 py-3.5 rounded-xl hover:bg-primary-foreground/90 transition-colors duration-300 flex-shrink-0"
          >
            Shop Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Tretra Wear — Go to homepage" width={224} height={56} className="h-14 w-auto" loading="lazy" decoding="async" />
            </Link>
            <p className="font-body text-sm text-muted-foreground mt-4 max-w-sm leading-relaxed">
              Bold fashion for the fearless. Born in Egypt, made for the world. Every piece tells a story of rebellion, comfort, and uncompromising quality.
            </p>
            <div className="space-y-2 mt-4">
              <a href="tel:+201024888818" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                +20 102 488 8818
              </a>
              <a href="mailto:info@tretrawear.com" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                info@tretrawear.com
              </a>
            </div>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/tretra.wear/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow TRETRA Wear on Instagram"
                className="font-body text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@tretra.wear"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow TRETRA Wear on TikTok"
                className="font-body text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10"
              >
                TikTok
              </a>
              <a
                href="https://www.facebook.com/Tretra.wear/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow TRETRA Wear on Facebook"
                className="font-body text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10"
              >
                Facebook
              </a>
            </div>
          </div>

          <nav aria-label="Quick links">
            <h4 className="font-heading text-sm text-foreground mb-5">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/shop" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Shop All
              </Link>
              <Link to="/about" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                About Us
              </Link>
              <Link to="/size-guide" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Size Guide
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </nav>

          <nav aria-label="Support links">
            <h4 className="font-heading text-sm text-foreground mb-5">Support</h4>
            <div className="space-y-3">
              <Link to="/shipping" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Shipping Info
              </Link>
              <Link to="/returns" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Returns
              </Link>
              <Link to="/faq" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                FAQ
              </Link>
              <Link to="/privacy" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
            </div>
          </nav>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} TRETRA Wear. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};