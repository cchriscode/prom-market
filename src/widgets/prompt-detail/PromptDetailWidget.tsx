"use client";

import { notFound } from "next/navigation";
import { MOCK_PROMPTS } from "@/shared/lib/mocks";
import { ImageGallery } from "./ImageGallery";
import { PromptInfo } from "./PromptInfo";
import { PurchasePanel } from "./PurchasePanel";
import { ReviewSection } from "./ReviewSection";
import { RelatedPrompts } from "./RelatedPrompts";

interface PromptDetailWidgetProps {
  slug: string;
}

export function PromptDetailWidget({ slug }: PromptDetailWidgetProps) {
  const prompt = MOCK_PROMPTS.find((p) => p.slug === slug);

  if (!prompt) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Main content: gallery + info + purchase panel */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left: gallery + info */}
        <div className="min-w-0 flex-1 space-y-6">
          <ImageGallery images={prompt.images} title={prompt.title} type={prompt.type} />
          <PromptInfo prompt={prompt} />
        </div>

        {/* Right: purchase panel */}
        <div className="w-full shrink-0 lg:w-80">
          <PurchasePanel prompt={prompt} />
        </div>
      </div>

      {/* Reviews */}
      <ReviewSection
        promptId={prompt.id}
        avgRating={prompt.avgRating}
        reviewCount={prompt.reviewCount}
      />

      {/* Related */}
      <RelatedPrompts
        categoryId={prompt.categoryId}
        currentPromptId={prompt.id}
      />
    </div>
  );
}
