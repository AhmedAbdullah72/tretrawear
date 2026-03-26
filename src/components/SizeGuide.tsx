import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Ruler } from "lucide-react";

const measurements = [
  { size: "S", chest: "96", length: "70", shoulder: "48", sleeve: "62" },
  { size: "M", chest: "102", length: "72", shoulder: "50", sleeve: "63" },
  { size: "L", chest: "108", length: "74", shoulder: "52", sleeve: "64" },
  { size: "XL", chest: "114", length: "76", shoulder: "54", sleeve: "65" },
  { size: "2XL", chest: "120", length: "78", shoulder: "56", sleeve: "66" },
  { size: "3XL", chest: "126", length: "80", shoulder: "58", sleeve: "67" },
];

const fitTips = [
  { label: "Relaxed Fit", desc: "Go with your regular size for a comfortable, oversized look." },
  { label: "Fitted Look", desc: "Size down one for a more tailored silhouette." },
  { label: "Layering", desc: "Stick to your regular size — our pieces layer perfectly over tees." },
];

export const SizeGuide = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id="size-guide-trigger" className="inline-flex items-center gap-1.5 font-body text-xs text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">
          <Ruler className="h-3.5 w-3.5" />
          Size Guide
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-foreground">Size Guide</DialogTitle>
        </DialogHeader>

        <p className="font-body text-xs text-muted-foreground mb-4">
          All measurements are in centimeters (cm). Our pieces feature a relaxed, oversized fit.
        </p>

        {/* Measurement Table */}
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-foreground text-background">
                <th className="font-heading text-xs tracking-wider py-3 px-3 text-left">Size</th>
                <th className="font-heading text-xs tracking-wider py-3 px-3 text-center">Chest</th>
                <th className="font-heading text-xs tracking-wider py-3 px-3 text-center">Length</th>
                <th className="font-heading text-xs tracking-wider py-3 px-3 text-center">Shoulder</th>
                <th className="font-heading text-xs tracking-wider py-3 px-3 text-center">Sleeve</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((row, i) => (
                <tr
                  key={row.size}
                  className={`border-t border-border transition-colors hover:bg-secondary/50 ${
                    i % 2 === 0 ? "bg-background" : "bg-card"
                  }`}
                >
                  <td className="font-heading text-xs py-3 px-3 text-primary">{row.size}</td>
                  <td className="font-body text-xs py-3 px-3 text-center text-foreground">{row.chest}</td>
                  <td className="font-body text-xs py-3 px-3 text-center text-foreground">{row.length}</td>
                  <td className="font-body text-xs py-3 px-3 text-center text-foreground">{row.shoulder}</td>
                  <td className="font-body text-xs py-3 px-3 text-center text-foreground">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Recommendations */}
        <div className="mt-6 space-y-3">
          <h3 className="font-heading text-sm tracking-wider text-foreground">Fit Recommendations</h3>
          {fitTips.map((tip) => (
            <div key={tip.label} className="flex gap-3 p-3 bg-background rounded-lg border border-border">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div>
                <p className="font-heading text-xs text-foreground">{tip.label}</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How to Measure */}
        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <h3 className="font-heading text-sm tracking-wider text-foreground mb-2">How to Measure</h3>
          <ul className="space-y-1.5 font-body text-xs text-muted-foreground">
            <li><span className="text-primary font-medium">Chest:</span> Measure around the fullest part of your chest.</li>
            <li><span className="text-primary font-medium">Length:</span> Measure from the highest point of the shoulder to the hem.</li>
            <li><span className="text-primary font-medium">Shoulder:</span> Measure from one shoulder seam to the other.</li>
            <li><span className="text-primary font-medium">Sleeve:</span> Measure from the shoulder seam to the cuff.</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
