"use client";

import { useRouter } from "next/navigation";
import { Bell, CheckCheck } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useNotifications } from "../model/useNotifications";
import { NotificationIcon } from "./NotificationIcon";

export function NotificationDropdown() {
  const router = useRouter();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground">
          <Bell className="h-4 w-4" />
          {unreadCount() > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-4 min-w-4 px-1 text-[10px]"
            >
              {unreadCount()}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>알림</span>
          {unreadCount() > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-xs font-normal text-primary hover:underline"
            >
              <CheckCheck className="h-3 w-3" />
              모두 읽음
            </button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.slice(0, 6).map((n) => {
          const time = new Date(n.createdAt).toLocaleDateString("ko-KR", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <DropdownMenuItem
              key={n.id}
              className={cn("flex items-start gap-2.5 py-2.5", !n.isRead && "bg-primary/5")}
              onClick={() => {
                markAsRead(n.id);
                if (n.link) router.push(n.link);
              }}
            >
              <span className="mt-0.5 shrink-0">
                <NotificationIcon type={n.type} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("text-xs font-medium", !n.isRead && "text-primary")}>
                    {n.title}
                  </span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{time}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{n.message}</p>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
