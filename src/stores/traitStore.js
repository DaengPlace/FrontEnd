import { create } from "zustand";

export const useTraitStore = create((set) => ({
  petTraits: [],
  memberTraits: [],

  setPetTraits: (traits) => set({ petTraits: traits }),
  setMemberTraits: (traits) => set({ memberTraits: traits }),
}));