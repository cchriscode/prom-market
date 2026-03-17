import { cn } from "@/shared/lib/utils";
import { formatPrice } from "@/shared/lib/format";

interface PriceBadgeProps {
  price: number;
  discount?: number;
  className?: string;
}

export function PriceBadge({ price, discount, className }: PriceBadgeProps) {
  if (price === 0) {
    return (
      <span className={cn("text-xs font-semibold text-success", className)}>
        Free
      </span>
    );
  }

  const discountedPrice = discount
    ? price * (1 - discount / 100)
    : price;

  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      <span className="text-sm font-bold font-mono">
        {formatPrice(discountedPrice)}
      </span>
      {discount && (
        <>
          <span className="text-xs font-mono text-muted-foreground line-through">
            {formatPrice(price)}
          </span>
          <span className="text-xs font-medium text-destructive">
            -{discount}%
          </span>
        </>
      )}
    </span>
  );
}
