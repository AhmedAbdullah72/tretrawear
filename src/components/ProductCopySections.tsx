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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProductCopy } from "@/lib/productCopy";

interface ProductCopySectionsProps {
  copy: ProductCopy;
}

/** Compact tabbed section that replaces 4 separate blocks */
export const ProductDetailTabs = ({ copy }: ProductCopySectionsProps) => (
  <Tabs defaultValue="benefits" className="w-full">
    <TabsList className="w-full bg-card border border-border rounded-xl h-auto p-1 gap-1">
      <TabsTrigger value="benefits" className="flex-1 font-heading text-[11px] tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-2">
        Benefits
      </TabsTrigger>
      <TabsTrigger value="details" className="flex-1 font-heading text-[11px] tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-2">
        Details
      </TabsTrigger>
      <TabsTrigger value="specs" className="flex-1 font-heading text-[11px] tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-2">
        Specs
      </TabsTrigger>
      <TabsTrigger value="faqs" className="flex-1 font-heading text-[11px] tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-2">
        FAQs
      </TabsTrigger>
    </TabsList>

    <TabsContent value="benefits" className="mt-3">
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
    </TabsContent>

    <TabsContent value="details" className="mt-3">
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{copy.collectionIntro}</p>
    </TabsContent>

    <TabsContent value="specs" className="mt-3">
      <div className="bg-card rounded-xl border border-border overflow-hidden">
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
    </TabsContent>

    <TabsContent value="faqs" className="mt-3">
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
    </TabsContent>
  </Tabs>
);

// Keep legacy exports for backward compat
export const ProductBenefits = ({ copy }: ProductCopySectionsProps) => (
  <ProductDetailTabs copy={copy} />
);
export const ProductSpecsTable = ({ copy }: ProductCopySectionsProps) => null;
export const ProductFAQs = ({ copy }: ProductCopySectionsProps) => null;
