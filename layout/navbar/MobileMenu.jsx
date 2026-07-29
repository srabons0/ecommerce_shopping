"use client";
"todo: mobile nav remain";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  X,
  ShoppingBag,
  Home,
  LayoutGrid,
  Newspaper,
} from "lucide-react";

function Accordion({ title, data, closeMenu }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4"
      >
        <span className="font-medium">{title}</span>

        <ChevronDown
          size={18}
          className={`transition duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] pb-4" : "max-h-0"
        }`}
      >
        <div className="space-y-6">
          {data.map((section) => (
            <div key={section.title}>
              <h4 className="mb-2 text-sm font-semibold text-zinc-900">
                {section.title}
              </h4>

              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      px-3
                      py-2.5
                      text-sm
                      text-zinc-600
                      hover:bg-zinc-100
                    "
                  >
                    {item.label}

                    <ChevronRight size={15} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MobileMenu({ open, setOpen }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-[330px]
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">Menu</h2>

          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-zinc-100"
          >
            <X />
          </button>
        </div>

        <div className="h-[calc(100vh-80px)] overflow-y-auto p-5">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-zinc-100"
            >
              <Home size={18} />
              Home
            </Link>

            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-zinc-100"
            >
              <ShoppingBag size={18} />
              Shop
            </Link>

            <Link
              href="/collections"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-zinc-100"
            >
              <LayoutGrid size={18} />
              Collections
            </Link>

            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-zinc-100"
            >
              <Newspaper size={18} />
              Blog
            </Link>
          </div>

          <div className="my-6 border-t" />

          <Accordion title="Men" data={[]} closeMenu={() => setOpen(false)} />

          <Accordion title="Women" data={[]} closeMenu={() => setOpen(false)} />

          <Accordion
            title="Universal"
            data={[]}
            closeMenu={() => setOpen(false)}
          />

          <div className="mt-8 rounded-3xl bg-black p-6 text-white">
            <p className="text-xs uppercase tracking-[4px] text-zinc-400">
              New Arrival
            </p>

            <h2 className="mt-3 text-2xl font-bold">Summer Collection</h2>

            <p className="mt-3 text-sm text-zinc-400">
              Premium quality fashion with free delivery.
            </p>

            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="
                mt-6
                inline-flex
                rounded-full
                bg-white
                px-5
                py-3
                font-medium
                text-black
              "
            >
              Shop Now
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
