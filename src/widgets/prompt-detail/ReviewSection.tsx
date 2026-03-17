"use client";

import { MOCK_REVIEWS } from "@/shared/lib/mocks";
import { ReviewSummary } from "@/entities/review";
import { WriteReviewForm, ReviewList } from "@/features/review";
import { useReview } from "@/features/review/model/useReview";

interface ReviewSectionProps {
  promptId: string;
  avgRating?: number;
  reviewCount: number;
}

export function ReviewSection({ promptId, avgRating }: ReviewSectionProps) {
  const { reviews: userReviews } = useReview();

  const mockReviews = MOCK_REVIEWS.filter((r) => r.promptId === promptId);
  const userReviewsForPrompt = userReviews.filter((r) => r.promptId === promptId);
  const allReviews = [...mockReviews, ...userReviewsForPrompt];

  const computedAvg =
    allReviews.length > 0
      ? allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length
      : avgRating;

  return (
    <div className="space-y-4 border-t border-border pt-6">
      <h2 className="text-xl font-semibold">
        리뷰 ({allReviews.length})
      </h2>

      {/* Summary */}
      <ReviewSummary reviews={allReviews} avgRating={computedAvg} />

      {/* Write review */}
      <WriteReviewForm promptId={promptId} />

      {/* Review list */}
      <ReviewList promptId={promptId} />
    </div>
  );
}
