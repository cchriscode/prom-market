import { Skeleton } from "@/shared/ui/skeleton";

export function MarketplaceSkeleton() {
  return (
    <div className="flex gap-6">
      {/* Sidebar skeleton */}
      <div className="hidden w-56 shrink-0 space-y-4 lg:block">
        <Skeleton className="h-5 w-16" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-full rounded-full" />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
