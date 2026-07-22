"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function AdminProducts() {
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sort = pathname.split("/").at(4);
  return (
    <div className="mx-6 mt-10 mb-20">
      <section>
        <div className="mb-6 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search products..."
            className="
        min-w-[220px]
        flex-1
        rounded
        border
        border-white/10
        bg-zinc-900
        px-4
        py-2.5
        text-sm
        text-white
        placeholder:text-zinc-500
        outline-none
        transition
        focus:border-yellow-700
      "
          />

          <select
            className="
        w-44
        rounded
        border
        border-white/10
        bg-zinc-900
        px-4
        py-2.5
        text-sm
        text-white
        outline-none
        focus:border-yellow-700
      "
          >
            <option>All Categories</option>
            <option>Blazers</option>
            <option>Dresses</option>
            <option>Coats</option>
            <option>Knitwear</option>
            <option>Trousers</option>
          </select>
          <select
            className="
        w-44
        rounded
        border
        border-white/10
        bg-zinc-900
        px-4
        py-2.5
        text-sm
        text-white
        outline-none
        focus:border-yellow-700
      "
          >
            <option>All Subcategories </option>
            <option>Blazers</option>
            <option>Dresses</option>
            <option>Coats</option>
            <option>Knitwear</option>
            <option>Trousers</option>
          </select>

          <select
            className=" w-44 rounded border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-yellow-700
      "
          >
            <option>All Items</option>
            <option>Blazers</option>
            <option>Dresses</option>
            <option>Coats</option>
            <option>Knitwear</option>
            <option>Trousers</option>
          </select>

          <select
            className="
        w-40
        rounded
        border
        border-white/10
        bg-zinc-900
        px-4
        py-2.5
        text-sm
        text-white
        outline-none
        focus:border-yellow-700
      "
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Inactive</option>
          </select>
          <select
            value={sort}
            onChange={(e) => {
              const parts = pathname.split("/");
              parts[parts.length - 1] = e.target.value;
              router.push(`${parts.join("/")}?${searchParams.toString()}`);
            }}
            className="select  text-white text-center px-3 py-1 border-[#6d6d6d] border  bg-black  "
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
        </div>
      </section>
    </div>
  );
}

export default AdminProducts;
