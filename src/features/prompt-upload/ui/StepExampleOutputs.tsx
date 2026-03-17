"use client";

import { Upload, X, ImagePlus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useUploadWizard } from "../model/useUploadWizard";

export function StepExampleOutputs() {
  const { formData, updateForm, nextStep, prevStep } = useUploadWizard();

  const handleAddPlaceholder = () => {
    if (formData.exampleImages.length < 9) {
      updateForm({
        exampleImages: [
          ...formData.exampleImages,
          `/images/placeholder-${formData.exampleImages.length + 1}.jpg`,
        ],
      });
    }
  };

  const handleRemove = (index: number) => {
    updateForm({
      exampleImages: formData.exampleImages.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold">예시 출력물</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          프롬프트로 생성한 결과물을 최대 9개까지 업로드하세요. 첫 번째 이미지가 썸네일로 사용됩니다.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Existing images */}
        {formData.exampleImages.map((_, i) => (
          <div
            key={i}
            className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
          >
            <div className="flex h-full items-center justify-center text-2xl text-muted-foreground/40">
              🖼️
            </div>
            {i === 0 && (
              <span className="absolute left-1.5 top-1.5 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                썸네일
              </span>
            )}
            <button
              onClick={() => handleRemove(i)}
              className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        {/* Add button */}
        {formData.exampleImages.length < 9 && (
          <button
            onClick={handleAddPlaceholder}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ImagePlus className="h-6 w-6" />
            <span className="text-xs">추가</span>
          </button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {formData.exampleImages.length}/9개 업로드됨
      </p>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          이전
        </Button>
        <Button onClick={nextStep} disabled={formData.exampleImages.length === 0}>
          다음 단계
        </Button>
      </div>
    </div>
  );
}
