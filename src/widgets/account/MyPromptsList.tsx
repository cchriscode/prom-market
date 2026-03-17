"use client";

import Link from "next/link";
import { Edit, Trash2, Eye, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { MOCK_PROMPTS } from "@/shared/lib/mocks";
import { MOCK_SELLER_ID } from "@/shared/lib/constants";
import { formatNumber } from "@/shared/lib/format";
import { Button } from "@/shared/ui/button";
import { PromptStatusBadge } from "@/entities/prompt";

export function MyPromptsList() {
  const myPrompts = MOCK_PROMPTS.filter((p) => p.sellerId === MOCK_SELLER_ID);

  if (myPrompts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-muted-foreground">등록한 프롬프트가 없습니다.</p>
        <Link href="/sell">
          <Button className="mt-4">프롬프트 등록하기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {myPrompts.map((p) => (
        <div
          key={p.id}
          className="flex items-center gap-4 rounded-lg border border-border p-4"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted text-xl">
            {p.type === "IMAGE" ? "🖼️" : p.type === "VIDEO" ? "🎬" : "📝"}
          </div>
          <div className="min-w-0 flex-1">
            <Link
              href={`/prompt/${p.slug}`}
              className="text-sm font-medium hover:text-primary"
            >
              {p.title}
            </Link>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-mono">{p.isFree ? "무료" : `$${p.price.toFixed(2)}`}</span>
              <span className="flex items-center gap-0.5">
                <ShoppingCart className="h-3 w-3" />
                {formatNumber(p.salesCount)}
              </span>
              <span className="flex items-center gap-0.5">
                <Eye className="h-3 w-3" />
                {formatNumber(p.viewCount)}
              </span>
            </div>
          </div>
          <PromptStatusBadge status={p.status} />
          <div className="flex shrink-0 gap-1">
            <Link href={`/sell/${p.id}/edit`}>
              <Button size="icon-xs" variant="ghost">
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Button
              size="icon-xs"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => {
                if (confirm(`"${p.title}" 프롬프트를 삭제하시겠습니까?`)) {
                  toast.success("프롬프트가 삭제되었습니다.");
                }
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
