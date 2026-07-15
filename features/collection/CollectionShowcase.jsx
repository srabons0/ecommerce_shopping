"use client";
import React, { useState } from "react";
const COLLECTIONS = [
  {
    id: "summer",
    index: "01",
    name: "Summer ",
    subtitle: "Summer COLLECTION",
    palette: {
      primary: "#E8FF47",
      secondary: "#FF8C00",
      bg: "#0d0d00",
      card: "#131300",
      text: "#E8FF47",
    },
    season: "SPRING / SUMMER",
    hero: "https://i.ibb.co.com/39Fn7CMj/summer.jpg",
  },
  {
    id: "winter",
    index: "02",
    name: "Winter",
    subtitle: "Winter COLLECTION",
    palette: {
      primary: "#FF6B35",
      secondary: "#8B4513",
      bg: "#0a0806",
      card: "#130f0a",
      text: "#FF6B35",
    },
    season: "AUTUMN / WINTER",
    hero: "https://i.ibb.co.com/8DKs34hG/winter.webp",
  },
  {
    id: "minimal",
    index: "04",
    name: "Minimal",
    subtitle: "CORE COLLECTION",
    palette: {
      primary: "#47E8FF",
      secondary: "#0099bb",
      bg: "#000508",
      card: "#050c10",
      text: "#47E8FF",
    },
    season: "PERMANENT COLLECTION",

    hero: "https://i.ibb.co.com/xqsnN7jz/minimal.webp",
  },
  {
    id: "trending",
    index: "05",
    name: "Trending ",
    subtitle: "Trending COLLECTION",

    palette: {
      primary: "#FF4D4D",
      secondary: "#cc0000",
      bg: "#0a0000",
      card: "#110000",
      text: "#FF4D4D",
    },

    season: "ONGOING Trending",

    hero: "https://i.ibb.co.com/fz0kTL50/trending.webp",
  },
];



function CollectionShowcase() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeCol, setActiveCol] = useState("summer");
    const col = COLLECTIONS.find((c) => c.id === activeCol);
    const accent = col.palette.primary;
  return (
    <section className="border-t border-zinc-800 bg-white px-16 py-[72px]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-3 flex items-center gap-3">
          <div className="h-0.5 w-5" style={{ background: accent }} />
          <span
            className="font-mono text-[9px] font-bold tracking-[0.28em]"
            style={{ color: accent }}
          >
            EXPLORE MORE
          </span>
        </div>

        <h2 className="mb-9 font-['Bebas_Neue'] text-[clamp(28px,4vw,52px)] tracking-wide text-white">
          OTHER COLLECTIONS
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {COLLECTIONS.filter((c) => c.id !== activeCol)
            .slice(0, 3)
            .map((c, i) => {
              const hovered = hoveredId === c.id;

              return (
                <div
                  key={c.id}
                  onClick={() => handleSelect(c.id)}
                  onMouseEnter={() => setHoveredId(c.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative h-[220px] cursor-pointer overflow-hidden border transition-all duration-300"
                  style={{
                    borderColor: hovered ? c.palette.primary : "#27272a",
                    transform: hovered ? "scale(.987)" : "scale(1)",
                    animation: `cardIn .55s ease ${i * 0.1}s both`,
                  }}
                >
                  <img
                    src={c.hero}
                    alt={c.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{
                      filter: hovered
                        ? "grayscale(.1) brightness(.4)"
                        : "grayscale(.6) brightness(.25)",
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: c.palette.primary,
                      opacity: hovered ? 0.1 : 0,
                    }}
                  />

                  {/* Number badge */}
                  <div
                    className="absolute left-0 top-0 px-3 py-1"
                    style={{ background: c.palette.primary }}
                  >
                    <span className="font-mono text-[9px] font-bold text-black">
                      {c.index}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-[18px] left-[18px] right-[18px]">
                    <p
                      className="mb-1 font-mono text-[9px] tracking-[0.14em]"
                      style={{ color: c.palette.primary }}
                    >
                      {c.index} · {c.subtitle}
                    </p>

                    <h3
                      className="font-['Bebas_Neue'] text-[26px] leading-none tracking-wide transition-colors"
                      style={{
                        color: hovered ? c.palette.primary : "#fff",
                      }}
                    >
                      {c.name}
                    </h3>

                    <div
                      className={`mt-2 flex items-center gap-2 transition-all duration-300 ${
                        hovered
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-3 opacity-0"
                      }`}
                    >
                      <span
                        className="font-['Bebas_Neue'] text-xs tracking-[0.1em]"
                        style={{ color: c.palette.primary }}
                      >
                        EXPLORE
                      </span>

                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={c.palette.primary}
                        strokeWidth="2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default CollectionShowcase;
