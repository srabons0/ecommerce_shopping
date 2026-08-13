"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartData = create(
  persist(
    (set) => ({
      cartData: [],
      setCartData: (product) =>
        set((state) => ({
          cartData: [...state.cartData, product],
        })),
      removeCartData: (id, sizes, colors) =>
        set((state) => ({
          cartData: state.cartData.filter(
            (i) => i._id !== id || i.sizes !== sizes || i.colors !== colors,
          ),
        })),
      clearCartData: () => set({ cartData: [] }),
    }),
    {
      name: "cart",
    },
  ),
);

export default useCartData;
