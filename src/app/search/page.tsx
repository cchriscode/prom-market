import { SearchWidget } from "@/widgets/search";

export const metadata = {
  title: "검색 — 프롬마켓",
  description: "AI 프롬프트를 검색하세요.",
};

export default function SearchPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">검색</h1>
      <SearchWidget />
    </div>
  );
}
