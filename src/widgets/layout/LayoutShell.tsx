"use client";

import { TooltipProvider } from "@/shared/ui/tooltip";
import { LAYOUT } from "@/shared/lib/constants";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";
import { useLayout } from "./model/useLayout";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const { isSidebarExpanded } = useLayout();
  const sidebarWidth = isSidebarExpanded
    ? LAYOUT.SIDEBAR_EXPANDED
    : LAYOUT.SIDEBAR_COLLAPSED;

  return (
    <TooltipProvider delayDuration={0}>
      <AppSidebar />
      <TopBar />
      <div
        className="min-h-screen"
        style={{
          marginLeft: sidebarWidth,
          paddingTop: LAYOUT.TOPBAR_HEIGHT,
          transition: "margin-left 250ms ease-out",
        }}
      >
        <main className="px-6 py-6">{children}</main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
