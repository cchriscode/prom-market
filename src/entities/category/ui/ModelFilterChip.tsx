import { cn } from "@/shared/lib/utils";

interface ModelFilterChipProps {
  emoji: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ModelFilterChip({
  emoji,
  label,
  selected,
  onClick,
  className,
}: ModelFilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card hover:bg-accent",
        className
      )}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
