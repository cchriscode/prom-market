import { ShoppingBag, Eye, Trophy } from "lucide-react";
import type { User } from "@/entities/user";
import { SellerTierBadge } from "@/entities/user";
import { formatNumber } from "@/shared/lib/format";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex items-start gap-6">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-muted text-2xl font-bold">
        {user.name.charAt(0)}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <SellerTierBadge tier={user.sellerTier} />
        </div>
        <p className="text-sm text-muted-foreground">@{user.username}</p>
        {user.bio && (
          <p className="text-sm leading-relaxed">{user.bio}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <ShoppingBag className="h-3.5 w-3.5" />
            {formatNumber(user.totalSales)} 판매
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {formatNumber(user.totalViews)} 조회
          </span>
          {user.rank && (
            <span className="flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5" />
              #{user.rank} 랭킹
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
