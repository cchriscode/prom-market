import { MOCK_PROMPTS } from "./prompts";

export const MOCK_HERO_BANNERS = [
  {
    id: "1",
    title: "AI 프롬프트의 모든 것",
    subtitle: "30+ AI 모델 지원",
    ctaText: "지금 시작하기",
    ctaHref: "/marketplace",
    bgColor: "bg-gradient-to-r from-indigo-500 to-purple-600",
  },
  {
    id: "2",
    title: "프롬프트를 판매하세요",
    subtitle: "최대 80% 수익",
    ctaText: "판매 시작",
    ctaHref: "/sell",
    bgColor: "bg-gradient-to-r from-emerald-500 to-teal-600",
  },
  {
    id: "3",
    title: "Select 구독",
    subtitle: "월 ₩14,900으로 무제한 다운로드",
    ctaText: "구독하기",
    ctaHref: "/account",
    bgColor: "bg-gradient-to-r from-amber-500 to-orange-600",
  },
];

export const MOCK_FEATURED_PROMPTS = MOCK_PROMPTS.filter(
  (p) => p.isFeatured,
);

export const MOCK_TRENDING_PROMPTS = [...MOCK_PROMPTS]
  .sort((a, b) => b.salesCount - a.salesCount)
  .slice(0, 30);

export const MOCK_NEWEST_PROMPTS = [...MOCK_PROMPTS]
  .sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  .slice(0, 20);

export const MOCK_MONTHLY_POPULAR = [...MOCK_PROMPTS]
  .sort((a, b) => b.viewCount - a.viewCount)
  .slice(0, 15);
