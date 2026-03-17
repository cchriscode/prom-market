import { RatingStars } from "./RatingStars";
import type { Review } from "../model/types";

interface ReviewSummaryProps {
  reviews: Review[];
  avgRating?: number;
}

export function ReviewSummary({ reviews, avgRating }: ReviewSummaryProps) {
  const distribution = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    distribution[r.rating - 1]++;
  });
  const maxCount = Math.max(...distribution, 1);
  const computedAvg =
    avgRating ??
    (reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0);

  if (reviews.length === 0) return null;

  return (
    <div className="flex items-start gap-6">
      <div className="text-center">
        <div className="text-3xl font-bold font-mono">{computedAvg.toFixed(1)}</div>
        <RatingStars rating={computedAvg} size={16} className="mt-1" />
      </div>
      <div className="flex-1 space-y-1">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center gap-2">
            <span className="w-3 text-xs text-muted-foreground">{star}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-rating-bar"
                style={{
                  width: `${(distribution[star - 1] / maxCount) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
