import { AI_MODELS } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";

interface AIModelBadgeProps {
  model: string;
  className?: string;
}

export function AIModelBadge({ model, className }: AIModelBadgeProps) {
  const modelInfo = AI_MODELS.find((m) => m.id === model);
  if (!modelInfo) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium",
        modelInfo.bgColor,
        className
      )}
    >
      <span>{modelInfo.emoji}</span>
      <span className="text-foreground/80">{modelInfo.label}</span>
    </span>
  );
}
