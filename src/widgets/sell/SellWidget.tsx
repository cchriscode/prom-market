"use client";

import { UploadWizard } from "@/features/prompt-upload";
import { PromptGuidelines } from "./PromptGuidelines";

export function SellWidget() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="min-w-0 flex-1">
        <UploadWizard />
      </div>
      <div className="w-full shrink-0 lg:w-72">
        <PromptGuidelines />
      </div>
    </div>
  );
}
