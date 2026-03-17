import { Skeleton } from "@/shared/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border p-8">
        <Skeleton className="mx-auto h-7 w-32" />
        <Skeleton className="mx-auto h-4 w-48" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="mx-auto h-4 w-40" />
      </div>
    </div>
  );
}
