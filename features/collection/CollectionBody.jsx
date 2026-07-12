"use client"
import { useEffect, useRef, useState } from "react";
import CollectionProducts from "./CollectionProducts";
const COLLECTIONS = [
  {
    id: "summer",
    index: "01",
    name: "Summer ",
    subtitle: "SS25 COLLECTION",
    tagline: "HEAT. COLOUR. MOVEMENT.",
    description:
      "When the temperature rises, the fits get louder. The Summer Voltage collection is built for those who don't tone down when the sun comes out — they turn up. Lightweight fabrics, saturated colourways, and silhouettes that breathe as hard as you move.",
    story:
      "Inspired by coastal cities, outdoor raves, and the kind of long days that bleed into nights. Designed for maximum visibility in minimum layers.",
    palette: {
      primary: "#E8FF47",
      secondary: "#FF8C00",
      bg: "#0d0d00",
      card: "#131300",
      text: "#E8FF47",
    },
    mood: "BOLD · LIGHTWEIGHT · LOUD",
    season: "SPRING / SUMMER 2025",
    pieces: 24,
    hero: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=90",
    lookbook:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85",
    products: [
      {
        id: 101,
        name: "Solar Mesh Tank",
        price: 58,
        tag: "HOT",
        img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",
        wide: false,
      },
      {
        id: 102,
        name: "Volt Linen Short",
        price: 79,
        tag: "NEW",
        img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b6b?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
        wide: true,
      },
      {
        id: 103,
        name: "Coast Oversized Shirt",
        price: 112,
        tag: "DROP",
        img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85",
        wide: false,
      },
      {
        id: 104,
        name: "Heat Woven Sandal",
        price: 94,
        tag: "NEW",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=85",
        wide: false,
      },
      {
        id: 105,
        name: "UV Block Long Sleeve",
        price: 88,
        tag: "SALE",
        img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=85",
        wide: false,
      },
    ],
  },
  {
    id: "fallwinter",
    index: "02",
    name: "Winter",
    subtitle: "AW25 COLLECTION",
    tagline: "LAYER. PROTECT. CONQUER.",
    description:
      "The essential autumn-winter wardrobe rebuilt from scratch. Every piece is designed to work harder — technical warmth without the bulk, tonal layering that looks intentional, and fabrics that get better with each wear and each cold front.",
    story:
      "Inspired by Northern European winters and the architecture of functionality-first dressing. The palette is taken directly from dusk skies, wet concrete, and dead leaves.",
    palette: {
      primary: "#FF6B35",
      secondary: "#8B4513",
      bg: "#0a0806",
      card: "#130f0a",
      text: "#FF6B35",
    },
    mood: "TECHNICAL · WARM · LAYERED",
    season: "AUTUMN / WINTER 2025",
    pieces: 31,
    hero: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&q=90",
    lookbook:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=85",
    products: [
      {
        id: 201,
        name: "Thermal Cargo Pant",
        price: 168,
        tag: "NEW",
        img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85",
        wide: true,
      },
      {
        id: 202,
        name: "Wool Blend Overcoat",
        price: 385,
        tag: "LTD",
        img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=85",
        wide: false,
      },
      {
        id: 203,
        name: "Fleece Sherpa Jacket",
        price: 229,
        tag: "HOT",
        img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85",
        wide: false,
      },
      {
        id: 204,
        name: "Ribbed Thermal Knit",
        price: 115,
        tag: "NEW",
        img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",
        wide: false,
      },
      {
        id: 205,
        name: "Chelsea Boot Midnight",
        price: 265,
        tag: "DROP",
        img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
        wide: false,
      },
    ],
  },
  {
    id: "minblack",
    index: "04",
    name: "Minimal",
    subtitle: "CORE ESSENTIALS",
    tagline: "LESS IS THE STATEMENT.",
    description:
      "The wardrobe foundation. No graphics, no logos, no noise. Just perfectly proportioned cuts in heavyweight organic cotton, made to stack, layer, and last years. The Minimal Black collection is what everything else gets built on top of — the quiet pieces that hold a wardrobe together.",
    story:
      "We started with one question: what is the single best version of each essential? The answer took 14 months of sampling, 6 fabric mills, and over 200 rejected prototypes.",
    palette: {
      primary: "#47E8FF",
      secondary: "#0099bb",
      bg: "#000508",
      card: "#050c10",
      text: "#47E8FF",
    },
    mood: "CLEAN · ESSENTIAL · LONG-LASTING",
    season: "PERMANENT COLLECTION",
    pieces: 12,
    hero: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1600&q=90",
    lookbook:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=85",
    products: [
      {
        id: 401,
        name: "The Perfect Tee",
        price: 68,
        tag: "CORE",
        img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85",
        wide: false,
      },
      {
        id: 402,
        name: "Slim Cut Jean",
        price: 148,
        tag: "CORE",
        img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85",
        wide: true,
      },
      {
        id: 403,
        name: "Oversized Crewneck",
        price: 118,
        tag: "CORE",
        img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
        wide: false,
      },
      {
        id: 404,
        name: "Clean Runner Sneaker",
        price: 188,
        tag: "CORE",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=85",
        wide: false,
      },
      {
        id: 405,
        name: "Structured Chino",
        price: 138,
        tag: "CORE",
        img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b6b?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
        wide: false,
      },
    ],
  },
  {
    id: "streetwear",
    index: "05",
    name: "Trending ",
    subtitle: "STREET CULTURE DROP",
    tagline: "STRAIGHT FROM THE BLOCK.",
    description:
      "The most culturally-loaded collection we've ever dropped. Drawn from skate parks, subway platforms, and late-night studio sessions, the Trending Streetwear collection captures the exact moment when underground becomes iconic. Oversized cuts, graphic-forward design, and limited colourways that won't be restocked.",
    story:
      "These pieces exist because we were watching. Every graphic, every silhouette, every colour story came from paying attention to the people who never cared about fashion magazines but always looked the best.",
    palette: {
      primary: "#FF4D4D",
      secondary: "#cc0000",
      bg: "#0a0000",
      card: "#110000",
      text: "#FF4D4D",
    },
    mood: "GRAPHIC · OVERSIZED · CULTURAL",
    season: "ONGOING DROPS",
    pieces: 28,
    hero: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1600&q=90",
    lookbook:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=85",
    products: [
      {
        id: 501,
        name: "Block Logo Hoodie",
        price: 148,
        tag: "HOT",
        img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",
        wide: true,
      },
      {
        id: 502,
        name: "Washed Graphic Tee",
        price: 72,
        tag: "DROP",
        img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85",
        wide: false,
      },
      {
        id: 503,
        name: "Cargo Track Pant",
        price: 162,
        tag: "HOT",
        img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b6b?w=600&q=85",
        wide: false,
      },
      {
        id: 504,
        name: "Skate Low Sneaker",
        price: 145,
        tag: "DROP",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=85",
        wide: false,
      },
      {
        id: 505,
        name: "Panel Bomber",
        price: 228,
        tag: "LTD",
        img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=85",
        wide: false,
      },
    ],
  },
];
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function CollectionBody({  onCart }) {
      const [activeCol, setActiveCol] = useState("summer");
  const [storyRef, storyVis] = useInView(0.1);
  const [gridRef, gridVis] = useInView(0.08);
  const [lookRef, lookVis] = useInView(0.15);
 const col = COLLECTIONS.find((c) => c.id === activeCol);

  const accent = col.palette.primary;

  return (
    <div style={{ background: col.palette.bg }}>
      {/* ── STORY SECTION ── */}
      <section
        ref={storyRef}
        className="px-6 py-24 lg:px-16"
        style={{ background: col.palette.bg }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            {/* Left */}
            <div
              className={`transition-all duration-700 ease-[cubic-bezier(.23,1,.32,1)]
                ${
                  storyVis
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }`}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-[2px] w-7" style={{ background: accent }} />
                <span
                  className="font-mono text-[9px] font-bold tracking-[0.3em]"
                  style={{ color: accent }}
                >
                  THE STORY
                </span>
              </div>

              <h2 className="mb-7 font-['Bebas_Neue'] text-[clamp(36px,4.5vw,60px)] leading-[0.95] tracking-[0.02em] text-white">
                {col.description.split(".")[0].trim()}.
              </h2>

              <p className="mb-5 max-w-[440px] font-mono text-xs leading-[1.9] text-zinc-400">
                {col.description.split(".").slice(1).join(".").trim()}
              </p>

              <div
                className="mt-7 border-l-4 pl-5"
                style={{ borderColor: accent }}
              >
                <p className="font-mono text-[11px] italic leading-7 text-zinc-300">
                  "{col.story}"
                </p>
              </div>
            </div>

            {/* Right */}
            <div
              ref={lookRef}
              className={`relative transition-all duration-700 delay-150 ease-[cubic-bezier(.23,1,.32,1)]
                ${
                  lookVis
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-zinc-800">
                <img
                  src={col.lookbook}
                  alt="lookbook"
                  className="h-full w-full object-cover grayscale-[0.1] brightness-75"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${col.palette.bg}44, transparent)`,
                  }}
                />

                {/* Stats */}
                <div className="absolute bottom-5 right-5 flex flex-col gap-2">
                  {[
                    { v: col.pieces + "+", l: "PIECES" },
                    { v: col.season.split(" ")[0], l: "SEASON" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="border bg-black/80 px-4 py-2 text-right backdrop-blur-md"
                      style={{ borderColor: `${accent}33` }}
                    >
                      <div
                        className="font-['Bebas_Neue'] text-2xl tracking-[0.04em]"
                        style={{ color: accent }}
                      >
                        {s.v}
                      </div>

                      <div className="font-mono text-[8px] text-zinc-400">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Corner */}
                <div
                  className="absolute left-0 top-0 h-0 w-0"
                  style={{
                    borderStyle: "solid",
                    borderWidth: "32px 32px 0 0",
                    borderColor: `${accent} transparent transparent transparent`,
                  }}
                />
              </div>

              {/* Mood */}
              <div
                className="absolute -bottom-4 -left-4 border-[3px] px-5 py-3"
                style={{
                  background: accent,
                  borderColor: col.palette.bg,
                }}
              >
                <p className="font-['Bebas_Neue'] text-sm tracking-[0.1em] text-black">
                  {col.mood.split(" · ")[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section
        ref={gridRef}
        className="px-6 pb-24 lg:px-16"
        style={{ background: col.palette.bg }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div
            className={`mb-9 flex items-end justify-between transition-all duration-700
              ${
                gridVis
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
          >
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="h-[2px] w-5" style={{ background: accent }} />
                <span
                  className="font-mono text-[9px] font-bold tracking-[0.28em]"
                  style={{ color: accent }}
                >
                  CURATED PIECES
                </span>
              </div>

              <h3 className="font-['Bebas_Neue'] text-[clamp(28px,4vw,52px)] tracking-[0.03em] text-white">
                THE EDIT
              </h3>
            </div>

            <button
              className="border border-zinc-800 bg-transparent px-5 py-2 font-['Bebas_Neue'] text-[13px] tracking-[0.1em] text-zinc-400 transition-all duration-300"
              style={{ cursor: "none" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.color = accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.color = "";
              }}
            >
              VIEW ALL {col.pieces} PIECES →
            </button>
          </div>

          {/* Products */}
          <div
            className={`grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-700 delay-200 ${
              gridVis ? "opacity-100" : "opacity-0"
            }`}
          >
            {col.products.map((p, i) => (
              <CollectionProducts
                key={p.id}
                p={p}
                accent={accent}
                wide={p.wide}
                onCart={onCart}
                idx={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="mx-6 h-px lg:mx-16"
        style={{
          background: `linear-gradient(to right, transparent, ${accent}33, transparent)`,
        }}
      />
    </div>
  );
}
export default CollectionBody;
