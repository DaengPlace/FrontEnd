import { create } from 'zustand';

const useReviewStore = create((set) => ({
  placeName: '',
  visitDate: '',
  setPlaceName: (name) => set({ placeName: name }),
  setVisitDate: (date) => set({ visitDate: date }),
}));

export default useReviewStore;
