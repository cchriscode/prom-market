"use client";

import { AI_MODELS } from "@/shared/lib/constants";
import { MOCK_CATEGORIES } from "@/shared/lib/mocks";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { useUploadWizard } from "../model/useUploadWizard";

const PROMPT_TYPES = [
  { id: "IMAGE" as const, label: "Image", emoji: "🖼️", desc: "이미지 생성 프롬프트" },
  { id: "TEXT" as const, label: "Text", emoji: "📝", desc: "텍스트 생성 프롬프트" },
  { id: "VIDEO" as const, label: "Video", emoji: "🎬", desc: "비디오 생성 프롬프트" },
];

export function StepBasicInfo() {
  const { formData, updateForm, nextStep } = useUploadWizard();

  const canProceed = formData.aiModel && formData.promptType && formData.categoryId;

  return (
    <div className="space-y-6">
      {/* AI Model */}
      <section>
        <h3 className="mb-3 text-sm font-semibold">AI 모델 선택</h3>
        <div className="flex flex-wrap gap-2">
          {AI_MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => updateForm({ aiModel: m.id })}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
                formData.aiModel === m.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-accent"
              )}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>
      </section>

      {/* Prompt Type */}
      <section>
        <h3 className="mb-3 text-sm font-semibold">프롬프트 타입</h3>
        <div className="grid grid-cols-3 gap-3">
          {PROMPT_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => updateForm({ promptType: t.id })}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors",
                formData.promptType === t.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-accent"
              )}
            >
              <span className="text-2xl">{t.emoji}</span>
              <span className="text-sm font-medium">{t.label}</span>
              <span className="text-xs text-muted-foreground">{t.desc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Category */}
      <section>
        <h3 className="mb-3 text-sm font-semibold">카테고리</h3>
        <div className="flex flex-wrap gap-2">
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateForm({ categoryId: cat.id })}
              className={cn(
                "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                formData.categoryId === cat.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-accent"
              )}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Next */}
      <div className="flex justify-end pt-4">
        <Button onClick={nextStep} disabled={!canProceed}>
          다음 단계
        </Button>
      </div>
    </div>
  );
}
