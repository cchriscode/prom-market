"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useFilters, type SortOption } from "../model/useFilters";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "trending", label: "인기순" },
  { value: "newest", label: "최신순" },
  { value: "popular", label: "판매순" },
  { value: "price-asc", label: "가격 낮은순" },
  { value: "price-desc", label: "가격 높은순" },
];

export function SortDropdown() {
  const { filters, setFilter } = useFilters();
  const current = SORT_OPTIONS.find((o) => o.value === filters.sort) ?? SORT_OPTIONS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5" />
          {current.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setFilter("sort", option.value)}
            className={filters.sort === option.value ? "bg-accent" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
