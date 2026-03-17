"use client";

import { MOCK_DAILY_STATS } from "@/shared/lib/mocks";
import { formatNumber } from "@/shared/lib/format";

export function ViewsChart() {
  const stats = MOCK_DAILY_STATS;
  const maxViews = Math.max(...stats.map((s) => s.views));
  const totalViews = stats.reduce((sum, s) => sum + s.views, 0);

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">조회수 (최근 30일)</h3>
        <div className="text-lg font-bold">{formatNumber(totalViews)}</div>
      </div>

      {/* Simple bar chart */}
      <div className="flex h-32 items-end gap-px">
        {stats.map((day) => (
          <div
            key={day.date}
            className="flex-1 rounded-t bg-blue-400/80 transition-all hover:bg-blue-500"
            style={{
              height: `${maxViews > 0 ? (day.views / maxViews) * 100 : 0}%`,
              minHeight: day.views > 0 ? 2 : 0,
            }}
            title={`${day.date}: ${day.views} views`}
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
