"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import useCardSorter from "@/store/cardSortStore";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SalesProduct({ product, productCount }) {
  const [page, setPage] = useState(1);
  const cardSort = useCardSorter((state) => state.cardSort);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set("page", page);
  useEffect(() => {
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [page, pathname, router]);

  return (
    <div className="min-h-175 bg-[#edecec] px-4 py-4 overflow-y-auto  scrollbar-hide">
      <div
        className={` ${cardSort} grid-cols-1 px-10 pt-5
            `}
      >
        {product.map((product) => (
          <ProductCard key={product._id} product={product} page={page} />
        ))}
      </div>

      {productCount > 15 && (
        <div className="mt-7 mb-5 w-full gap-1 flex text-white justify-center items-center ">
          <div
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            className="cursor-pointer text-center border-2  w-9 h-9  p-1 mr-1 border-red-800  rounded-full bg-red-600 "
          >
            <IoIosArrowBack className="w-6.5 h-6.5 p-1" />
          </div>
          <div className="gap-1 flex text-white justify-center bg-red-600 p-1 rounded-4xl  items-center ">
            {Array.from({ length: Math.ceil(productCount / 15) }, (_, i) => (
              <div
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 p-1 cursor-pointer text-lg rounded-full font-semibold bg-[#ffffff4d] text-center h-9 border-2 border-red-400 ${page === i + 1 && "bg-white text-red-700"}`}
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
            className=" cursor-pointer text-center rounded-full  w-9 h-9  p-1 mrl-1 border-2 bg-red-600  border-red-800 "
          >
            <IoIosArrowForward className="w-6.5 h-6.5 p-1" />
          </div>
        </div>
      )}
    </div>
  );
}
