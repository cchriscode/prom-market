import { ShoppingBag, Star, MessageCircle, Info } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { NOTIFICATION_TYPES } from "@/shared/lib/constants";

interface NotificationIconProps {
  type: keyof typeof NOTIFICATION_TYPES;
  size?: number;
  className?: string;
}

const ICON_COMPONENTS = {
  ShoppingBag,
  Star,
  MessageCircle,
  Info,
} as const;

export function NotificationIcon({ type, size = 14, className }: NotificationIconProps) {
  const config = NOTIFICATION_TYPES[type];
  const IconComponent = ICON_COMPONENTS[config.icon];

  return (
    <IconComponent
      style={{ width: size, height: size }}
      className={cn(config.color, className)}
    />
  );
}
