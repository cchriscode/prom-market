import { Skeleton } from "@/shared/ui/skeleton";

export function SellSkeleton() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Wizard form */}
      <div className="min-w-0 flex-1 space-y-6">
        {/* Step indicator */}
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 flex-1 rounded-md" />
          ))}
        </div>

        {/* Form content */}
        <div className="space-y-4 rounded-lg border border-border p-6">
          <Skeleton className="h-5 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div className="w-full shrink-0 lg:w-72">
        <div className="space-y-3 rounded-lg border border-border p-4">
          <Skeleton className="h-5 w-24" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
