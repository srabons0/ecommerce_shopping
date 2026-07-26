"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export default function ProductCard({ product, page, openView }) {
  const [wished, setWished] = useState(false);
  const ref = useRef(page);

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
          <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
            -{discountPercentage}%
          </span>
        )}

        <button
          type="button"
          onClick={() => setWished((prev) => !prev)}
          className={`absolute right-3 top-3 rounded-full p-2 transition ${
            wished
              ? "bg-white text-rose-600"
              : "bg-zinc-950/50 text-white hover:bg-white hover:text-rose-600"
          }`}
        >
          {wished ? (
            <FaHeart className="h-4 w-4" />
          ) : (
            <FaHeartBroken className="h-4 w-4" />
          )}
        </button>

        <span className="absolute right-3 bottom-5 flex items-center gap-2 rounded-full bg-[#ffffff5a] px-4 py-1.5 text-xs font-semibold text-gray-900 shadow-md backdrop-blur">
          <span
            className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${
              product.stock <= 5 ? "bg-red-500" : "bg-emerald-600"
            }`}
          />
          {product.stock <= 5
            ? `Only ${product.stock} Left`
            : `${product.stock} In Stock`}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              {product?.subCategory || "Category"}
            </p>
            <h3 className="mt-1 line-clamp-2 text-base font-semibold text-zinc-950">
              {product?.name || "Product name"}
            </h3>
          </div>
          <div className="text-right">
            {discountPercentage > 0 ? (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-zinc-400 line-through">
                  {product?.currency || "BDT"} {price}
                </span>
                <span className="text-sm font-semibold text-rose-600">
                  {product?.currency || "BDT"} {discountedPrice}
                </span>
              </div>
            ) : (
              <span className="text-sm font-semibold text-zinc-950">
                {product?.currency || "BDT"} {price}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => {
              const filled = index < Math.round(ratingValue);
              return (
                <FaStar
                  key={index}
                  className={`h-3.5 w-3.5 ${filled ? "text-amber-500" : "text-zinc-300"}`}
                />
              );
            })}
            <span className="ml-1 text-sm font-medium text-zinc-700">
              {ratingValue.toFixed(1)}
            </span>
          </div>
           <div className="flex items-center gap-2">
          {colors.map((color) => (
            <span
              key={color}
              className="h-4 w-4 rounded-full border border-zinc-300"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          {Array.isArray(product?.attributes?.colors) &&
            product.attributes.colors.length > colors.length && (
              <span className="text-[11px] font-medium text-zinc-500">
                +{product.attributes.colors.length - colors.length}
              </span>
            )}
        </div>
        </div>



        <button
          type="button"
          onClick={() => openView(product)}
          className="w-full rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          View details
        </button>
      </div>
    </div>
  );
}
