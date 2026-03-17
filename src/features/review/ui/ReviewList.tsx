"use client";

import { MOCK_REVIEWS } from "@/shared/lib/mocks";
import { ReviewCard } from "@/entities/review";
import { useReview } from "../model/useReview";

interface ReviewListProps {
  promptId: string;
}

export function ReviewList({ promptId }: ReviewListProps) {
  const { reviews: userReviews } = useReview();

  const mockReviews = MOCK_REVIEWS.filter((r) => r.promptId === promptId);
  const newReviews = userReviews.filter((r) => r.promptId === promptId);
  const allReviews = [...newReviews, ...mockReviews];

  if (allReviews.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        아직 리뷰가 없습니다. 첫 번째 리뷰를 남겨보세요!
      </p>
    );
  }

  return (
    <div>
      {allReviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
