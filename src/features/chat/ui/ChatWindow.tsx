"use client";

import { useState } from "react";
import { Send, MessageCircle, ArrowLeft } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { MOCK_SELLER_ID } from "@/shared/lib/constants";
import { MOCK_MESSAGES } from "@/shared/lib/mocks";
import type { ChatConversation, ChatMessage } from "@/shared/lib/mocks/chat";
import { MessageBubble } from "./MessageBubble";

interface ChatWindowProps {
  conversation: ChatConversation | null;
  onBack?: () => void;
}

export function ChatWindow({ conversation, onBack }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);

  if (!conversation) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <MessageCircle className="mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">대화를 선택하세요</p>
      </div>
    );
  }

  const mockMessages = MOCK_MESSAGES.filter(
    (m) => m.conversationId === conversation.id
  );
  const allMessages = [
    ...mockMessages,
    ...localMessages.filter((m) => m.conversationId === conversation.id),
  ];

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: ChatMessage = {
      id: `msg-local-${Date.now()}`,
      conversationId: conversation.id,
      senderId: MOCK_SELLER_ID,
      text: newMessage.trim(),
      createdAt: new Date().toISOString(),
    };
    setLocalMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent md:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
          {conversation.otherUsername.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-semibold">@{conversation.otherUsername}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {allMessages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMine={msg.senderId === MOCK_SELLER_ID}
          />
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-border p-3">
        <Input
          placeholder="메시지를 입력하세요..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1"
        />
        <Button size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
