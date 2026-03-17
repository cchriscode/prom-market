"use client";

import Link from "next/link";
import { Search, Bell, ShoppingCart } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { LAYOUT } from "@/shared/lib/constants";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
import { useLayout } from "./model/useLayout";

export function TopBar() {
  const { isSidebarExpanded } = useLayout();
  const sidebarWidth = isSidebarExpanded
    ? LAYOUT.SIDEBAR_EXPANDED
    : LAYOUT.SIDEBAR_COLLAPSED;

  return (
    <header
      className="fixed top-0 z-30 flex items-center border-b border-border bg-card/80 backdrop-blur-sm"
      style={{
        left: sidebarWidth,
        right: 0,
        height: LAYOUT.TOPBAR_HEIGHT,
        transition: "left 250ms ease-out",
      }}
    >
      <div className="flex w-full items-center justify-between px-6">
        {/* Search */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="프롬프트 검색..."
            className="h-9 pl-9"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            className={cn(
              "relative flex h-9 w-9 items-center justify-center rounded-md",
              "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <Bell className="h-4 w-4" />
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-4 min-w-4 px-1 text-[10px]"
            >
              3
            </Badge>
          </Link>

          <Link
            href="/cart"
            className={cn(
              "relative flex h-9 w-9 items-center justify-center rounded-md",
              "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <ShoppingCart className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
