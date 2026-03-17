"use client";

import { TrendingUp, Clock } from "lucide-react";
import { MOCK_POPULAR_SEARCHES, MOCK_RECENT_SEARCHES } from "@/shared/lib/mocks";

interface SearchSuggestionsProps {
  onSelect?: (query: string) => void;
  className?: string;
}

export function SearchSuggestions({ onSelect, className }: SearchSuggestionsProps) {
  return (
    <div className={className}>
      <div className="space-y-4">
        <div>
          <h3 className="flex items-center gap-1.5 text-sm font-semibold">
            <TrendingUp className="h-3.5 w-3.5" />
            인기 검색어
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {MOCK_POPULAR_SEARCHES.map((q) => (
              <button
                key={q}
                onClick={() => onSelect?.(q)}
                className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:bg-accent"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {MOCK_RECENT_SEARCHES.length > 0 && (
          <div>
            <h3 className="flex items-center gap-1.5 text-sm font-semibold">
              <Clock className="h-3.5 w-3.5" />
              최근 검색어
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {MOCK_RECENT_SEARCHES.map((q) => (
                <button
                  key={q}
                  onClick={() => onSelect?.(q)}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
