"use client";

import { useState } from "react";
import Image from "next/image";

function ProductCard({ p, onCart,color }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex lg:min-h-107.5 flex-col overflow-hidden rounded-[24px] border border-transparent bg-[#ffffff] transition duration-300 ease-out shadow-[0_18px_40px_rgba(0,0,0,0.11)] hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.28)]"
      style={{ borderColor: isHovered ? color : "transparent" }}
    >
      <div className="relative h-30 md:h-75 w-full overflow-hidden">
        <Image
          src={p.img}
          alt={p.name}
          width={600}
          height={320}
          unoptimized
          className={`h-5/6 md:h-full w-full object-cover transition duration-700 ease-out ${
            isHovered ? "scale-[1.08]" : "scale-100"
          }`}
        />

        <span
          className="absolute left-4 top-4 rounded-full text-[6px] px-2 py-1 md:px-4 md:py-2 md:text-[11px] font-bold uppercase tracking-[0.18em] text-white bg-[#0d0d0d7b]"
          
        >
          {p.tag}
        </span>

        <button
          type="button"
          onClick={() => onCart(p)}
          className="invisible absolute right-5 bottom-5 left-5 translate-y-6 rounded-full bg-[#ffffffca] px-5 py-3 text-sm font-bold text-black shadow-[0_20px_40px_rgba(0,0,0,0.16)] transition duration-300 ease-out group-hover:visible group-hover:translate-y-0"
        >
          ADD TO BAG
        </button>
      </div>

      <div className="flex flex-col gap-3 px-2 md:p-5">
        <div className="flex items-center justify-between md:gap-3">
          <h3 className="text-[13px] md:text-[18px] w-2/3 uppercase tracking-[0.04em] text-black">
            {p.name}
          </h3>

          <div className="flex flex-col items-center md:gap-3">
            {p.orig && (
              <span className="text-xs text-[#888888] line-through">
                ${p.orig}
              </span>
            )}

            <span className="text-xs md:text-[18px] font-bold text-black">
              ${p.price}
            </span>
          </div>
        </div>

        <div
          className="mt-3 h-[2px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
          style={{
            background: `linear-gradient(to right, ${color}, transparent)`,
          }}
        />
      </div>
    </article>
  );
}

export default ProductCard;