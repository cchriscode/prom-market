"use client";

import { X } from "lucide-react";
import { AI_MODELS } from "@/shared/lib/constants";
import { MOCK_CATEGORIES } from "@/shared/lib/mocks";
import { useFilters } from "../model/useFilters";

const TYPE_LABELS: Record<string, string> = {
  IMAGE: "Image",
  TEXT: "Text",
  VIDEO: "Video",
};

export function ActiveFilters() {
  const { filters, removeFilter, clearAll } = useFilters();

  const chips: { key: string; label: string }[] = [];

  if (filters.category) {
    const cat = MOCK_CATEGORIES.find((c) => c.slug === filters.category);
    chips.push({ key: "category", label: cat ? `${cat.icon} ${cat.name}` : filters.category });
  }
  if (filters.model) {
    const model = AI_MODELS.find((m) => m.id === filters.model);
    chips.push({ key: "model", label: model ? `${model.emoji} ${model.label}` : filters.model });
  }
  if (filters.type) {
    chips.push({ key: "type", label: TYPE_LABELS[filters.type] ?? filters.type });
  }
  if (filters.q) {
    chips.push({ key: "q", label: `"${filters.q}"` });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {chips.map((chip) => (
        <button
          key={chip.key}
          onClick={() => removeFilter(chip.key)}
          className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
        >
          {chip.label}
          <X className="h-3 w-3" />
        </button>
      ))}
      <button
        onClick={clearAll}
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        전체 해제
      </button>
    </div>
  );
}
