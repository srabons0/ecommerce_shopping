"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { status } = useSession();
  const router = useRouter();

  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = status === "authenticated";

  
  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    let cancelled = false;

    const loadWishlist = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/wishlist", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch wishlist");
        }

        if (!cancelled && data.success) {
          setWishlistIds(data.wishlistIds || []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("FETCH WISHLIST ERROR:", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadWishlist();

    return () => {
      cancelled = true;
    };
  }, [status]);


  const isWished = useCallback(
    (productId) => {
      if (!productId) return false;

      return wishlistIds.includes(productId.toString());
    },
    [wishlistIds],
  );


  const toggleWishlist = useCallback(
    async (productId) => {
      if (!productId) return;


      if (!isLoggedIn) {
        router.push("/login");
        return;
      }

      const id = productId.toString();

      const currentlyWished = wishlistIds.includes(id);


      setWishlistIds((previous) => {
        if (currentlyWished) {
          return previous.filter((item) => item !== id);
        }

        return [...previous, id];
      });

      try {
        const response = await fetch("/api/wishlist", {
          method: currentlyWished ? "DELETE" : "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            productId: id,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Wishlist request failed.");
        }


        if (data.success) {
          setWishlistIds(data.wishlistIds || []);
        }
      } catch (error) {
        console.error("TOGGLE WISHLIST ERROR:", error);


        setWishlistIds((previous) => {
          if (currentlyWished) {
            return [...previous, id];
          }

          return previous.filter((item) => item !== id);
        });
      }
    },
    [isLoggedIn, wishlistIds, router],
  );

  const value = {
    wishlistIds,

    wishlistCount: wishlistIds.length,

    loading,

    isLoggedIn,

    isWished,

    toggleWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}
