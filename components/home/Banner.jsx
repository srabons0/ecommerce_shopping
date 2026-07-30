"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Premium Drop Shoulder",
    subtitle: "Luxury Streetwear Collection",
    image: "https://i.ibb.co.com/kghPKwrj/banner-1.webp",
    description:
      "Discover premium oversized silhouettes crafted for modern fashion lovers.",
  },
  {
    id: 2,
    title: "Minimal Everyday Fashion",
    subtitle: "Men & Women Collection",
    image: "https://i.ibb.co.com/sdN5cVc0/banner-2.jpg",
    description:
      "Elegant essentials designed to elevate every wardrobe effortlessly.",
  },
  {
    id: 3,
    title: "Premium Outfit Sets",
    subtitle: "New Season Arrivals",
    image: "https://i.ibb.co.com/RT4jPJCd/banner-3.avif",
    description:
      "Explore complete outfit combinations curated by our fashion experts.",
  },
  {
    id: 4,
    title: "Luxury Essentials",
    subtitle: "Exclusive Collection",
    image: "https://i.ibb.co.com/60DRj2QP/banner-4.webp",
    description:
      "Premium craftsmanship meets timeless style in every collection.",
  },
];

export default function Banner({ category }) {
  const [active, setActive] = useState(0);

  const menSlug = category?.find((item) => item.gender === "men")?.slug || "";
  const handleExplore = () => {
    const section = document.getElementById("featured-collection");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <section className="relative overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        speed={900}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        className="h-svh"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden ">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-black/45" />

              <div className="absolute w-full inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

              <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
                <div className="grid w-full items-center gap-16 ">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id}
                      initial={{
                        opacity: 0,
                        y: 40,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -40,
                      }}
                      transition={{
                        duration: 0.7,
                      }}
                      className="max-w-3xl"
                    >
                      <span className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[5px] text-white backdrop-blur-xl">
                        {slide.subtitle}
                      </span>

                      <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
                        {slide.title}
                      </h1>

                      <p className="mt-5 max-w-xl text-base leading-8 text-zinc-200 sm:text-lg">
                        {slide.description}
                      </p>

                      <div className="mt-5 flex flex-col gap-4 sm:flex-row">
                        <Link href={`/shop/men/${menSlug}/newest`}>
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="rounded-full bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:bg-[#ff4747] hover:text-white"
                          >
                            Shop Collection
                          </motion.button>
                        </Link>

                        <motion.button
                          onClick={handleExplore}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          className="rounded-full border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
                        >
                          Explore Lookbook
                        </motion.button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-500 ${
              active === i
                ? "h-2 w-12 rounded-full bg-white"
                : "h-2 w-2 rounded-full bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <div className="absolute left-[-120px] top-1/3 h-72 w-72 rounded-full bg-white/10 blur-[140px]" />
      <div className="absolute bottom-[-100px] right-[-80px] h-72 w-72 rounded-full bg-[#E8FF47]/20 blur-[160px]" />
    </section>
  );
}
