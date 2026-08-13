function CollectionNews() {

  return (
    <div>
      <section className="lg:border-t px-6 py-16 lg:px-16 bg-white">
        <div className="mx-auto max-w-175  text-center">
          <div className="mb-4 inline-flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 animate-pulse bg-red-500" />
            <span className="font-mono text-[9px] font-bold tracking-[0.28em] text-red-500">
              DROP ALERTS
            </span>
          </div>

          <h2 className="mb-4 font-['Bebas_Neue'] text-[clamp(36px,5vw,68px)] leading-[0.95] tracking-[0.02em] text-black">
            BE FIRST FOR
            <br />
            <span className="text-red-500">EVERY DROP.</span>
          </h2>

          <p className="mb-8 font-mono text-[11px] leading-[1.8] text-zinc-400">
            New collection drops, early access, and exclusive deals — all in
            your inbox before anyone else.
          </p>

          <div className="mx-auto flex max-w-[440px] overflow-hidden">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-3 font-mono text-[11px] text-white outline-none placeholder:text-zinc-500 border border-red-500"
              style={{ cursor: "none" }}
            />

            <button className="whitespace-nowrap px-6 py-3 font-['Bebas_Neue'] text-[15px] tracking-[0.1em] text-white transition-opacity duration-300 hover:opacity-85 bg-red-500">
              JOIN →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CollectionNews;
