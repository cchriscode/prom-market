import { cn } from "@/shared/lib/utils";
import { PROMPT_STATUSES } from "@/shared/lib/constants";
import type { PromptStatus } from "../model/types";

interface PromptStatusBadgeProps {
  status: PromptStatus;
  className?: string;
}

export function PromptStatusBadge({ status, className }: PromptStatusBadgeProps) {
  const config = PROMPT_STATUSES[status];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
        config.color,
        config.bg,
        className
      )}
    >
      {config.label}
    </span>
  );
}
