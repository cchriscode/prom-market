import { cn } from "@/shared/lib/utils";

interface SelectBadgeProps {
  className?: string;
}

export function SelectBadge({ className }: SelectBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-primary/90 px-1.5 py-0.5 text-xs font-medium text-white",
        className
      )}
    >
      <span>&#8734;</span>
      <span>Select</span>
    </span>
  );
}
