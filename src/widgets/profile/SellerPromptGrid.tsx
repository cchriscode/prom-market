import { MOCK_PROMPTS } from "@/shared/lib/mocks";
import { PromptGrid } from "@/widgets/marketplace";

interface SellerPromptGridProps {
  sellerId: string;
}

export function SellerPromptGrid({ sellerId }: SellerPromptGridProps) {
  const prompts = MOCK_PROMPTS.filter(
    (p) => p.sellerId === sellerId && p.status === "ACTIVE"
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">프롬프트 ({prompts.length})</h2>
      <PromptGrid prompts={prompts} />
    </div>
  );
}
