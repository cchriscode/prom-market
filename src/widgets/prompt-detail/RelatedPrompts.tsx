import { MOCK_PROMPTS } from "@/shared/lib/mocks";
import { PromptCard } from "@/entities/prompt";

interface RelatedPromptsProps {
  categoryId: string;
  currentPromptId: string;
}

export function RelatedPrompts({ categoryId, currentPromptId }: RelatedPromptsProps) {
  const related = MOCK_PROMPTS
    .filter((p) => p.categoryId === categoryId && p.id !== currentPromptId && p.status === "ACTIVE")
    .slice(0, 5);

  if (related.length === 0) return null;

  return (
    <div className="space-y-4 border-t border-border pt-6">
      <h2 className="text-xl font-semibold">관련 프롬프트</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {related.map((prompt) => (
          <div key={prompt.id} className="w-[200px] shrink-0">
            <PromptCard prompt={prompt} />
          </div>
        ))}
      </div>
    </div>
  );
}
