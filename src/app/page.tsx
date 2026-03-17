import { HomeWidget } from "@/widgets/home";

export const metadata = {
  title: "프롬마켓 - AI 프롬프트 마켓플레이스",
  description:
    "검증된 AI 프롬프트를 구매하고 판매하세요. Midjourney, ChatGPT, DALL-E, Claude 등 30+ AI 모델 지원.",
};

export default function HomePage() {
  return <HomeWidget />;
}
