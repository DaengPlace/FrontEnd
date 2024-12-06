import { create } from "zustand";

export const useAuthStore = create((set) => ({
  accessToken: null,
  refreshToken: null,
  registerToken: null,
  setTokens: (tokens) => set((state) => ({ ...state, ...tokens })),
}));
