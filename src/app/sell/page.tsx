import { SellWidget } from "@/widgets/sell";

export const metadata = {
  title: "프롬프트 판매 — 프롬마켓",
  description: "AI 프롬프트를 등록하고 판매하세요.",
};

export default function SellPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">프롬프트 판매</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          프롬프트를 등록하고 수익을 창출하세요. 2분이면 시작할 수 있습니다.
        </p>
      </div>
      <SellWidget />
    </div>
  );
}
