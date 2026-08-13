"use client";
import React from "react";
import { MdGridView } from "react-icons/md";
import { HiOutlineBars3 } from "react-icons/hi2";
import useCardSorter from "@/store/cardSortStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SalesProductTool() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setCardSort = useCardSorter((state) => state.setCardSort);
  const sort = pathname.split("/").at(4);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center py-3 px-5 lg:px-10 w-full bg-black">
        <div></div>
        <div className="flex flex-row justify-between items-center gap-2">
          <select
            value={sort}
            onChange={(e) => {
              const parts = pathname.split("/");
              parts[parts.length - 1] = e.target.value;
              router.push(`${parts.join("/")}?${searchParams.toString()}`);
              document.getElementById("productScroll")?.scrollIntoView({
                top: 0,
                behavior: "smooth",
                block: "start",
              });
            }}

            className="select  text-white text-center px-3 py-1 border-[#6d6d6d] border    "
          >
            {[
              { v: "newest", l: "Newest First" },
              { v: "popular", l: "Most Popular" },
              { v: "price-asc", l: "Price: Low → High" },
              { v: "price-desc", l: "Price: High → Low" },
              { v: "rating", l: "Top Rated" },
              { v: "viewed", l: "Most Viewed" },
              { v: "AtoZ", l: "A–Z " },
              { v: "ZtoA", l: "Z–A " },
            ].map((items, i) => (
              <option key={i} className="bg-black text-white" value={items.v}>
                {items.l}
              </option>
            ))}
          </select>

          <div className="hidden md:flex flex-row justify-between items-center ">
            <button
              aria-label="GridView"
              className="px-2.5 py-2 border-[#6d6d6d] border bg-transparent  hover:bg-gray-400"
            >
              <MdGridView
                onClick={() => {
                  setCardSort("grid md:grid-cols-2 lg:grid-cols-3  gap-6");
                  document.getElementById("productScroll")?.scrollIntoView({
                    top: 0,
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="w-4 h-4 text-white "
              />
            </button>
            <button
              aria-label="OutlineBars"
              className="px-2.5 py-2 border-[#6d6d6d] border bg-transparent  hover:bg-gray-400"
            >
              <HiOutlineBars3
                onClick={() => {
                  setCardSort("grid grid-cols-1  gap-6");
                  document.getElementById("productScroll")?.scrollIntoView({
                    top: 0,
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="w-4 h-4 text-white font-bold"
              />
            </button>
          </div>

          <div className="lg:flex flex-row hidden  justify-between items-center ">
            <button
              onClick={() => {
                setCardSort("grid grid-cols-2  gap-6");
                document.getElementById("productScroll")?.scrollIntoView({
                  top: 0,
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="px-2.5 py-1 border-[#6d6d6d] border bg-transparent  hover:bg-gray-400 text-white"
            >
              2
            </button>
            <button
              onClick={() => setCardSort("grid grid-cols-3  gap-6")}
              className="px-2.5 py-1 border-[#6d6d6d] border bg-transparent text-white hover:bg-gray-400"
            >
              3
            </button>
            <button
              onClick={() => setCardSort("grid grid-cols-4 gap-4")}
              className="px-2.5 py-1 border-[#6d6d6d] border bg-transparent text-white hover:bg-gray-400"
            >
              4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesProductTool;
