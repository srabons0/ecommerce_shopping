"use client";

import React, { useRef, useState, useEffect } from 'react'

function BrandManifesto() {
  const brandRef = useRef(null);
  const [brandVis, setBrandVis] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setBrandVis(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
   <section ref={brandRef} className="bg-[#E63946] py-25 px-8 relative overflow-hidden">
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')] bg-[length:200px]"/>
        {/* Spinning circle */}
        <div className="absolute -right-[5%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-black/22 rounded-full animate-[spinSlow_25s_linear_infinite]">
          <div className="absolute inset-5 border border-dashed border-black/14 rounded-full"/>
        </div>

        <div className={`max-w-[960px] mx-auto transition-all duration-800 ease-[cubic-bezier(.23,1,.32,1)] ${brandVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-['DM_Mono'] text-[10px] font-bold tracking-[0.3em] text-white/88 mb-5"> OUR MANIFESTO</p>
          <h2 className="font-['Bebas_Neue'] text-[clamp(44px,7vw,96px)] text-white leading-[0.92] tracking-[0.02em] mb-8">
            FASHION FOR<br/>
            THOSE WHO<br/>
            DON`T FOLLOW.
          </h2>
          <div className="flex gap-8 flex-wrap">
            <p className="font-['DM_Mono'] text-[12px] text-white/99 max-w-[360px] leading-[1.8]">
              We make clothes for people who dress by feel, not by trend. Every piece is limited. Every drop is a statement.
            </p>
            <button className="self-end bg-white text-[#E63946] border-none font-['Bebas_Neue'] text-[18px] tracking-[0.12em] px-10 py-3.5 cursor-none transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_0_32px_rgba(0,0,0,0.44)]"
              onMouseEnter={e=>{e.currentTarget.style.background="#1a1a1a";e.currentTarget.style.boxShadow=`0 0 32px rgba(0,0,0,0.44)`;}}
              onMouseLeave={e=>{e.currentTarget.style.background="white";e.currentTarget.style.boxShadow="none";}}
            >READ OUR STORY →</button>
          </div>
        </div>
      </section>
  )
}

export default BrandManifesto
