import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

export function PromptGuidelines() {
  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-semibold">프롬프트 등록 가이드라인</h3>

      <div className="space-y-3 text-xs text-muted-foreground">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
          <span>명확한 유스케이스와 구매 가치를 제공하세요</span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
          <span>[변수]를 활용해 다양한 사용이 가능하도록 일반화하세요</span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
          <span>일관된 스타일의 예시 출력물을 3개 이상 첨부하세요</span>
        </div>
        <div className="flex items-start gap-2">
          <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
          <span>제목만 봐도 유추 가능한 너무 단순한 프롬프트는 거절됩니다</span>
        </div>
        <div className="flex items-start gap-2">
          <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
          <span>기존 프롬프트와 중복되거나 표절된 내용은 거절됩니다</span>
        </div>
        <div className="flex items-start gap-2">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
          <span>심사는 제출 후 15분~36시간 소요됩니다</span>
        </div>
      </div>
    </div>
  );
}
