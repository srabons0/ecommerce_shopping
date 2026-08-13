"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingBag } from "lucide-react";

import Cart from "@/features/cart/Cart";
import NavSearch from "@/features/search/NavSearch";



import webLogo from "@/public/logo.png";
import MobileMenu from "./MobileMenu";

export default function Navbar({ category }) {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const menCategory = category?.find((item) => item.gender === "men");
  const navLinks = [
    {
      title: "Home",
      href: "/",
    },
    session?.user && {
      title: "Dashboard",
      href:
        session?.user?.role === "admin"
          ? "/dashboard/admin/home"
          : "/dashboard/profile",
    },
    {
      title: "Shop",
      href: `/shop/men/${menCategory?.slug}/newest`,
    },
    {
      title: "Collections",
      href: "/collections/men/summer",
    },
    {
      title: "Sale",
      href: menCategory
        ? `/sale/men/${menCategory?.slug}/newest`
        : "/sale/men/men-tops/newest",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ].filter(Boolean);

  return (
    <>
      <header
        className={`inset-x-0 top-0 z-50 bg-black transition-all duration-300`}
      >
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-1 select-none">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden">
              <Image
                src={webLogo}
                alt="Everyday Wear"
                width={48}
                height={48}
                className="object-cover transition duration-300 group-hover:scale-110"
                priority
              />
            </div>

            <div className="leading-none">
              <h1 className="text-[9px] font-semibold tracking-[0.35em] text-white uppercase">
                EVERYDAY
              </h1>

              <div className="mt-1 flex items-center gap-1">
                <span className="h-px w-2.5 bg-red-600" />

                <p className="text-[6px] font-medium tracking-[0.65em] text-red-500 uppercase">
                  WEAR
                </p>

                <span className="h-px w-2.5 bg-red-600" />
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-3 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`hover:text-zinc-200" relative px-3 text-sm font-medium text-white transition after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:after:w-full`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => setOpenSearch(true)}
              className={`group flex h-11 w-11 items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-white/10`}
            >
              <Search
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </button>

            <button
              onClick={() => setOpenCart(true)}
              className={`group relative mr-3 flex h-11 w-11 items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-white/10`}
            >
              <ShoppingBag
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </button>

            {session ? (
              <Link
                href={
                  session.user.role === "admin"
                    ? "/dashboard/admin/profile"
                    : "/dashboard/profile"
                }
                className="rounded-full"
              >
                <Image
                  src={
                    session.user.image || "https://i.ibb.co/NYF9QTQ/images.png"
                  }
                  alt={session.user.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-zinc-200 transition hover:ring-red-500"
                />
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setOpenCart(true)}
              className={`group relative flex h-11 w-11 items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-white/10`}
            >
              <ShoppingBag
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-zinc-400"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />

      <AnimatePresence mode="wait">
        {openSearch && <NavSearch setOpenSearch={setOpenSearch} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {openCart && <Cart setOpenCart={setOpenCart} />}
      </AnimatePresence>
    </>
  );
}
