"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "../shared/ProductCard";
import ProductModal from "../shared/ProductModal";
import Link from "next/link";



const FeaturedProduct = ({ product, category }) => {

  const [selectedProduct, setSelectedProduct] = useState(null);


  const openView = (product) => {
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setSelectedProduct(null);
  };
  return (
    <section
      id="featured-collection"
      className="bg-[#ffffff] text-black pb-16 md:py-20 lg:pl-8  mx-2"
    >
      <div className="mx-auto max-w-[1360px] lg:pr-8">
        <div
          className={`mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end opacity-100 translate-y-0 transition-all duration-[600ms] ease-[cubic-bezier(.23,1,.32,1)]`}
        >
          <div className="px-2">
            <div className="mb-2 flex items-center gap-3">
              <div className="h-[2px] w-6 bg-[#ff4747]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#ff4747]">
                FEATURED THIS WEEK
              </span>
            </div>

            <h2 className="max-w-2xl text-[clamp(36px,5vw,64px)] leading-none tracking-[0.03em] ">
              SHOP THE DROP
            </h2>
          </div>

          <Link
            href={`/shop/men/${category.find((items) => items.gender === "men").slug}/newest`}
            className="mb-1 rounded-full hidden md:block border border-[#242424] px-5 py-2.5 text-sm uppercase tracking-[0.1em] text-[#888888] transition hover:border-[#ff4747] hover:text-[#ff4747]"
          >
            VIEW ALL →
          </Link>
        </div>

        <div className="grid gap-2 lg:gap-4 grid-cols-2 lg:grid-cols-3  lg:mx-10">
          {product.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              openView={openView}
            />
          ))}
        </div>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={closeModal} />
        )}
      </div>
      <div className="flex justify-center lg:hidden">
        <Link
          href={`/shop/men/${category.find((items) => items.gender === "men").slug}/newest`}
          className="mb-1 mt-11 rounded-full border border-[#242424] px-5 py-2.5 text-sm uppercase tracking-[0.1em] text-[#888888] transition hover:border-[#ff4747] hover:text-[#ff4747]"
        >
          VIEW ALL →
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProduct;
