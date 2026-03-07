import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Tretra Wear" className="h-14 w-auto" />
            </Link>
            <p className="font-body text-sm text-muted-foreground mt-4 max-w-sm leading-relaxed">
              Bold streetwear for the fearless. Born in Egypt, made for the world. Every piece tells a story of rebellion, comfort, and uncompromising quality.
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
                className="font-body text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@tretra.wear"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10"
              >
                TikTok
              </a>
              <a
                href="https://www.facebook.com/Tretra.wear/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10"
              >
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm text-foreground mb-5">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/shop" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Shop All
              </Link>
              <Link to="/about" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                About Us
              </Link>
              <Link to="/shop" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Size Guide
              </Link>
              <Link to="/about" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Contact
              </Link>
            </div>
          </div>

          <div>
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
          </div>
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
