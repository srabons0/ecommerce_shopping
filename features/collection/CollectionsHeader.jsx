"use client"
import React, { useState } from 'react'
import CollectionIndex from './CollectionIndex';


const COLLECTIONS = [
  {
    id: "summer",
    index: "01",
    name: "Summer Voltage",
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
    name: "Fall / Winter Essentials",
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
    id: "luxnoir",
    index: "03",
    name: "Luxury Noir",
    subtitle: "PRESTIGE EDIT",
    tagline: "DARK. PRECISE. TIMELESS.",
    description:
      "Everything black. Nothing basic. The Luxury Noir edit takes the classic all-black uniform and strips out every compromise — premium Japanese cotton, matte finishes, structured silhouettes, and details that reveal themselves only up close. This is the collection for those who understand that restraint is the loudest statement.",
    story:
      "Conceived in a Tokyo studio at 2AM. Influenced by Rei Kawakubo, Rick Owens, and every person who has ever walked into a room and made it quieter.",
    palette: {
      primary: "#FFFFFF",
      secondary: "#888888",
      bg: "#030303",
      card: "#0a0a0a",
      text: "#FFFFFF",
    },
    mood: "MONOCHROME · PRECISE · ELEVATED",
    season: "YEAR ROUND",
    pieces: 18,
    hero: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=90",
    lookbook:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85",
    products: [
      {
        id: 301,
        name: "Noir Structured Blazer",
        price: 495,
        tag: "LTD",
        img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=85",
        wide: false,
      },
      {
        id: 302,
        name: "Matte Wide Trouser",
        price: 245,
        tag: "EDIT",
        img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
        wide: false,
      },
      {
        id: 303,
        name: "Column Turtleneck",
        price: 178,
        tag: "NEW",
        img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
        wide: true,
      },
      {
        id: 304,
        name: "Noir Leather Oxford",
        price: 335,
        tag: "LTD",
        img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=85",
        wide: false,
      },
      {
        id: 305,
        name: "Overcast Trench Coat",
        price: 420,
        tag: "EDIT",
        img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=85",
        wide: false,
      },
    ],
  },
  {
    id: "minblack",
    index: "04",
    name: "Minimal Black",
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
    name: "Trending Streetwear",
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
  {
    id: "athleisure",
    index: "06",
    name: "Athleisure Pack",
    subtitle: "PERFORMANCE MEETS STREET",
    tagline: "BUILT FOR BOTH WORLDS.",
    description:
      "The blur between performance wear and street style is not a compromise — it's the direction. The Athleisure Pack takes technical fabrics developed for elite athletes and puts them into silhouettes designed for real life: commutes, coffee runs, gym sessions, and everything in between.",
    story:
      "We partnered with a Portuguese performance fabric house to develop our own 4-way stretch material with moisture management and fade resistance. The result is the softest, most durable technical garment at this price point.",
    palette: {
      primary: "#9747FF",
      secondary: "#6620cc",
      bg: "#050008",
      card: "#0b000f",
      text: "#9747FF",
    },
    mood: "TECHNICAL · VERSATILE · PERFORMANCE",
    season: "ALL SEASON",
    pieces: 22,
    hero: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b6b?w=1600&q=90",
    lookbook:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85",
    products: [
      {
        id: 601,
        name: "Flex Tech Jogger",
        price: 118,
        tag: "NEW",
        img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
        wide: false,
      },
      {
        id: 602,
        name: "Compression Long Tee",
        price: 84,
        tag: "CORE",
        img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",
        wide: false,
      },
      {
        id: 603,
        name: "Stretch Track Jacket",
        price: 198,
        tag: "HOT",
        img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=85",
        wide: true,
      },
      {
        id: 604,
        name: "Performance Short",
        price: 72,
        tag: "NEW",
        img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b6b?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=85",
        wide: false,
      },
      {
        id: 605,
        name: "Grip Training Sneaker",
        price: 162,
        tag: "DROP",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
        img2: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=85",
        wide: false,
      },
    ],
  },
];
function CollectionsHeader() {
  const [activeCol, setActiveCol] = useState("summer");
    const [indexVisible, setIndexVisible] = useState(false);


  const handleSelect = (id) => {
    setActiveCol(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIndexVisible(false);
  };

  return (
    <div className="relative">
      {/* Toggle button */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-[60px] py-4">
        <div className="flex gap-2 overflow-x-auto">
          {COLLECTIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelect(c.id)}
              className={`shrink-0 border px-4 py-1.5 font-['Bebas_Neue'] text-[13px] tracking-[0.1em] transition-all ${
                activeCol === c.id
                  ? "text-black"
                  : "border-zinc-800 text-zinc-400 hover:text-[var(--primary)] hover:border-[var(--primary)]"
              }`}
              style={
                activeCol === c.id
                  ? {
                      backgroundColor: c.palette.primary,
                      borderColor: c.palette.primary,
                    }
                  : {
                      "--primary": c.palette.primary,
                    }
              }
            >
              {c.index} {c.name.split(" ")[0].toUpperCase()}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIndexVisible((v) => !v)}
          className="ml-4 flex shrink-0 items-center gap-2 border border-zinc-800 bg-transparent px-4 py-1.5 font-['Bebas_Neue'] text-xs tracking-[0.1em] text-zinc-400 transition-all hover:border-lime-300 hover:text-lime-300"
        >
          {indexVisible ? "HIDE" : "ALL"} COLLECTIONS {indexVisible ? "▲" : "▼"}
        </button>
      </div>

      {/* Expandable full index grid */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          indexVisible ? "max-h-[800px]" : "max-h-0"
        }`}
      >
        <CollectionIndex active={activeCol} onSelect={handleSelect} />
      </div>
    </div>
  );
}

export default CollectionsHeader
