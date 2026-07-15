"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import ProductModal from "./ProductModal";

export default function ProductCard({
  product,
  page,
}) {
  const [open, setOpen] = useState(false);
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


  return (
    <div
      id="productScroll"
      className={`group overflow-hidden rounded-xl  bg-[#ffffff] text-black transition-all duration-300 border-zinc-200 border
      `}
    >
      <div className="relative aspect-4/4 overflow-hidden">
        <Image
          src={product.images}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover "
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

        {product.badge && (
          <span className="absolute left-3 top-3 bg-lime-400 px-3 py-1 text-[10px] font-bold uppercase text-black">
            {product.badge}
          </span>
        )}

        {product.stock <= 5 && (
          <span className="absolute left-3 top-12 bg-red-500 px-2 py-1 text-[10px] text-white">
            ONLY {product.stock} LEFT
          </span>
        )}

        <button
          onClick={() => {
            setWished(!wished);
          }}
          className={`absolute right-3 top-3 rounded-full p-2 transition
          ${wished ? "text-red-600 bg-white" : "text-red-300 bg-black/80 hover:text-red-500"}`}
        >
          {wished ? (
            <FaHeart className="w-5 h-5" />
          ) : (
            <FaHeartBroken className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={() => setOpen(true)}
          className={`absolute bottom-4 left-4 right-4 py-3 font-semibold transition-all duration-300                  bg-white text-black
            `}
        >
          Quick View
        </button>
      </div>

      <div className="space-y-1 p-5 mb-2">
        <p className="text-xs font-medium uppercase tracking-tight text-red-500">
          {product.subCategory}
        </p>

        <div className="flex justify-between gap-3">
          <h3 className="text-lg font-bold ">{product.name}</h3>

          <span className="text-lg font-bold ">${product.price}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`w-3.5 h-3.5 ${i < product.ratings?.average ? "text-yellow-600" : "text-gray-400"}`}
                />
              ))}
            </div>
            {product.ratings?.average}
          </div>
          <div className="flex gap-1 items-center">
            {product.attributes.colors.slice(0, 3).map((color) => (
              <div
                key={color}
                title={color}
                className="h-3 w-3 rounded-xs border border-zinc-700"
                style={{ background: color.replace(/\s+/g, "") }}
              />
            ))}{" "}
            ....
          </div>
        </div>
      </div>
      <ProductModal
        product={product}
        open={open}
        onClose={setOpen}
      ></ProductModal>
    </div>
  );
}
