import React from "react";

function ShopHeader() {
  return (
    <div>
      <div className="relative overflow-hidden text-white border-b border-zinc-800 bg-black px-10 pt-8 pb-7">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
      linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
    `,
            backgroundSize: "56px 56px",
          }}
        />

        <div className="absolute top-1/2 left-[55%] h-50 w-125 -translate-y-1/2 rounded-full bg-lime-400 opacity-[0.03] blur-[60px]" />

        <div className="relative z-10 mx-auto max-w-360">
          <div className="flex items-end justify-between">
            <h1 className=" text-[clamp(44px,6vw,80px)] leading-[0.9] tracking-[0.02em] ">
              ALL PRODUCTS<span className="text-red-200">.</span>
            </h1>
          </div>

          <div className="mt-2.5 flex items-center gap-2">
            {["Home", "/", "Shop"].map((b, i, arr) => (
              <span key={b} className="flex items-center gap-2">
                <span
                  className={`font-mono text-[9px] tracking-widest ${
                    i === arr.length - 1 ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {b.toUpperCase()}
                </span>

                {i < arr.length - 1 && (
                  <span className="text-xs text-zinc-800">›</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopHeader;
