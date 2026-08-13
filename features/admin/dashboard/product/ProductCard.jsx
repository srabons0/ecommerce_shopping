"use client";

import { Trash } from "lucide-react";
import { PencilLine } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { FaEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function ProductCard({ product, page, onOpenView, onOpenEdit }) {
  const ref = useRef(page);
  const router = useRouter();
  useEffect(() => {
    if (ref.current !== page) {
      document.getElementById(`product-card`)?.scrollIntoView({
        top: 0,
        behavior: "smooth",
        block: "start",
      });
      ref.current = page;
    }
  }, [page, product._id, product.slug]);
  const price = Number(product?.price ?? 0);
  const discountPercentage = Number(product?.discountPercentage ?? 0);
  const discountedPrice =
    discountPercentage > 0
      ? Math.ceil(price - (price * discountPercentage) / 100)
      : price;
  const colors = Array.isArray(product?.attributes?.colors)
    ? product.attributes.colors.slice(0, 3)
    : [];
  const ratingValue = Number(product?.ratings?.average ?? 0);

  const handleDeleteItem = async (id) => {
   
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ml-2",
        cancelButton:
          "px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`/api/products/delete/${id}`, {
            method: "DELETE",
          });
          if (res.ok && res.status === 200) {
            router.refresh();
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your Product has been deleted.",
              icon: "success",
              customClass: {
                confirmButton:
                  "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-2",
              },
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel)
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Product is safe",
            icon: "error",
          });
      });
  };

  return (
    <div
      id="productScroll"
      className="group overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-16px_rgba(15,23,42,0.4)]"
    >
      <div className="relative aspect-6/7 overflow-hidden">
        <Image
          src={product?.images || "/placeholder.jpg"}
          alt={product?.name || "Product"}
          width={400}
          height={500}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-950/10 to-transparent" />

        {discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-[6px] lg:text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
            -{discountPercentage}%
          </span>
        )}

        <span className="absolute right-3 bottom-5 flex items-center gap-1 lg:gap-2 rounded-full bg-[#ffffff5a] px-2 lg:px-4 py-0.5 lg:py-1.5 text-[8px] lg:text-xs font-semibold text-gray-900 shadow-md backdrop-blur">
          <span
            className={`lg:h-2.5 lg:w-2.5 w-1 h-1 flex-shrink-0 rounded-full ${
              product.stock <= 5 ? "bg-red-500" : "bg-emerald-600"
            }`}
          />
          {product.stock <= 5
            ? `Only ${product.stock} Left`
            : `${product.stock} In Stock`}
        </span>
      </div>

      <div className="space-y-3 p-2 lg:p-4 ">
        <div className="flex items-start lg:items-center justify-between">
          <div className=" w-3/5 h-12 lg:h-18">
            <p className="text-[7px] lg:text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              {product?.subCategory || "Category"}
            </p>
            <h3 className="mt-1 line-clamp-2  text-[9px] lg:text-base font-semibold text-zinc-950">
              {product?.name || "Product name"}
            </h3>
          </div>
          <div className="text-right">
            {discountPercentage > 0 ? (
              <div className="flex flex-col">
                <span className="text-[7px] lg:text-sm font-medium text-zinc-400 line-through">
                  {product?.currency || "BDT"} {price}
                </span>
                <span className="text-[8px] lg:text-base font-semibold text-rose-600">
                  {product?.currency || "BDT"} {discountedPrice}
                </span>
              </div>
            ) : (
              <span className="text-[8px] w-1/3 lg:text-base font-semibold text-zinc-950">
                {product?.currency || "BDT"} {price}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5 lg:gap-1">
            {Array.from({ length: 5 }, (_, index) => {
              const filled = index < Math.round(ratingValue);
              return (
                <FaStar
                  key={index}
                  className={`lg:h-3.5 lg:w-3.5 w-2 h-2 ${filled ? "text-amber-500" : "text-zinc-300"}`}
                />
              );
            })}
            <span className="ml-1 text-[8px] lg:text-sm font-medium text-zinc-700">
              {ratingValue.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            {colors.map((color) => (
              <span
                key={color}
                className="lg:h-4 lg:w-4 w-3 h-3 rounded-full border border-zinc-300"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {Array.isArray(product?.attributes?.colors) &&
              product.attributes.colors.length > colors.length && (
                <span className="text-[8px] lg:text-[11px] font-medium text-zinc-500">
                  +{product.attributes.colors.length - colors.length}
                </span>
              )}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:flex w-full gap-2">
          <button
            onClick={() => onOpenView(product)}
            className="w-full col-span-2 rounded-xl bg-white/95 lg:px-3 lg:py-2  px-2 py-1   text-xs lg:text-sm font-semibold flex  justify-center gap-2 border text-zinc-950 transition hover:bg-zinc-300"
          >
            <FaEye className="h-4 w-4" /> View
          </button>
          <button
            onClick={() => onOpenEdit(product)}
            className="w-full rounded-xl bg-zinc-950 lg:px-3 lg:py-2 py-2   text-xs lg:text-sm font-semibold flex  justify-center gap-2 text-white transition hover:bg-zinc-700"
          >
            <PencilLine className="h-4 w-4" /> Edit
          </button>
          <button
            onClick={() => handleDeleteItem(product._id)}
            className="w-full rounded-xl bg-red-600 lg:px-3 lg:py-2 py-2 text-xs lg:text-sm font-semibold flex justify-center gap-1 lg:gap-2 text-white transition hover:bg-red-500"
          >
            <Trash className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
