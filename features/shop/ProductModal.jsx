"use client";

import useCartData from "@/store/cartStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FaHeart, FaHeartBroken, FaStar } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";

const ProductModal = ({ product, open, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("overview");
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const setCartData = useCartData((state) => state.setCartData);
  const { data: session } = useSession();

  const colors = useMemo(() => {
    return Array.isArray(product?.attributes?.colors)
      ? product.attributes.colors
      : [];
  }, [product]);

  const sizes = useMemo(() => {
    return Array.isArray(product?.attributes?.sizes)
      ? product.attributes.sizes
      : [];
  }, [product]);

  const price = Number(product?.price ?? 0);
  const discountPercentage = Number(product?.discountPercentage ?? 0);
  const discountedPrice =
    discountPercentage > 0
      ? Math.ceil(price - (price * discountPercentage) / 100)
      : price;
  const ratingValue = Number(product?.ratings?.average ?? 0);
  const ratingCount = Number(product?.ratings?.count ?? 0);

  if (!product) return null;

  const handleAdd = async () => {
    if (!selectedSize) {
      return Swal.fire({ title: "Please select a size", icon: "warning" });
    }

    if (!selectedColor) {
      setSelectedColor(colors[0]);
    }

    if (session) {
      const order = {
        productID: product._id,
        name: product.name,
        email: session.user.email,
        slug: product.slug,
        price: product.price,
        subCategory: product.subCategory,
        item: product.item,
        gender: product.gender,
        images: product.images,
        discountPercentage: product.discountPercentage,
        quantity: qty,
        sizes: selectedSize,
        colors: selectedColor || colors[0],
      };

      try {
        await fetch("/api/products/userCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });
      } catch (error) {
        console.error("Fetch Error:", error);
      }

      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        onClose?.();
      }, 1000);
      return;
    }

    const items = {
      _id: product._id,
      sizes: selectedSize,
      quantity: qty,
      colors: selectedColor || colors[0],
    };

    setCartData(items);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
      onClose?.();
    }, 1000);
  };

  return (
    <>
      <div
        onClick={() => onClose?.()}
        className={`fixed inset-0 z-90 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
          product
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {product && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-[32px] border border-zinc-200 bg-white text-zinc-900 shadow-[0_30px_90px_-25px_rgba(15,23,42,0.45)]">
            <button
              type="button"
              onClick={() => onClose?.()}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm transition hover:bg-white"
            >
              <ImCross className="text-sm" />
            </button>

            <div className="flex flex-col lg:flex-row">
              <div className="relative w-full bg-zinc-100 lg:w-[46%]">
                <Image
                  src={product?.images || "/placeholder.jpg"}
                  alt={product?.name || "Product"}
                  width={800}
                  height={1000}
                  className="h-full min-h-80 w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-zinc-950/10 to-transparent" />

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {product?.isFeatured && (
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
                      Featured
                    </span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="rounded-full bg-rose-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
                      -{discountPercentage}%
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/10 flex gap-2 items-center justify-center px-3 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white backdrop-blur">
                  <span
                    className={`h-2 w-2  rounded-full ${
                      product.stock <= 5 ? "bg-red-500" : "bg-emerald-600"
                    }`}
                  />
                  <span>{product?.stock > 5
                    ? `${product.stock} in stock`
                    : `Only ${product.stock} left`}</span>
                </div>
              </div>

              <div className="w-full p-5 sm:p-7 relative lg:w-[54%] lg:p-8">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                      {product?.subCategory || "Category"} ·{" "}
                      {product?.gender || "Unisex"}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-950 sm:text-3xl">
                      {product?.name || "Product name"}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWishlisted((prev) => !prev)}
                    className={`absolute right-17 top-4.5 rounded-full p-3 transition ${
                      wishlisted
                        ? "bg-rose-100 text-rose-600"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {wishlisted ? (
                      <FaHeart className="h-4 w-4" />
                    ) : (
                      <FaHeartBroken className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, index) => {
                      const filled = index < Math.round(ratingValue);
                      return (
                        <FaStar
                          key={index}
                          className={`h-3.5 w-3.5 ${filled ? "text-amber-500" : "text-zinc-300"}`}
                        />
                      );
                    })}
                    <span className="ml-1 font-medium text-zinc-700">
                      {ratingValue.toFixed(1)}
                    </span>
                  </div>
                  <span>•</span>
                  <span>{ratingCount} reviews</span>
                  <span>•</span>
                  <span>{product?.brand || "Brand"}</span>
                </div>

                <div className="mb-4 flex items-end gap-3">
                  {discountPercentage > 0 ? (
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-400 line-through">
                        {product?.currency || "BDT"} {price}
                      </span>
                      <span className="text-2xl font-semibold text-rose-600">
                        {product?.currency || "BDT"} {discountedPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-semibold text-zinc-950">
                      {product?.currency || "BDT"} {price}
                    </span>
                  )}
                </div>

                <p className="mb-6 text-sm leading-6 text-zinc-600">
                  {product?.shortDescription ||
                    product?.description ||
                    "A refined everyday piece crafted for comfort and style."}
                </p>

                <div className="mb-5">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                    Color
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`h-8 w-8 rounded-full border-2 transition ${
                          (selectedColor || colors[0]) === color
                            ? "border-zinc-950"
                            : "border-zinc-200"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                      Size
                    </p>
                    {selectedSize && (
                      <span className="text-sm font-medium text-zinc-700">
                        Selected: {selectedSize}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                          selectedSize === size
                            ? "border-zinc-950 bg-zinc-950 text-white"
                            : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                  <div className="flex items-center justify-between rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setQty((value) => Math.max(1, value - 1))}
                      className="px-2 text-lg font-semibold text-zinc-600"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold text-zinc-950">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((value) => value + 1)}
                      className="px-2 text-lg font-semibold text-zinc-600"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
                      added
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-950 text-white hover:bg-zinc-800"
                    }`}
                  >
                    {added ? "Added to cart" : "Add to cart"}
                  </button>
                </div>

                <div className="mb-4 flex border-b border-zinc-200">
                  {[
                    { key: "overview", label: "Overview" },
                    { key: "details", label: "Details" },
                    { key: "shipping", label: "Shipping" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setTab(item.key)}
                      className={`-mb-px border-b-2 px-3 py-2 text-sm font-semibold transition ${
                        tab === item.key
                          ? "border-zinc-950 text-zinc-950"
                          : "border-transparent text-zinc-500 hover:text-zinc-800"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-3 text-sm leading-6 text-zinc-600">
                  {tab === "overview" && (
                    <p>
                      {product?.description ||
                        "A refined everyday piece crafted for comfort and style."}
                    </p>
                  )}

                  {tab === "details" && (
                    <div className="grid gap-3  lg:grid-cols-4">
                      <div className="rounded-2xl border w-33 border-zinc-200 bg-zinc-50 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                          Fit
                        </p>
                        <p className="mt-1 font-semibold text-zinc-900">
                          {product?.attributes?.fit || "Classic fit"}
                        </p>
                      </div>
                      <div className="rounded-2xl border w-33 border-zinc-200 bg-zinc-50 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                          Material
                        </p>
                        <p className="mt-1 font-semibold text-zinc-900">
                          {product?.attributes?.material || "Premium fabric"}
                        </p>
                      </div>
                      <div className="rounded-2xl border w-33 border-zinc-200 bg-zinc-50 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                          Pattern
                        </p>
                        <p className="mt-1 font-semibold text-zinc-900">
                          {product?.attributes?.pattern || "Minimal"}
                        </p>
                      </div>
                      <div className="rounded-2xl border w-33 border-zinc-200 bg-zinc-50 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                          Brand
                        </p>
                        <p className="mt-1 font-semibold text-zinc-900">
                          {product?.brand || "Brand"}
                        </p>
                      </div>
                    </div>
                  )}

                  {tab === "shipping" && (
                    <div className="space-y-2">
                      <p>Free standard shipping on orders over BDT 2,000.</p>
                      <p>Express delivery is available at checkout.</p>
                      <p>Easy 30-day returns and exchanges.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
