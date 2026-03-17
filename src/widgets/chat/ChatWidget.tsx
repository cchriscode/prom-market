"use client";

import { useState } from "react";
import { ChatList, ChatWindow } from "@/features/chat";
import type { ChatConversation } from "@/shared/lib/mocks/chat";

export function ChatWidget() {
  const [activeConv, setActiveConv] = useState<ChatConversation | null>(null);

  return (
    <div className="flex h-[calc(100vh-180px)] overflow-hidden rounded-lg border border-border bg-card">
      {/* Conversation list — hidden on mobile when a conversation is active */}
      <div
        className={`w-full shrink-0 overflow-y-auto border-r border-border p-2 md:w-72 ${activeConv ? "hidden md:block" : ""}`}
      >
        <ChatList activeId={activeConv?.id ?? null} onSelect={setActiveConv} />
      </div>

      {/* Chat window — hidden on mobile when no conversation selected */}
      <div className={`min-w-0 flex-1 ${!activeConv ? "hidden md:flex" : "flex"}`}>
        <ChatWindow
          conversation={activeConv}
          onBack={() => setActiveConv(null)}
        />
      </div>
    </div>
  );
}
