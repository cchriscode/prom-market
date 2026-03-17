import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <FileQuestion className="mb-4 h-12 w-12 text-muted-foreground/40" />
      <h2 className="text-xl font-semibold">페이지를 찾을 수 없습니다</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/">
          <Button variant="outline" className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            홈으로
          </Button>
        </Link>
        <Link href="/marketplace">
          <Button>마켓플레이스 둘러보기</Button>
        </Link>
      </div>
    </div>
  );
}
