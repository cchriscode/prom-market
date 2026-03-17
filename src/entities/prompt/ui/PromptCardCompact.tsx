import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Prompt } from "../model/types";
import { PriceBadge } from "./PriceBadge";

interface PromptCardCompactProps {
  prompt: Prompt;
  className?: string;
}

export function PromptCardCompact({ prompt, className }: PromptCardCompactProps) {
  return (
    <Link
      href={`/prompt/${prompt.slug}`}
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent",
        className
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted text-lg">
        {prompt.type === "IMAGE" ? "🖼️" : prompt.type === "VIDEO" ? "🎬" : "📝"}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold">{prompt.title}</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>@{prompt.sellerUsername}</span>
          {prompt.avgRating && (
            <span className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {prompt.avgRating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
      <PriceBadge price={prompt.price} discount={prompt.discount} />
    </Link>
  );
}
