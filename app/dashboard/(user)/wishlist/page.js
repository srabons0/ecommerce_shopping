"use client";

import ProductCard from "@/components/Product/ProductCard";
import DashboardNavbar from "@/features/user/DashboardNavbar/DashboardNavbar";
import useCartData from "@/store/cartStore";
import useWishlistData from "@/store/wishlistStore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo } from "react";
import { FiArrowRight, FiHeart, FiTrash2 } from "react-icons/fi";

export default function WishlistPage() {
  const { wishlistItems, removeWishlistItem, clearWishlist } =
    useWishlistData();
  const setCartData = useCartData((state) => state.setCartData);
  const { data: session } = useSession();

  const summary = useMemo(() => {
    const totalItems = wishlistItems.length;
    const totalValue = wishlistItems.reduce(
      (sum, item) => sum + Number(item.price || 0),
      0,
    );

    return { totalItems, totalValue };
  }, [wishlistItems]);

  const handleMoveToBag = async (item) => {
    const selectedSize = item?.attributes?.sizes?.[0] || "M";
    const selectedColor = item?.attributes?.colors?.[0] || "Default";

    if (session?.user?.email) {
      try {
        await fetch("/api/products/userCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productID: item._id || item.slug,
            name: item.name,
            email: session.user.email,
            slug: item.slug,
            price: Number(item.price || 0),
            subCategory: item.subCategory,
            item: item.item,
            gender: item.gender,
            images: item.images || item.img,
            discountPercentage: Number(item.discountPercentage || 0),
            quantity: 1,
            sizes: selectedSize,
            colors: selectedColor,
          }),
        });
      } catch (error) {
        console.error("Failed to move wishlist item to bag", error);
      }
    } else {
      setCartData({
        _id: item._id || item.slug,
        sizes: selectedSize,
        quantity: 1,
        colors: selectedColor,
      });
    }

    removeWishlistItem(item._id || item.slug);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <DashboardNavbar
        path="Wishlist"
        name="Wishlist"
        desc="Save your favorites and revisit them anytime"
      />

      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <section className="overflow-hidden rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">
                Saved for later
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-zinc-900 sm:text-4xl">
                Your wishlist keeps everything close at hand
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-zinc-600 sm:text-base">
                Curate your favorite pieces, track what you love, and move
                anything to your bag whenever you are ready.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
              <div className="flex items-center gap-2">
                <FiHeart className="text-violet-600" />
                <span>{summary.totalItems} saved items</span>
              </div>
              <div className="mt-1 text-xs text-zinc-500">
                Estimated value: ${summary.totalValue}
              </div>
            </div>
          </div>
        </section>

        {wishlistItems.length === 0 ? (
          <section className="rounded-[32px] border border-dashed border-zinc-300 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <FiHeart className="h-7 w-7" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-zinc-900">
              Your wishlist is empty
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
              Save a few favorites from the shop and they will appear here ready
              for checkout.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              Explore the shop
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </section>
        ) : (
          <>
            <section className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-zinc-200 bg-white px-4 py-4 shadow-sm sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">
                  Saved favorites
                </h2>
                <p className="text-sm text-zinc-500">
                  Keep your selected pieces organized.
                </p>
              </div>
              <button
                onClick={clearWishlist}
                className="rounded-2xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                Clear all
              </button>
            </section>

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {wishlistItems.map((item) => {
                const price = Number(item.price || 0);
                const discount = Number(item.discountPercentage || 0);
                const discountedPrice =
                  discount > 0
                    ? Math.ceil(price - (price * discount) / 100)
                    : price;

                return (
                  <div key={item._id || item.slug} className="relative">
                    <button
                      onClick={() => removeWishlistItem(item._id || item.slug)}
                      className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-sm transition hover:bg-white"
                      aria-label={`Remove ${item.name}`}
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>

                    <ProductCard
                      p={{
                        _id: item._id || item.slug,
                        name: item.name,
                        img: item.images || item.img || "/placeholder.jpg",
                        price: discountedPrice,
                        orig: discount > 0 ? price : undefined,
                        tag: item.isNewArrival
                          ? "New"
                          : item.isFeatured
                            ? "Featured"
                            : "Wishlist",
                      }}
                      onCart={() => handleMoveToBag(item)}
                      color="#8b5cf6"
                    />
                  </div>
                );
              })}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
