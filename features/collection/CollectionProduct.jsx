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
    <div className="min-h-175 mt-10  bg-[#ffffff] px-2 lg:px-4 pt-4 overflow-y-auto  scrollbar-hide">
      <section className="px-2  lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div
            className={` flex items-center justify-between transition-all duration-700
              `}
          >
            <div>
              <div className=" flex items-center gap-3">
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
            <div className="uppercase flex text-black items-center font-['Bebas_Neue'] text-xs lg:text-lg font-semibold">
              <div className="h-px lg:h-0.5 w-3 lg:w-7 bg-red-500 " />
              <div className="border-l-2 px-2 py-1 border-r-2 rounded-xl border-red-500">
                {active}
              </div>
              <div className="h-px lg:h-0.5 w-3 lg:w-7 bg-red-500 " />
            </div>
          </div>
        </div>
      </section>
      <div className=" flex justify-around mt-5 lg:mt-0 lg:justify-end  w-full lg:mr-25">
        {catGender.map((c) => (
          <Link
            key={c.gender}
            href={`/collections/${c.gender}/${active}`}
            onClick={() => {
              document.getElementById("productScroll")?.scrollIntoView({
                top: 0,
                behavior: "smooth",
                block: "start",
              });
            }}
            className={`lg:px-3 lg:py-1 lg:border border-b border-l rounded-xl lg:rounded-none px-1.5 py-0.5 font-semibold lg:bg-black  shadow-lg shadow-red-900/40 text-[15px] tracking-widest shrink-0 transition-all font-['Bebas_Neue']
          ${
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
        className={`grid lg:grid-cols-4 gap-2 mt-10 lg:mt-16 lg:gap-5 grid-cols-2 lg:px-10 pb-4
            `}
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
        <div className="mt-7 mb-5 w-full gap-1 flex text-white justify-center items-center ">
          <div
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            className="cursor-pointer text-center border-2  w-6.5 h-6.5 lg:w-9 lg:h-9 lg:p-1 p-1.25 mr-1 border-red-800  rounded-full bg-red-600 "
          >
            <IoIosArrowBack className="lg:w-6.5 lg:h-6.5 w-3 h-3 lg:p-1" />
          </div>
          <div className="gap-1 flex text-white justify-center bg-red-600 p-1 rounded-4xl  items-center ">
            {Array.from({ length: Math.ceil(productCount / 15) }, (_, i) => (
              <div
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-6.5 h-6.5 lg:w-9 lg:h-9  lg:p-1 cursor-pointer text-sm p-0.5 lg:text-lg rounded-full font-semibold bg-[#ffffff4d] text-center  border-2 border-red-400 ${page === i + 1 && "bg-white text-red-700"}`}
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
            className=" cursor-pointer text-center rounded-full  w-6.5 h-6.5 lg:w-9 lg:h-9  lg:p-1 p-1.25 mrl-1 border-2 bg-red-600  border-red-800 "
          >
            <IoIosArrowForward className="lg:w-6.5 lg:h-6.5 w-3 h-3  lg:p-1" />
          </div>
        </div>
      )}
    </div>
  );
}
