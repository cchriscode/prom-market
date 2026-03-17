"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, ShoppingCart, CreditCard, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { PriceBadge } from "@/entities/prompt";
import { useCart } from "@/features/prompt-purchase";

export function CartWidget() {
  const { items, removeItem, clearCart, totalPrice } = useCart();
  const [isPurchased, setIsPurchased] = useState(false);

  if (isPurchased) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
        <h3 className="text-lg font-semibold">결제가 완료되었습니다!</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          구매한 프롬프트는 내 계정에서 확인할 수 있습니다.
        </p>
        <div className="mt-4 flex gap-2">
          <Link href="/account">
            <Button>구매 내역 보기</Button>
          </Link>
          <Link href="/marketplace">
            <Button variant="outline">마켓플레이스로 이동</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <h3 className="text-lg font-semibold">장바구니가 비어있습니다</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          마켓플레이스에서 프롬프트를 둘러보세요.
        </p>
        <Link href="/marketplace">
          <Button variant="outline" className="mt-4 gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            마켓플레이스로 이동
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Item list */}
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{items.length}개 상품</span>
          <button
            onClick={clearCart}
            className="text-xs text-muted-foreground hover:text-destructive"
          >
            전체 삭제
          </button>
        </div>

        {items.map(({ prompt }) => (
          <div
            key={prompt.id}
            className="flex items-center gap-4 rounded-lg border border-border p-4"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-muted text-2xl">
              {prompt.type === "IMAGE" ? "🖼️" : prompt.type === "VIDEO" ? "🎬" : "📝"}
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href={`/prompt/${prompt.slug}`}
                className="text-sm font-medium hover:text-primary"
              >
                {prompt.title}
              </Link>
              <div className="text-xs text-muted-foreground">@{prompt.sellerUsername}</div>
            </div>
            <div className="shrink-0 text-right">
              <PriceBadge price={prompt.price} discount={prompt.discount} />
            </div>
            <button
              onClick={() => removeItem(prompt.id)}
              className="shrink-0 rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div className="w-full shrink-0 lg:w-80">
        <div className="sticky top-20 space-y-4 rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">주문 요약</h3>

          <div className="space-y-2 text-sm">
            {items.map(({ prompt }) => {
              const discountedPrice = prompt.discount
                ? prompt.price * (1 - prompt.discount / 100)
                : prompt.price;
              return (
                <div key={prompt.id} className="flex justify-between">
                  <span className="truncate text-muted-foreground">{prompt.title}</span>
                  <span className="shrink-0 font-mono">${discountedPrice.toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-semibold">합계</span>
            <span className="text-xl font-bold font-mono">${totalPrice().toFixed(2)}</span>
          </div>

          <Button
            className="w-full gap-1.5"
            size="lg"
            onClick={() => {
              clearCart();
              setIsPurchased(true);
            }}
          >
            <CreditCard className="h-4 w-4" />
            결제하기
          </Button>

          <p className="text-center text-[10px] text-muted-foreground">
            결제는 Stripe를 통해 안전하게 처리됩니다
          </p>
        </div>
      </div>
    </div>
  );
}
