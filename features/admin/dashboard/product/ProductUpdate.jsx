"use client";

import { Check, Layers3, Palette, Sparkles, Tag, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const createInitialState = (product) => ({
  name: product?.name ?? "",
  slug: product?.slug ?? "",
  price: product?.price ?? 0,
  stock: product?.stock ?? 0,
  brand: product?.brand ?? "",
  subCategory: product?.subCategory ?? "",
  item: product?.item ?? "",
  gender: product?.gender ?? "",
  currency: product?.currency ?? "BDT",
  isActive: product?.isActive ?? true,
  isFeatured: product?.isFeatured ?? false,
  isNewArrival: product?.isNewArrival ?? false,
  isBestSeller: product?.isBestSeller ?? false,
  isOnSale: product?.isOnSale ?? false,
  discountPercentage: product?.discountPercentage ?? 0,
  description: product?.description ?? "",
  shortDescription: product?.shortDescription ?? "",
  fit: product?.attributes?.fit ?? "",
  material: product?.attributes?.material ?? "",
  pattern: product?.attributes?.pattern ?? "",
  season: product?.collection ?? "",
  sizes: product?.attributes?.sizes?.join(", ") ?? "",
  colors: product?.attributes?.colors?.join(", ") ?? "",
  metaTitle: product?.seo?.metaTitle ?? "",
  metaDescription: product?.seo?.metaDescription ?? "",
  keywords: product?.seo?.keywords?.join(", ") ?? "",
});

export default function ProductUpdate({ product, open, onClose }) {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: createInitialState(product),
  });

  useEffect(() => {
    if (open && product) {
      reset(createInitialState(product));
    }
  }, [open, product, reset]);

  if (!open || !product) return null;

  const watchedValues = watch();
  const colorPreview = product?.attributes?.colors ?? [];

  const onSubmit = async (data) => {
    //todo: add pic
    const payload = {
      ...data,
      sizes: data.sizes
        ? data.sizes
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      colors: data.colors
        ? data.colors
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      keywords: data.keywords
        ? data.keywords
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
    };

    try {
      const response = await fetch(`/api/products/update/${product._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Failed to update product");
      }

      console.log("Product updated", result);
        onClose();
    } catch (error) {
      console.error("Product update failed", error);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-240 bg-black/60 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-250 flex items-center justify-center p-3 sm:p-5">
        <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto scrollbar-hide rounded-[30px] border border-zinc-200 bg-[#f7f5ef] shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-white transition hover:scale-105"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-5 lg:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="rounded-[26px] bg-[#f7f5ef]  p-5 text-white lg:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-500">
                      Product update
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-black">
                      {watchedValues.name || product.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm text-zinc-600">
                      Edit the product details in one clean, focused workspace.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-black">
                      {product.currency ?? "BDT"}{" "}
                      {watchedValues.price ?? product.price}
                    </div>
                    <div className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-black">
                      {watchedValues.stock ?? product.stock} units
                    </div>
                    <div className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase text-black">
                      {watchedValues.category || product.gender}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {colorPreview.map((color) => (
                    <div
                      key={color}
                      className="h-8 w-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color.replace(/\s+/g, "") }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-4 rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-zinc-200">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    Core information
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Product name</span>
                      <input
                        {...register("name")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Slug</span>
                      <input
                        {...register("slug")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Price</span>
                      <input
                        type="number"
                        {...register("price")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Stock</span>
                      <input
                        type="number"
                        {...register("stock")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Currency</span>
                      <input
                        {...register("currency")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Discount percentage</span>
                      <input
                        type="number"
                        {...register("discountPercentage")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>


                  </div>

                  <label className="space-y-1 text-sm font-medium text-zinc-700">
                    <span>Short description</span>
                    <textarea
                      rows={3}
                      {...register("shortDescription")}
                      className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                  </label>

                  <label className="space-y-1 text-sm font-medium text-zinc-700">
                    <span>Description</span>
                    <textarea
                      rows={5}
                      {...register("description")}
                      className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                  </label>
                </div>

                <div className="space-y-4  rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-zinc-200">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                    <Layers3 className="h-4 w-4 text-zinc-900" />
                    Merchandising
                  </div>

                  <div className="grid gap-3 lg:grid-cols-2">
                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Brand</span>
                      <input
                        {...register("brand")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Category</span>

                      <input
                        {...register("gender")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Sub category</span>
                      <input
                        {...register("subCategory")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Item</span>
                      <input
                        {...register("item")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Season</span>
                      <input
                        {...register("season")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Fit</span>
                      <input
                        {...register("fit")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Material</span>
                      <input
                        {...register("material")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>

                    <label className="space-y-1 text-sm font-medium text-zinc-700">
                      <span>Pattern</span>
                      <input
                        {...register("pattern")}
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                      />
                    </label>
                  </div>

                  <label className="space-y-1 text-sm font-medium text-zinc-700">
                    <span>Sizes</span>
                    <input
                      {...register("sizes")}
                      className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                  </label>

                  <label className="space-y-1 text-sm font-medium text-zinc-700">
                    <span>Available colors</span>
                    <textarea
                      rows={2}
                      {...register("colors")}
                      className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                  </label>

                  <div className="rounded-2xl bg-zinc-50 p-3">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                      <Palette className="h-4 w-4 text-rose-500" />
                      Visibility
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {[
                        ["isActive", "Active"],
                        ["isFeatured", "Featured"],
                        ["isNewArrival", "New arrival"],
                        ["isBestSeller", "Best seller"],
                        ["isOnSale", "On sale"],
                      ].map(([field, label]) => (
                        <label
                          key={field}
                          className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm"
                        >
                          <span>{label}</span>
                          <input
                            type="checkbox"
                            {...register(field)}
                            className="h-4 w-4 accent-zinc-950"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-zinc-200">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                  <Tag className="h-4 w-4 text-zinc-900" />
                  SEO & discoverability
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-1 text-sm font-medium text-zinc-700">
                    <span>Meta title</span>
                    <input
                      {...register("metaTitle")}
                      className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                  </label>

                  <label className="space-y-1 text-sm font-medium text-zinc-700">
                    <span>Keywords</span>
                    <input
                      {...register("keywords")}
                      className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                  </label>
                </div>

                <label className="mt-3 block space-y-1 text-sm font-medium text-zinc-700">
                  <span>Meta description</span>
                  <textarea
                    rows={3}
                    {...register("metaDescription")}
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-zinc-950"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
                >
                  <Check className="h-4 w-4" />
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
