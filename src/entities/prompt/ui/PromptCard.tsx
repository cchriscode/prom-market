"use client";

import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Prompt } from "../model/types";
import { AIModelBadge } from "./AIModelBadge";
import { PriceBadge } from "./PriceBadge";
import { SelectBadge } from "./SelectBadge";

interface PromptCardProps {
  prompt: Prompt;
  rank?: number;
  className?: string;
}

export function PromptCard({ prompt, rank, className }: PromptCardProps) {
  return (
    <Link
      href={`/prompt/${prompt.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-150 hover:-translate-y-px hover:shadow-md",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div className="absolute inset-0 flex items-center justify-center text-4xl text-muted-foreground/30">
          {prompt.type === "IMAGE" ? "🖼️" : prompt.type === "VIDEO" ? "🎬" : "📝"}
        </div>

        {/* Rank number */}
        {rank && (
          <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
            {rank}
          </span>
        )}

        {/* AI Model Badge */}
        {!rank && (
          <AIModelBadge
            model={prompt.aiModel}
            className="absolute left-2 top-2"
          />
        )}

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Heart className="h-3.5 w-3.5" />
        </button>

        {/* Select badge */}
        {prompt.isSelect && (
          <SelectBadge className="absolute bottom-2 left-2" />
        )}
      </div>

      {/* Info */}
      <div className="space-y-1.5 p-3">
        <h4 className="line-clamp-2 text-sm font-semibold leading-tight transition-colors group-hover:text-primary">
          {prompt.title}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-muted-foreground">
            @{prompt.sellerUsername}
          </span>
          {prompt.avgRating && (
            <span className="flex items-center gap-0.5 text-xs">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {prompt.avgRating.toFixed(1)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <PriceBadge price={prompt.price} discount={prompt.discount} />
        </div>
      </div>
    </Link>
  );
}
