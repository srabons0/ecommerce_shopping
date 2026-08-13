"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistData = create(
  persist(
    (set, get) => ({
      wishlistItems: [],
      addWishlistItem: (product) => {
        const existing = get().wishlistItems.some(
          (item) => item._id === product._id || item.slug === product.slug,
        );

        if (existing) {
          return;
        }

        set((state) => ({
          wishlistItems: [
            ...state.wishlistItems,
            {
              ...product,
              _id: product._id || product.slug,
            },
          ],
        }));
      },
      removeWishlistItem: (id) =>
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(
            (item) => item._id !== id && item.slug !== id,
          ),
        })),
      toggleWishlistItem: (product) => {
        const existing = get().wishlistItems.some(
          (item) => item._id === product._id || item.slug === product.slug,
        );

        if (existing) {
          set((state) => ({
            wishlistItems: state.wishlistItems.filter(
              (item) => item._id !== product._id && item.slug !== product.slug,
            ),
          }));
          return false;
        }

        set((state) => ({
          wishlistItems: [
            ...state.wishlistItems,
            {
              ...product,
              _id: product._id || product.slug,
            },
          ],
        }));
        return true;
      },
      clearWishlist: () => set({ wishlistItems: [] }),
    }),
    {
      name: "wishlist",
    },
  ),
);

export default useWishlistData;
