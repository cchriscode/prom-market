import { cn } from "@/shared/lib/utils";
import type { ChatMessage } from "@/shared/lib/mocks/chat";

interface MessageBubbleProps {
  message: ChatMessage;
  isMine: boolean;
}

export function MessageBubble({ message, isMine }: MessageBubbleProps) {
  const time = new Date(message.createdAt).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cn("flex", isMine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-lg px-3 py-2",
          isMine
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p
          className={cn(
            "mt-1 text-[10px]",
            isMine ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {time}
        </p>
      </div>
    </div>
  );
}
