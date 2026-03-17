import { Skeleton } from "@/shared/ui/skeleton";

export function LeaderboardSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-lg border border-border p-4"
        >
          <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="space-y-1 text-right">
            <Skeleton className="ml-auto h-4 w-12" />
            <Skeleton className="ml-auto h-3 w-8" />
          </div>
          <div className="space-y-1 text-right">
            <Skeleton className="ml-auto h-4 w-12" />
            <Skeleton className="ml-auto h-3 w-8" />
          </div>
        </div>
      ))}
    </div>
  );
}
