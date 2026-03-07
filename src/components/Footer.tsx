import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="font-heading text-lg font-bold text-foreground">
              TRETRA<span className="text-primary">.</span>
            </Link>
            <p className="font-body text-sm text-muted-foreground mt-3 max-w-xs">
              Bold streetwear for the fearless. Born in Egypt, made for the world.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Shop", path: "/shop" },
                { label: "About", path: "/about" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {["Instagram", "TikTok", "Facebook"].map((social) => (
                <a key={social} href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tretra Wear. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
