"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Home, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineHome,
  HiOutlineNewspaper,
  HiOutlineSquares2X2,
  HiOutlineTag,
  HiOutlineUserCircle,
} from "react-icons/hi2";

import MobileShopDropdown from "./MobileShopDropdown";

export default function MobileMenu({ open, setOpen, category, subCategory }) {
  const { data: session } = useSession();

  if (!open) return null;
  const menCategory = category?.find((item) => item.gender === "men");

  const navLinks = [
    {
      title: "Collections",
      href: "/collections/men/summer",
      icon: HiOutlineSquares2X2,
    },
    {
      title: "Sale",
      href: menCategory
        ? `/sale/men/${menCategory.slug}/newest`
        : "/sale/men/men-tops/newest",
      icon: HiOutlineTag,
    },
    {
      title: "Blog",
      href: "/blog",
      icon: HiOutlineNewspaper,
    },
    session?.user && {
      title: "Dashboard",
      href:
        session.user.role === "admin"
          ? "/dashboard/admin/home"
          : "/dashboard/profile",
      icon: HiOutlineHome,
    },
    !session?.user && {
      title: "Track order",
      href: "/guest-orders",
      icon: HiOutlineSquares2X2,
    },
    session?.user
      ? {
          title: "Profile",
          href:
            session.user.role === "admin"
              ? "/dashboard/admin/profile"
              : "/dashboard/profile",
          icon: HiOutlineUserCircle,
        }
      : {
          title: "Login",
          href: "/login",
          icon: HiOutlineArrowRightOnRectangle,
        },
  ].filter(Boolean);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-100 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          x: "-100%",
          opacity: 0,
          transition: {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
      >
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}

          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="scrollbar-hide absolute top-0 left-0 h-full w-[88%] max-w-sm overflow-y-auto bg-white shadow-2xl"
        >
          <div className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">Menu</h2>

                <p className="text-sm text-zinc-500">Everyday Wear</p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition hover:bg-zinc-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-2 px-5 py-5">
            <Link
              href={"/"}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-300 hover:bg-zinc-100"
            >
              <div className="flex items-center gap-3">
                <Home size={19} className="text-zinc-600" />

                <span className="font-medium">Home</span>
              </div>

              <ChevronRight
                size={18}
                className="text-zinc-400 transition-transform group-hover:translate-x-1"
              />
            </Link>

            <MobileShopDropdown
              subCategory={subCategory}
              closeMenu={() => setOpen(false)}
            />

            {navLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-300 hover:bg-zinc-100"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={19} className="text-zinc-600" />

                    <span className="font-medium">{item.title}</span>
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-zinc-400 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              );
            })}
          </div>

          {!session && (
            <div className="border-t p-5">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-2xl bg-black py-4 font-semibold text-white transition hover:bg-zinc-800"
              >
                Login
              </Link>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
