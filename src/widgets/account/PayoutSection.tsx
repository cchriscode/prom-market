import { PayoutHistory } from "@/features/seller-dashboard";
import { Button } from "@/shared/ui/button";

export function PayoutSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">수수료 안내</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            마켓플레이스 판매 20% · 직접 링크 0% · Hire 작업 10%
          </p>
        </div>
        <Button size="sm" variant="outline">
          조기 출금 요청
        </Button>
      </div>

      <PayoutHistory />
    </div>
  );
}
