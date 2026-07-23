"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import cartIcon from "@/assets/icons/cart-Icons.gif";
import searchIcon from "@/assets/icons/search-Icons.gif";
import NavMenuMen from "./NavMenu/NavMenuMen";
import NavMenuWomen from "./NavMenu/NavMenuWomen";
import NavMenuUniversal from "./NavMenu/NavMenuUniversal";
import Cart from "@/features/cart/Cart";
import { AnimatePresence } from "framer-motion";
import Search from "@/features/search/NavSearch";
import { useSession } from "next-auth/react";

const Navbar = ({ category }) => {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const doSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(search.trim())}`);
    setSearch("");
    setSearchFocus(false);
  };

  const NAV = [
    { label: "Shop", href: "/shop" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className=" fixed z-100 w-full border-b border-neutral-800 bg-[#0505056c] text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-2xl font-bold tracking-wider">
          LUXORA
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <div>
            <NavMenuMen />
          </div>
          <div>
            <NavMenuWomen />
          </div>
          <div>
            <NavMenuUniversal />
          </div>

          <Link href="/dashboard/admin/home" className="hover:text-neutral-300">
            Dashboard
          </Link>

          <Link
            href="/collections/men/summer"
            className="hover:text-neutral-300"
          >
            Collections
          </Link>

          <Link
            href={`/sale/men/${category.find((items) => items.gender === "men").slug}/newest`}
            className="hover:text-red-400"
          >
            Sale
          </Link>
          <Link href="/sale" className="hover:text-red-400">
            Blog
          </Link>
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <div onClick={() => setOpenCart(true)}>
            <Image
              src={cartIcon}
              alt="Cart"
              width={28}
              height={24}
              className="w-7 h-6"
            />
          </div>
          <div onClick={() => setOpenSearch(!openSearch)}>
            <Image
              src={searchIcon}
              alt="Search"
              className="w-7 h-7"
              width={28}
              height={28}
            />
          </div>

          {session ? (
            <Link
              href={
                session?.user.role === "admin"
                  ? "/dashboard/admin/profile"
                  : "/dashboard/profile"
              }
            >
              <Image
                src={
                  session?.user?.image ||
                  "https://i.ibb.co.com/NYF9QTQ/images.png"
                }
                className="w-8 h-8 rounded-full object-cover"
                width={100}
                height={100}
                alt={session?.user?.name}
                priority
              />
            </Link>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden border flex items-center justify-center w-10 h-10
                           rounded-xl hover:bg-black/5 transition-colors ml-1"
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block h-0.5 bg-ink rounded-full transition-all duration-200 ${mobileOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`}
            />
            <span
              className={`block h-0.5 bg-ink rounded-full transition-all duration-200 ${mobileOpen ? "opacity-0 w-0" : "w-3.5"}`}
            />
            <span
              className={`block h-0.5 bg-ink rounded-full transition-all duration-200 ${mobileOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`}
            />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border py-4 space-y-1 animate-fade-in">
          <form onSubmit={doSearch} className="pb-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="inp text-sm"
            />
          </form>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-ink2
                             hover:text-ink hover:bg-black/5 rounded-xl transition-colors"
            >
              {n.label}
            </Link>
          ))}
          {!session && (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-ink2
                             hover:bg-black/5 rounded-xl transition-colors"
            >
              Log in
            </Link>
          )}
        </div>
      )}

      <AnimatePresence>
        {openSearch && <Search setOpenSearch={setOpenSearch}></Search>}
      </AnimatePresence>
      <AnimatePresence>
        {openCart && <Cart setOpenCart={setOpenCart}></Cart>}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
