import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { formatNumber } from "@/shared/lib/format";
import type { User } from "../model/types";
import { SellerTierBadge } from "./SellerTierBadge";
import { UserAvatar } from "./UserAvatar";

interface SellerCardProps {
  seller: User;
  className?: string;
}

export function SellerCard({ seller, className }: SellerCardProps) {
  return (
    <Link
      href={`/profile/${seller.username}`}
      className={cn(
        "flex flex-col items-center rounded-lg border border-border bg-card p-5 text-center transition-all duration-150 hover:-translate-y-px hover:shadow-md",
        className
      )}
    >
      <UserAvatar name={seller.name} avatar={seller.avatar} size="lg" />
      <h4 className="mt-3 text-sm font-semibold">{seller.name}</h4>
      <span className="text-xs text-muted-foreground">@{seller.username}</span>
      <SellerTierBadge tier={seller.sellerTier} className="mt-2" />
      {seller.bio && (
        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
          {seller.bio}
        </p>
      )}
      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <ShoppingCart className="h-3 w-3" />
          {formatNumber(seller.totalSales)}
        </span>
        <span className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          {formatNumber(seller.totalViews)}
        </span>
      </div>
    </Link>
  );
}
