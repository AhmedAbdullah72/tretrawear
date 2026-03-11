import { forwardRef } from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Generates a consistent pseudo-random stock number (2-7) based on the product handle.
 * This creates believable urgency without needing real inventory data.
 */
function getUrgencyCount(handle: string): number {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    hash = ((hash << 5) - hash) + handle.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 6) + 2; // 2–7
}

interface StockUrgencyBadgeProps {
  handle: string;
  availableForSale?: boolean;
  variant?: "card" | "pdp";
  className?: string;
}

export const StockUrgencyBadge = forwardRef<HTMLDivElement, StockUrgencyBadgeProps>(({
  handle,
  availableForSale = true,
  variant = "card",
  className,
}, ref) => {
  if (!availableForSale) return null;

  const count = getUrgencyCount(handle);

  if (variant === "pdp") {
    return (
      <div ref={ref} className={cn(
        "inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-lg",
        className
      )}>
        <Flame className="h-4 w-4 animate-pulse" />
        <span className="font-heading text-xs tracking-wider uppercase">
          Only {count} left in stock — order soon!
        </span>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn(
      "absolute top-3 left-3 inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-heading tracking-wider px-2.5 py-1 rounded-full shadow-lg",
      className
    )}>
      <Flame className="h-3 w-3" />
      Only {count} left
    </div>
  );
});

StockUrgencyBadge.displayName = "StockUrgencyBadge";
