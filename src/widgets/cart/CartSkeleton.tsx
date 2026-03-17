import { Skeleton } from "@/shared/ui/skeleton";

export function CartSkeleton() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Item list */}
      <div className="min-w-0 flex-1 space-y-3">
        <Skeleton className="h-4 w-20" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-lg border border-border p-4"
          >
            <Skeleton className="h-14 w-14 shrink-0 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div className="w-full shrink-0 lg:w-80">
        <div className="space-y-4 rounded-lg border border-border p-5">
          <Skeleton className="h-5 w-20" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
          <Skeleton className="h-px w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
