import { useState, useEffect } from "react";
import { Flame, Clock } from "lucide-react";

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
      <div className="py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-2 mx-8 font-heading text-sm tracking-wider">
              <Flame className="h-4 w-4" />
              LIMITED TIME OFFER — BUY 1 GET 1 FREE
              <span className="mx-4">•</span>
              USE CODE: BUY1GET1
            </span>
          ))}
        </div>
      </div>

      {/* Countdown */}
      <div className="border-t border-primary-foreground/20 py-4">
        <div className="container flex items-center justify-center gap-6">
          <Clock className="h-5 w-5" />
          <p className="font-body text-sm font-semibold tracking-wide">OFFER ENDS IN:</p>
          <div className="flex gap-2">
            {[
              { val: timeLeft.hours, label: "HRS" },
              { val: timeLeft.minutes, label: "MIN" },
              { val: timeLeft.seconds, label: "SEC" },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-1">
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
