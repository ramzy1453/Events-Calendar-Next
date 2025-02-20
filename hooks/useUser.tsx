import { IUser } from "@/types/user";
import { create } from "zustand";

type UserStore = {
  user?: IUser;
  setUser: (_user?: IUser) => void;
  clearUser: () => void;
};

export const useUser = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: undefined }),
}));
