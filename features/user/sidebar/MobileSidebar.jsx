"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { HiMenuAlt3, HiX } from "react-icons/hi";

import {
  MdDashboard,
  MdOutlineFavoriteBorder,
  MdOutlineSupportAgent,
} from "react-icons/md";

import { FaBoxOpen, FaHome, FaRegUser } from "react-icons/fa";

import { FaUserGear } from "react-icons/fa6";

const menu = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    href: "/dashboard/home",
  },
  {
    title: "Orders",
    icon: FaBoxOpen,
    href: "/dashboard/orders",
  },
  {
    title: "Wishlist",
    icon: MdOutlineFavoriteBorder,
    href: "/dashboard/wishlist",
  },

  {
    title: "Profile",
    icon: FaRegUser,
    href: "/dashboard/profile",
  },

  {
    title: "Support",
    icon: MdOutlineSupportAgent,
    href: "/dashboard/support",
  },
];

export default function MobileSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className=" flex h-16 items-center justify-between border-b border-white/10 bg-[#0b0b0d]/95 px-5 backdrop-blur lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-white/10 p-2 text-white transition hover:bg-white/10"
        >
          <HiMenuAlt3 size={24} />
        </button>

        <h1 className="font-black tracking-[0.18em] text-white">
          EVERY
          <span className="text-red-500">DAY</span>
          WEAR
        </h1>

        <div className="h-10 w-10 rounded-xl bg-red-500 text-white  flex items-center justify-center">
          <FaUserGear />
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-222 bg-black/60 backdrop-blur-sm transition duration-300 lg:hidden

        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <aside
        className={`fixed top-0 left-0 z-223 h-screen pb-10 w-72 bg-white transition-transform duration-300 lg:hidden

        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-black/40 p-6">
          <div>
            <h2 className="font-black tracking-[0.18em] text-black">
              EVERY
              <span className="text-red-500">DAY</span>
              WEAR
            </h2>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-xl p-2 text-black hover:bg-white/10"
          >
            <HiX size={24} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-140px)] px-4 py-5 space-y-2">
          {menu.map((item) => {
            const active = pathname === item.href.split("?")[0];
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 rounded-2xl px-4 py-3 transition

                ${
                  active
                    ? "bg-red-500 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }
                `}
              >
                <Icon className="text-xl" />

                <span>{item.title}</span>
              </Link>
            );
          })}

          <div className="my-4 border-t border-black/10" />

          <Link
            href="/"
            className="flex items-center gap-4 rounded-2xl px-4 py-3 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            <FaHome className="text-lg" />
            Home
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#111111] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600">
              <FaUserGear />
            </div>

            <div>
              <h4 className="font-semibold text-white">
                {session?.user?.name || "customer"}
              </h4>

              <p className="text-sm text-zinc-400">{session?.user?.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
