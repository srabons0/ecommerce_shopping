"use client";
import React from "react";
import { MdGridView } from "react-icons/md";
import { HiOutlineBars3 } from "react-icons/hi2";
import useCardSorter from "@/store/cardSortStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ImCancelCircle } from "react-icons/im";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Hourglass } from "react-loader-spinner";

function ShopProductTool() {
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
  const setCardSort = useCardSorter((state) => state.setCardSort);
  const sort = pathname.split("/").at(4);

  const handleSearch = async () => {
    setProduct([]);
    setLoading(true);
    await fetch(`/api/products/searchProduct?search=${search}`)
      .then((res) => res.json())
      .then(setProduct);
    setLoading(false);
    setHasSearched(true);

  };
  const handleCancelSearch = () => {
    setSearch("");
    setProduct([]);
    setLoading(false);
    setHasSearched(false);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center py-3 px-10 w-full bg-black">
        <div className="relative z-100 flex h-full w-full items-center ml-4 gap-3 bg-[#000000da]">
          <div className="relative">
            <InputGroup className="max-w-xs z-30 text-white bg-black">
              <InputGroupInput
                value={search}
                required
                onChange={(e) => {
                  setSearch(e.target.value);
                  search && setHasSearched(false);
                }}
                placeholder="Search..."
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon
                className="cursor-pointer"
                onClick={() => handleCancelSearch()}
                align="inline-end"
              >
                {search && <ImCancelCircle />}
              </InputGroupAddon>
            </InputGroup>

            <div className=" absolute max-h-40 top-5 rounded-b-md bg-black w-full overflow-y-auto    scrollbar-hide">
              {loading && (
                <div className="flex justify-center pt-8">
                  <Hourglass
                    visible={true}
                    height="18"
                    width="18"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#ffffff", "#ffffff"]}
                  />
                </div>
              )}
              {!loading && hasSearched && product.length <= 0 && search && (
                <p className="text-center mt-5 text-gray-500 ">Not Found</p>
              )}
              <div className="px-1 pt-4 ">
                {" "}
                {(loading || product.length > 0) &&
                  product.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => {
                        params.set("search", p.name);
                        router.push(
                          `/shop/${p.gender}/${p.subCategorySlug}?${params}`,
                        );
                      }}
                      className="border-b py-2 flex items-center  justify-between cursor-pointer text-sm text-white"
                    >
                      <span className="w-4/6 mr-2">{p.name} </span>◕
                      <span className="text-red-500  w-1/6 ml-1 text-xs">
                        {" "}
                        {p.gender}
                      </span>
                      <span className="text-green-500 w-1/6 pl-4">
                        {" "}
                        <FaArrowRight />
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div
            className={`cursor-pointer text-white rounded-3xl border-2 w-20 h-8 text-center p-0.5 ${
              !search.trim() ? "opacity-30 pointer-events-none" : ""
            }`}
            onClick={handleSearch}
          >
            Search
          </div>
        </div>
        <div className="flex flex-row justify-between items-center gap-2">
          <select
            value={sort}
            onChange={(e) => {
              const parts = pathname.split("/");
              parts[parts.length - 1] = e.target.value;
              router.push(`${parts.join("/")}?${searchParams.toString()}`);
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
            <button className="px-2.5 py-2 border-[#6d6d6d] border bg-transparent  hover:bg-gray-400">
              <MdGridView
                onClick={() =>
                  setCardSort("grid md:grid-cols-2 lg:grid-cols-3  gap-6")
                }
                className="w-4 h-4 text-white "
              />
            </button>
            <button className="px-2.5 py-2 border-[#6d6d6d] border bg-transparent  hover:bg-gray-400">
              <HiOutlineBars3
                onClick={() => setCardSort("grid grid-cols-1  gap-6")}
                className="w-4 h-4 text-white font-bold"
              />
            </button>
          </div>

          <div className="lg:flex flex-row hidden  justify-between items-center ">
            <button
              onClick={() => setCardSort("grid grid-cols-2  gap-6")}
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

export default ShopProductTool;
