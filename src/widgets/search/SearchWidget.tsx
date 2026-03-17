"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { MOCK_PROMPTS } from "@/shared/lib/mocks";
import { PromptGrid } from "@/widgets/marketplace";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const query = q.toLowerCase();
    return MOCK_PROMPTS.filter(
      (p) =>
        p.status === "ACTIVE" &&
        (p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          p.aiModel.toLowerCase().includes(query))
    );
  }, [q]);

  if (!q.trim()) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Search className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <h3 className="text-lg font-semibold">검색어를 입력하세요</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          프롬프트 제목, 카테고리, AI 모델명으로 검색할 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        &ldquo;{q}&rdquo;에 대한 검색 결과 {results.length}개
      </p>
      <PromptGrid prompts={results} />
    </div>
  );
}

export function SearchWidget() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
