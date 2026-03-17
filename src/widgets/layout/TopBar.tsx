"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { LAYOUT } from "@/shared/lib/constants";
import { Input } from "@/shared/ui/input";
import { CartSidebar } from "@/features/prompt-purchase";
import { NotificationDropdown } from "@/features/notification";
import { useLayout } from "./model/useLayout";
import { MobileSidebar } from "./MobileSidebar";

export function TopBar() {
  const { isSidebarExpanded } = useLayout();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarWidth = isSidebarExpanded
    ? LAYOUT.SIDEBAR_EXPANDED
    : LAYOUT.SIDEBAR_COLLAPSED;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      data-topbar
      className="fixed top-0 z-30 flex items-center border-b border-border bg-card/80 backdrop-blur-sm"
      style={{
        left: sidebarWidth,
        right: 0,
        height: LAYOUT.TOPBAR_HEIGHT,
        transition: "left 250ms ease-out",
      }}
    >
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        {/* Mobile hamburger */}
        <MobileSidebar />

        {/* Search */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="프롬프트 검색..."
            className="h-9 pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <NotificationDropdown />
          <CartSidebar />
        </div>
      </div>
    </header>
  );
}
