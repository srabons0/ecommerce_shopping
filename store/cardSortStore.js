import { create } from "zustand";

const useCardSorter = create((set) => ({
  cardSort: "grid md:grid-cols-2 lg:grid-cols-3  lg:gap-6",

  setCardSort: (value) =>
    set({
      cardSort: value,
    }),
}));

export default useCardSorter;
