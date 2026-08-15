"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

import { useWishlist } from "@/app/WishlistContext";

export default function ProductCard({ product, page, openView }) {
  const ref = useRef(page);

  const { isWished, toggleWishlist, isLoggedIn } = useWishlist();

  const wished = isWished(product?._id);

  useEffect(() => {
    if (ref.current !== page) {
      document.getElementById("productScroll")?.scrollIntoView({
        top: 0,
        behavior: "smooth",
        block: "start",
      });

      ref.current = page;
    }
  }, [page]);

  const handleWishlist = async () => {
    await toggleWishlist(product?._id);
  };

  const price = Number(product?.price ?? 0);

  const discountPercentage = Number(product?.discountPercentage ?? 0);

  const discountedPrice =
    discountPercentage > 0
      ? Math.ceil(price - (price * discountPercentage) / 100)
      : price;

  const colors = Array.isArray(product?.attributes?.colors)
    ? product.attributes.colors.slice(0, 3)
    : [];

  const ratingValue = Number(product?.ratings?.average ?? 0);

  return (
    <div
      id="productScroll"
      className="group overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-16px_rgba(15,23,42,0.4)]"
    >
      <div className="relative aspect-6/7 overflow-hidden">
        <Image
          src={product?.images || "/placeholder.jpg"}
          alt={product?.name || "Product"}
          width={400}
          height={500}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-950/10 to-transparent" />

        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-rose-600 px-2.5 py-1 text-[6px] font-semibold tracking-[0.24em] text-white uppercase lg:text-[10px]">
            -{discountPercentage}%
          </span>
        )}

        
        <button
          type="button"
          aria-label={
            !isLoggedIn
              ? "Login to use wishlist"
              : wished
                ? "Remove from wishlist"
                : "Add to wishlist"
          }
          onClick={handleWishlist}
          className={`absolute top-3 right-3 rounded-full p-1 transition lg:p-2 ${
            wished
              ? "bg-white text-rose-600"
              : "bg-zinc-950/50 text-white hover:bg-white hover:text-rose-600"
          }`}
        >
          {wished ? (
            <FaHeart className="h-3 w-3 lg:h-4 lg:w-4" />
          ) : (
            <FaHeartBroken className="h-3 w-3 lg:h-4 lg:w-4" />
          )}
        </button>

        <span className="absolute right-3 bottom-5 flex items-center gap-1 rounded-full bg-[#ffffff5a] px-2 py-0.5 text-[8px] font-semibold text-gray-900 shadow-md backdrop-blur lg:gap-2 lg:px-4 lg:py-1.5 lg:text-xs">
          <span
            className={`h-1 w-1 flex-shrink-0 rounded-full lg:h-2.5 lg:w-2.5 ${
              product.stock <= 5 ? "bg-red-500" : "bg-emerald-600"
            }`}
          />

          {product.stock <= 5
            ? `Only ${product.stock} Left`
            : `${product.stock} In Stock`}
        </span>
      </div>

      <div className="space-y-3 p-2 lg:p-4">
        <div className="flex items-start justify-between lg:items-center">
          <div className="h-12 w-3/5 lg:h-18">
            <p className="text-[7px] font-semibold tracking-[0.24em] text-zinc-500 uppercase lg:text-[10px]">
              {product?.subCategory || "Category"}
            </p>

            <h3 className="mt-1 line-clamp-2 text-[9px] font-semibold text-zinc-950 lg:text-base">
              {product?.name || "Product name"}
            </h3>
          </div>

          <div className="text-right">
            {discountPercentage > 0 ? (
              <div className="flex flex-col">
                <span className="text-[7px] font-medium text-zinc-400 line-through lg:text-sm">
                  {product?.currency || "BDT"} {price}
                </span>

                <span className="text-[8px] font-semibold text-rose-600 lg:text-base">
                  {product?.currency || "BDT"} {discountedPrice}
                </span>
              </div>
            ) : (
              <span className="w-1/3 text-[8px] font-semibold text-zinc-950 lg:text-base">
                {product?.currency || "BDT"} {price}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5 lg:gap-1">
            {Array.from({ length: 5 }, (_, index) => {
              const filled = index < Math.round(ratingValue);

              return (
                <FaStar
                  key={index}
                  className={`h-2 w-2 lg:h-3.5 lg:w-3.5 ${
                    filled ? "text-amber-500" : "text-zinc-300"
                  }`}
                />
              );
            })}

            <span className="ml-1 text-[8px] font-medium text-zinc-700 lg:text-sm">
              {ratingValue.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center gap-1 lg:gap-2">
            {colors.map((color) => (
              <span
                key={color}
                className="h-3 w-3 rounded-full border border-zinc-300 lg:h-4 lg:w-4"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}

            {Array.isArray(product?.attributes?.colors) &&
              product.attributes.colors.length > colors.length && (
                <span className="text-[8px] font-medium text-zinc-500 lg:text-[11px]">
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
    </div>
  );
}
