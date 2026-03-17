"use client";

import { Infinity, Download, Zap } from "lucide-react";
import { useSubscription } from "../model/useSubscription";

export function SubscriptionStatus() {
  const { isSubscribed, plan, downloadsLeft, creditsLeft } = useSubscription();

  if (!isSubscribed) {
    return (
      <div className="rounded-lg border border-dashed border-border p-6 text-center">
        <Infinity className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm font-medium">Select 구독 미가입</p>
        <p className="mt-1 text-xs text-muted-foreground">
          구독하면 20만+개 프롬프트를 월간 다운로드로 이용할 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
      <div className="flex items-center gap-2">
        <span className="text-lg">∞</span>
        <span className="font-semibold">Select {plan === "pro" ? "Pro" : "Basic"}</span>
        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
          활성
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Download className="h-3 w-3" />
            남은 다운로드
          </div>
          <div className="text-xl font-bold">{downloadsLeft}</div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Zap className="h-3 w-3" />
            AI 크레딧
          </div>
          <div className="text-xl font-bold">{creditsLeft.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
