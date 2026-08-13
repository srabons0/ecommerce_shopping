function SalesHeader({ productCount }) {
  return (
    <div className="relative min-h-60 overflow-hidden border-b border-[#242424] bg-[linear-gradient(135deg,#080808_60%,#cc222215)] px-6 py-9 pb-7 lg:px-10">
      <div className="absolute inset-0 opacity-60 bg-size-[60px_60px] bg-[linear-gradient(#FF4D4D06_1px,transparent_1px),linear-gradient(90deg,#FF4D4D06_1px,transparent_1px)]" />

      <div className="pointer-events-none absolute top-1/2 right-[10%] -translate-y-1/2 font-['Bebas_Neue'] text-[clamp(100px,18vw,240px)] leading-none text-[#FF4D4D] opacity-[0.04]">
        SALE
      </div>

      <div className="relative z-10 mx-auto max-w-360">
        <div className="mt-3.5 lg:flex lg:items-end lg:justify-between gap-3">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="h-0.5 w-4.5 bg-[#FF4D4D]" />

              <span className="font-mono text-[9px] font-bold tracking-[0.28em] text-[#FF4D4D]">
                SALE EVENT
              </span>
            </div>

            <h1 className="font-['Bebas_Neue'] text-[clamp(44px,6.5vw,88px)] leading-[0.9] tracking-[0.02em] text-white animate-[fadeUp_.7s_ease_.1s_both]">
              MEGA <span className="text-[#FF4D4D]">SALE</span>
              <span className="ml-4 align-middle text-[0.5em] tracking-[0.08em] text-[#666666]">
                UP TO 50% OFF
              </span>
            </h1>
          </div>

          <div className="flex flex-col">
            <div className="text-right">
              <div className="font-['Bebas_Neue'] text-[52px] leading-none text-[#FF4D4D]">
                {productCount}
              </div>

              <div className="font-mono text-[9px] tracking-[0.16em] text-black lg:text-[#666666]">
                ITEMS ON SALE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesHeader;
