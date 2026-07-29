import { create } from "zustand";

const useCartLength = create((set) => ({
  cartLength: 0,
  setCartLength: (value) =>
    set({
      cartLength: value,
    }),
}));
export default useCartLength;
