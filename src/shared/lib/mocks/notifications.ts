export interface Notification {
  id: string;
  type: "sale" | "review" | "system" | "chat";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n-01", type: "sale", title: "새 판매!", message: "Minimalist Logo Design이 판매되었습니다. +$3.99", isRead: false, createdAt: "2026-03-17T09:00:00Z", link: "/account" },
  { id: "n-02", type: "review", title: "새 리뷰", message: "@startup_kim님이 별점 5점 리뷰를 남겼습니다.", isRead: false, createdAt: "2026-03-17T08:30:00Z", link: "/prompt/minimalist-logo-design" },
  { id: "n-03", type: "chat", title: "새 메시지", message: "@brandmaker님이 메시지를 보냈습니다.", isRead: false, createdAt: "2026-03-17T07:15:00Z", link: "/chat" },
  { id: "n-04", type: "system", title: "프롬프트 승인", message: "Luxury Brand Identity Kit이 승인되었습니다.", isRead: true, createdAt: "2026-03-16T14:00:00Z", link: "/prompt/luxury-brand-identity-kit" },
  { id: "n-05", type: "sale", title: "새 판매!", message: "SEO Blog Post Writer가 판매되었습니다. +$6.99", isRead: true, createdAt: "2026-03-16T10:00:00Z", link: "/account" },
  { id: "n-06", type: "system", title: "Select 구독자 다운로드", message: "Children's Book Illustration이 Select로 다운로드되었습니다.", isRead: true, createdAt: "2026-03-15T18:00:00Z" },
  { id: "n-07", type: "review", title: "새 리뷰", message: "@indie_dev님이 별점 5점 리뷰를 남겼습니다.", isRead: true, createdAt: "2026-03-15T12:00:00Z", link: "/prompt/fantasy-character-creator" },
  { id: "n-08", type: "sale", title: "새 판매!", message: "YouTube Thumbnail Creator가 판매되었습니다. +$1.99", isRead: true, createdAt: "2026-03-14T16:30:00Z", link: "/account" },
];
