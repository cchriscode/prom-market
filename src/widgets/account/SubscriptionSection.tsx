"use client";

import {
  SubscriptionStatus,
  SelectPlanCards,
  TopUpDialog,
} from "@/features/subscription";
import { useSubscription } from "@/features/subscription";

export function SubscriptionSection() {
  const { isSubscribed } = useSubscription();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">PromMarket Select</h3>
        {isSubscribed && <TopUpDialog />}
      </div>

      <SubscriptionStatus />
      <SelectPlanCards />
    </div>
  );
}
