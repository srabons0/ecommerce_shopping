"use client";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { motion } from "framer-motion";
import { useState } from "react";
import { Hourglass } from "react-loader-spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
function NavSearch({ setOpenSearch }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = async() => {
      setHasSearched(true);
    setLoading(true);
   await fetch(`/api/products/searchProduct?search=${search}`)
      .then((res) => res.json())
      .then(setProduct);
    setLoading(false);
    setHasSearched(true);
  };
  return (
    <motion.div
      initial={{ y: -100, opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ y: 0, opacity: 1, backdropFilter: "blur(18px)" }}
      exit={{
        y: -100,
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed inset-0 text-white z-150 flex items-start justify-center bg-black/70 px-6 pt-20 backdrop-blur-xl"
    >
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-[0_30px_80px_rgba(0,0,0,.45)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-white">Search Products</h2>

            
          </div>

          <button
            onClick={() => setOpenSearch(false)}
            className="rounded-xl bg-zinc-800 px-4 py-2 text-sm transition hover:bg-zinc-700"
          >
            Close
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-zinc-800  gap-5 flex items-center justify-end  px-6 py-4">
          <InputGroup className="h-14 rounded-2xl border border-zinc-700 bg-zinc-800">
            <InputGroupAddon>
              <Search className="text-zinc-400" />
            </InputGroupAddon>

            <InputGroupInput
              value={search}
              required
              placeholder="Search shirts, hoodies, sneakers..."
              className="border-0 bg-transparent text-white placeholder:text-zinc-500"
              onChange={(e) => {
                setSearch(e.target.value);
                search && setHasSearched(false);
              }}
            />

            <InputGroupAddon align="inline-end">
              <span className="rounded-full bg-zinc-700 px-3 py-1 text-xs text-zinc-300">
                {product.length} Results
              </span>
            </InputGroupAddon>
          </InputGroup>
          <button
            disabled={!search.trim()}
            onClick={handleSearch}
            className={`
          rounded-xl
          px-6
          py-3
          font-medium
          transition

          ${
            search.trim()
              ? "bg-violet-600 text-white hover:bg-violet-700"
              : "cursor-not-allowed bg-zinc-700 text-zinc-500"
          }
        `}
          >
            Search
          </button>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto p-5">
          {loading && (
            <div className="flex justify-center py-5">
              <Hourglass
                visible
                height="30"
                width="30"
                colors={["#ffffff", "#ffffff"]}
              />
            </div>
          )}

          {!loading &&
            product.map((p) => (
              <div
                key={p._id}
                onClick={() => {
                  params.set("search", p.name);

                  router.push(
                    `/shop/${p.gender}/${p.subCategorySlug}?${params}`,
                  );
                }}
                className="
              group
              mb-3
              flex
              cursor-pointer
              items-center
              justify-between
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900/40
              p-4
              transition-all
              duration-300
              hover:border-violet-500/40
              hover:bg-zinc-800
            "
              >
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold text-white group-hover:text-violet-300">
                    {p.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-300">
                      {p.gender}
                    </span>

                    {p.category && (
                      <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                        {p.category}
                      </span>
                    )}
                  </div>
                </div>

                <div className="ml-6 flex items-center gap-5">
                  {p.price && (
                    <p className="font-bold text-white">
                      ৳{Number(p.price).toLocaleString()}
                    </p>
                  )}

                  <div className="rounded-full bg-zinc-800 p-3 transition group-hover:bg-violet-600">
                    <FaArrowRight className="text-white" />
                  </div>
                </div>
              </div>
            ))}

          {!loading && hasSearched && product.length === 0 && (
            <div className="py-5 text-center">
              <Search size={40} className="mx-auto mb-4 text-zinc-600" />

              <h3 className="text-xl font-semibold text-white">
                No products found
              </h3>

              <p className="mt-2 text-zinc-500">
                Try searching with another keyword.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-zinc-800 px-6 py-4"></div>
      </div>
    </motion.div>
  );
}

export default NavSearch;
