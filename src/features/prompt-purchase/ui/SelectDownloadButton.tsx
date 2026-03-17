"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { useSubscription } from "@/features/subscription/model/useSubscription";

interface SelectDownloadButtonProps {
  promptId: string;
  className?: string;
}

export function SelectDownloadButton({ promptId, className }: SelectDownloadButtonProps) {
  const { isSubscribed, downloadsLeft, useDownload } = useSubscription();

  if (!isSubscribed) {
    return (
      <Button variant="outline" size="lg" disabled className={className}>
        <Download className="h-4 w-4" />
        Select 구독 필요
      </Button>
    );
  }

  if (downloadsLeft <= 0) {
    return (
      <Button variant="outline" size="lg" disabled className={className}>
        <Download className="h-4 w-4" />
        다운로드 소진
      </Button>
    );
  }

  const handleDownload = () => {
    const success = useDownload();
    if (success) {
      toast.success(`프롬프트를 Select로 다운로드했습니다. 남은 다운로드: ${downloadsLeft - 1}`);
    }
  };

  return (
    <Button variant="outline" size="lg" onClick={handleDownload} className={className}>
      <Download className="h-4 w-4" />
      Select로 다운로드 ({downloadsLeft}회 남음)
    </Button>
  );
}
