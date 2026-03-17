import { create } from "zustand";
import type { Notification } from "@/shared/lib/mocks/notifications";
import { MOCK_NOTIFICATIONS } from "@/shared/lib/mocks";

interface NotificationState {
  notifications: Notification[];
  unreadCount: () => number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotifications = create<NotificationState>((set, get) => ({
  notifications: MOCK_NOTIFICATIONS,

  unreadCount: () => get().notifications.filter((n) => !n.isRead).length,

  markAsRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, isRead: true })),
    })),
}));
