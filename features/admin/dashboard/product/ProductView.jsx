"use client";

import { Package, PencilLine, Star, Tag, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductView({ product, open, onClose, onEdit }) {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !product) return null;

  const stats = [
    {
      label: "Inventory",
      value: `${product.stock} units`,
      icon: Package,
    },
    {
      label: "Sales",
      value: `${product.salesCount ?? 0} sold`,
      icon: Tag,
    },
    {
      label: "Sale status",
      value: product.isOnSale ? "On sale" : "Regular price",
      icon: Tag,
    },
  ];


  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "details", label: "Details" },
    { key: "reviews", label: "Reviews" },
    { key: "seo", label: "SEO" },
  ];

  const detailCards = [
    { label: "Category", value: product.category },
    { label: "Sub category", value: product.subCategory },
    { label: "Item", value: product.item },
    { label: "Gender", value: product.gender },
    { label: "Currency", value: product.currency ?? "BDT" },
    { label: "Price", value: `${product.currency ?? "BDT"} ${product.price}` },
    { label: "Discount", value: `${product.discountPercentage ?? 0}%` },
    { label: "Sale status", value: product.isOnSale ? "On sale" : "Standard" },
    { label: "Wishlist count", value: product.wishlistCount ?? 0 },
    { label: "Fit", value: product.attributes?.fit },
    { label: "Brand", value: product?.brand ?? "" },
    { label: "Material", value: product.attributes?.material },
    { label: "Pattern", value: product.attributes?.pattern },
    { label: "Season", value: product.collection },
    { label: "Sizes", value: product.attributes?.sizes?.join(", ") },
  ];

  const seoTags = product.seo?.keywords ?? [];

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0  z-240 bg-black/60 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-250 flex items-center justify-center p-3 sm:p-5">
        <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto scrollbar-hide rounded-[28px] border border-zinc-200 bg-white shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-white transition hover:scale-105"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            <div className="relative min-h-[380px] bg-zinc-950 lg:min-h-[520px]">
              <Image
                src={product.images}
                alt={product.name}
                width={900}
                height={900}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-5 p-6 text-white">
                <span className="mb-3 inline-flex rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                  {product.subCategory} · {product.gender}
                </span>
                <h2 className="max-w-lg text-3xl font-semibold leading-tight">
                  {product.name}
                </h2>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">

                <h2 className="max-w-lg text-sm text-gray-300 font-semibold leading-tight">
                  View Count: {product.viewCount} · Sales Count:{" "}
                  {product.salesCount} · Wishlist Count: {product.wishlistCount}
                </h2>
              </div>
            </div>

            <div className="flex flex-col bg-[#fbfbfb] p-5 lg:p-8">
              <div className="mb-5 relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-rose-500">
                    Product view
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-zinc-950">
                    {product.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={onEdit}
                  className="inline-flex absolute -top-4 right-0 items-center gap-2 rounded-full bg-zinc-950 px-2.5 mr-10 py-2.5 text-lg font-semibold text-white transition hover:bg-zinc-800"
                >
                  <PencilLine className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-6 flex items-center gap-2 rounded-2xl bg-zinc-100 px-4 py-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < Math.round(product.ratings?.average ?? 0)
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-zinc-700">
                  {product.ratings?.average ?? 0} ·{" "}
                  {product.ratings?.count ?? 0} reviews
                </span>
              </div>

              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                {stats.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-zinc-200 bg-white p-4"
                  >
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mb-5 flex gap-2 rounded-full bg-zinc-100 p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition ${
                      activeTab === tab.key
                        ? "bg-zinc-950 text-white"
                        : "text-zinc-600 hover:bg-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-600">
                {activeTab === "overview" && (
                  <div className="space-y-3">
                    <p className="text-base font-semibold text-zinc-950">
                      {product.shortDescription}
                    </p>
                    <p>{product.description}</p>
                  </div>
                )}

                {activeTab === "details" && (
                  <div className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {detailCards.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl bg-zinc-50 p-3"
                        >
                          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                            {item.label}
                          </span>
                          <p className="mt-1 font-semibold text-zinc-900">
                            {item.value || "—"}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl bg-zinc-50 p-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Colors
                      </span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(product.attributes?.colors ?? []).map((color) => (
                          <div
                            key={color}
                            className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-zinc-200"
                          >
                            <span
                              className="h-4 w-4 rounded-full border border-zinc-300"
                              style={{
                                backgroundColor: color.replace(/\s+/g, ""),
                              }}
                            />
                            <span className="text-xs font-semibold text-zinc-700">
                              {color}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-3">
                    <div className="rounded-xl bg-zinc-50 p-3">
                      <p className="font-semibold text-zinc-900">
                        Rating overview
                      </p>
                      <p className="mt-2 text-zinc-600">
                        Average rating: {product.ratings?.average ?? 0} from{" "}
                        {product.ratings?.count ?? 0} customer reviews.
                      </p>
                    </div>
                    <p>
                      Excellent quality, premium feel, and a fit that looks
                      refined in both casual and smart-lifestyle combinations.
                    </p>
                    <p>
                      Rated highly for comfort, color accuracy, and reliable
                      finishing.
                    </p>
                  </div>
                )}

                {activeTab === "seo" && (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-zinc-50 p-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Meta title
                      </span>
                      <p className="mt-1 font-semibold text-zinc-900">
                        {product.seo?.metaTitle}
                      </p>
                    </div>

                    <div className="rounded-xl bg-zinc-50 p-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Meta description
                      </span>
                      <p className="mt-1 text-zinc-700">
                        {product.seo?.metaDescription}
                      </p>
                    </div>

                    <div className="rounded-xl bg-zinc-50 p-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Keywords
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {seoTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
