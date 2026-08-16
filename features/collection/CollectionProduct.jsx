"use client";

import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/shared/ProductCard";
import ProductModal from "@/components/shared/ProductModal";
const CATS = [
  { gender: "men" },
  { gender: "women" },
  { gender: "universal" },
  { gender: "couple" },
];

export default function CollectionProduct({
  product,
  productCount,
  category,
  gender,
}) {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const active = pathname.split("/").at(3);

  params.set("page", page);
  useEffect(() => {
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [page, pathname, router]);

  const filterItems = category.filter(
    (item) => !CATS.some((g) => g.gender === item.gender),
  );
  const catGender = [...CATS, ...filterItems];

  const openView = (product) => {
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="scrollbar-hide mt-10 min-h-175 overflow-y-auto bg-[#ffffff] px-2 pt-4 lg:px-4">
      <section className="px-2 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div
            className={`flex items-center justify-between transition-all duration-700`}
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="h-0.5 w-5" style={{ background: "red" }} />
                <span
                  className="font-mono text-[9px] font-bold tracking-[0.28em]"
                  style={{ color: "red" }}
                >
                  CURATED PIECES
                </span>
              </div>

              <h3 className="font-['Bebas_Neue'] text-[clamp(28px,4vw,52px)] tracking-[0.03em] text-black">
                THE COLLECTION
              </h3>
            </div>
            <div className="flex items-center font-['Bebas_Neue'] text-xs font-semibold text-black uppercase lg:text-lg">
              <div className="h-px w-3 bg-red-500 lg:h-0.5 lg:w-7" />
              <div className="rounded-xl border-r-2 border-l-2 border-red-500 px-2 py-1">
                {active}
              </div>
              <div className="h-px w-3 bg-red-500 lg:h-0.5 lg:w-7" />
            </div>
          </div>
        </div>
      </section>
      <div className="mt-5 flex w-full justify-around lg:mt-0 lg:mr-25 lg:justify-end">
        {catGender.map((c) => (
          <Link
            key={c.gender}
            href={`/collections/${c.gender}/${active}#productScroll`}
            onClick={() => {
              document.getElementById("productScroll")?.scrollIntoView({
                top: 0,
                behavior: "smooth",
                block: "start",
              });
            }}
            className={`shrink-0 rounded-xl border-b border-l px-1.5 py-0.5 font-['Bebas_Neue'] text-[15px] font-semibold tracking-widest shadow-lg shadow-red-900/40 transition-all lg:rounded-none lg:border lg:bg-black lg:px-3 lg:py-1 ${
              gender === c.gender
                ? "border-red-600 text-red-600"
                : "border-black lg:text-white"
            }`}
          >
            {c.gender.toUpperCase()}
          </Link>
        ))}
      </div>
      <div
        className={`mt-10 grid grid-cols-2 gap-2 pb-4 lg:mt-16 lg:grid-cols-4 lg:gap-5 lg:px-10`}
      >
        {product.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            openView={openView}
            page={page}
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
            className="mr-1 h-6.5 w-6.5 cursor-pointer rounded-full border-2 border-red-800 bg-red-600 p-1.25 text-center lg:h-9 lg:w-9 lg:p-1"
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
            className="mrl-1 h-6.5 w-6.5 cursor-pointer rounded-full border-2 border-red-800 bg-red-600 p-1.25 text-center lg:h-9 lg:w-9 lg:p-1"
          >
            <IoIosArrowForward className="h-3 w-3 lg:h-6.5 lg:w-6.5 lg:p-1" />
          </div>
        </div>
      )}
    </div>
  );
}
