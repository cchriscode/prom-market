import { ChatWidget } from "@/widgets/chat";

export const metadata = {
  title: "채팅 — 프롬마켓",
  description: "판매자와 구매자 간 1:1 메시지",
};

export default function ChatPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">채팅</h1>
      <ChatWidget />
    </div>
  );
}
