import { Star, Eye, ShoppingCart, Heart } from "lucide-react";
import { MOCK_PROMPTS } from "@/shared/lib/mocks";
import { formatNumber } from "@/shared/lib/format";

interface PromptPerformanceProps {
  sellerId: string;
}

export function PromptPerformance({ sellerId }: PromptPerformanceProps) {
  const prompts = MOCK_PROMPTS
    .filter((p) => p.sellerId === sellerId)
    .sort((a, b) => b.salesCount - a.salesCount);

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-semibold">프롬프트 성과</h3>

      <div className="space-y-3">
        {prompts.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-3 rounded-md border border-border p-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted text-lg">
              {p.type === "IMAGE" ? "🖼️" : p.type === "VIDEO" ? "🎬" : "📝"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{p.title}</div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <ShoppingCart className="h-3 w-3" />
                  {formatNumber(p.salesCount)}
                </span>
                <span className="flex items-center gap-0.5">
                  <Eye className="h-3 w-3" />
                  {formatNumber(p.viewCount)}
                </span>
                <span className="flex items-center gap-0.5">
                  <Heart className="h-3 w-3" />
                  {formatNumber(p.favoriteCount)}
                </span>
                {p.avgRating && (
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {p.avgRating.toFixed(1)}
                  </span>
                )}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-sm font-bold font-mono">
                ${(p.price * p.salesCount * 0.8).toFixed(0)}
              </div>
              <div className="text-[10px] text-muted-foreground">총 수익</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
