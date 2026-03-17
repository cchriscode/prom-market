import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function BlogPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-2xl font-bold">블로그</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        블로그 콘텐츠를 준비 중입니다.
      </p>
      <Link href="/">
        <Button variant="outline" className="mt-6 gap-1.5">
          <ArrowLeft className="h-4 w-4" />
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
