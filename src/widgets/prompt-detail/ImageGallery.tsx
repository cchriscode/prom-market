"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
  type: string;
}

const TYPE_EMOJI: Record<string, string> = {
  IMAGE: "🖼️",
  TEXT: "📝",
  VIDEO: "🎬",
};

export function ImageGallery({ images, title, type }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
        <div className="absolute inset-0 flex items-center justify-center text-6xl text-muted-foreground/30">
          {TYPE_EMOJI[type] ?? "🖼️"}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative aspect-square w-16 overflow-hidden rounded-md border bg-muted transition-all",
                activeIndex === i
                  ? "border-primary ring-1 ring-primary"
                  : "border-border opacity-70 hover:opacity-100"
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center text-lg text-muted-foreground/30">
                {TYPE_EMOJI[type] ?? "🖼️"}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
