import React from "react";
import Image from "next/image";

const C = {
  black: "#000000",
  border: "#242424",
  cyan: "#00FFFF",
  white: "#FFFFFF",
  grey: "#888888",
  lime: "#E8FF47",
  coral: "#FF6B6B",
  dark: "#080808",
};

function Glitch({ text, size, color }) {
  return (
    <h2
      className="relative font-['Bebas_Neue'] tracking-[0.04em]"
      style={{ fontSize: size, color }}
    >
      {text}

      <span className="absolute inset-0 translate-x-0.5 animate-pulse text-red-500 opacity-20">
        {text}
      </span>

      <span className="absolute inset-0 -translate-x-0.5 animate-pulse text-blue-500 opacity-20">
        {text}
      </span>
    </h2>
  );
}

function CallOut() {
  const stats = [
    { v: "4.9★", l: "Avg Rating", clr: C.lime },
    { v: "72h", l: "Delivery", clr: C.coral },
    { v: "30D", l: "Returns", clr: C.cyan },
  ];

  const features = [
    "ORGANIC FABRICS",
    "ETHICAL PRODUCTION",
    "CARBON NEUTRAL",
  ];

  return (
    <section className="grid min-h-[480px] grid-cols-1 bg-black lg:grid-cols-2">
      
      <div className="flex flex-col justify-center border-r border-[#242424] p-8 lg:p-18">
        <div className="mb-5 flex items-center gap-2.5">
          <div className="h-2 w-2 bg-[#00FFFF]" />
          <span className="font-['DM_Mono'] text-[9px] font-bold uppercase tracking-[0.22em] text-[#00FFFF]">
            QUALITY FIRST
          </span>
        </div>

        <Glitch text="BUILT DIFFERENT" size={54} color={C.white} />

        <p className="mt-6 mb-8 max-w-[340px] font-['DM_Mono'] text-[12px] leading-[1.8] text-[#888888]">
          Every stitch is intentional. We use heavyweight fabrics,
          reinforced seams, and colourfast dyes. Built to outlast trends.
        </p>

        <div className="flex flex-wrap gap-5">
          {features.map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 bg-[#00FFFF]" />
              <span className="font-['DM_Mono'] text-[9px] tracking-[0.1em] text-[#888888]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      
      <div className="relative overflow-hidden bg-[#080808]">
        <Image
          src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=85"
          alt="Quality fashion"
          fill
          priority
          className="object-cover brightness-50 grayscale-[0.3]"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-transparent" />

        
        <div className="absolute top-8 right-8 flex flex-col gap-3">
          {stats.map((item) => (
            <div
              key={item.l}
              className="border border-white/15 bg-black/80 p-3 text-right backdrop-blur-md"
            >
              <div
                className="font-['Bebas_Neue'] text-[24px] tracking-[0.04em]"
                style={{ color: item.clr }}
              >
                {item.v}
              </div>

              <div className="font-['DM_Mono'] text-[9px] text-[#888888]">
                {item.l.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CallOut;
