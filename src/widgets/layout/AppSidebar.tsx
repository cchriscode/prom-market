"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeft, ChevronRight, LogIn } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { LAYOUT } from "@/shared/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { Separator } from "@/shared/ui/separator";
import { useLayout } from "./model/useLayout";
import {
  NAV_SECTIONS,
  MODEL_SHORTCUTS,
  BOTTOM_NAV,
} from "./model/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  const { isSidebarExpanded, toggleSidebar } = useLayout();

  return (
    <aside
      className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar"
      style={{
        width: isSidebarExpanded ? LAYOUT.SIDEBAR_EXPANDED : LAYOUT.SIDEBAR_COLLAPSED,
        transition: "width 250ms ease-out",
      }}
    >
      {/* Logo + Toggle */}
      <div className="flex h-14 items-center justify-between px-3">
        {isSidebarExpanded && (
          <Link href="/" className="text-lg font-bold text-primary">
            프롬마켓
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
        >
          {isSidebarExpanded ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="mb-4">
            {isSidebarExpanded && (
              <p className="mb-1 px-2 text-xs font-medium text-muted-foreground">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const linkContent = (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {isSidebarExpanded && <span>{item.label}</span>}
                  </Link>
                );

                if (!isSidebarExpanded) {
                  return (
                    <li key={item.href}>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                        <TooltipContent side="right">
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    </li>
                  );
                }

                return <li key={item.href}>{linkContent}</li>;
              })}
            </ul>
          </div>
        ))}

        {/* Model Shortcuts */}
        {isSidebarExpanded && (
          <div className="mb-4">
            <p className="mb-1 px-2 text-xs font-medium text-muted-foreground">
              내 카테고리
            </p>
            <ul className="space-y-0.5">
              {MODEL_SHORTCUTS.map((model) => (
                <li key={model.id}>
                  <Link
                    href={model.href}
                    className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <span className="w-4 text-center text-sm">{model.emoji}</span>
                    <span>{model.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                  <span className="w-4 text-center text-xs">+</span>
                  <span>더 보기 (+24)</span>
                </button>
              </li>
            </ul>
          </div>
        )}

        <Separator className="my-2" />

        {/* Chat */}
        {(() => {
          const isActive = pathname === BOTTOM_NAV.href;
          const linkContent = (
            <Link
              href={BOTTOM_NAV.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <BOTTOM_NAV.icon className="h-4 w-4 shrink-0" />
              {isSidebarExpanded && <span>{BOTTOM_NAV.label}</span>}
            </Link>
          );

          if (!isSidebarExpanded) {
            return (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right">{BOTTOM_NAV.label}</TooltipContent>
              </Tooltip>
            );
          }

          return linkContent;
        })()}
      </nav>

      {/* Bottom: User Profile or Login */}
      <div className="border-t border-border p-3">
        {isSidebarExpanded ? (
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-sidebar-foreground hover:bg-accent"
          >
            <LogIn className="h-4 w-4" />
            <span>로그인 / 회원가입</span>
          </Link>
        ) : (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href="/login"
                className="flex items-center justify-center rounded-md p-2 text-sidebar-foreground hover:bg-accent"
              >
                <LogIn className="h-4 w-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">로그인</TooltipContent>
          </Tooltip>
        )}
      </div>
    </aside>
  );
}
