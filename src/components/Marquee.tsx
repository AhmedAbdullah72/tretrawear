import { Flame } from "lucide-react";

interface MarqueeProps {
  items?: string[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export const Marquee = ({
  items = [
    "Pay on Delivery",
    "2–5 Day Delivery",
    "14-Day Exchange",
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
