import { Skeleton } from "@/shared/ui/skeleton";

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <div className="space-y-10">
      {/* Hero skeleton */}
      <Skeleton className="h-80 w-full rounded-xl" />

      {/* Section skeleton (repeated for Featured / Trending) */}
      {[1, 2].map((section) => (
        <div key={section} className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="min-w-[220px]">
                <CardSkeleton />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Category grid skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-28" />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Grid section skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-36" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
