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
    <div className="min-h-175 bg-[#edecec] px-4 py-4 overflow-y-auto">
      <div
        className={` ${cardSort} grid-cols-1 px-10 pt-5
            `}
      >
        {product.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            page={page}
          />
        ))}
      </div>

      {productCount > 15 && (
        <div className="mt-7 mb-5 w-full gap-1 flex text-white justify-center items-center">
          <div
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            className=" text-center border-2 border-black  rounded-s-md bg-black"
          >
            <IoIosArrowBack className="w-6.5 h-6.5 p-1" />
          </div>
          {Array.from({ length: Math.ceil(productCount / 15) }, (_, i) => (
            <div
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 text-lg rounded-sm font-semibold bg-black text-center h-8 border-2 border-black ${page === i+1 && "bg-white text-black"}`}
            >
              {i + 1}
            </div>
          ))}
          <div
            onClick={() =>
              setPage(
                Math.ceil(productCount / 15) > page
                  ? page + 1
                  : Math.ceil(productCount / 15),
              )
            }
            className=" text-center rounded-e-md border-2 bg-black border-black"
          >
            <IoIosArrowForward className="w-6.5 h-6.5 p-1" />
          </div>
        </div>
      )}
    </div>
  );
}
