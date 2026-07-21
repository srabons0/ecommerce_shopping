"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import ProductModal from "./ProductModal";

export default function ProductCard({ product, page }) {
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
        {product.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold tracking-wide text-white shadow-md">
            -{product.discountPercentage}% OFF
          </span>
        )}
        <span className="absolute right-3 bottom-18 flex items-center gap-2 rounded-full bg-[#ffffff46] px-3 py-1 text-xs font-semibold text-gray-900 shadow-md backdrop-blur">
          <span
            className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${
              product.stock <= 5 ? "bg-red-500" : "bg-emerald-600"
            }`}
          />
          {product.stock <= 5
            ? `Only ${product.stock} Left`
            : `${product.stock} In Stock`}
        </span>
        <button
          onClick={() => {
            setWished(!wished);
          }}
          className={`absolute right-3 top-3 rounded-full p-2 transition
            ${wished ? "text-red-600 bg-white" : "text-red-400 bg-[#0000003b] hover:text-red-500"}`}
        >
          {wished ? (
            <FaHeart className="w-5 h-5" />
          ) : (
            <FaHeartBroken className="w-5 h-5" />
          )}
        </button>
        <div className=" absolute bottom-4 w-full px-5 gap-2 flex">
          <button
            onClick={() => setOpen(true)}
            className={`py-2 font-semibold w-full transition-all duration-300 rounded-xl bg-white text-black
              `}
          >
            View
          </button>
          <button
            onClick={() => setOpen(true)}
            className={` py-2 font-semibold w-full transition-all duration-300 rounded-xl bg-white text-black
              `}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="space-y-1 p-5 mb-2">
        <p className="text-xs font-medium uppercase tracking-tight text-red-500">
          {product.subCategory}
        </p>
        <div className="flex justify-between gap-3">
          <h3 className="text-lg font-bold ">{product.name}</h3>

          {product.discountPercentage > 0 ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold line-through text-gray-500">
                ${product.price}
              </span>
              <span className="text-lg font-bold text-red-500">
                $
                {Math.ceil(
                  product.price -
                    (product.price * product.discountPercentage) / 100,
                )}
              </span>{" "}
            </div>
          ) : (
            <span className="text-lg font-bold  text-gray-700">
              ${product.price}
            </span>
          )}
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
            {product.attributes.colors.map((color) => (
              <div
                key={color}
                title={color}
                className="h-3 w-3 rounded-xs border border-zinc-700"
                style={{ background: color.replace(/\s+/g, "") }}
              />
            ))}{" "}
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
