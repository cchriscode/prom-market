import { MOCK_PAYOUTS } from "@/shared/lib/mocks";
import { cn } from "@/shared/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  COMPLETED: "text-green-600 bg-green-50",
  PROCESSING: "text-blue-600 bg-blue-50",
  PENDING: "text-amber-600 bg-amber-50",
};

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: "완료",
  PROCESSING: "처리중",
  PENDING: "대기",
};

export function PayoutHistory() {
  const totalPaid = MOCK_PAYOUTS
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">정산 내역</h3>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">총 정산액</div>
          <div className="text-lg font-bold font-mono">${totalPaid.toFixed(2)}</div>
        </div>
      </div>

      <div className="space-y-2">
        {MOCK_PAYOUTS.map((payout) => (
          <div
            key={payout.id}
            className="flex items-center justify-between rounded-md border border-border px-3 py-2"
          >
            <div>
              <div className="text-sm font-mono font-medium">
                ${payout.amount.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(payout.createdAt).toLocaleDateString("ko-KR")}
              </div>
            </div>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                STATUS_STYLES[payout.status]
              )}
            >
              {STATUS_LABELS[payout.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
