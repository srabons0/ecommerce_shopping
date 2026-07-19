"use client";
import React from "react";
import { SiSearxng } from "react-icons/si";
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

function AdminProductTool({
  category,
  itemCategory,
  subCategory,
  filters,
  productCount,
}) {
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { categories, subcategories, item, sortBy, status } = filters;
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
      <div className="text-4xl text-end font-semibold py-8 bg-black text-white uppercase px-10">
        Total Product: {productCount}
      </div>
      <div className="flex flex-row justify-between items-center py-3 px-10 w-full bg-black">
        <div className="relative pb-3">
          <InputGroup className="min-w-70 max-w-xs z-130 text-white bg-black">
            <InputGroupInput
              value={search}
              required
              onChange={(e) => {
                setSearch(e.target.value);
                search && setHasSearched(false);
                search && setProduct([]);
              }}
              placeholder="Search..."
            />

            <InputGroupAddon
              className="cursor-pointer"
              onClick={() => handleCancelSearch()}
              align="inline-end"
            >
              {search && <ImCancelCircle />}
            </InputGroupAddon>
            <InputGroupAddon
              className={`cursor-pointer text-white ${
                !search.trim()
                  ? "opacity-30 pointer-events-none text-white"
                  : "border-l pl-2"
              }`}
              onClick={handleSearch}
              align="inline-end"
            >
              <SiSearxng />
            </InputGroupAddon>
          </InputGroup>

          <div className=" absolute  z-100 max-h-40 top-5 rounded-b-md bg-black w-full overflow-y-auto    scrollbar-hide">
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
              {(loading || product.length > 0) &&
                product.map((p) => (
                  <div
                    key={p._id}
                    onClick={() => {
                      params.set("search", p.name);
                      router.push(`${pathname}?${params}`);
                      setSearch("");
                      setProduct([]);
                      setLoading(false);
                      setHasSearched(false);
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

        <div className="flex justify-between items-center  pb-3 gap-2">
          <select
            value={categories}
            onChange={(e) => {
              params.set("categories", e.target.value);
              params.set("page", 1);
              router.push(`${pathname}?${params}`);
            }}
            className="select rounded-lg w-40 h-8 text-white text-center px-3 py-1 border-[#6d6d6d] border    "
          >
            <option className="bg-black text-white" value={"all"}>
              All Categories
            </option>
            {category.map((cate, i) => (
              <option
                key={i}
                className="bg-black text-white"
                value={cate.gender}
              >
                {cate.gender}
              </option>
            ))}
          </select>

          <select
            value={subcategories}
            onChange={(e) => {
              params.set("subcategories", e.target.value);
              params.set("page", 1);
              router.push(`${pathname}?${params}`);
            }}
            className="select rounded-lg w-40 h-8 text-white text-center px-3 py-1 border-[#6d6d6d] border    "
          >
            <option className="bg-black text-white" value={"all"}>
              All Subcategories
            </option>
            {(filters.categories !== "all"
              ? subCategory.filter((i) => i.gender === filters.categories)
              : subCategory
            ).map((cate, i) => (
              <option key={i} className="bg-black text-white" value={cate.slug}>
                {cate.name}
              </option>
            ))}
          </select>

          <select
            value={item}
            onChange={(e) => {
              params.set("item", e.target.value);
              params.set("page", 1);
              router.push(`${pathname}?${params}`);
            }}
            className="select rounded-lg w-40 h-8 text-white text-center px-3 py-1 border-[#6d6d6d] border    "
          >
            <option className="bg-black text-white" value={"all"}>
              All Item
            </option>
            {(filters.subcategories !== "all"
              ? itemCategory.filter(
                  (i) => i.subCategorySlug === filters.subcategories,
                )
              : filters.categories !== "all"
                ? itemCategory.filter((i) => i.gender === filters.categories)
                : itemCategory
            ).map((cate, i) => (
              <option key={i} className="bg-black text-white" value={cate.slug}>
                {cate.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => {
              params.set("status", e.target.value);
              params.set("page", 1);
              router.push(`${pathname}?${params}`);
            }}
            className="select rounded-lg w-40 h-8  text-white text-center px-3 py-1 border-[#6d6d6d] border    "
          >
            {[
              { v: "all", l: "All Status" },
              { v: "active", l: "Active" },
              { v: "inactive", l: "Inactive" },
              { v: "out-of-stock", l: "Out of Stock" },
              { v: "low-stock", l: "Low Stock" },
              { v: "featured", l: "Featured" },
              { v: "new", l: "New Arrival" },
              { v: "sale", l: "On Sale" },
            ].map((items, i) => (
              <option key={i} className="bg-black text-white" value={items.v}>
                {items.l}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => {
              params.set("sortBy", e.target.value);
              params.set("page", 1);
              router.push(`${pathname}?${params}`);
            }}
            className="select rounded-lg w-40 h-8  text-white text-center px-3 py-1 border-[#6d6d6d] border    "
          >
            {[
              { v: "random", l: "Sort: Featured" },
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
        </div>
      </div>
    </div>
  );
}

export default AdminProductTool;
