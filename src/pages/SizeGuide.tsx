import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Ruler } from "lucide-react";
import { SEO } from "@/components/SEO";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const categories = [
  {
    name: "Half-Zip Collection",
    description: "Our signature half-zip hoodies feature a relaxed, oversized drop-shoulder silhouette. The measurements below apply to all colors in this collection.",
  },
  {
    name: "Fur-Lined Collection",
    description: "Fur-lined hoodies have the same exterior dimensions as our standard pieces. The plush interior adds minimal bulk while maximizing warmth.",
  },
  {
    name: "DTF Printed Collection",
    description: "All DTF printed hoodies follow the same oversized fit. Graphics are positioned to complement the relaxed silhouette.",
  },
];

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Size Guide | TRETRA Wear"
        description="Find your perfect fit. TRETRA Wear's full measurement chart (cm) for hoodies, half-zips, tees, and sweatpants — sizes S to 3XL."
        path="/size-guide"
      />
      <Navbar />
      
      <main className="pb-16" style={{ paddingTop: 'calc(96px + var(--banner-offset))' }}>
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Ruler className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Size Guide
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              All TRETRA pieces feature a relaxed, oversized fit. Use our measurement guide below to find your perfect size across all collections.
            </p>
          </div>

          {/* Universal Measurement Table */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl text-foreground mb-4">
              Universal Measurements
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-6">
              All measurements are in centimeters (cm). These dimensions apply to all product categories.
            </p>
            
            <div className="rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-foreground hover:bg-foreground">
                    <TableHead className="font-heading text-xs tracking-wider text-background">Size</TableHead>
                    <TableHead className="font-heading text-xs tracking-wider text-background text-center">Chest</TableHead>
                    <TableHead className="font-heading text-xs tracking-wider text-background text-center">Length</TableHead>
                    <TableHead className="font-heading text-xs tracking-wider text-background text-center">Shoulder</TableHead>
                    <TableHead className="font-heading text-xs tracking-wider text-background text-center">Sleeve</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {measurements.map((row, i) => (
                    <TableRow
                      key={row.size}
                      className={i % 2 === 0 ? "bg-background" : "bg-card"}
                    >
                      <TableCell className="font-heading text-sm text-primary">{row.size}</TableCell>
                      <TableCell className="font-body text-sm text-center text-foreground">{row.chest}</TableCell>
                      <TableCell className="font-body text-sm text-center text-foreground">{row.length}</TableCell>
                      <TableCell className="font-body text-sm text-center text-foreground">{row.shoulder}</TableCell>
                      <TableCell className="font-body text-sm text-center text-foreground">{row.sleeve}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Category Notes */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl text-foreground mb-6">
              Collection-Specific Notes
            </h2>
            <div className="grid gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="p-6 bg-card rounded-xl border border-border"
                >
                  <h3 className="font-heading text-lg text-foreground mb-2">{cat.name}</h3>
                  <p className="font-body text-sm text-muted-foreground">{cat.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Fit Recommendations */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl text-foreground mb-6">
              Fit Recommendations
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {fitTips.map((tip) => (
                <div
                  key={tip.label}
                  className="p-5 bg-background rounded-xl border border-border"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-heading text-sm text-foreground mb-1">{tip.label}</p>
                      <p className="font-body text-xs text-muted-foreground">{tip.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Measure */}
          <section className="p-6 md:p-8 bg-primary/5 rounded-xl border border-primary/10">
            <h2 className="font-heading text-xl text-foreground mb-4">
              How to Measure
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="font-body text-sm">
                  <span className="text-primary font-medium">Chest:</span>
                  <span className="text-muted-foreground ml-2">Measure around the fullest part of your chest, keeping the tape horizontal.</span>
                </div>
                <div className="font-body text-sm">
                  <span className="text-primary font-medium">Length:</span>
                  <span className="text-muted-foreground ml-2">Measure from the highest point of the shoulder to the bottom hem.</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="font-body text-sm">
                  <span className="text-primary font-medium">Shoulder:</span>
                  <span className="text-muted-foreground ml-2">Measure from one shoulder seam straight across to the other.</span>
                </div>
                <div className="font-body text-sm">
                  <span className="text-primary font-medium">Sleeve:</span>
                  <span className="text-muted-foreground ml-2">Measure from the shoulder seam down to the cuff edge.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Still Unsure */}
          <section className="mt-12 text-center">
            <p className="font-body text-sm text-muted-foreground mb-2">
              Still unsure about your size?
            </p>
            <a
              href="https://wa.me/201024888818"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-heading text-sm text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
            >
              Chat with us on WhatsApp
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SizeGuide;
