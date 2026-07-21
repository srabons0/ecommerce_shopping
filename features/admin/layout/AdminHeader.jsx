"use client";
import { ChevronRight } from "lucide-react";
import { Settings } from "lucide-react";
import { Command } from "lucide-react";
import { Bell, MessageSquare, Menu, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";



// export const pageInfo = {
//   dashboard: {
//     title: "Dashboard",
//     description:
//       "Monitor sales, orders, revenue, and store performance in real time.",
//   },

//   products: {
//     title: "Product Management",
//     description: "Create, update, organize, and manage your product catalog.",
//   },

//   categories: {
//     title: "Categories",
//     description: "Organize products into categories for easier navigation.",
//   },

//   orders: {
//     title: "Order Management",
//     description: "Track customer orders, payments, and fulfillment status.",
//   },

//   customers: {
//     title: "Customer Management",
//     description:
//       "View customer profiles, purchase history, and account activity.",
//   },

//   reviews: {
//     title: "Customer Reviews",
//     description:
//       "Monitor ratings, moderate reviews, and improve customer trust.",
//   },

//   inventory: {
//     title: "Inventory",
//     description: "Track stock levels and manage product availability.",
//   },

//   analytics: {
//     title: "Analytics",
//     description: "Gain insights into sales, traffic, and customer behavior.",
//   },

//   settings: {
//     title: "Settings",
//     description: "Configure your store, users, security, and preferences.",
//   },
// };



export default function AdminHeader({path, name, desc}) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <header className="relative  z-30 flex py-5 items-center justify-between border-b border-gray-200 bg-black px-8 backdrop-blur-xl">
      {/* Left */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Dashboard</span>
          <ChevronRight size={15} />
          <span className="font-medium text-gray-100"> {path}</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-100">
          {name}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {desc}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}

        {/* Notifications */}
        <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white hover:bg-gray-50">
          <Bell size={19} />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Settings */}
        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white hover:bg-gray-50">
          <Settings size={19} />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50">
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt=""
              width={100}
              height={100}
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <BsPersonCircle className="h-10 w-10 " />
          )}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-gray-900">
              {session?.user?.name}
            </h3>
          </div>
        </button>
      </div>
    </header>
  );
}
