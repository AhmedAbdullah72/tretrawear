import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImage {
  node: {
    url: string;
    altText: string | null;
  };
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  imageAlts?: string[];
  productTitle: string;
  scrollToIndex?: number;
}

export const ProductImageGallery = ({ images, imageAlts = [], productTitle, scrollToIndex }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, skipSnaps: false });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  // Scroll to specific index when scrollToIndex changes (e.g. color variant selected)
  useEffect(() => {
    if (scrollToIndex !== undefined && scrollToIndex >= 0 && emblaApi) {
      emblaApi.scrollTo(scrollToIndex);
    }
  }, [scrollToIndex, emblaApi]);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!images.length) {
    return (
      <div className="aspect-[3/4] bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground">
        No image
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="aspect-[3/4] bg-secondary rounded-2xl overflow-hidden shadow-sm">
        <img
          src={images[0].node.url}
          alt={imageAlts[0] || images[0].node.altText || productTitle}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      {/* Desktop vertical thumbnails */}
      <div className="hidden md:flex flex-col gap-2 w-20 flex-shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={cn(
              "aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0",
              idx === selectedIndex
                ? "border-primary shadow-sm ring-1 ring-primary/20"
                : "border-transparent opacity-50 hover:opacity-100"
            )}
          >
            <img
              src={img.node.url}
              alt={imageAlts[idx] || ""}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Main carousel */}
      <div className="flex-1 relative group">
        <div className="overflow-hidden rounded-2xl shadow-sm" ref={emblaRef}>
          <div className="flex">
            {images.map((img, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0">
                <div className="aspect-[3/4] bg-secondary">
                  <img
                    src={img.node.url}
                    alt={imageAlts[idx] || img.node.altText || productTitle}
                    className="w-full h-full object-cover"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop arrow nav */}
        <button
          onClick={scrollPrev}
          className={cn(
            "hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm items-center justify-center shadow-md border border-border transition-all duration-200",
            selectedIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-0 group-hover:opacity-100"
          )}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <button
          onClick={scrollNext}
          className={cn(
            "hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm items-center justify-center shadow-md border border-border transition-all duration-200",
            selectedIndex === images.length - 1 ? "opacity-0 pointer-events-none" : "opacity-0 group-hover:opacity-100"
          )}
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>

        {/* Mobile dot indicators */}
        <div className="flex md:hidden justify-center gap-1.5 mt-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={cn(
                "rounded-full transition-all duration-300",
                idx === selectedIndex
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30"
              )}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>

        {/* Image counter */}
        <div className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm text-foreground text-xs font-body px-2.5 py-1 rounded-full border border-border/50">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};
