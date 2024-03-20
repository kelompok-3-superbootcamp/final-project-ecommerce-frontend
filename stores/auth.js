import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: get()?.user,
      login: (params) => {
        set({ user: params });
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
    },
  ),
);