import { create } from "zustand";

export const useSigninStore = create((set) => ({
  signinData: {
    name: "",
    nickname: "",
    profileImageUrl: "",
    gender: "",
    state: "",
    city: "",
    birthDate: "",
    locationStatus: false,
    email: "",
  },
  setSigninData: (data) =>
    set((state) => ({
      signinData: { ...state.signinData, ...data },
    })),
}));
