import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import type { ProductCopy } from "@/lib/productCopy";

interface ProductCopySectionsProps {
  copy: ProductCopy;
}

export const ProductBenefits = ({ copy }: ProductCopySectionsProps) => (
  <div className="bg-card rounded-xl p-5 border border-border space-y-3">
    <p className="font-heading text-base text-foreground italic">{copy.hook}</p>
    <ul className="space-y-2">
      {copy.benefits.map((b, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <div className="w-5 h-5 mt-0.5 flex items-center justify-center bg-primary/10 rounded-full flex-shrink-0">
            <Check className="h-3 w-3 text-primary" />
          </div>
          <span className="font-body text-sm text-muted-foreground">{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const ProductSpecsTable = ({ copy }: ProductCopySectionsProps) => (
  <div className="bg-card rounded-xl border border-border overflow-hidden">
    <h3 className="font-heading text-xs tracking-wider text-foreground px-5 pt-4 pb-2">Specifications</h3>
    <Table>
      <TableBody>
        {[
          ["Material", copy.specs.material],
          ["Size", copy.specs.size],
          ["Care", copy.specs.care],
          ["Shipping", copy.specs.shipping],
        ].map(([key, value]) => (
          <TableRow key={key} className="border-border/50">
            <TableCell className="font-heading text-xs tracking-wider text-foreground w-24 py-3">{key}</TableCell>
            <TableCell className="font-body text-sm text-muted-foreground py-3">{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const ProductFAQs = ({ copy }: ProductCopySectionsProps) => (
  <div>
    <h3 className="font-heading text-xs tracking-wider text-foreground mb-3">Common Questions</h3>
    <Accordion type="single" collapsible className="space-y-2">
      {copy.faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i}`}
          className="border border-border bg-card rounded-lg px-4 data-[state=open]:border-primary/30 transition-all"
        >
          <AccordionTrigger className="font-heading text-sm text-foreground hover:no-underline hover:text-primary transition-colors py-3">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);
