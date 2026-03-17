import Link from "next/link";
import { UserX, ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function ProfileNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <UserX className="mb-4 h-12 w-12 text-muted-foreground/40" />
      <h2 className="text-xl font-semibold">사용자를 찾을 수 없습니다</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        존재하지 않는 사용자 프로필입니다.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/leaderboard">
          <Button variant="outline" className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            리더보드로
          </Button>
        </Link>
      </div>
    </div>
  );
}
