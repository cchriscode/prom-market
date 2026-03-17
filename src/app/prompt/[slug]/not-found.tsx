import Link from "next/link";
import { PackageX, ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function PromptNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <PackageX className="mb-4 h-12 w-12 text-muted-foreground/40" />
      <h2 className="text-xl font-semibold">프롬프트를 찾을 수 없습니다</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        삭제되었거나 존재하지 않는 프롬프트입니다.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/marketplace">
          <Button variant="outline" className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            마켓플레이스로
          </Button>
        </Link>
      </div>
    </div>
  );
}
