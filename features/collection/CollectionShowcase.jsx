"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

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
    index: "03",
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
    index: "04",
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
  const firstRender = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname.split("/").at(3);
  const setCollection = (id) => {
    const path = pathname.split("/");
    path[path.length - 1] = id;
    router.push(`${path.join("/")}?${searchParams.toString()}`);
  };
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (active) {
      document.getElementById("productScroll")?.scrollIntoView({
        top: 0,
        behavior: "smooth",
        block: "start",
      });
    }
  }, [active]);

  return (
    <section className=" bg-white px-2 py-8 lg:px-16 lg:py-18">
      <div className="mx-auto max-w-7xl">
        <div className="mb-3 px-2 flex items-center gap-3">
          <div className="h-0.5 w-5" style={{ background: "red" }} />
          <span
            className="font-mono text-[9px] font-bold tracking-[0.28em]"
            style={{ color: "red" }}
          >
            EXPLORE MORE
          </span>
        </div>

        <h2 className="mb-9 font-['Bebas_Neue'] text-[clamp(28px,4vw,52px)] tracking-wide text-black">
          OTHER COLLECTIONS
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4  mx-auto">
          {COLLECTIONS.filter((collection) => collection.id !== active).map(
            (col, i) => {
              const hovered = hoveredId === col.id;
              const activeCard = active === col.id;

              return (
                <div
                  key={col.id}
                  onClick={() => setCollection(col.id)}
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
                    <div className="absolute inset-x-0 top-0 z-20 h-[3px]" />
                  )}

                  <Image
                    src={col.hero}
                    alt={col.name}
                    width={200}
                    height={100}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{
                      filter: activeCard
                        ? "grayscale(.1) brightness(.50)"
                        : "grayscale(.55) brightness(.35)",
                    }}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#000000]  to-transparent to-50%" />

                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: col.palette.primary,
                      opacity: hovered || activeCard ? 0.09 : 0,
                    }}
                  />

                  <div
                    className="absolute left-4 top-3  font-mono text-[9px] tracking-[0.18em]"
                    style={{ color: col.palette.primary }}
                  >
                    0{i+1}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p
                      className="mb-1 font-mono text-[9px]   tracking-[0.14em]"
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
                      {col.season}
                    </p>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

export default CollectionShowcase;
