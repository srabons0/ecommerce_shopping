"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function MegaMenu({ open, sections = [], title }) {
  const allProduct = sections?.find((item) => item);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 top-10 z-50 mt-6 w-[900px] -translate-x-1/2"
        >
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_30px_70px_rgba(0,0,0,.15)]">
            
            <div className="border-b border-zinc-100 bg-zinc-50 px-8 py-5">
              <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
            </div>
            

            <div className="grid grid-cols-4 p-6 ">
              {sections.map((item) => (
                <Link
                  key={item._id}
                  href={`/shop/${item.gender}/${item.slug}/newest`}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-zinc-700
                    transition-all
                    duration-200
                    hover:bg-zinc-100
                    hover:text-black
                  "
                >
                  <span>{item.name}</span>

                  <ArrowRight
                    size={16}
                    className="
                      opacity-50
                      transition-all
                      duration-200
                      group-hover:translate-x-1
                      group-hover:opacity-100
                    "
                  />
                </Link>
              ))}
            </div>
            
            <div className="border-t border-zinc-100 bg-zinc-50 px-8 py-4">
              <Link
                href={`/shop/${allProduct.gender}/${allProduct.slug}/newest`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-black
                  transition
                  hover:gap-3
                "
              >
                View All Products
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
