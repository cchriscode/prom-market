"use client";

import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/shared/ui/sheet";
import { PriceBadge } from "@/entities/prompt";
import { useCart } from "../model/useCart";

export function CartSidebar() {
  const { items, removeItem, totalPrice, itemCount } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground">
          <ShoppingCart className="h-4 w-4" />
          {itemCount() > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
              {itemCount()}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>장바구니 ({itemCount()})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <ShoppingCart className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">장바구니가 비어있습니다</p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto py-2">
              {items.map(({ prompt }) => (
                <div
                  key={prompt.id}
                  className="flex items-start gap-3 rounded-md border border-border p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted text-lg">
                    {prompt.type === "IMAGE" ? "🖼️" : prompt.type === "VIDEO" ? "🎬" : "📝"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{prompt.title}</div>
                    <div className="text-xs text-muted-foreground">@{prompt.sellerUsername}</div>
                    <PriceBadge price={prompt.price} discount={prompt.discount} />
                  </div>
                  <button
                    onClick={() => removeItem(prompt.id)}
                    className="shrink-0 rounded p-1 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">합계</span>
                <span className="text-lg font-bold font-mono">${totalPrice().toFixed(2)}</span>
              </div>
              <SheetClose asChild>
                <Link href="/cart">
                  <Button className="w-full" size="lg">
                    결제하기
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
