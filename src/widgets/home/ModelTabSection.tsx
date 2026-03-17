"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { PromptCard } from "@/entities/prompt";
import { AI_MODELS } from "@/shared/lib/constants";
import { MOCK_PROMPTS } from "@/shared/lib/mocks";

const TOP_MODELS = AI_MODELS.slice(0, 5);

export function ModelTabSection() {
  const [selectedModel, setSelectedModel] = useState(TOP_MODELS[0].id);

  const filteredPrompts = MOCK_PROMPTS.filter(
    (p) => p.aiModel === selectedModel,
  ).slice(0, 10);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">AI 모델별 인기</h2>
        <Link
          href="/marketplace"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          더 보기
        </Link>
      </div>

      {/* Tab buttons */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
        {TOP_MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              selectedModel === model.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-accent",
            )}
          >
            <span>{model.emoji}</span>
            <span>{model.label}</span>
          </button>
        ))}
      </div>

      {/* Prompt grid */}
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {filteredPrompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          이 모델에 대한 프롬프트가 없습니다.
        </p>
      )}
    </section>
  );
}
