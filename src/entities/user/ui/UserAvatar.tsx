import { cn } from "@/shared/lib/utils";

interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
};

export function UserAvatar({ name, avatar, size = "md", className }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return avatar ? (
    <img
      src={avatar}
      alt={name}
      className={cn("rounded-full object-cover", SIZE_MAP[size], className)}
    />
  ) : (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-muted font-medium",
        SIZE_MAP[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
