"use client"
import { useState } from "react";

function CollectionProducts({ p, accent, wide, onCart, idx }) {
  const [hov, setHov] = useState(false);
  const [imgI, setImgI] = useState(0);
  const [ok, setOk] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setHov(true);
        setImgI(1);
      }}
      onMouseLeave={() => {
        setHov(false);
        setImgI(0);
      }}
      className={`relative overflow-hidden border transition-all duration-500 ease-[cubic-bezier(.23,1,.32,1)]
        ${wide ? "col-span-2" : "col-span-1"}
        ${hov ? "-translate-y-2" : "translate-y-0"}
      `}
      style={{
        borderColor: hov ? accent : "#27272a",
        cursor: "none",
        boxShadow: hov ? `0 28px 64px ${accent}22` : "none",
        animation: `cardIn .55s cubic-bezier(.23,1,.32,1) ${idx * 0.08}s both`,
      }}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-zinc-900 ${
          wide ? "aspect-[16/9]" : "aspect-[3/4]"
        }`}
      >
        {[p.img, p.img2].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={p.name}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-[cubic-bezier(.23,1,.32,1)]
              ${imgI === i ? "opacity-100" : "opacity-0"}
              ${hov ? "scale-105" : "scale-100"}
            `}
            style={{
              filter: hov ? "grayscale(0)" : "grayscale(.2) brightness(.85)",
            }}
          />
        ))}

        {/* Gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 55%, ${accent}15 100%)`,
            opacity: hov ? 1 : 0.5,
          }}
        />

        {/* Tag */}
        <div
          className="absolute left-2.5 top-2.5 px-2.5 py-1"
          style={{ background: accent }}
        >
          <span className="font-['Bebas_Neue'] text-[11px] tracking-[0.1em] text-black">
            {p.tag}
          </span>
        </div>

        {/* Add To Bag */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCart(p);
            setOk(true);
            setTimeout(() => setOk(false), 1400);
          }}
          className={`absolute bottom-2.5 left-2.5 right-2.5 py-2.5
            font-['Bebas_Neue'] text-[13px] tracking-[0.12em]
            transition-all duration-300 ease-[cubic-bezier(.23,1,.32,1)]
            ${hov ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
          style={{
            background: ok ? accent : "#fff",
            color: "#000",
            border: "none",
            cursor: "none",
          }}
        >
          {ok ? "✓ ADDED" : "ADD TO BAG"}
        </button>
      </div>

      {/* Info */}
      <div className="bg-zinc-950 px-4 pt-3.5 pb-4.5">
        <div className="flex items-end justify-between gap-2">
          <h3
            className="flex-1 font-['Bebas_Neue'] text-[19px] leading-[1.1] tracking-[0.05em] transition-colors duration-300"
            style={{
              color: hov ? accent : "#fff",
            }}
          >
            {p.name}
          </h3>

          <span className="shrink-0 font-mono text-[15px] font-bold text-white">
            ${p.price}
          </span>
        </div>

        <div
          className={`mt-2.5 h-[2px] origin-left transition-transform duration-300 ${
            hov ? "scale-x-100" : "scale-x-25"
          }`}
          style={{
            background: `linear-gradient(to right, ${accent}, transparent)`,
          }}
        />
      </div>
    </div>
  );
}
export default CollectionProducts;
