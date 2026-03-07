import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RefreshCw, CheckCircle, XCircle } from "lucide-react";

const Returns = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-24 pb-12 bg-foreground text-background">
      <div className="container py-8">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-background/50 mb-2">Support</p>
        <h1 className="font-heading text-4xl md:text-5xl text-background">Returns & Exchanges</h1>
      </div>
    </section>
    <section className="py-12">
      <div className="container max-w-3xl space-y-8">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <RefreshCw className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg text-foreground">14-Day Return Policy</h2>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            We accept returns within 14 days of delivery. Items must be unworn, unwashed, and have all original tags attached.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl p-5 border border-border">
            <CheckCircle className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-heading text-sm text-foreground mb-2">Eligible for Return</h3>
            <ul className="font-body text-sm text-muted-foreground space-y-1.5">
              <li>• Unworn items with tags attached</li>
              <li>• Items in original packaging</li>
              <li>• Returns initiated within 14 days</li>
              <li>• Wrong size or defective items</li>
            </ul>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <XCircle className="h-5 w-5 text-destructive mb-3" />
            <h3 className="font-heading text-sm text-foreground mb-2">Not Eligible</h3>
            <ul className="font-body text-sm text-muted-foreground space-y-1.5">
              <li>• Worn or washed items</li>
              <li>• Items without tags</li>
              <li>• Sale or clearance items</li>
              <li>• Items returned after 14 days</li>
            </ul>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <h2 className="font-heading text-lg text-foreground mb-3">How to Return</h2>
          <ol className="font-body text-sm text-muted-foreground space-y-3 leading-relaxed list-decimal list-inside">
            <li>Contact us via Instagram DM or email with your order number.</li>
            <li>We'll provide return instructions and a shipping label if applicable.</li>
            <li>Ship the item back in its original packaging.</li>
            <li>Refund is processed within 5–7 business days after we receive the item.</li>
          </ol>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Returns;
