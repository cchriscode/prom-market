export interface Review {
  id: string;
  rating: number;
  comment?: string;
  userId: string;
  username: string;
  userAvatar?: string;
  promptId: string;
  createdAt: string;
}
