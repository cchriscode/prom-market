"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export type SortOption = "trending" | "newest" | "popular" | "price-asc" | "price-desc";

export interface Filters {
  category: string | null;
  model: string | null;
  type: string | null;
  sort: SortOption;
  q: string | null;
}

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: Filters = {
    category: searchParams.get("category"),
    model: searchParams.get("model"),
    type: searchParams.get("type"),
    sort: (searchParams.get("sort") as SortOption) || "trending",
    q: searchParams.get("q"),
  };

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const removeFilter = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const clearAll = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return { filters, setFilter, removeFilter, clearAll };
}
