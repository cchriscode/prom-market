import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import type { Category } from "../model/types";

interface CategoryChipProps {
  category: Category;
  className?: string;
}

export function CategoryChip({ category, className }: CategoryChipProps) {
  return (
    <Link
      href={`/marketplace?category=${category.slug}`}
      className={cn(
        "flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent",
        className
      )}
    >
      <span className="text-2xl">{category.icon}</span>
      <span className="text-xs font-medium">{category.name}</span>
    </Link>
  );
}
