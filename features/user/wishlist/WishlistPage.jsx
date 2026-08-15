"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useSession } from "next-auth/react";

import { useWishlist } from "@/app/WishlistContext";

export default function WishlistPage({ openView }) {
  const { status } = useSession();

  const {
    wishlistIds,
    toggleWishlist,
    loading: wishlistLoading,
  } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    let cancelled = false;

    const loadWishlist = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/wishlist", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load wishlist");
        }

        if (!cancelled && data.success) {
          setProducts(data.wishlist || []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Wishlist error:", error);
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

  const handleRemove = async (productId) => {
    setProducts((previous) =>
      previous.filter(
        (product) => product._id.toString() !== productId.toString(),
      ),
    );

    try {
      await toggleWishlist(productId);
    } catch (error) {
      console.error("REMOVE WISHLIST ERROR:", error);
    }
  };

  if (status === "loading" || loading || wishlistLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-rose-600" />
        </div>
      </section>
    );
  }

  if (status !== "authenticated") {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-50">
          <FaHeart className="text-3xl text-rose-500" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-zinc-950">Your Wishlist</h1>

        <p className="mt-3 text-zinc-500">
          Please login to save products and manage your wishlist.
        </p>

        <Link
          href="/login"
          className="mt-7 inline-flex rounded-full bg-zinc-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Login
        </Link>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100">
          <FaRegHeart className="text-3xl text-zinc-400" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-zinc-950">
          Your Wishlist Is Empty
        </h1>

        <p className="mt-3 text-zinc-500">
          Save products you love and find them here later.
        </p>

        <Link
          href="/shop"
          className="mt-7 inline-flex rounded-full bg-zinc-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.28em] text-zinc-500 uppercase sm:text-xs">
            Saved For Later
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            My Wishlist
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            {wishlistIds.length}{" "}
            {wishlistIds.length === 1 ? "product" : "products"} saved
          </p>
        </div>

        <Link
          href="/shop/men/men-tops/newest"
          className="hidden rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 sm:block"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const productId = product?._id?.toString();

          const price = Number(product?.price ?? 0);

          const discountPercentage = Number(product?.discountPercentage ?? 0);

          const discountedPrice =
            discountPercentage > 0
              ? Math.ceil(price - (price * discountPercentage) / 100)
              : price;

          const stock = Number(product?.stock ?? 0);

          const ratingValue = Number(product?.ratings?.average ?? 0);

          const colors = Array.isArray(product?.attributes?.colors)
            ? product.attributes.colors.slice(0, 3)
            : [];

          return (
            <article
              key={productId}
              className="group overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-16px_rgba(15,23,42,0.4)]"
            >
              <div className="relative aspect-[6/7] overflow-hidden">
                <Image
                  src={product?.images || "/placeholder.jpg"}
                  alt={product?.name || "Product"}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/60 via-transparent to-transparent" />

                {discountPercentage > 0 && (
                  <span className="absolute top-3 left-3 rounded-full bg-rose-600 px-2.5 py-1 text-[7px] font-semibold tracking-[0.2em] text-white uppercase sm:text-[10px]">
                    -{discountPercentage}%
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => handleRemove(productId)}
                  aria-label={`Remove ${product?.name || "product"} from wishlist`}
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-rose-600 shadow-md transition hover:bg-rose-600 hover:text-white sm:h-9 sm:w-9"
                >
                  <FaHeart className="text-sm" />
                </button>

                <span className="absolute right-3 bottom-4 flex items-center gap-1.5 rounded-full bg-white/75 px-2.5 py-1 text-[8px] font-semibold text-zinc-900 shadow-md backdrop-blur sm:text-[10px]">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      stock <= 5 ? "bg-red-500" : "bg-emerald-600"
                    }`}
                  />

                  {stock <= 5 ? `Only ${stock} Left` : `${stock} In Stock`}
                </span>
              </div>

              <div className="space-y-3 p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-[7px] font-semibold tracking-[0.22em] text-zinc-500 uppercase sm:text-[10px]">
                      {product?.subCategory || product?.category || "Category"}
                    </p>

                    <Link href={`/shop/${product?.slug || productId}`}>
                      <h2 className="mt-1 line-clamp-2 text-[10px] font-semibold text-zinc-950 transition hover:text-rose-600 sm:text-base">
                        {product?.name || "Product name"}
                      </h2>
                    </Link>
                  </div>

                  <div className="shrink-0 text-right">
                    {discountPercentage > 0 ? (
                      <div className="flex flex-col">
                        <span className="text-[7px] font-medium text-zinc-400 line-through sm:text-xs">
                          {product?.currency || "BDT"} {price}
                        </span>

                        <span className="text-[9px] font-bold text-rose-600 sm:text-base">
                          {product?.currency || "BDT"} {discountedPrice}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[9px] font-bold text-zinc-950 sm:text-base">
                        {product?.currency || "BDT"} {price}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {Array.from({ length: 5 }, (_, index) => {
                      const filled = index < Math.round(ratingValue);

                      return (
                        <FaStar
                          key={index}
                          className={`h-2 w-2 sm:h-3.5 sm:w-3.5 ${
                            filled ? "text-amber-500" : "text-zinc-300"
                          }`}
                        />
                      );
                    })}

                    <span className="ml-1 text-[8px] font-medium text-zinc-700 sm:text-xs">
                      {ratingValue.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {colors.map((color) => (
                      <span
                        key={color}
                        className="h-3 w-3 rounded-full border border-zinc-300 sm:h-4 sm:w-4"
                        style={{
                          backgroundColor: color,
                        }}
                        title={color}
                      />
                    ))}

                    {Array.isArray(product?.attributes?.colors) &&
                      product.attributes.colors.length > colors.length && (
                        <span className="text-[8px] font-medium text-zinc-500">
                          +{product.attributes.colors.length - colors.length}
                        </span>
                      )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openView(product)}
                  className="w-full rounded-full border-2 bg-zinc-50 px-4 py-1 text-xs font-semibold text-black transition hover:bg-zinc-200 lg:py-2.5 lg:text-sm"
                >
                  View details
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 sm:hidden">
        <Link
          href="/shop"
          className="block w-full rounded-full border border-zinc-300 px-5 py-3 text-center text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
