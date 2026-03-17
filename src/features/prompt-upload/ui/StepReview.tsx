"use client";

import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { AI_MODELS } from "@/shared/lib/constants";
import { MOCK_CATEGORIES } from "@/shared/lib/mocks";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useUploadWizard } from "../model/useUploadWizard";

export function StepReview() {
  const { formData, updateForm, prevStep, reset } = useUploadWizard();

  const model = AI_MODELS.find((m) => m.id === formData.aiModel);
  const category = MOCK_CATEGORIES.find((c) => c.id === formData.categoryId);

  const handleSubmit = () => {
    // Mock submit — just reset
    toast.success("프롬프트가 제출되었습니다! 심사가 시작됩니다. (15분~36시간)");
    reset();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold">최종 확인</h3>

      {/* Summary */}
      <div className="space-y-3 rounded-lg border border-border bg-accent/50 p-4 text-sm">
        <Row label="제목" value={formData.title} />
        <Row label="AI 모델" value={model ? `${model.emoji} ${model.label}` : "-"} />
        <Row label="타입" value={formData.promptType || "-"} />
        <Row label="카테고리" value={category ? `${category.icon} ${category.name}` : "-"} />
        <Row label="이미지" value={`${formData.exampleImages.length}개`} />
        <Row
          label="가격"
          value={
            formData.isFree
              ? "무료"
              : `$${formData.price.toFixed(2)}${formData.discount ? ` (${formData.discount}% 할인)` : ""}`
          }
        />
        <Row label="Select" value={formData.isSelect ? "포함" : "미포함"} />
      </div>

      {/* Prompt text preview */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">프롬프트 미리보기</label>
        <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm font-mono leading-relaxed">
          {formData.promptText || "-"}
        </div>
      </div>

      {/* Verification link */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">검증 링크 (선택)</label>
        <Input
          placeholder="https://..."
          value={formData.verificationLink}
          onChange={(e) => updateForm({ verificationLink: e.target.value })}
        />
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={formData.agreedToTerms}
          onChange={(e) => updateForm({ agreedToTerms: e.target.checked })}
          className="mt-1 h-4 w-4 rounded border-border accent-primary"
        />
        <span className="text-xs text-muted-foreground leading-relaxed">
          프롬프트 판매 약관에 동의합니다. 제출된 프롬프트는 검토 후 게시되며,
          거절 시 사유가 안내됩니다.
        </span>
      </label>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          이전
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!formData.agreedToTerms}
          className="gap-1.5"
        >
          <CheckCircle2 className="h-4 w-4" />
          제출하기
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
