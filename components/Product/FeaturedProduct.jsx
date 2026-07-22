"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

const PRODUCTS = [
  {
    id: 1,
    name: "Warp Cargo Pant",
    price: 148,
    orig: null,
    tag: "DROP",
    img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
    color: "#E8FF47",
  },
  {
    id: 2,
    name: "Static Oversized Tee",
    price: 64,
    orig: 79,
    tag: "SALE",
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",
    color: "#FF4D4D",
  },
  {
    id: 3,
    name: "Grid Bomber Jacket",
    price: 229,
    orig: null,
    tag: "NEW",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=85",
    color: "#47E8FF",
  },
  {
    id: 4,
    name: "Phase Knit Crewneck",
    price: 112,
    orig: 140,
    tag: "SALE",
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85",
    color: "#9747FF",
  },
  {
    id: 5,
    name: "Axis Track Short",
    price: 88,
    orig: null,
    tag: "HOT",
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b6b?w=600&q=85",
    color: "#E8FF47",
  },
  {
    id: 6,
    name: "Volt Platform Sneaker",
    price: 185,
    orig: null,
    tag: "DROP",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
    color: "#FF4D4D",
  },
];

const FeaturedProduct = () => {
  const gridRef = useRef(null);
  const [gridVis, setGridVis] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setGridVis(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const addToCart = (product) => {
  };

  const generateColor = (count) => {
    return Array.from({ length: count }, (_, i) => {
      const hue = (i * 360) / count;
      return `hsl(${hue}, 70%, 60%, 0.8)`;
    });
  };
const colors = generateColor(PRODUCTS.length);

  return (
    <section ref={gridRef} className="bg-[#ffffff] text-black pb-16 md:py-20 pl-8">
      <div className="mx-auto max-w-[1360px] pr-8">
        <div
          className={`mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end ${
            gridVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          } transition-all duration-[600ms] ease-[cubic-bezier(.23,1,.32,1)]`}
        >
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="h-[2px] w-6 bg-[#ff4747]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#ff4747]">
                FEATURED THIS WEEK
              </span>
            </div>

            <h2 className="max-w-2xl text-[clamp(36px,5vw,64px)] leading-none tracking-[0.03em] ">
              SHOP THE DROP
            </h2>
          </div>

          <button
            type="button"
            className="mb-1 rounded-full hidden md:block border border-[#242424] px-5 py-2.5 text-sm uppercase tracking-[0.1em] text-[#888888] transition hover:border-[#ff4747] hover:text-[#ff4747]"
          >
            VIEW ALL →
          </button>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 6).map((p, i) => (
            <ProductCard key={p.id} p={p} idx={i} onCart={addToCart} color={colors[i]} />
          ))}
        </div>
      </div>
      <div className="ml-20 md:hidden">
       <button
            type="button"
            className="mb-1 mt-8 rounded-full border border-[#242424] px-5 py-2.5 text-sm uppercase tracking-[0.1em] text-[#888888] transition hover:border-[#ff4747] hover:text-[#ff4747]"
          >
            VIEW ALL →
          </button></div>
    </section>
  );
};

export default FeaturedProduct;
