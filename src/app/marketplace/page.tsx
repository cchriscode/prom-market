import { MarketplaceWidget } from "@/widgets/marketplace";

export const metadata = {
  title: "마켓플레이스 — 프롬마켓",
  description: "AI 프롬프트를 검색하고 구매하세요.",
};

export default function MarketplacePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">마켓플레이스</h1>
      <MarketplaceWidget />
    </div>
  );
}
