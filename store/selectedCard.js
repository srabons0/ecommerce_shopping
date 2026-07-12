import { create } from "zustand";

const useSelectedCard = create((set) => ({
  selected: { createdAt: -1 },
  setSelected: (value) =>
    set({
      selected: value,
    }),
}));

export default useSelectedCard