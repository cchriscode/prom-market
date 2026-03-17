export type PromptType = "IMAGE" | "TEXT" | "VIDEO";
export type PromptStatus = "PENDING" | "ACTIVE" | "REJECTED" | "INACTIVE";

export interface Prompt {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  discount?: number;
  isFree: boolean;
  isSelect: boolean;
  status: PromptStatus;
  type: PromptType;
  aiModel: string;
  categoryId: string;
  categoryName: string;
  sellerId: string;
  sellerUsername: string;
  sellerAvatar?: string;
  images: string[];
  thumbnail: string;
  avgRating?: number;
  reviewCount: number;
  salesCount: number;
  viewCount: number;
  favoriteCount: number;
  isFeatured: boolean;
  createdAt: string;
}
