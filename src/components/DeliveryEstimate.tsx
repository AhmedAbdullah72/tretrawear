import { Clock, ShoppingBag, Truck, MapPin, RefreshCw, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

function getDeliveryDates() {
  const now = new Date();
  const purchased = new Date(now);
  const processing = new Date(now);
  processing.setDate(processing.getDate() + 1);
  const deliverStart = new Date(now);
  deliverStart.setDate(deliverStart.getDate() + 2);
  const deliverEnd = new Date(now);
  deliverEnd.setDate(deliverEnd.getDate() + 3);

  const fmt = (d: Date) => `${d.toLocaleString("en-US", { month: "short" })} ${d.getDate()}`;

  return {
    purchased: fmt(purchased),
    processing: fmt(processing),
    deliverStart: fmt(deliverStart),
    deliverEnd: fmt(deliverEnd),
    deliverStartFull: `${String(deliverStart.getDate()).padStart(2, "0")}/${String(deliverStart.getMonth() + 1).padStart(2, "0")}/${deliverStart.getFullYear()}`,
    deliverEndFull: `${String(deliverEnd.getDate()).padStart(2, "0")}/${String(deliverEnd.getMonth() + 1).padStart(2, "0")}/${deliverEnd.getFullYear()}`,
  };
}

function useCountdown() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  const diff = Math.max(0, endOfDay.getTime() - now.getTime());
  const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  return `${h} : ${m} : ${s}`;
}

export const DeliveryEstimate = () => {
  const countdown = useCountdown();
  const dates = getDeliveryDates();

  return (
    <div className="space-y-3">
      {/* Countdown line */}
      <div className="flex items-start gap-2 text-sm font-body">
        <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-foreground">
          Order today within{" "}
          <span className="font-heading font-bold tabular-nums">{countdown}</span>
          , you'll receive your package between{" "}
          <span className="font-heading font-bold">{dates.deliverStartFull}</span>
          {" "}to{" "}
          <span className="font-heading font-bold">{dates.deliverEndFull}</span>
        </p>
      </div>

      {/* Timeline + Trust Signals combined */}
      <div className="bg-secondary/60 rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between relative">
          {/* Connector line */}
          <div className="absolute top-5 left-[15%] right-[15%] h-[2px] bg-border" />

          {[
            { icon: ShoppingBag, label: "Purchased", date: dates.purchased },
            { icon: Truck, label: "Processing", date: dates.processing },
            { icon: MapPin, label: "Delivered", date: `${dates.deliverStart.split(" ")[1]} - ${dates.deliverEnd.split(" ")[1]}` },
          ].map((step, i) => (
            <div key={step.label} className="flex flex-col items-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center mb-1.5">
                <step.icon className="h-4 w-4 text-foreground" />
              </div>
              <p className="font-heading text-xs text-foreground">{step.label}</p>
              <p className="font-body text-[11px] text-muted-foreground">
                {i === 2 ? `${dates.deliverStart.split(" ")[0]} ${dates.deliverStart.split(" ")[1]} - ${dates.deliverEnd.split(" ")[1]}` : step.date}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="border-t border-border/60 pt-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Over 1,500 EGP" },
              { icon: RefreshCw, label: "Easy Returns", sub: "14-day policy" },
              { icon: CreditCard, label: "Cash on Delivery", sub: "Pay at your door" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                  <item.icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <p className="font-heading text-[10px] tracking-wider text-foreground">{item.label}</p>
                <p className="font-body text-[9px] text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
