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
  // console.log(pathname);

  const handleSearch = async() => {
      setHasSearched(true);
    setLoading(true);
   await fetch(`/api/products/searchProduct?search=${search}`)
      .then((res) => res.json())
      .then(setProduct);
    setLoading(false);
    setHasSearched(true);
  };
  // console.log(product);
  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{
        y: "-100%",
        opacity: 0,
        transition: {
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
          type: "spring",
          damping: 20,
          stiffness: 110,
        },
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        damping: 20,
        stiffness: 110,
      }}
      className="absolute top-0 flex h-full w-full items-center justify-center gap-3 bg-[#000000da] p-60"
    >
      <div className="relative">
        <InputGroup className="max-w-xs z-30 bg-black">
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
          <InputGroupAddon align="inline-end">
            {product.length} results
          </InputGroupAddon>
        </InputGroup>
        <div className=" absolute h-40 top-5 w-full overflow-y-auto  rounded-b-md p-1 py-4  scrollbar-hide">
          {loading && (
            <div className="flex justify-center pt-4 pb-2">
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
          {product.map((p) => (
            <div
              key={p._id}
              onClick={() => {
                params.set("search", p.name);
                router.push(`/shop/${p.gender}/${p.subCategorySlug}?${params}`);
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

          {!loading && hasSearched && product.length === 0 && (
            <p className="text-center text-gray-500">Not Found</p>
          )}
        </div>
      </div>

      <div
        className={`cursor-pointer rounded-3xl border-2 w-20 h-8 text-center p-0.5 ${
          !search.trim() ? "opacity-30 pointer-events-none" : ""
        }`}
        onClick={handleSearch}
      >
        Search
      </div>

      <div
        className="cursor-pointer rounded-xl border-2 w-20 h-8 text-center p-0.5"
        onClick={() => setOpenSearch(false)}
      >
        Close
      </div>
    </motion.div>
  );
}

export default NavSearch;
