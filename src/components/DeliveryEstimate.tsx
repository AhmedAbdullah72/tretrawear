import { ShoppingBag, Truck, MapPin, RefreshCw, CreditCard } from "lucide-react";

/**
 * Delivery wording comes straight from the published store shipping policy
 * (/shipping): orders are processed in 1–2 business days and most deliveries
 * arrive within 2–5 business days anywhere in Egypt. We deliberately do NOT
 * render exact calendar dates — the store has no courier-level date API, so a
 * client-side date offset would be false precision.
 */
const PROCESSING_WINDOW = "1–2 business days";
const DELIVERY_WINDOW = "2–5 business days";

interface DeliveryEstimateProps {
  /**
   * Compact mode renders only the reassurance lines that belong directly
   * under Add to Cart. The full timeline lives inside the Shipping accordion.
   */
  compact?: boolean;
}

export const DeliveryEstimate = ({ compact = false }: DeliveryEstimateProps) => {
  if (compact) {
    return (
      <div className="space-y-1.5">
        <div className="flex items-start gap-2 font-body text-xs">
          <Truck className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-muted-foreground">
            Delivery in{" "}
            <span className="text-foreground font-semibold">{DELIVERY_WINDOW}</span> across Egypt
          </p>
        </div>
        <p className="font-body text-xs text-muted-foreground pl-[22px]">
          Free shipping over 1,500 EGP · Cash on delivery
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="bg-secondary/60 rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between relative">
          {/* Connector line */}
          <div className="absolute top-5 left-[15%] right-[15%] h-[2px] bg-border" />

          {[
            { icon: ShoppingBag, label: "Ordered", date: "Today" },
            { icon: Truck, label: "Processing", date: PROCESSING_WINDOW },
            { icon: MapPin, label: "Delivered", date: DELIVERY_WINDOW },
          ].map((step) => (
            <div key={step.label} className="flex flex-col items-center relative z-10 w-1/3 text-center">
              <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center mb-1.5">
                <step.icon className="h-4 w-4 text-foreground" />
              </div>
              <p className="font-body font-semibold text-xs text-foreground">{step.label}</p>
              <p className="font-body text-[11px] text-muted-foreground">{step.date}</p>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="border-t border-border/60 pt-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Over 1,500 EGP" },
              { icon: RefreshCw, label: "Exchanges", sub: "14 days, tags on" },
              { icon: CreditCard, label: "Cash on Delivery", sub: "Pay at your door" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                  <item.icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <p className="font-body font-semibold text-[10px] tracking-wider text-foreground">{item.label}</p>
                <p className="font-body text-[9px] text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
