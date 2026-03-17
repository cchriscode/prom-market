"use client";

import { cn } from "@/shared/lib/utils";
import { useUploadWizard } from "../model/useUploadWizard";
import { StepBasicInfo } from "./StepBasicInfo";
import { StepPromptContent } from "./StepPromptContent";
import { StepExampleOutputs } from "./StepExampleOutputs";
import { StepPricing } from "./StepPricing";
import { StepReview } from "./StepReview";

const STEPS = [
  { number: 1, label: "기본 정보" },
  { number: 2, label: "프롬프트 작성" },
  { number: 3, label: "예시 출력물" },
  { number: 4, label: "가격 설정" },
  { number: 5, label: "검증 & 제출" },
];

export function UploadWizard() {
  const { currentStep, setStep } = useUploadWizard();

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <nav className="flex items-center gap-1">
        {STEPS.map((step, i) => (
          <div key={step.number} className="flex items-center">
            <button
              onClick={() => {
                if (step.number < currentStep) setStep(step.number);
              }}
              disabled={step.number > currentStep}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                currentStep === step.number
                  ? "bg-primary text-primary-foreground"
                  : currentStep > step.number
                    ? "cursor-pointer bg-primary/10 text-primary hover:bg-primary/20"
                    : "cursor-not-allowed bg-muted text-muted-foreground"
              )}
            >
              <span>{step.number}</span>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-1 h-px w-4 sm:w-8",
                  currentStep > step.number ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </nav>

      {/* Step content */}
      <div className="rounded-lg border border-border bg-card p-6">
        {currentStep === 1 && <StepBasicInfo />}
        {currentStep === 2 && <StepPromptContent />}
        {currentStep === 3 && <StepExampleOutputs />}
        {currentStep === 4 && <StepPricing />}
        {currentStep === 5 && <StepReview />}
      </div>
    </div>
  );
}
