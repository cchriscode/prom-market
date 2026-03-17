"use client";

import { MOCK_DAILY_STATS } from "@/shared/lib/mocks";

export function SalesChart() {
  const stats = MOCK_DAILY_STATS;
  const maxRevenue = Math.max(...stats.map((s) => s.revenue));
  const totalRevenue = stats.reduce((sum, s) => sum + s.revenue, 0);
  const totalSales = stats.reduce((sum, s) => sum + s.sales, 0);

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">매출 (최근 30일)</h3>
        <div className="text-right">
          <div className="text-lg font-bold font-mono">${totalRevenue.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">{totalSales}건 판매</div>
        </div>
      </div>

      {/* Simple bar chart */}
      <div className="flex h-32 items-end gap-px">
        {stats.map((day) => (
          <div
            key={day.date}
            className="flex-1 rounded-t bg-primary/80 transition-all hover:bg-primary"
            style={{
              height: `${maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0}%`,
              minHeight: day.revenue > 0 ? 2 : 0,
            }}
            title={`${day.date}: $${day.revenue.toFixed(2)} (${day.sales}건)`}
          />
        ))}
      </div>

      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{stats[0]?.date.slice(5)}</span>
        <span>{stats[stats.length - 1]?.date.slice(5)}</span>
      </div>
    </div>
  );
}
