import Link from "next/link";
import { CategoryChip } from "@/entities/category";
import { MOCK_CATEGORIES } from "@/shared/lib/mocks";

export function CategoryGrid() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">카테고리</h2>
        <Link
          href="/marketplace"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          더 보기
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
        {MOCK_CATEGORIES.slice(0, 15).map((category) => (
          <CategoryChip key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
