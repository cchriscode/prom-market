"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { MOCK_PROMPTS } from "@/shared/lib/mocks";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

export default function EditPromptPage({
  params,
}: {
  params: Promise<{ promptId: string }>;
}) {
  const { promptId } = use(params);
  const prompt = MOCK_PROMPTS.find((p) => p.id === promptId);

  if (!prompt) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/account">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">프롬프트 수정</h1>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">제목</label>
          <Input defaultValue={prompt.title} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">설명</label>
          <Textarea defaultValue={prompt.description} rows={4} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">가격 ($)</label>
            <Input
              type="number"
              defaultValue={prompt.price}
              step="0.01"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">할인율 (%)</label>
            <Input
              type="number"
              defaultValue={prompt.discount ?? 0}
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">AI 모델</label>
          <Input defaultValue={prompt.aiModel} disabled />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">카테고리</label>
          <Input defaultValue={prompt.categoryName} disabled />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Link href="/account">
            <Button variant="outline">취소</Button>
          </Link>
          <Button
            onClick={() => toast.success("프롬프트가 수정되었습니다.")}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
