"use client";
import useCardSorter from "@/store/cardSortStore";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductUpdate from "./ProductUpdate";
import ProductView from "./ProductView";

export default function AdminProduct({ product, productCount }) {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const cardSort = useCardSorter((state) => state.cardSort);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

useEffect(() => {
  const params = new URLSearchParams(searchParams.toString());
  const nextPage = String(page);

  if (params.get("page") !== nextPage) {
    params.set("page", nextPage);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
}, [page, pathname, router, searchParams]);

  const openView = (product) => {
    setSelectedProduct(product);
    setActiveModal("view");
  };

  const openEdit = (product) => {
    setSelectedProduct(product);
    setActiveModal("edit");
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setActiveModal(null);
  };

  return (
    <div className="min-h-175 bg-[#edecec] px-4 py-4 overflow-y-auto scrollbar-hide">
      <div className={` ${cardSort} grid-cols-1 px-10 pt-5`}>
        {product.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            page={page}
            onOpenView={openView}
            onOpenEdit={openEdit}
          />
        ))}
      </div>

      {selectedProduct && activeModal === "view" && (
        <ProductView
          product={selectedProduct}
          open={true}
          onClose={closeModal}
          onEdit={() => setActiveModal("edit")}
        />
      )}

      {selectedProduct && activeModal === "edit" && (
        <ProductUpdate
          product={selectedProduct}
          open={true}
          onClose={closeModal}
        />
      )}

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
