import { create } from 'zustand';

const useReviewStore = create((set) => ({
  placeName: '',
  visitDate: '',
  category: '',
  setPlaceName: (name) => set({ placeName: name }),
  setVisitDate: (date) => set({ visitDate: date }),
  setCategory: (category) => set({category: category}),
}));

export default useReviewStore;
