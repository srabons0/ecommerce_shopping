'use client';

import React, { useState } from 'react';

function NewsLetter() {
  const [email, setEmail] = useState('');
  const [subDone, setSubDone] = useState(false);

  return (
    <section className="relative overflow-hidden bg-black py-24 px-8">
      {/* BG grid with lime tint */}
      <div className="absolute inset-0 bg-[linear-gradient(#E8FF4708_1px,transparent_1px),linear-gradient(90deg,#E8FF4708_1px,transparent_1px)] bg-size-[48px_48px]" />
      {/* Corner glows */}
      <div className="absolute -top-24 -left-24 h-[25rem] w-[25rem] rounded-full bg-[#E8FF47] opacity-5 blur-[80px]" />
      <div className="absolute -bottom-24 -right-24 h-[25rem] w-[25rem] rounded-full bg-[#FF6B6B] opacity-5 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center justify-center gap-2.5 mb-5">
          <span className="h-2 w-2 rounded-full bg-[#E8FF47] animate-pulse" />
          <span className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.26em] font-bold text-[#E8FF47]">DROP ALERTS</span>
          <span className="h-2 w-2 rounded-full bg-[#E8FF47] animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <h2 className="mb-6 text-[clamp(48px,8vw,100px)] leading-[0.92] tracking-[0.02em] text-white">
          GET IN<br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px #E8FF47', WebkitTextFillColor: 'transparent' }}>
            FIRST.
          </span>
        </h2>

        <p className="mx-auto mb-10 max-w-[620px] text-[11px] leading-8 text-[#888888]">
          New drops land Fridays at 12PM. Get early access, exclusive discounts, and insider content before anyone else.
        </p>

        {!subDone ? (
          <div className="mx-auto flex max-w-[480px] overflow-hidden rounded-full border border-[#242424] bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-5 py-4 text-sm text-white placeholder:text-slate-500 outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (email.trim()) {
                  setSubDone(true);
                  setEmail('');
                }
              }}
              className="rounded-full bg-[#E8FF47] px-6 py-4 text-sm font-['Bebas_Neue'] uppercase tracking-widest text-black transition hover:bg-[#d4ff5f]"
            >
              JOIN →
            </button>
          </div>
        ) : (
          <div className="inline-block rounded-full bg-[#E8FF47] px-10 py-4 text-[22px] font-['Bebas_Neue'] tracking-widest text-black animate-[fadeUp_0.5s_ease_both]">
            ✓ YOU ARE IN! CHECK YOUR EMAIL.
          </div>
        )}

        <p className="mt-4 text-[9px] text-[#888888] opacity-60">NO SPAM. UNSUBSCRIBE ANY TIME.</p>
      </div>
    </section>
  );
}

export default NewsLetter
