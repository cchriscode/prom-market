"use client";

import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { useSubscription } from "../model/useSubscription";

const PLANS = [
  {
    id: "basic" as const,
    name: "Basic",
    price: "$9.90",
    priceNote: "런칭 할인가 / 월",
    features: [
      "월 10회 다운로드",
      "미사용분 이월 (최대 120개)",
      "AI 생성 크레딧 1,000회/월",
      "20만+ Select 프롬프트 접근",
    ],
  },
  {
    id: "pro" as const,
    name: "Pro",
    price: "$14.90",
    priceNote: "/ 월",
    features: [
      "월 10회 다운로드",
      "미사용분 이월 (최대 120개)",
      "AI 생성 크레딧 1,000회/월",
      "20만+ Select 프롬프트 접근",
      "우선 고객 지원",
      "신규 프롬프트 얼리 액세스",
    ],
    popular: true,
  },
];

export function SelectPlanCards() {
  const { isSubscribed, plan, subscribe, cancel } = useSubscription();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {PLANS.map((p) => (
        <div
          key={p.id}
          className={cn(
            "relative flex flex-col rounded-lg border p-6",
            p.popular ? "border-primary" : "border-border"
          )}
        >
          {p.popular && (
            <span className="absolute -top-2.5 left-4 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
              인기
            </span>
          )}

          <h3 className="text-lg font-semibold">{p.name}</h3>
          <div className="mt-2">
            <span className="text-2xl font-bold">{p.price}</span>
            <span className="text-xs text-muted-foreground"> {p.priceNote}</span>
          </div>

          <ul className="mt-4 flex-1 space-y-2">
            {p.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            {isSubscribed && plan === p.id ? (
              <Button variant="outline" className="w-full" onClick={cancel}>
                구독 취소
              </Button>
            ) : (
              <Button
                className="w-full"
                variant={p.popular ? "default" : "outline"}
                onClick={() => subscribe(p.id)}
              >
                {isSubscribed ? "플랜 변경" : "구독 시작"}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
