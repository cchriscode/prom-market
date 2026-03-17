"use client";

import { Suspense, useMemo } from "react";
import { MOCK_PROMPTS } from "@/shared/lib/mocks";
import {
  FilterPanel,
  SortDropdown,
  ActiveFilters,
  useFilters,
} from "@/features/marketplace-filter";
import { PromptGrid } from "./PromptGrid";
import type { SortOption } from "@/features/marketplace-filter/model/useFilters";
import type { Prompt } from "@/entities/prompt";

function sortPrompts(prompts: Prompt[], sort: SortOption): Prompt[] {
  const sorted = [...prompts];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "popular":
      return sorted.sort((a, b) => b.salesCount - a.salesCount);
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "trending":
    default:
      return sorted.sort(
        (a, b) =>
          b.salesCount * 0.4 + b.viewCount * 0.2 + b.favoriteCount * 0.2 + (b.avgRating ?? 0) * 0.2 -
          (a.salesCount * 0.4 + a.viewCount * 0.2 + a.favoriteCount * 0.2 + (a.avgRating ?? 0) * 0.2)
      );
  }
}

function MarketplaceContent() {
  const { filters } = useFilters();

  const filtered = useMemo(() => {
    let result = MOCK_PROMPTS.filter((p) => p.status === "ACTIVE");

    if (filters.category) {
      result = result.filter((p) => p.categoryId === filters.category || p.categoryName.toLowerCase() === filters.category);
    }
    if (filters.model) {
      result = result.filter((p) => p.aiModel === filters.model);
    }
    if (filters.type) {
      result = result.filter((p) => p.type === filters.type);
    }
    if (filters.q) {
      const q = filters.q.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }

    return sortPrompts(result, filters.sort);
  }, [filters]);

  return (
    <div className="flex gap-6">
      {/* Sidebar filters — desktop */}
      <FilterPanel className="hidden w-56 shrink-0 lg:block" />

      {/* Main area */}
      <div className="min-w-0 flex-1 space-y-4">
        {/* Top bar: active filters + sort */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <ActiveFilters />
            <span className="shrink-0 text-sm text-muted-foreground">
              {filtered.length}개 프롬프트
            </span>
          </div>
          <SortDropdown />
        </div>

        <PromptGrid prompts={filtered} />
      </div>
    </div>
  );
}

export function MarketplaceWidget() {
  return (
    <Suspense>
      <MarketplaceContent />
    </Suspense>
  );
}
