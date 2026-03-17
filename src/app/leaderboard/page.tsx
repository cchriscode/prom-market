import { Trophy } from "lucide-react";
import { LeaderboardWidget } from "@/widgets/leaderboard";

export const metadata = {
  title: "리더보드 — 프롬마켓",
  description: "판매자 랭킹",
};

export default function LeaderboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h1 className="text-2xl font-bold">판매자 리더보드</h1>
      </div>
      <LeaderboardWidget />
    </div>
  );
}
