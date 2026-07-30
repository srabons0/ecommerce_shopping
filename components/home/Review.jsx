'use client';

import React, { useState } from 'react'

const C = {
  dark: '#080808',
  lime: '#E8FF47',
  white: '#FFFFFF',
  coral: '#FF6B6B',
  cyan: '#00FFFF',
  card: '#161616',
  black: '#000000',
  border: '#242424',
  grey: '#888888'
}

function Review() {
  return (
  <section className="py-20 px-8 bg-[#ffffff] text-black">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-5 h-0.5 bg-[#ff4747]"/>
            <span className="font-['DM_Mono'] text-[9px] text-[#ff4747] tracking-[0.26em] font-bold uppercase">REAL PEOPLE</span>
          </div>
          <h2 className="font-['Bebas_Neue'] text-[clamp(36px,5vw,64px)] tracking-[0.03em] mb-11">WHAT THEY SAID</h2>

          <div className="grid lg:grid-cols-3 gap-3.5">
            {[
              {n:"Jordan K.",   r:"⭐⭐⭐⭐⭐", t:"These fits are actually different. Wore the bomber and got stopped three times.", clr:C.lime,   tag:"VERIFIED"},
              {n:"Maya T.",     r:"⭐⭐⭐⭐⭐", t:"The cargo pants hit different — weight, cut, movement. Nothing close at this price.", clr:C.coral,  tag:"VERIFIED"},
              {n:"Rasheed M.",  r:"⭐⭐⭐⭐⭐", t:"Third drop I've copped. Quality keeps going up. Will buy every single release.", clr:C.cyan,   tag:"VIP"},
            ].map((rv,i)=>{
              const [hov,setHov]=useState(false);
              return (
                <div key={rv.n}
                  onMouseEnter={()=>setHov(true)}
                  onMouseLeave={()=>setHov(false)}
                  className={`p-7 transition-all duration-350 ease-out transform hover:-translate-y-1.5 border-2 rounded-2xl  animate-[cardIn_0.6s_ease_${i*0.1}s_both] ${hov ? 'bg-[#ffffff] shadow-[0_16px_48px_rgba(255,255,255,0.08)]' : 'bg-[#0000000f]'} ${hov ? 'border-transparent' : 'border-[#858484]'}`}
                  style={{
                    borderColor: hov ?" #242424" : undefined,
                    boxShadow: hov ? `0 16px 48px ${rv.clr}14` : undefined
                  }}
                >
                  <div className="flex justify-between items-start mb-4.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 flex rounded-full items-center justify-center font-['Bebas_Neue'] text-[18px] text-black"
                        style={{ background: `linear-gradient(135deg,${rv.clr},${rv.clr}88)` }}
                      >{rv.n[0]}</div>
                      <div>
                        <p className={`font-['Bebas_Neue'] text-[16px] tracking-[0.05em] transition-colors duration-300 ${hov ? 'text-current' : ' '}`} style={{ color: hov ? "#ff4747" : undefined }}>{rv.n}</p>

                      </div>
                    </div>
                    <span className="text-[11px]">{rv.r}</span>
                  </div>
                  <p className="font-['DM_Mono'] text-[12px] text-[#888888] leading-[1.75]">`{rv.t}`</p>
                  <div className={`h-0.5 mt-4.5 transition-transform duration-400 ease-out origin-left ${hov ? 'scale-x-100' : 'scale-x-[0.2]'}`} style={{ backgroundColor: "#858484" }}/>
                </div>
              );
            })}
          </div>
        </div>
      </section>
  )
}

export default Review
