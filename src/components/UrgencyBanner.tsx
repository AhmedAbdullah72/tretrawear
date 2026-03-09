import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Marquee } from "./Marquee";

export const UrgencyBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999);

    const tick = () => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();
      if (diff <= 0) return;
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="bg-primary text-primary-foreground overflow-hidden">
      {/* Marquee */}
      <div className="py-3">
        <Marquee
          items={[
            "SUMMER COLLECTION NOW LIVE",
            "LIMITED TIME OFFER — BUY 1 GET 1 FREE",
            "USE CODE: BUY1GET1",
            "FREE SHIPPING OVER 1,500 EGP",
            "WIDE-LEG SWEATPANTS • OVERSIZED TEES • BASICS",
          ]}
          speed="normal"
        />
      </div>

      {/* Countdown */}
      <div className="border-t border-primary-foreground/20 py-4">
        <div className="container flex items-center justify-center gap-6">
          <Clock className="h-5 w-5" />
          <p className="font-body text-sm font-semibold tracking-wide">OFFER ENDS IN:</p>
          <div className="flex gap-3">
            {[
              { val: timeLeft.hours, label: "HRS" },
              { val: timeLeft.minutes, label: "MIN" },
              { val: timeLeft.seconds, label: "SEC" },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-1 bg-primary-foreground/10 rounded-lg px-3 py-1">
                <span className="font-heading text-2xl tabular-nums">{pad(t.val)}</span>
                <span className="font-body text-[10px] tracking-wider opacity-70">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
