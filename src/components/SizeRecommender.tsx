import { useState } from "react";
import { Scale, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sizeChart = [
  { size: "S", minWeight: 50, maxWeight: 60 },
  { size: "M", minWeight: 60, maxWeight: 72 },
  { size: "L", minWeight: 72, maxWeight: 85 },
  { size: "XL", minWeight: 85, maxWeight: 97 },
  { size: "2XL", minWeight: 97, maxWeight: 110 },
  { size: "3XL", minWeight: 110, maxWeight: 130 },
];

interface SizeRecommenderProps {
  onSizeSelect?: (size: string) => void;
}

export const SizeRecommender = ({ onSizeSelect }: SizeRecommenderProps) => {
  const [weight, setWeight] = useState<number | "">("");
  const [recommended, setRecommended] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const recommend = () => {
    if (!weight) return;
    const w = Number(weight);
    const match = sizeChart.find(s => w >= s.minWeight && w < s.maxWeight);
    const result = match?.size || (w >= 130 ? "3XL" : "S");
    setRecommended(result);
    onSizeSelect?.(result);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 font-heading text-xs tracking-wider text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-lg"
      >
        <Scale className="h-3.5 w-3.5" />
        Find Your Size by Weight
        <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-card rounded-xl border border-border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={40}
                  max={150}
                  placeholder="Your weight (kg)"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value ? Number(e.target.value) : "");
                    setRecommended(null);
                  }}
                  className="flex-1 bg-background border border-border rounded-lg px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={recommend}
                  disabled={!weight}
                  className="bg-primary text-primary-foreground font-heading text-xs tracking-wider px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Find Size
                </button>
              </div>

              <AnimatePresence>
                {recommended && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary/10 rounded-lg p-3 text-center"
                  >
                    <p className="font-body text-xs text-muted-foreground">We recommend</p>
                    <p className="font-heading text-2xl text-primary">{recommended}</p>
                    <p className="font-body text-[11px] text-muted-foreground mt-1">
                      For a relaxed, oversized fit at {weight}kg
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="font-body text-[10px] text-muted-foreground text-center">
                Based on our oversized fit. Size down for a more fitted look.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
