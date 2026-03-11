import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockUrgencyBadgeProps {
  quantityAvailable?: number | null;
  availableForSale?: boolean;
  variant?: "card" | "pdp";
  className?: string;
}

export const StockUrgencyBadge = ({
  quantityAvailable,
  availableForSale = true,
  variant = "card",
  className,
}: StockUrgencyBadgeProps) => {
  if (!availableForSale) return null;

  // Only show urgency when we have real data and stock is low (≤ 10)
  if (quantityAvailable == null || quantityAvailable > 10) return null;

  if (variant === "pdp") {
    return (
      <div className={cn(
        "inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-lg",
        className
      )}>
        <Flame className="h-4 w-4 animate-pulse" />
        <span className="font-heading text-xs tracking-wider uppercase">
          Only {quantityAvailable} left in stock — order soon!
        </span>
      </div>
    );
  }

  return (
    <div className={cn(
      "absolute top-3 left-3 inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-heading tracking-wider px-2.5 py-1 rounded-full shadow-lg",
      className
    )}>
      <Flame className="h-3 w-3" />
      Only {quantityAvailable} left
    </div>
  );
};
