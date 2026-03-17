import { Image, Type, Video } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { PromptType } from "../model/types";

const TYPE_CONFIG: Record<PromptType, { label: string; icon: typeof Image }> = {
  IMAGE: { label: "Image", icon: Image },
  TEXT: { label: "Text", icon: Type },
  VIDEO: { label: "Video", icon: Video },
};

interface PromptTypeBadgeProps {
  type: PromptType;
  className?: string;
}

export function PromptTypeBadge({ type, className }: PromptTypeBadgeProps) {
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
