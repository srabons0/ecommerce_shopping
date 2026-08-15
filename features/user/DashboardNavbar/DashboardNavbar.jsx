"use client";
import Cart from "@/features/cart/Cart";
import { AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";

export default function DashboardNavbar({ path, name, desc }) {
  const [openCart, setOpenCart] = useState(false);
  const { data: session } = useSession();
  return (
    <div className="overflow-x-hidden">
      <header className="relative z-30 items-center justify-between border-b border-gray-200 bg-white px-8 py-5 backdrop-blur-xl lg:flex lg:pl-20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-800">
            <span>Dashboard</span>
            <ChevronRight size={15} />
            <span className="font-medium text-gray-500"> {path}</span>
          </div>

          <div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-800">
              {name}
            </h1>

            <p className="mt-1 text-sm text-gray-500">{desc}</p>
          </div>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div
            onClick={() => setOpenCart(true)}
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white hover:bg-gray-50"
          >
            <IoBagHandleSharp size={19} />
          </div>

          <Link
            href={"/dashboard/profile"}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white hover:bg-gray-50"
          >
            <FaRegUser size={19} />
          </Link>

          <button
            aria-label="profile"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50"
          >
            {session?.user?.image ? (
              <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={100}
                height={100}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <BsPersonCircle className="h-10 w-10" />
            )}
            <div className="text-left">
              <h3 className="text-sm font-semibold text-gray-900">
                {session?.user?.name}
              </h3>
            </div>
          </button>
        </div>
      </header>
      <AnimatePresence mode="wait">
        {openCart && <Cart setOpenCart={setOpenCart} />}
      </AnimatePresence>
    </div>
  );
}
