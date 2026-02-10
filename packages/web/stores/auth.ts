import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  signIn: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      signIn: async (accessToken) => set({ accessToken }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
