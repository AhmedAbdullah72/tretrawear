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
            <div className="flex gap-4 mt-6">
              {["Instagram", "TikTok", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-body text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm text-foreground mb-5">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: "Shop All", path: "/shop" },
                { label: "About Us", path: "/about" },
                { label: "Size Guide", path: "/shop" },
                { label: "Contact", path: "/about" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm text-foreground mb-5">Support</h4>
            <div className="space-y-3">
              {["Shipping Info", "Returns", "FAQ", "Track Order"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} TRETRA Wear. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-body text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
