import { Flame } from "lucide-react";

interface MarqueeProps {
  items?: string[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export const Marquee = ({
  items = [
    "NEW COLLECTION 2026",
    "FREE SHIPPING OVER 1,500 EGP",
    "PREMIUM QUALITY",
    "14-DAY RETURNS",
    "BUY 1 GET 1 FREE — CODE: BUY1GET1",
  ],
  speed = "normal",
  className = "",
}: MarqueeProps) => {
  const speedClass = {
    slow: "animate-marquee-slow",
    normal: "animate-marquee",
    fast: "animate-marquee-fast",
  }[speed];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-flex ${speedClass}`}>
        {[...Array(2)].map((_, setIdx) => (
          <div key={setIdx} className="inline-flex items-center">
            {items.map((item, i) => (
              <span
                key={`${setIdx}-${i}`}
                className="inline-flex items-center gap-2 mx-8 font-heading text-sm tracking-wider"
              >
                <Flame className="h-3.5 w-3.5 opacity-70" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
