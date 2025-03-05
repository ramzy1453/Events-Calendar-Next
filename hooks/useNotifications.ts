import { create } from "zustand";

type Notification = {
  type: string;
  content: object;
  read: boolean;
};

type NotificationsStore = {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
};

export const useNotifications = create<NotificationsStore>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
}));
