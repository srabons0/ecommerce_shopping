"use client"
import { useState } from "react";
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

 function CollectionIndex({ active, onSelect }) {
    const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="border-b border-zinc-800 bg-black px-16 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-3 flex items-center gap-3">
          <div className="h-0.5 w-6 bg-lime-300" />
          <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-lime-300">
            ALL COLLECTIONS
          </span>
        </div>

        <h2 className="mb-12 font-['Bebas_Neue'] text-[clamp(36px,5.5vw,72px)] leading-none tracking-wide text-white">
          PICK YOUR
          <br />
          <span className="text-lime-300">WORLD.</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-4  mx-auto">
          {COLLECTIONS.map((col, i) => {
            const hovered = hoveredId === col.id;
            const activeCard = active === col.id;

            return (
              <div
                key={col.id}
                onClick={() => onSelect(col.id)}
                onMouseEnter={() => setHoveredId(col.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative h-52 cursor-pointer overflow-hidden border transition-all duration-300"
                style={{
                  borderColor: activeCard
                    ? col.palette.primary
                    : hovered
                      ? `${col.palette.primary}88`
                      : "#27272a",
                  transform: hovered ? "scale(.987)" : "scale(1)",
                  animation: `cardIn .55s ease ${i * 0.07}s both`,
                  boxShadow: activeCard
                    ? `0 16px 48px ${col.palette.primary}22`
                    : hovered
                      ? `0 12px 40px ${col.palette.primary}18`
                      : "none",
                }}
              >
                {activeCard && (
                  <div
                    className="absolute inset-x-0 top-0 z-20 h-[3px]"
                    style={{ background: col.palette.primary }}
                  />
                )}

                <img
                  src={col.hero}
                  alt={col.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    filter: activeCard
                      ? "grayscale(.1) brightness(.45)"
                      : "grayscale(.55) brightness(.28)",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: col.palette.primary,
                    opacity: hovered || activeCard ? 0.1 : 0,
                  }}
                />

                <div
                  className="absolute left-4 top-3 font-mono text-[9px] tracking-[0.18em]"
                  style={{ color: col.palette.primary }}
                >
                  {col.index}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p
                    className="mb-1 font-mono text-[9px] tracking-[0.14em]"
                    style={{ color: col.palette.primary }}
                  >
                    {col.subtitle}
                  </p>

                  <h3
                    className="font-['Bebas_Neue'] text-2xl leading-none tracking-wider transition-colors"
                    style={{
                      color:
                        hovered || activeCard ? col.palette.primary : "#fff",
                    }}
                  >
                    {col.name}
                  </h3>

                  <p className="mt-1 font-mono text-[9px] text-zinc-400">
                    {col.pieces} PIECES · {col.season}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CollectionIndex
