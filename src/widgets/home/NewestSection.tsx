import Link from "next/link";
import { PromptCard } from "@/entities/prompt";
import { MOCK_NEWEST_PROMPTS } from "@/shared/lib/mocks";

export function NewestSection() {
  const prompts = MOCK_NEWEST_PROMPTS.slice(0, 10);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">최신 프롬프트</h2>
        <Link
          href="/marketplace?sort=newest"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          더 보기
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {prompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </section>
  );
}
