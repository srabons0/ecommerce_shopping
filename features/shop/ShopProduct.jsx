"use client";

import { useEffect, useState } from "react";
import useCardSorter from "@/store/cardSortStore";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/shared/ProductCard";
import ProductModal from "@/components/shared/ProductModal";

export default function ShopProduct({ product, productCount }) {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cardSort = useCardSorter((state) => state.cardSort);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set("page", page);
  useEffect(() => {
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [page, pathname, router]);

  const openView = (product) => {
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setSelectedProduct(null);
  };
  return (
    <div className="scrollbar-hide min-h-175 overflow-y-auto bg-[#edecec] px-2 py-4 lg:min-h-230 lg:px-4 lg:py-18">
      <div
        className={` ${cardSort} grid-cols-2 gap-3 md:grid-cols-3 lg:px-10 lg:pt-5`}
      >
        {product.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            page={page}
            openView={openView}
          />
        ))}
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}

      {productCount > 15 && (
        <div className="mt-7 mb-5 flex w-full items-center justify-center gap-1 text-white">
          <div
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            className="mr-1 h-6.5 w-6.5 cursor-pointer rounded-full border-2 border-red-800 bg-red-600 p-1 text-center lg:h-9 lg:w-9"
          >
            <IoIosArrowBack className="h-3 w-3 lg:h-6.5 lg:w-6.5 lg:p-1" />
          </div>
          <div className="flex items-center justify-center gap-1 rounded-4xl bg-red-600 p-1 text-white">
            {Array.from({ length: Math.ceil(productCount / 15) }, (_, i) => (
              <div
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-6.5 w-6.5 cursor-pointer rounded-full border-2 border-red-400 bg-[#ffffff4d] p-0.5 text-center text-sm font-semibold lg:h-9 lg:w-9 lg:p-1 lg:text-lg ${page === i + 1 && "bg-white text-red-700"}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div
            onClick={() =>
              setPage(
                Math.ceil(productCount / 15) > page
                  ? page + 1
                  : Math.ceil(productCount / 15),
              )
            }
            className="mrl-1 h-6.5 w-6.5 cursor-pointer rounded-full border-2 border-red-800 bg-red-600 p-1 text-center lg:h-9 lg:w-9"
          >
            <IoIosArrowForward className="h-3 w-3 lg:h-6.5 lg:w-6.5 lg:p-1" />
          </div>
        </div>
      )}
    </div>
  );
}
