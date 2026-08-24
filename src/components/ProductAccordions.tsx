import type { ReactNode } from "react";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DeliveryEstimate } from "@/components/DeliveryEstimate";
import type { ProductCopy } from "@/lib/productCopy";

interface ProductAccordionsProps {
  copy: ProductCopy;
  /** Product Details opens by default on desktop only. */
  defaultOpen?: string;
  /** Optional size-finder rendered inside Size & Fit. */
  sizeHelper?: ReactNode;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <TableRow className="border-border/50">
    <TableCell className="font-body font-semibold text-xs tracking-wider text-foreground w-32 py-3 align-top">
      {label}
    </TableCell>
    <TableCell className="font-body text-sm text-muted-foreground py-3">{value}</TableCell>
  </TableRow>
);

/**
 * Secondary product information, grouped into five collapsed sections that sit
 * below the primary Add to Cart. Nothing here is duplicated above the fold.
 */
export const ProductAccordions = ({ copy, defaultOpen, sizeHelper }: ProductAccordionsProps) => {
  // Material / care rows come from detailedSpecs when the product provides
  // them, otherwise from the category defaults.
  const materialRows = (copy.detailedSpecs ?? []).filter(({ label }) =>
    /material|fabric|cotton|weight|gsm|care|wash/i.test(label)
  );

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen}
      className="w-full border-t border-border"
    >
      {/* 1. PRODUCT DETAILS */}
      <AccordionItem value="details" className="border-b border-border">
        <AccordionTrigger className="font-body font-semibold text-sm tracking-wider text-foreground hover:no-underline hover:text-primary py-4">
          Product Details
        </AccordionTrigger>
        <AccordionContent className="pb-5 space-y-4">
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {copy.description || copy.collectionIntro}
          </p>

          {copy.included && copy.included.length > 0 && (
            <div>
              <p className="font-body font-semibold text-xs tracking-wider text-foreground uppercase mb-2">
                What's Included
              </p>
              <ul className="space-y-1.5">
                {copy.included.map((item) => (
                  <li key={item} className="flex items-center gap-2 font-body text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
        </AccordionContent>
      </AccordionItem>

      {/* 2. SIZE & FIT */}
      <AccordionItem value="size-fit" className="border-b border-border">
        <AccordionTrigger className="font-body font-semibold text-sm tracking-wider text-foreground hover:no-underline hover:text-primary py-4">
          Size &amp; Fit
        </AccordionTrigger>
        <AccordionContent className="pb-5 space-y-4">
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {copy.specs.size}
          </p>

          {copy.singleSize && (
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-body font-semibold text-sm tracking-wider text-foreground uppercase">
                  {copy.singleSize.label} Fit
                </p>
                <span className="font-body font-semibold text-[10px] tracking-wider bg-primary/10 text-primary px-2 py-1 rounded uppercase">
                  {copy.singleSize.fit}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground mb-3">Designed to comfortably fit:</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wide">Weight</p>
                  <p className="font-body font-semibold text-sm text-foreground mt-0.5">{copy.singleSize.weightRange}</p>
                </div>
                <div>
                  <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wide">Height</p>
                  <p className="font-body font-semibold text-sm text-foreground mt-0.5">{copy.singleSize.heightRange}</p>
                </div>
                {copy.singleSize.suitableFor && (
                  <div className="col-span-2">
                    <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wide">Suitable For</p>
                    <p className="font-body font-semibold text-sm text-foreground mt-0.5">{copy.singleSize.suitableFor}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {copy.modelInfo && (
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="font-body font-semibold text-xs tracking-wider text-foreground uppercase mb-3">
                Model Information
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wide">Height</p>
                  <p className="font-body font-semibold text-sm text-foreground mt-0.5">{copy.modelInfo.height}</p>
                </div>
                <div>
                  <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wide">Weight</p>
                  <p className="font-body font-semibold text-sm text-foreground mt-0.5">{copy.modelInfo.weight}</p>
                </div>
                <div>
                  <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wide">Wearing</p>
                  <p className="font-body font-semibold text-sm text-foreground mt-0.5">{copy.modelInfo.wearing}</p>
                </div>
              </div>
            </div>
          )}

          {sizeHelper}
        </AccordionContent>
      </AccordionItem>

      {/* 3. MATERIAL & CARE */}
      <AccordionItem value="material" className="border-b border-border">
        <AccordionTrigger className="font-body font-semibold text-sm tracking-wider text-foreground hover:no-underline hover:text-primary py-4">
          Material &amp; Care
        </AccordionTrigger>
        <AccordionContent className="pb-5">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableBody>
                {materialRows.length > 0 ? (
                  materialRows.map(({ label, value }) => <Row key={label} label={label} value={value} />)
                ) : (
                  <>
                    <Row label="Material" value={copy.specs.material} />
                    <Row label="Care" value={copy.specs.care} />
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 4. SHIPPING & DELIVERY */}
      <AccordionItem value="shipping" className="border-b border-border">
        <AccordionTrigger className="font-body font-semibold text-sm tracking-wider text-foreground hover:no-underline hover:text-primary py-4">
          Shipping &amp; Delivery
        </AccordionTrigger>
        <AccordionContent className="pb-5 space-y-3">
          <DeliveryEstimate />
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {copy.specs.shipping}
          </p>
        </AccordionContent>
      </AccordionItem>

      {/* 5. EXCHANGE / RETURNS */}
      <AccordionItem value="returns" className="border-b border-border">
        <AccordionTrigger className="font-body font-semibold text-sm tracking-wider text-foreground hover:no-underline hover:text-primary py-4">
          Exchange / Returns
        </AccordionTrigger>
        <AccordionContent className="pb-5 space-y-2">
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            You have 14 days from delivery to return or exchange your order. Items need to be
            unworn, unwashed and with the tags still attached.
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Message us on WhatsApp with your order number and we'll send you the exchange
            instructions right away.
          </p>
          <a
            href="/returns"
            className="inline-block font-body text-sm text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
          >
            Full returns &amp; exchanges policy
          </a>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
