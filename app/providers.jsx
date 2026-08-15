"use client";

import { SessionProvider } from "next-auth/react";
import { WishlistProvider } from "./WishlistContext";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </SessionProvider>
  );
}
