"use client";

import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { useUploadWizard } from "../model/useUploadWizard";

export function StepPromptContent() {
  const { formData, updateForm, nextStep, prevStep } = useUploadWizard();

  const canProceed = formData.title && formData.promptText && formData.testPrompt;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">프롬프트 제목</label>
        <Input
          placeholder="예: Minimalist Logo Design"
          value={formData.title}
          onChange={(e) => updateForm({ title: e.target.value })}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">상세 설명</label>
        <Textarea
          placeholder="프롬프트의 용도, 결과물 스타일, 사용 사례를 설명하세요."
          rows={3}
          value={formData.description}
          onChange={(e) => updateForm({ description: e.target.value })}
        />
      </div>

      {/* Prompt Text */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">프롬프트 텍스트</label>
        <p className="text-xs text-muted-foreground">
          변수는 [대괄호]로 표시하세요. 예: [주제], [스타일], [색상]
        </p>
        <Textarea
          placeholder="A minimalist [style] logo for [company name], featuring [icon element], clean lines, modern typography..."
          rows={6}
          className="font-mono text-sm"
          value={formData.promptText}
          onChange={(e) => updateForm({ promptText: e.target.value })}
        />
      </div>

      {/* Test Prompt */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">테스트 프롬프트</label>
        <p className="text-xs text-muted-foreground">
          변수가 채워진 완성 버전 1개를 입력하세요. 심사에 사용됩니다.
        </p>
        <Textarea
          placeholder="A minimalist flat logo for TechStart Inc, featuring a rocket icon, clean lines, modern typography..."
          rows={4}
          className="font-mono text-sm"
          value={formData.testPrompt}
          onChange={(e) => updateForm({ testPrompt: e.target.value })}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          이전
        </Button>
        <Button onClick={nextStep} disabled={!canProceed}>
          다음 단계
        </Button>
      </div>
    </div>
  );
}
