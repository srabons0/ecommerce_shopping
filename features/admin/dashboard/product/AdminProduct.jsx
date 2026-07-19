"use client";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import useCardSorter from "@/store/cardSortStore";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AdminProduct({ product, productCount, filters }) {
  const [page, setPage] = useState(1);
  const cardSort = useCardSorter((state) => state.cardSort);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set("page", page);
  // console.log("pathname", pathname);
  // console.log("filters", filters.page);
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
        <Stack
          spacing={2}
          className="gap-1 flex my-10 justify-center items-center "
        >
          <Pagination
            page={page}
            onChange={(event, value) => setPage(value)}
            count={Math.ceil(productCount / 15)}
            variant="outlined"
            className="custom-pagination"
          />
        </Stack>
      )}
    </div>
  );
}
