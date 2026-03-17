"use client";

import Link from "next/link";
import { PromptCard } from "@/entities/prompt";
import { MOCK_TRENDING_PROMPTS } from "@/shared/lib/mocks";

export function TrendingSection() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Trending</h2>
        <Link
          href="/marketplace?sort=trending"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          더 보기
        </Link>
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
        {MOCK_TRENDING_PROMPTS.map((prompt, index) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            rank={index + 1}
            className="min-w-[220px] shrink-0 snap-start"
          />
        ))}
      </div>
    </section>
  );
}
