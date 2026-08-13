"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import {
  MdDashboard,
  MdHistory,
  MdOutlineFavoriteBorder,
  MdOutlineSupportAgent,
} from "react-icons/md";

import { FaBoxOpen, FaHome, FaRegUser } from "react-icons/fa";

import { useSession } from "next-auth/react";
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
    title: "Order history",
    icon: MdHistory,
    href: "/dashboard/orderHistory",
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

export default function Sidebar({ pathname }) {
  const activePath = useMemo(() => pathname || "", [pathname]);

  const { data: session } = useSession();
  return (
    <div className="flex h-full flex-col border-r border-zinc-200 bg-white">
      <div className="flex h-20 items-center gap-3 border-b border-zinc-200 px-6">
        <Image
          src="/logo.png"
          alt="Logo"
          width={42}
          height={42}
          className="rounded-xl"
        />

        <div>
          <h2 className="text-lg font-bold text-zinc-900">Everyday Wear</h2>

          <p className="text-xs text-zinc-500">User Dashboard</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-2 px-4">
          {menu.map((item) => {
            const active = activePath.includes(item.href);

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                  active
                    ? "bg-red-500 text-white shadow-lg"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <item.icon
                  className={`text-xl ${
                    active
                      ? "text-white"
                      : "text-zinc-500 group-hover:text-red-500"
                  }`}
                />

                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
          <Link
            href={"/"}
            className={`group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900`}
          >
            <FaHome
              className={`text-xl text-zinc-500 group-hover:text-red-500`}
            />

            <span className="font-medium">Home</span>
          </Link>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-black/10 bg-[#ffffff] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center text-white rounded-2xl bg-red-500">
            <FaUserGear />
          </div>

          <div>
            <h4 className="font-semibold text-black uppercase">
              {session?.user?.name || "Customer"}
            </h4>

            <p className="text-sm text-zinc-400">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
