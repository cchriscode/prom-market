"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Send, LogIn } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { MOCK_CURRENT_USER } from "@/shared/lib/mocks/user";
import { useReview } from "../model/useReview";

interface WriteReviewFormProps {
  promptId: string;
}

export function WriteReviewForm({ promptId }: WriteReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const { addReview } = useReview();

  const currentUser = MOCK_CURRENT_USER;

  if (!currentUser) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <p className="text-sm text-muted-foreground">
          로그인 후 리뷰를 작성할 수 있습니다.
        </p>
        <Link href="/login">
          <Button size="sm" variant="outline" className="gap-1.5">
            <LogIn className="h-3.5 w-3.5" />
            로그인
          </Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = () => {
    if (rating === 0) return;
    addReview({
      id: `r-new-${Date.now()}`,
      rating,
      comment: comment.trim() || undefined,
      userId: currentUser.id,
      username: currentUser.username,
      promptId,
      createdAt: new Date().toISOString(),
    });
    setRating(0);
    setComment("");
    toast.success("리뷰가 등록되었습니다.");
  };

  return (
    <div className="space-y-3 rounded-lg border border-border p-4">
      <h4 className="text-sm font-semibold">리뷰 작성</h4>

      {/* Star rating input */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-0.5"
          >
            <Star
              className={cn(
                "h-5 w-5 transition-colors",
                star <= (hoverRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted text-muted"
              )}
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 text-sm text-muted-foreground">{rating}점</span>
        )}
      </div>

      <Textarea
        placeholder="리뷰를 작성하세요 (선택)"
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex justify-end">
        <Button size="sm" onClick={handleSubmit} disabled={rating === 0} className="gap-1.5">
          <Send className="h-3.5 w-3.5" />
          등록
        </Button>
      </div>
    </div>
  );
}
