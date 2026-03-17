"use client";

import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useUploadWizard } from "../model/useUploadWizard";

export function StepPricing() {
  const { formData, updateForm, nextStep, prevStep } = useUploadWizard();

  const canProceed = formData.isFree || formData.price > 0;

  return (
    <div className="space-y-6">
      {/* Free toggle */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">가격 설정</h3>
        <div className="flex gap-3">
          <button
            onClick={() => updateForm({ isFree: false })}
            className={cn(
              "flex-1 rounded-lg border p-4 text-center transition-colors",
              !formData.isFree
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-accent"
            )}
          >
            <span className="text-sm font-medium">유료</span>
          </button>
          <button
            onClick={() => updateForm({ isFree: true, price: 0, discount: 0 })}
            className={cn(
              "flex-1 rounded-lg border p-4 text-center transition-colors",
              formData.isFree
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-accent"
            )}
          >
            <span className="text-sm font-medium">무료</span>
          </button>
        </div>
      </div>

      {/* Price input */}
      {!formData.isFree && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-semibold">가격 (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-mono">
                $
              </span>
              <Input
                type="number"
                min={0.99}
                max={49.99}
                step={0.01}
                placeholder="4.99"
                className="pl-7 font-mono"
                value={formData.price || ""}
                onChange={(e) => updateForm({ price: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <p className="text-xs text-muted-foreground">$0.99 ~ $49.99</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">할인율 (%)</label>
            <Input
              type="number"
              min={0}
              max={90}
              placeholder="0"
              value={formData.discount || ""}
              onChange={(e) => updateForm({ discount: parseInt(e.target.value) || 0 })}
            />
          </div>
        </>
      )}

      {/* Select */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">Select 포함 여부</label>
        <button
          onClick={() => updateForm({ isSelect: !formData.isSelect })}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg border p-4 transition-colors",
            formData.isSelect
              ? "border-primary bg-primary/5"
              : "border-border hover:bg-accent"
          )}
        >
          <span className="text-lg">∞</span>
          <div className="text-left">
            <span className="text-sm font-medium">PromMarket Select</span>
            <p className="text-xs text-muted-foreground">
              구독자가 월간 다운로드로 이용할 수 있습니다
            </p>
          </div>
        </button>
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
