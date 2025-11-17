import create from "zustand";

// simple zustand store to hold globally selected record id/index and simple filter
export const useSelectedStore = create((set) => ({
  selected: null,
  setSelected: (selected) => set({ selected }),
  filter: null,
  setFilter: (filter) => set({ filter }),
}));
