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

  const handleDeleteItem = async (id) => {
    console.log(id);
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
      id={`product-card`}
      className="group overflow-hidden rounded-[24px] border border-zinc-200 bg-white text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)]"
    >
      <div className="relative aspect-4/4 overflow-hidden">
        <Image
          src={product.images}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        {product.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-md">
            -{product.discountPercentage}% OFF
          </span>
        )}

        <span className="absolute right-3 bottom-15 flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-zinc-900 shadow-md backdrop-blur">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
              product.stock <= 5 ? "bg-red-500" : "bg-emerald-600"
            }`}
          />
          {product.stock <= 5
            ? `Only ${product.stock} left`
            : `${product.stock} in stock`}
        </span>

        <div className="absolute bottom-4 flex w-full gap-2 px-4">
          <button
            onClick={() => onOpenView(product)}
            className="w-full rounded-xl bg-white/95 px-3 py-2 text-sm font-semibold flex  justify-center gap-2 text-zinc-950 transition hover:bg-zinc-300"
          >
            <FaEye className="h-4 w-4" /> View
          </button>
          <button
            onClick={() => onOpenEdit(product)}
            className="w-full rounded-xl bg-zinc-950 px-3 py-2 text-sm font-semibold flex  justify-center gap-2 text-white transition hover:bg-zinc-700"
          >
            <PencilLine className="h-4 w-4" /> Edit
          </button>
          <button
            onClick={() => handleDeleteItem(product._id)}
            className="w-full rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold flex justify-center gap-2 text-white transition hover:bg-red-500"
          >
            <Trash className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>

      <div className="space-y-1 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-500">
          {product.subCategory}
        </p>

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-zinc-950">{product.name}</h3>

          {product.discountPercentage > 0 ? (
            <div className="flex items-center gap-2 text-right">
              <span className="text-sm font-semibold text-zinc-400 line-through">
                ${product.price}
              </span>
              <span className="text-lg font-bold text-red-500">
                $
                {Math.ceil(
                  product.price -
                    (product.price * product.discountPercentage) / 100,
                )}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-zinc-800">
              ${product.price}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < product.ratings?.average
                      ? "text-yellow-500"
                      : "text-zinc-300"
                  }`}
                />
              ))}
            </div>
            {product.ratings?.average}
          </div>

          <div className="flex items-center gap-1">
            {product.attributes?.colors?.slice(0, 6).map((color) => (
              <div
                key={color}
                title={color}
                className="h-3 w-3 rounded-sm border border-zinc-700"
                style={{ backgroundColor: color.replace(/\s+/g, "") }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
