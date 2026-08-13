"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { HiMenuAlt3, HiX } from "react-icons/hi";

import {
  MdDashboard,
  MdOutlineShoppingBag,
  MdOutlineAnalytics,
} from "react-icons/md";

import { FaBoxes, FaUsers, FaHome } from "react-icons/fa";

import { IoIosAddCircle } from "react-icons/io";

import { BsPersonSquare } from "react-icons/bs";

import { FaRegCreditCard, FaUserGear } from "react-icons/fa6";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard/admin/home",
    icon: MdDashboard,
  },
  {
    title: "Orders",
    href: "/dashboard/admin/orders?status=all",
    icon: MdOutlineShoppingBag,
  },
  {
    title: "Products",
    href: "/dashboard/admin/product?categories=all&subcategories=all&item=all&status=all&sortBy=random",
    icon: FaBoxes,
  },
  {
    title: "Orders History",
    href: "/dashboard/admin/ordersHistory?status=all",
    icon: FaRegCreditCard,
  },
  {
    title: "Customers",
    href: "/dashboard/admin/customer?status=all",
    icon: FaUsers,
  },
  {
    title: "Add Product",
    href: "/dashboard/admin/productManagement",
    icon: IoIosAddCircle,
  },
  {
    title: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: MdOutlineAnalytics,
  },
];

export default function DashboardMobileMenu() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0b0b0d]/95 px-5 backdrop-blur lg:hidden">
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

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600">
          <FaUserGear />
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-222 bg-black/60 backdrop-blur-sm transition duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      />

      <aside
        className={`fixed top-0 left-0 z-223 h-screen w-72 bg-[#0b0b0d] pb-10 transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="font-black tracking-[0.18em] text-white">
              EVERY
              <span className="text-red-500">DAY</span>
              WEAR
            </h2>

            <p className="mt-1 text-xs tracking-[0.3em] text-red-500 uppercase">
              Admin
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-xl p-2 text-white hover:bg-white/10"
          >
            <HiX size={24} />
          </button>
        </div>

        <div className="h-[calc(100%-140px)] space-y-2 overflow-y-auto px-4 py-5">
          {menu.map((item) => {
            const active = pathname === item.href.split("?")[0];
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 rounded-2xl px-4 py-3 transition ${
                  active
                    ? "bg-red-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                } `}
              >
                <Icon className="text-xl" />

                <span>{item.title}</span>
              </Link>
            );
          })}

          <div className="my-4 border-t border-white/10" />

          <Link
            href="/dashboard/admin/profile"
            className="flex items-center gap-4 rounded-2xl px-4 py-3 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            <BsPersonSquare className="text-xl" />
            Profile
          </Link>

          <Link
            href="/"
            className="flex items-center gap-4 rounded-2xl px-4 py-3 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            <FaHome className="text-lg" />
            Home
          </Link>
        </div>

        <div className="absolute right-0 bottom-0 left-0 border-t border-white/10 bg-[#111111] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600">
              <FaUserGear />
            </div>

            <div>
              <h4 className="font-semibold text-white">
                {session?.user?.name || "Administrator"}
              </h4>

              <p className="text-sm text-zinc-400">{session?.user?.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
