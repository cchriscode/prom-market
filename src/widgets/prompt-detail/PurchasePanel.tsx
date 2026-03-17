"use client";

import { Shield, RefreshCcw, Zap } from "lucide-react";
import type { Prompt } from "@/entities/prompt";
import { PriceBadge, SelectBadge } from "@/entities/prompt";
import { AddToCartButton, SelectDownloadButton } from "@/features/prompt-purchase";

interface PurchasePanelProps {
  prompt: Prompt;
}

export function PurchasePanel({ prompt }: PurchasePanelProps) {
  return (
    <div className="sticky top-20 space-y-4 rounded-lg border border-border bg-card p-5">
      {/* Price */}
      <div className="flex items-center gap-3">
        <PriceBadge price={prompt.price} discount={prompt.discount} className="text-2xl" />
        {prompt.isSelect && <SelectBadge />}
      </div>

      {/* CTA */}
      <AddToCartButton prompt={prompt} className="w-full" />

      {prompt.isSelect && !prompt.isFree && (
        <SelectDownloadButton promptId={prompt.id} className="w-full" />
      )}

      {/* Guarantees */}
      <div className="space-y-2 border-t border-border pt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 shrink-0" />
          품질 보장 — 설명과 다를 시 환불
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCcw className="h-3.5 w-3.5 shrink-0" />
          24시간 이내 환불 가능
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Zap className="h-3.5 w-3.5 shrink-0" />
          구매 즉시 프롬프트 접근
        </div>
      </div>
    </div>
  );
}
