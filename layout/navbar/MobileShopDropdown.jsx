"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

export default function MobileShopDropdown({ subCategory = [], closeMenu }) {
  const [shopOpen, setShopOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState("");

  const groups = useMemo(() => {
    return {
      men: subCategory.filter((item) => item.gender === "men"),
      women: subCategory.filter((item) => item.gender === "women"),
      universal: subCategory.filter(
        (item) => item.gender === "universal" || item.gender === "unisex",
      ),
    };
  }, [subCategory]);

  const genders = [
    {
      key: "men",
      title: "Men",
      items: groups.men,
    },
    {
      key: "women",
      title: "Women",
      items: groups.women,
    },
    {
      key: "universal",
      title: "Universal",
      items: groups.universal,
    },
  ];

  const toggleGender = (key) => {
    if (genderOpen === key) {
      setGenderOpen("");
    } else {
      setGenderOpen(key);
    }
  };

  return (
    <div className="overflow-hidden bg-white">
      <button
        onClick={() => setShopOpen(!shopOpen)}
        className="flex w-full items-center justify-between px-4 py-4 transition hover:bg-zinc-50"
      >
        <div className="flex items-center gap-3">
          <ShoppingBag size={19} className="text-zinc-600" />

          <span className="text-[15px] font-semibold">Shop</span>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            shopOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {shopOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden border-t"
          >
            <div className="space-y-3 p-4">
              {genders.map((gender) => (
                <div
                  key={gender.key}
                  className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50"
                >
                  <button
                    onClick={() => toggleGender(gender.key)}
                    className="flex w-full items-center justify-between px-4 py-4"
                  >
                    <div>
                      <p className="font-semibold">{gender.title}</p>

                      <p className="text-xs text-zinc-500">
                        {gender.items.length} Categories
                      </p>
                    </div>

                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        genderOpen === gender.key ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {genderOpen === gender.key && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 border-t bg-white p-3">
                          {gender.items.map((item) => (
                            <Link
                              key={item._id}
                              href={`/shop/${item.gender}/${item.slug}/newest`}
                              onClick={closeMenu}
                              className="group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 hover:bg-zinc-100"
                            >
                              <span className="font-medium text-zinc-700">
                                {item.name}
                              </span>

                              <ArrowRight
                                size={16}
                                className="text-zinc-400 transition-all group-hover:translate-x-1"
                              />
                            </Link>
                          ))}

                          {gender.items.length === 0 && (
                            <div className="px-4 py-3 text-sm text-zinc-400">
                              No categories found
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
