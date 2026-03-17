"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogIn } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/shared/ui/sheet";
import { Separator } from "@/shared/ui/separator";
import { NAV_SECTIONS, BOTTOM_NAV } from "./model/navigation";

export function MobileSidebar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b border-border px-4 py-3">
          <SheetTitle className="text-lg font-bold text-primary">
            프롬마켓
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-2 py-2">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="mb-4">
              <p className="mb-1 px-2 text-xs font-medium text-muted-foreground">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                            isActive
                              ? "bg-accent font-medium text-accent-foreground"
                              : "text-foreground hover:bg-accent"
                          )}
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </SheetClose>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <Separator className="my-2" />

          <SheetClose asChild>
            <Link
              href={BOTTOM_NAV.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                pathname === BOTTOM_NAV.href
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-foreground hover:bg-accent"
              )}
            >
              <BOTTOM_NAV.icon className="h-4 w-4 shrink-0" />
              <span>{BOTTOM_NAV.label}</span>
            </Link>
          </SheetClose>
        </nav>

        <div className="border-t border-border p-3">
          <SheetClose asChild>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent"
            >
              <LogIn className="h-4 w-4" />
              <span>로그인 / 회원가입</span>
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
