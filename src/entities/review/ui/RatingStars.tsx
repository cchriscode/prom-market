import { Star } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface RatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
}

export function RatingStars({ rating, size = 14, className }: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={cn(
            i < Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  );
}
