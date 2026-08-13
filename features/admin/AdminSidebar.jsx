"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

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

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="fixed top-0 left-0 z-50 hidden h-screen w-72 overflow-hidden border-r border-white/10 bg-[#0b0b0d] text-white shadow-2xl lg:block">
      <div className="border-b border-white/10 px-7 py-7">
        <h1 className="text-xl font-black tracking-[0.18em]">
          EVERY
          <span className="text-red-500">DAY</span>
          WEAR
        </h1>

        <p className="mt-2 text-[11px] tracking-[0.35em] text-red-500/90 uppercase">
          Admin Dashboard
        </p>
      </div>

      <div className="h-[calc(100%-170px)] overflow-y-auto px-4 py-5 pb-10">
        <p className="mb-4 px-3 text-xs tracking-[0.25em] text-zinc-500 uppercase">
          Navigation
        </p>

        <div className="space-y-2">
          {menu.map((item) => {
            const active = pathname === item.href.split("?")[0];

            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group flex items-center gap-4 rounded-2xl px-4 py-3 duration-300 ${
                  active
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                } `}
              >
                <Icon
                  className={`text-xl transition ${active ? "scale-110" : "group-hover:translate-x-1"} `}
                />

                <span className="font-medium tracking-wide">{item.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="mb-4 px-3 text-xs tracking-[0.25em] text-zinc-500 uppercase">
            General
          </p>

          <div className="space-y-2">
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
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 border-t border-white/10 bg-[#101014] p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-xl">
            <FaUserGear />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold">
              {session?.user?.name || "Administrator"}
            </h3>

            <p className="truncate text-sm text-zinc-400">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
