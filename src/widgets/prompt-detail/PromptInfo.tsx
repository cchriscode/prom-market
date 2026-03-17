import Link from "next/link";
import { Eye, ShoppingCart, Heart } from "lucide-react";
import type { Prompt } from "@/entities/prompt";
import { AIModelBadge, PromptTypeBadge } from "@/entities/prompt";
import { RatingStars } from "@/entities/review";
import { formatNumber } from "@/shared/lib/format";

interface PromptInfoProps {
  prompt: Prompt;
}

export function PromptInfo({ prompt }: PromptInfoProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-2xl font-bold">{prompt.title}</h1>

      {/* Seller + badges */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/profile/${prompt.sellerUsername}`}
          className="text-sm text-muted-foreground hover:text-primary"
        >
          @{prompt.sellerUsername}
        </Link>
        <AIModelBadge model={prompt.aiModel} />
        <PromptTypeBadge type={prompt.type} />
      </div>

      {/* Rating */}
      {prompt.avgRating && (
        <div className="flex items-center gap-2">
          <RatingStars rating={prompt.avgRating} />
          <span className="text-sm font-medium">{prompt.avgRating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">
            ({formatNumber(prompt.reviewCount)} 리뷰)
          </span>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" />
          {formatNumber(prompt.viewCount)}
        </span>
        <span className="flex items-center gap-1">
          <ShoppingCart className="h-3.5 w-3.5" />
          {formatNumber(prompt.salesCount)}
        </span>
        <span className="flex items-center gap-1">
          <Heart className="h-3.5 w-3.5" />
          {formatNumber(prompt.favoriteCount)}
        </span>
      </div>

      {/* Description */}
      <div className="space-y-2 border-t border-border pt-4">
        <h2 className="text-sm font-semibold">설명</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {prompt.description}
        </p>
      </div>
    </div>
  );
}
