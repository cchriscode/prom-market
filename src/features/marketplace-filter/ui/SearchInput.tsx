"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { useFilters } from "../model/useFilters";

interface SearchInputProps {
  className?: string;
}

export function SearchInput({ className }: SearchInputProps) {
  const { filters, setFilter, removeFilter } = useFilters();
  const [value, setValue] = useState(filters.q ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      setFilter("q", value.trim());
    } else {
      removeFilter("q");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="프롬프트 검색..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pl-8 text-sm"
        />
      </div>
    </form>
  );
}
