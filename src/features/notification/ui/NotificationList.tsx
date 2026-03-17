"use client";

import { cn } from "@/shared/lib/utils";
import { useNotifications } from "../model/useNotifications";
import { NotificationIcon } from "./NotificationIcon";

export function NotificationList() {
  const { notifications, markAsRead } = useNotifications();

  if (notifications.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        알림이 없습니다.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border">
      {notifications.map((n) => {
        const time = new Date(n.createdAt).toLocaleDateString("ko-KR", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <button
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={cn(
              "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-accent",
              !n.isRead && "bg-primary/5"
            )}
          >
            <span className="mt-0.5 shrink-0">
              <NotificationIcon type={n.type} size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className={cn("text-sm font-medium", !n.isRead && "text-primary")}>
                  {n.title}
                </span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{time}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{n.message}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
