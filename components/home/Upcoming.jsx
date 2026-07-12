"use client";

import React, { useRef, useState, useEffect } from "react";

const DROPS = [
  { num: 1, name: "Future Drop 1", date: "2026-05-01" },
  { num: 2, name: "Future Drop 2", date: "2026-05-15" },
  { num: 3, name: "Future Drop 3", date: "2026-06-01" },
];

function DropCard({ d }) {
  return (
    <div className="bg-[#161616] p-6 rounded-2xl border border-transparent hover:border-[#E8FF47] transition-all duration-300">
      <div className="text-[#E8FF47] font-['Bebas_Neue'] text-2xl mb-2">
        #{d.num}
      </div>

      <h3 className="text-white font-['Bebas_Neue'] text-xl mb-2">
        {d.name}
      </h3>

      <p className="text-[#888888] text-sm">{d.date}</p>
    </div>
  );
}

export default function Upcoming() {
  const featureRef = useRef(null);
  const [featureVis, setFeatureVis] = useState(false);
  const [countdown, setCountdown] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setFeatureVis(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const targetDate = new Date("2026-12-31T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          d: Math.floor(distance / (1000 * 60 * 60 * 24)),
          h: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad = (num) => num.toString().padStart(2, "0");

  return (
    <section ref={featureRef} className="py-20 px-8 bg-[#080808]">
      <div className="max-w-[1360px] mx-auto">
        <div
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 transition-all duration-700 ${
            featureVis
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-[#FF6B6B] animate-pulse" />
              <span className="font-['DM_Mono'] text-[9px] text-[#FF6B6B] tracking-[0.26em] font-bold uppercase">
                COMING SOON
              </span>
            </div>

            <h2 className="font-['Bebas_Neue'] text-[clamp(36px,5vw,64px)] tracking-[0.03em] text-white">
              UPCOMING DROPS
            </h2>
          </div>

          <div className="flex gap-3 flex-wrap">
            {[
              { l: "DAYS", v: countdown.d },
              { l: "HRS", v: countdown.h },
              { l: "MIN", v: countdown.m },
              { l: "SEC", v: countdown.s },
            ].map((u) => (
              <div key={u.l} className="text-center">
                <div className="font-['Bebas_Neue'] text-[36px] text-[#E8FF47] leading-none bg-black px-3.5 py-2 min-w-[60px] border border-[#242424]">
                  {pad(u.v)}
                </div>

                <p className="font-['DM_Mono'] text-[8px] text-[#888888] mt-1 tracking-[0.14em]">
                  {u.l}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DROPS.map((d, i) => (
            <DropCard key={d.num} d={d} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}