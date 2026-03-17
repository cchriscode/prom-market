"use client";

import { Bell } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { useNotifications } from "../model/useNotifications";

interface NotificationBellProps {
  className?: string;
}

export function NotificationBell({ className }: NotificationBellProps) {
  const { unreadCount } = useNotifications();
  const count = unreadCount();

  return (
    <div className={className}>
      <Bell className="h-4 w-4" />
      {count > 0 && (
        <Badge
          variant="destructive"
          className="absolute -right-1 -top-1 h-4 min-w-4 px-1 text-[10px]"
        >
          {count}
        </Badge>
      )}
    </div>
  );
}
