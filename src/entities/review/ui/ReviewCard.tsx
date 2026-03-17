import type { Review } from "../model/types";
import { RatingStars } from "./RatingStars";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="space-y-2 border-b border-border py-4 last:border-0">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
          {review.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">@{review.username}</span>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <RatingStars rating={review.rating} size={12} />
        </div>
      </div>
      {review.comment && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {review.comment}
        </p>
      )}
    </div>
  );
}
