import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => (
  <div className="block">
    <Skeleton className="aspect-[3/4] rounded-xl mb-3" />
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-3.5 w-1/3" />
  </div>
);

export const ProductGridSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);
