"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import ProductModal from "./ProductModal";

function SalesBanner({ mostDiscount }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openView = (product) => {
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setSelectedProduct(null);
  };
  return (
    <div className="">
      <div className="mx-auto max-w-full">
        <div className="group relative overflow-hidden border-t-2 border-b-2 border-[#FF4D4D] transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(255,77,77,0.13)] cursor-default">
          <Image
            width={300}
            height={300}
            src={mostDiscount.images}
            alt={mostDiscount.name}
            className="absolute inset-0 h-full w-full object-cover brightness-[.25] saturate-[.6] "
          />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,8,8,0.94)_0%,rgba(8,8,8,0.53)_50%,transparent_100%)]" />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-5 px-9 py-8">
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <div className="bg-[#FF4D4D] px-2.5 py-0.5">
                  <span className="font-['Bebas_Neue'] text-[11px] tracking-[0.14em] text-white">
                    ⚡ DEAL OF THE DAY
                  </span>
                </div>

                {mostDiscount?.offer && (
                  <div className="inline-flex items-center gap-1.25 bg-[#9747FF] px-2.5 py-0.75">
                    <span className="font-['Bebas_Neue'] text-[10px] tracking-widest text-[#F5F5F5]">
                      BUY 2 GET 1 FREE
                    </span>
                  </div>
                )}

                <div
                  className={`inline-flex items-center px-4 py-1.5 ${
                    mostDiscount.discountPercentage >= 50
                      ? "bg-[#FF4D4D]"
                      : mostDiscount.discountPercentage >= 40
                        ? "bg-[#FF6B00]"
                        : "bg-[#FFB800]"
                  }`}
                >
                  <span
                    className={`font-['Bebas_Neue'] text-[20px] tracking-[0.06em] ${
                      mostDiscount.discountPercentage >= 40
                        ? "text-white"
                        : "text-[#080808]"
                    }`}
                  >
                    -{mostDiscount.discountPercentage}%
                  </span>
                </div>
              </div>

              <h2 className="mb-2 font-['Bebas_Neue'] text-[clamp(28px,4vw,52px)] leading-[0.95] tracking-[0.02em] text-white uppercase">
                {mostDiscount.name}
              </h2>

              <p className="mb-4 font-mono text-[10px] uppercase text-zinc-400">
                {mostDiscount.gender} · {mostDiscount.subCategory} ·
                {mostDiscount.stock <= 3 ? (
                  <span className="font-bold text-[#FF4D4D]">
                    ONLY {mostDiscount.stock} LEFT!
                  </span>
                ) : (
                  `${mostDiscount.stock} in stock`
                )}
              </p>

              <div className="flex items-baseline gap-3.5">
                <span className="font-['Bebas_Neue'] text-[38px] text-[#FF4D4D]">
                  $
                  {Math.ceil(
                    mostDiscount.price -
                      (mostDiscount.price * mostDiscount.discountPercentage) /
                        100,
                  )}
                </span>

                <span className="font-mono text-lg text-zinc-500 line-through">
                  ${mostDiscount.price}
                </span>

                <span className="font-mono text-[11px] font-bold text-[#22c55e]">
                  YOU SAVE $
                  {mostDiscount.price -
                    Math.ceil(
                      mostDiscount.price -
                        (mostDiscount.price * mostDiscount.discountPercentage) /
                          100,
                    )}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openView(mostDiscount)}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="bg-[#fd3636] px-9 py-3 font-['Bebas_Neue'] text-base tracking-[0.14em] text-white  hover:bg-[#ed4e4e] cursor-pointer"
              >
                GRAB THE DEAL →
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={open}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default SalesBanner;
