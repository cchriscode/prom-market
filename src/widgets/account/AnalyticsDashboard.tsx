"use client";

import { SalesChart, ViewsChart, PromptPerformance } from "@/features/seller-dashboard";
import { MOCK_SELLER_ID } from "@/shared/lib/constants";

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <SalesChart />
        <ViewsChart />
      </div>
      <PromptPerformance sellerId={MOCK_SELLER_ID} />
    </div>
  );
}
