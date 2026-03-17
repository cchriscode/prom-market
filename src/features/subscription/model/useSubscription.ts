import { create } from "zustand";

export interface SubscriptionState {
  isSubscribed: boolean;
  plan: "basic" | "pro" | null;
  downloadsLeft: number;
  creditsLeft: number;
  rolloverDownloads: number;
  subscribe: (plan: "basic" | "pro") => void;
  cancel: () => void;
  useDownload: () => boolean;
  topUp: (downloads: number) => void;
}

export const useSubscription = create<SubscriptionState>((set, get) => ({
  isSubscribed: false,
  plan: null,
  downloadsLeft: 0,
  creditsLeft: 0,
  rolloverDownloads: 0,

  subscribe: (plan) =>
    set({
      isSubscribed: true,
      plan,
      downloadsLeft: 10,
      creditsLeft: 1000,
    }),

  cancel: () =>
    set({
      isSubscribed: false,
      plan: null,
    }),

  useDownload: () => {
    const { downloadsLeft } = get();
    if (downloadsLeft <= 0) return false;
    set({ downloadsLeft: downloadsLeft - 1 });
    return true;
  },

  topUp: (downloads) =>
    set((s) => ({ downloadsLeft: s.downloadsLeft + downloads })),
}));
