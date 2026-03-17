// TODO: API 연동
export async function getReviews(promptId: string) {
  return [];
}

export async function createReview(promptId: string, data: { rating: number; comment?: string }) {
  return { id: "" };
}

export async function updateReview(reviewId: string, data: { rating: number; comment?: string }) {
  return { success: true };
}

export async function deleteReview(reviewId: string) {
  return { success: true };
}
