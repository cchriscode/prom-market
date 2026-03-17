import Link from "next/link";
import { Trophy } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { MOCK_SELLERS } from "@/shared/lib/mocks";
import { SellerTierBadge } from "@/entities/user";
import { formatNumber } from "@/shared/lib/format";

export function LeaderboardWidget() {
  const ranked = [...MOCK_SELLERS]
    .filter((s) => s.rank != null)
    .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999));

  return (
    <div className="space-y-3">
      {ranked.map((seller, i) => (
        <Link
          key={seller.id}
          href={`/profile/${seller.username}`}
          className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50"
        >
          {/* Rank */}
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
              i === 0
                ? "bg-yellow-100 text-yellow-700"
                : i === 1
                  ? "bg-gray-100 text-gray-600"
                  : i === 2
                    ? "bg-orange-100 text-orange-700"
                    : "bg-muted text-muted-foreground"
            )}
          >
            {seller.rank}
          </div>

          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
            {seller.name.charAt(0)}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{seller.name}</span>
              <SellerTierBadge tier={seller.sellerTier} />
            </div>
            <span className="text-xs text-muted-foreground">@{seller.username}</span>
          </div>

          {/* Stats */}
          <div className="shrink-0 text-right">
            <div className="text-sm font-bold">{formatNumber(seller.totalSales)}</div>
            <div className="text-[10px] text-muted-foreground">판매</div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-sm font-bold">{formatNumber(seller.totalViews)}</div>
            <div className="text-[10px] text-muted-foreground">조회</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
