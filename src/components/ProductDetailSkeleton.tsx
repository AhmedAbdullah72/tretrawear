import { Skeleton } from "@/components/ui/skeleton";

export const ProductDetailSkeleton = () => (
  <div className="container py-8 md:py-12">
    <Skeleton className="h-4 w-28 mb-6" />
    <div className="grid md:grid-cols-2 gap-6 md:gap-12">
      {/* Image gallery skeleton */}
      <div className="space-y-3">
        <Skeleton className="aspect-square rounded-xl" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-16 h-16 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Info panel skeleton */}
      <div className="space-y-4">
        <div>
          <Skeleton className="h-9 w-3/4 mb-2" />
          <Skeleton className="h-3.5 w-1/2" />
        </div>
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <div>
          <Skeleton className="h-3.5 w-16 mb-2" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-16 rounded-lg" />
            ))}
          </div>
        </div>
        <div>
          <Skeleton className="h-3.5 w-16 mb-2" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-16 rounded-lg" />
            ))}
          </div>
        </div>
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
    </div>
  </div>
);
