"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import cartIcon from "@/assets/icons/cart-Icons.gif";
import searchIcon from "@/assets/icons/search-Icons.gif";
import { AnimatePresence } from "framer-motion";
import Cart from "../cart/Cart";

function Navbar({ category }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openCart, setOpenCart] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <header
      className="  w-full border-b border-neutral-800
     bg-black text-white "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-2xl font-bold tracking-wider">
          LUXORA
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link href="/" className="hover:text-neutral-300">
            Home
          </Link>

          <Link href="/dashboard" className="hover:text-neutral-300">
            Dashboard
          </Link>
          <Link
            href={`/shop/men/${category.find((items) => items.gender === "men").slug}/newest`}
            className="hover:text-neutral-300"
          >
            Shop
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
          <Link href="/arrivals" className="hover:text-red-400">
            Blog
          </Link>
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <div onClick={() => setOpenCart(true)}>
            <Image
              src={cartIcon}
              alt="Cart"
              className="w-7 h-6"
              width={28}
              height={24}
            />
          </div>
          <Link href="/search">
            <Image
              src={searchIcon}
              alt="Search"
              className="w-7 h-7"
              width={28}
              height={28}
            />
          </Link>

          <Link href="/login">Login</Link>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/70">
          <div className="fixed left-0 top-0 z-50 h-full w-72 overflow-y-auto bg-neutral-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xl font-bold">Menu</span>

              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {[
              { label: "Men", submenu: menLinks },
              { label: "Women", submenu: womenLinks },
              { label: "Shoes", submenu: shoeLinks },
              { label: "New Arrivals", href: "/new-arrivals" },
              { label: "Collections", href: "/collections" },
              { label: "Shop", href: "/shop" },
              { label: "Sale", href: "/sale" },
            ].map((item) => (
              <div key={item.label} className="mb-4">
                {item.submenu ? (
                  <>
                    <button
                      className="flex w-full items-center justify-between py-2 text-left"
                      onClick={() => toggleMenu(item.label)}
                    >
                      {item.label}

                      <ChevronDown
                        className={`transition-transform ${
                          openMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openMenu === item.label && (
                      <div className="mt-2 space-y-2 pl-4 text-neutral-300">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub}
                            href={`/category/${sub
                              .toLowerCase()
                              .replace(/ /g, "-")}`}
                            className="block hover:text-white"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className="block py-2">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="mt-6 border-t border-neutral-700 pt-6">
              <Link href="/account" className="block py-2">
                Account
              </Link>

              <Link href="/cart" className="block py-2">
                Cart
              </Link>

              <Link href="/contact" className="block py-2">
                Contact
              </Link>

              <Link href="/about" className="block py-2">
                About
              </Link>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {" "}
        {openCart && <Cart setOpenCart={setOpenCart}></Cart>}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
