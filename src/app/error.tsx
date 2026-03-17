"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <AlertTriangle className="mb-4 h-12 w-12 text-destructive" />
      <h2 className="text-xl font-semibold">문제가 발생했습니다</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        페이지를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.
      </p>
      <Button onClick={reset} variant="outline" className="mt-6 gap-1.5">
        <RotateCcw className="h-4 w-4" />
        다시 시도
      </Button>
    </div>
  );
}
