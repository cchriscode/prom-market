"use client";

import { cn } from "@/shared/lib/utils";
import { MOCK_CONVERSATIONS } from "@/shared/lib/mocks";
import type { ChatConversation } from "@/shared/lib/mocks/chat";

interface ChatListProps {
  activeId: string | null;
  onSelect: (conv: ChatConversation) => void;
}

export function ChatList({ activeId, onSelect }: ChatListProps) {
  return (
    <div className="space-y-1">
      {MOCK_CONVERSATIONS.map((conv) => {
        const time = new Date(conv.lastMessageAt).toLocaleDateString("ko-KR", {
          month: "short",
          day: "numeric",
        });

        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv)}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
              activeId === conv.id ? "bg-accent" : "hover:bg-accent/50"
            )}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
              {conv.otherUsername.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">@{conv.otherUsername}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{time}</span>
              </div>
              <p className="truncate text-xs text-muted-foreground">{conv.lastMessage}</p>
            </div>
            {conv.unreadCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {conv.unreadCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
