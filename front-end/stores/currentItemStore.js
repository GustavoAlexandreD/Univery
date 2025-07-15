import { create } from 'zustand';

export const currentItemStore = create((set) => ({
  currentItem: null,
  setCurrentItem: (currentItem) => set({ currentItem }),
}));