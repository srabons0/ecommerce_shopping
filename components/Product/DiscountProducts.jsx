"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "../shared/ProductCard";
import ProductModal from "../shared/ProductModal";

const DiscountProducts = ({ product, subCategory }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const menCategory = subCategory?.find((item) => item.gender === "men");

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-red-50 via-white to-orange-50 py-10 lg:py-20">
      <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-red-200/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-2 lg:px-6">
        <div
          className={`mb-4 lg:mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end opacity-100 translate-y-0 px-2 transition-all duration-600 ease-[cubic-bezier(.23,1,.32,1)]`}
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-0.5 w-6 bg-red-600" />
              <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-red-600">
                Biggest Savings
              </span>
            </div>

            <h2 className="mb-12 font-['Bebas_Neue'] text-[clamp(36px,5.5vw,72px)] leading-none tracking-wide text-black">
              EXCLUSIVE
              <br />
              <span className="text-red-600">SAVINGS.</span>
            </h2>
          </div>

          <Link
            href={`/sale/men/${menCategory?.slug}/newest`}
            className="mb-1 rounded-full hidden md:block border border-[#242424] px-5 py-2.5 text-sm uppercase tracking-widest text-[#888888] transition hover:border-[#ff4747] hover:text-[#ff4747]"
          >
            VIEW ALL →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:gap-5 lg:grid-cols-3">
          {product.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              openView={setSelectedProduct}
            />
          ))}
        </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
      <div className="flex justify-center lg:hidden">
        <Link
          href={`/sale/men/${subCategory.find((items) => items.gender === "men").slug}/newest`}
          className="mb-1 mt-11 rounded-full border border-[#242424] px-5 py-2.5 text-sm uppercase tracking-[0.1em] text-[#888888] transition hover:border-[#ff4747] hover:text-[#ff4747]"
        >
          VIEW ALL →
        </Link>
      </div>
    </section>
  );
};

export default DiscountProducts;
