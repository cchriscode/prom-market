import { create } from "zustand";
import type { Review } from "@/entities/review";

interface ReviewState {
  reviews: Review[];
  addReview: (review: Review) => void;
}

export const useReview = create<ReviewState>((set) => ({
  reviews: [],
  addReview: (review) =>
    set((s) => ({ reviews: [review, ...s.reviews] })),
}));
