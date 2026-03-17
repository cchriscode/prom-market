"use client";

import { ShoppingCart, Check, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import type { Prompt } from "@/entities/prompt";
import { useCart } from "../model/useCart";

interface AddToCartButtonProps {
  prompt: Prompt;
  size?: "default" | "lg";
  className?: string;
}

export function AddToCartButton({ prompt, size = "lg", className }: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(prompt.id);

  if (prompt.isFree) {
    return (
      <Button
        size={size}
        className={className}
        onClick={() => toast.success("무료 프롬프트를 다운로드했습니다.")}
      >
        <Zap className="h-4 w-4" />
        무료 다운로드
      </Button>
    );
  }

  if (inCart) {
    return (
      <Button size={size} variant="outline" disabled className={className}>
        <Check className="h-4 w-4" />
        장바구니에 담김
      </Button>
    );
  }

  return (
    <Button size={size} onClick={() => addItem(prompt)} className={className}>
      <ShoppingCart className="h-4 w-4" />
      장바구니에 추가
    </Button>
  );
}
