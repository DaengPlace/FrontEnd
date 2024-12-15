import { create } from "zustand";

export const useDogStore = create((set) => ({
  dogData: {
    name: "",
    breed: "",
    birthDate: "",
    weight: 0.0,
    gender: null,
    isNeutered: null,
  },
  setDogData: (data) =>
    set((state) => ({
      dogData: { ...state.dogData, ...data },
    })),
}));
