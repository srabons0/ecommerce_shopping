"use client";
import useCartData from "@/store/cartStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { FaHeart, FaHeartBroken, FaStar } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
const ProductModal = ({ product, open, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(
    product.attributes.colors[0],
  );
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("details");
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const setCartData = useCartData((state) => state.setCartData);
  const { data: session } = useSession();

  if (!product) return null;

  const handleAdd = async (product) => {
    if (!selectedSize) {
      return Swal.fire("Select Your Size");
    }
    if (session) {
      const order = {
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
        colors: selectedColor,
      };

      try {
        const res = await fetch("/api/products/userCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });
        setAdded(true);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
      setTimeout(() => {
        setAdded(false);
        onClose();
      }, 1000);
      return;
    }
    const items = {
      _id: product._id,
      sizes: selectedSize,
      quantity: qty,
      colors: selectedColor,
    };

    setCartData(items);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <>
      <div
        onClick={onClose}
        className={` fixed inset-0 z-200 bg-black/70 backdrop-blur-md   ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {open && (
        <div
          className={`fixed z-210 top-1/2 rounded-xl bg-black text-white -translate-y-1/2 w-3/4 overflow-y-auto h-150  scrollbar-hide
                    left-1/2 -translate-x-1/2`}
        >
          <div className="fixed right-4 top-2.5 z-20 flex gap-3 justify-center ml-auto mr-4 mt-4 items-center">
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`transition-colors  ${
                wishlisted ? "text-red-600" : "text-red-300  hover:text-red-500"
              }`}
            >
              {wishlisted ? (
                <FaHeart className="w-6 h-6" />
              ) : (
                <FaHeartBroken className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => onClose(false)}
              className=" flex h-9 w-9 items-center justify-center rounded-full text-lg hover:bg-stone-800 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            >
              <ImCross />
            </button>
          </div>
          <div className="flex ">
            <div className=" w-1/2 bg-stone-100 dark:bg-zinc-900">
              <Image
                src={product.images}
                alt={product.name}
                width={300}
                height={300}
                className="h-full w-full object-cover "
              />
              {product.discountPercentage > 0 && (
                <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold tracking-wide text-white shadow-md">
                  -{product.discountPercentage}% OFF
                </span>
              )}
            </div>
            <div className="w-1/2 p-8">
              <div className="mb-2 flex items-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-500">
                  {product.subCategory} · {product.gender}
                </p>
              </div>
              <h1 className="mb-2 text-3xl font-bold leading-tight  dark:text-white">
                {product.name}
              </h1>
              <div className="mb-5 flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`w-3.5 h-3.5 mb-1 ${i < product.ratings?.average ? "text-yellow-600" : "text-gray-400"}`}
                  />
                ))}
                <span className="text-sm ml-2 text-zinc-500 dark:">
                  {product.ratings.average} · {product.ratings.count} reviews
                </span>
              </div>
              <div className="mb-8 flex items-end gap-3">
                <span className="text-3xl font-bold flex gap-3 items-center  dark:text-white">
                  {product.discountPercentage > 0 ? (
                    <span className="text-3xl font-bold flex gap-3 items-center  dark:text-white">
                      {" "}
                      <span className="font-['Bebas_Neue'] text-[#FF4D4D]">
                        $
                        {Math.ceil(
                          product.price -
                            (product.price * product.discountPercentage) / 100,
                        )}
                      </span>
                      <span className="font-mono text-lg text-zinc-500 line-through">
                        ${product.price}
                      </span>
                    </span>
                  ) : (
                    <span className="font-mono  text-zinc-300 ">
                      ${product.price}
                    </span>
                  )}
                </span>
              </div>
              <div className="mb-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Color
                </p>

                <div className="flex gap-2">
                  {product.attributes.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.replace(/\s+/g, "") }}
                      className={`h-7 w-7 rounded-full border border-white transition-all ${
                        selectedColor === color
                          ? "ring-2 ring-amber-500 ring-offset-2"
                          : "ring-2 ring-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <p className="mb-3 text-xs gap-1 flex items-center font-bold uppercase tracking-widest text-zinc-500">
                  Size
                  {selectedSize && (
                    <span className="text-amber-500 ">- {selectedSize}</span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.attributes.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded border px-2 py-1 text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? "border-amber-500 bg-amber-500 text-white"
                          : "border-stone-300  hover:border-amber-500 dark:border-zinc-700 dark:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6 flex gap-3">
                <div className="flex items-center rounded border border-stone-300 dark:border-zinc-700">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-2 py-1 text-lg text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    −
                  </button>
                  <span className="min-w-11 text-center font-bold  dark:text-white">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-2 py-1 text-lg text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleAdd(product)}
                  className={`flex-1 rounded px-4 py-1  text-xs font-bold tracking-[0.15em] text-black transition ${
                    added
                      ? "bg-green-700 text-white"
                      : "bg-white hover:bg-zinc-200 dark:bg-white dark: dark:hover:bg-zinc-200"
                  }`}
                >
                  {added ? "✓ ADDED TO CART" : "ADD TO CART"}
                </button>
              </div>
              <div className="mb-6 flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    product.stock > 5 ? "bg-green-600" : "bg-orange-500"
                  }`}
                />

                <span className="text-sm text-zinc-500 dark:">
                  {product.stock > 5
                    ? `In Stock — ${product.stock} available`
                    : `Only ${product.stock} left — order soon`}
                </span>
              </div>

              <div className="mb-5 flex border-b border-stone-300 dark:border-zinc-700">
                {["description", "reviews", "shipping"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setTab(item)}
                    className={`-mb-px border-b-2 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition ${
                      tab === item
                        ? "border-amber-500  dark:text-white"
                        : "border-transparent text-zinc-500 hover: dark:hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="space-y-4 text-sm leading-7 text-zinc-600 dark:">
                {tab !== "reviews" && tab !== "shipping" ? (
                  <p>{product.description}</p>
                ) : (
                  <></>
                )}

                {tab === "reviews" && (
                  <p>
                    Excellent quality and very comfortable to wear. The fabric
                    feels premium, the fit is true to size, and the stitching is
                    well done. After several washes, it still looks and feels
                    like new. Highly recommended!
                  </p>
                )}

                {tab === "shipping" && (
                  <p>
                    Free standard shipping on orders over $100. Express delivery
                    available at checkout. International shipping to 80+
                    countries. Easy 30-day returns — no questions asked.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
