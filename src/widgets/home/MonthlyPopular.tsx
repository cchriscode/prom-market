import Link from "next/link";
import { PromptCard } from "@/entities/prompt";
import { MOCK_MONTHLY_POPULAR } from "@/shared/lib/mocks";

export function MonthlyPopular() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">이달의 인기</h2>
        <Link
          href="/marketplace?sort=popular"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          더 보기
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {MOCK_MONTHLY_POPULAR.map((prompt, index) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            rank={index + 1}
          />
        ))}
      </div>
    </section>
  );
}
