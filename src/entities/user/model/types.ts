export type UserRole = "BUYER" | "SELLER" | "ADMIN";
export type SellerTier = "BRONZE" | "SILVER" | "GOLD" | "DIAMOND";

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
  sellerTier: SellerTier;
  totalSales: number;
  totalViews: number;
  rank?: number;
  createdAt: string;
}
