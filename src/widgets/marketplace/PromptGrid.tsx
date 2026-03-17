import { SearchX } from "lucide-react";
import type { Prompt } from "@/entities/prompt";
import { PromptCard } from "@/entities/prompt";

interface PromptGridProps {
  prompts: Prompt[];
}

export function PromptGrid({ prompts }: PromptGridProps) {
  if (prompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <SearchX className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <h3 className="text-lg font-semibold">결과가 없습니다</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          필터를 변경하거나 다른 검색어를 시도해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
}
