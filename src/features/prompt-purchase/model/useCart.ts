import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Prompt } from "@/entities/prompt";

export interface CartItem {
  prompt: Prompt;
  addedAt: string;
}

interface CartState {
  items: CartItem[];
  addItem: (prompt: Prompt) => void;
  removeItem: (promptId: string) => void;
  clearCart: () => void;
  isInCart: (promptId: string) => boolean;
  totalPrice: () => number;
  itemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (prompt) => {
        const { items } = get();
        if (items.some((item) => item.prompt.id === prompt.id)) return;
        set({ items: [...items, { prompt, addedAt: new Date().toISOString() }] });
      },

      removeItem: (promptId) => {
        set((s) => ({ items: s.items.filter((item) => item.prompt.id !== promptId) }));
      },

      clearCart: () => set({ items: [] }),

      isInCart: (promptId) => get().items.some((item) => item.prompt.id === promptId),

      totalPrice: () =>
        get().items.reduce((sum, item) => {
          const { price, discount } = item.prompt;
          const discounted = discount ? price * (1 - discount / 100) : price;
          return sum + discounted;
        }, 0),

      itemCount: () => get().items.length,
    }),
    { name: "cart-storage" }
  )
);
