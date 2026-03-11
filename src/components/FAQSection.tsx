import { forwardRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { q: "What sizes do you offer?", a: "We offer sizes S through 3XL. All our pieces feature an oversized fit, so we recommend sizing down if you prefer a more fitted look." },
  { q: "How long does shipping take?", a: "Domestic orders (Egypt) ship within 2-4 business days. International orders typically arrive within 7-14 business days." },
  { q: "What is your return policy?", a: "We accept returns within 14 days of delivery for unworn items with original tags attached." },
  { q: "How do I track my order?", a: "Once your order ships, you'll receive an email with a tracking number." },
  { q: "Are your products true to size?", a: "Our pieces are designed with an oversized, drop-shoulder fit. For a more fitted look, size down one." },
  { q: "Do you offer international shipping?", a: "Yes! We ship worldwide. Free shipping is available on domestic orders over 1,500 EGP." },
];

export const FAQSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Got Questions?</p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">
            FREQUENTLY <span className="text-primary">ASKED</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border bg-card rounded-xl px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-sm transition-all"
              >
                <AccordionTrigger className="font-heading text-sm md:text-base text-foreground hover:no-underline hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
});

FAQSection.displayName = "FAQSection";
