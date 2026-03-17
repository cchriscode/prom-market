"use client";

import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { AI_MODELS } from "@/shared/lib/constants";
import { MOCK_CATEGORIES } from "@/shared/lib/mocks";
import { useFilters } from "../model/useFilters";

const PROMPT_TYPES = [
  { id: "IMAGE", label: "Image", emoji: "🖼️" },
  { id: "TEXT", label: "Text", emoji: "📝" },
  { id: "VIDEO", label: "Video", emoji: "🎬" },
] as const;

export function FilterPanel({ className }: { className?: string }) {
  const { filters, setFilter, removeFilter } = useFilters();

  return (
    <aside className={cn("space-y-6", className)}>
      <div className="flex items-center gap-2 text-sm font-semibold">
        <SlidersHorizontal className="h-4 w-4" />
        필터
      </div>

      {/* Type filter */}
      <section>
        <h3 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          타입
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {PROMPT_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() =>
                filters.type === t.id
                  ? removeFilter("type")
                  : setFilter("type", t.id)
              }
              className={cn(
                "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                filters.type === t.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-accent"
              )}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* AI Model filter */}
      <section>
        <h3 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          AI 모델
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {AI_MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() =>
                filters.model === m.id
                  ? removeFilter("model")
                  : setFilter("model", m.id)
              }
              className={cn(
                "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                filters.model === m.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-accent"
              )}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>
      </section>

      {/* Category filter */}
      <section>
        <h3 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          카테고리
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                filters.category === cat.slug
                  ? removeFilter("category")
                  : setFilter("category", cat.slug)
              }
              className={cn(
                "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                filters.category === cat.slug
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-accent"
              )}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
