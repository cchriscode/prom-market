import { AccountWidget } from "@/widgets/account";

export const metadata = {
  title: "내 계정 — 프롬마켓",
  description: "구매 내역, 프롬프트 관리, 판매 분석, 설정",
};

export default function AccountPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">내 계정</h1>
      <AccountWidget />
    </div>
  );
}
