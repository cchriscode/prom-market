import { Skeleton } from "@/shared/ui/skeleton";

export function ChatSkeleton() {
  return (
    <div className="flex h-[calc(100vh-180px)] overflow-hidden rounded-lg border border-border">
      {/* Conversation list */}
      <div className="w-full shrink-0 space-y-2 border-r border-border p-2 md:w-72">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg p-3">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
        ))}
      </div>

      {/* Chat window */}
      <div className="hidden flex-1 flex-col md:flex">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex-1 space-y-3 p-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <Skeleton
                className={`h-10 rounded-2xl ${i % 2 === 0 ? "w-48" : "w-36"}`}
              />
            </div>
          ))}
        </div>
        <div className="border-t border-border p-4">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
