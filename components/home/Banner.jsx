"use client";
import Image from "next/image";
import banner1 from "@/assets/banner/banner-1.webp";
import banner2 from "@/assets/banner/banner-2.jpg";
import banner3 from "@/assets/banner/banner-3.avif";
import banner4 from "@/assets/banner/banner-4.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
const slides = [
  {
    id: 1,
    title: "Premium Drop Shoulder",
    subtitle: "Luxury Streetwear Collection",
    img: banner1,
    description:
      "Redefine your look with high-end silhouettes crafted to perfection.",
  },
  {
    id: 2,
    title: "Men’s & Women’s Fashion",
    subtitle: "Minimal • Elegant • Modern",
    img: banner2,
    description:
      "Discover timeless essentials curated for sophisticated fashion.",
  },
  {
    id: 3,
    title: "Complete Outfit Sets",
    subtitle: "Perfectly Styled for You",
    img: banner3,
    description: "Top-to-bottom premium outfits designed for trendsetters.",
  },
  {
    id: 4,
    title: "Complete Outfit Sets",
    subtitle: "Perfectly Styled for You",
    img: banner4,
    description: "Top-to-bottom premium outfits designed for trendsetters.",
  },
];

export default function Banner({ category }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        loop
        speed={900}
        autoplay={{
          delay: 4200,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        direction={"vertical"}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="h-[80vh] min-h-170"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full overflow-hidden">
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <Image
                  src={slides[index].img}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-linear-to-b from-slate-950/50 via-slate-950/10 to-slate-950/95" />
              </div>
              <div className="absolute inset-0 bg-slate-950/40" />
              <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-16 text-white sm:px-10 lg:px-16">
                <div className="container mx-auto px-6 h-full flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slides[index].id}
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -80 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="grid grid-cols-1 md:grid-cols-1 gap-10 items-center w-full"
                    >
                      <div className="space-y-6">
                        <p className="text-sm tracking-[4px] uppercase text-gray-200">
                          {slides[index].subtitle}
                        </p>

                        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                          {slides[index].title}
                        </h1>

                        <p className="text-gray-200 max-w-md text-lg">
                          {slides[index].description}
                        </p>

                        <div className="flex gap-4 pt-5">
                          <Link
                            href={`/shop/men/${category.find((items) => items.gender === "men").slug}/newest`}
                          >
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              className="px-6 py-3 rounded-full bg-[#E8FF47] text-black font-semibold"
                            >
                              Shop Now
                            </motion.button>
                          </Link>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-3 rounded-full border border-white text-white font-semibold"
                          >
                            Explore
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === i ? "bg-[#E8FF47] w-8" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-slate-950/90 to-transparent" />
    </section>
  );
}
