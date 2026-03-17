import { SELLER_TIERS } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";
import type { SellerTier } from "../model/types";

interface SellerTierBadgeProps {
  tier: SellerTier;
  className?: string;
}

export function SellerTierBadge({ tier, className }: SellerTierBadgeProps) {
  const config = SELLER_TIERS[tier];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        config.color,
        config.bg,
        className
      )}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
}
