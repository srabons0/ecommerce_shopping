"use client"
import React, { useEffect, useRef, useState } from 'react'
function useCountdown(endTs) {
  const calc = () => {
    const diff = Math.max(0, endTs - Date.now());
    return { h: Math.floor(diff/3.6e6), m: Math.floor((diff%3.6e6)/60000), s: Math.floor((diff%60000)/1000) };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => { const t = setInterval(()=>setTime(calc()), 1000); return()=>clearInterval(t); }, [endTs]);
  return time;
}
function SalesBanner1({C}) {
      const globalSaleEnd = useRef(Date.now() + 1000*60*60*10 + 1000*60*20 + 1000*31).current;
      const globalTimer   = useCountdown(globalSaleEnd);
const pad = (n) => String(Math.max(0, Math.floor(n))).padStart(2, "0");
  return (
    <div
      className="relative overflow-hidden bg-[var(--coral)] py-2.5"
      style={{ "--coral": C.coral }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,.05) 10px,rgba(255,255,255,.05) 20px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-5">
        <span className="font-['Bebas_Neue'] text-sm tracking-[0.2em] text-white">
          🔥 MEGA SALE — UP TO 50% OFF
        </span>

        {/* Timer */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-white/80">ENDS IN:</span>

          {[
            { v: globalTimer.h, l: "H" },
            { v: globalTimer.m, l: "M" },
            { v: globalTimer.s, l: "S" },
          ].map((u) => (
            <div key={u.l} className="flex items-center gap-0.5">
              <span className="min-w-8 bg-black/30 px-2 py-0.5 text-center font-['Bebas_Neue'] text-lg text-white">
                {pad(u.v)}
              </span>

              <span className="font-mono text-[9px] text-white/50">{u.l}</span>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          className="bg-white px-4 py-1.5 font-['Bebas_Neue'] text-xs tracking-[0.12em] transition-colors duration-200 hover:bg-black"
          style={{
            color: C.coral,
            cursor: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = C.coral;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = C.coral;
          }}
        >
          SHOP ALL →
        </button>
      </div>
    </div>
  );
}

export default SalesBanner1
