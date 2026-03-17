import { Skeleton } from "@/shared/ui/skeleton";

export function PromptDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-6">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
        <div className="w-full lg:w-80">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
