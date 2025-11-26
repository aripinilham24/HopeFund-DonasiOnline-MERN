import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist((set) => ({
    user: {
      id: null,
      name: null,
      email: null,
      role: null,
      avatar: null,
    },
    accessToken: null,
    refreshToken: null,

    setUser: (data) =>
      set({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user,
      }),

    clearUser: () =>
      set({
        refreshToken: null,
        accessToken: null,
        user: {
          id: null,
          name: null,
          email: null,
          role: null,
          avatar: null,
        },
      }),
  })),

  {
    name: "user-store",
  }
);
