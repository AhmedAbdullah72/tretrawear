import { Link } from "react-router-dom";
import type { Location } from "react-router-dom";
import type { ComponentType } from "react";

interface MobileMenuProps {
  navLinks: { label: string; path: string }[];
  location: Location;
  onClose: () => void;
  SocialIcons: ComponentType<{ className?: string }>;
}

const MobileMenu = ({ navLinks, location, onClose, SocialIcons }: MobileMenuProps) => {
  return (
    <div className="md:hidden bg-card border-t border-border animate-slide-down">
      <div className="container py-5 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={onClose}
            className={`block font-heading text-xl py-2.5 transition-colors ${
              location.pathname === link.path ? "text-primary" : "text-foreground/70"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <div className="pt-4 border-t border-border text-foreground/50">
          <SocialIcons />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
