"use client"
import Link from 'next/link';
import React from 'react'
import { MdDashboard } from "react-icons/md";
import { IoBagHandleSharp } from "react-icons/io5";
import { FaBoxes } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { BsGraphDown } from "react-icons/bs";
import { FaUserGear } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

function AdminSidebar() {
  return (
    <aside
      className="sidebar fixed left-0 top-0 bottom-0 z-[200] flex w-65 flex-col border-r border-white/10 bg-[#000000]"
      id="sidebar"
    >
      <div className="sidebar-logo border-b border-white/10 px-6 pt-7 pb-5 font-['Cormorant_Garamond'] text-[26px] font-light text-white tracking-[0.15em]">
        L<em className="not-italic text-[#ff1717]">U</em>XE
        <div
          className="sidebar-logo-sub mt-1 text-[9px] uppercase tracking-[0.3em]
         text-[#f44d4d]"
        >
          Admin Panel
        </div>
      </div>

      <nav className="nav-group flex-1 overflow-y-auto px-3 pt-4 pb-2 ">
        <Link
          href={"/dashboard/admin/home"}
          className="nav-item mb-px flex cursor-pointer items-center gap-2 rounded px-3 py-2.5  text-[#6e6e7e] transition hover:bg-white/5 hover:text-white/80"
          onClick={() => showPanel("dashboard")}
        >
          <MdDashboard />
          Dashboard
        </Link>

        <Link
          href={"/dashboard/admin/orders"}
          className="nav-item mb-px flex cursor-pointer items-center gap-2 rounded px-3 py-2.5  text-[#6e6e7e] transition hover:bg-white/5 hover:text-white/80"
          onClick={() => showPanel("orders")}
        >
          <IoBagHandleSharp />
          Orders
        </Link>

        <Link
          href={{
            pathname: "/dashboard/admin/product",
            query: {
              categories: "all",
              subcategories: "all",
              item: "all",
              status:"all",
              sortBy: "random",
            },
          }}
          className="nav-item mb-px flex cursor-pointer items-center gap-2 rounded px-3 py-2.5  text-[#6e6e7e] transition hover:bg-white/5 hover:text-white/80"
          onClick={() => showPanel("products")}
        >
          <FaBoxes />
          Products
        </Link>
        <Link
          href={"/dashboard/admin/payment"}
          className="nav-item mb-px flex cursor-pointer items-center gap-2 rounded px-3 py-2.5  text-[#6e6e7e] transition hover:bg-white/5 hover:text-white/80"
          onClick={() => showPanel("products")}
        >
          <FaRegCreditCard />
          Payments
        </Link>

        <Link
          href={"/dashboard/admin/user"}
          className="nav-item mb-px flex cursor-pointer items-center gap-2 rounded px-3 py-2.5  text-[#6e6e7e] transition hover:bg-white/5 hover:text-white/80"
          onClick={() => showPanel("customers")}
        >
          <FaUsers />
          Customers
        </Link>

        <Link
          href={"/"}
          className="nav-item mb-px flex cursor-pointer items-center gap-2 rounded px-3 py-2.5  text-[#6e6e7e] transition hover:bg-white/5 hover:text-white/80"
          onClick={() => showPanel("blog")}
        >
          {/* SVG */}
          Blog Posts
        </Link>

        <Link
          href={"/"}
          className="nav-item mb-px flex cursor-pointer items-center gap-2 rounded px-3 py-2.5  text-[#6e6e7e] transition hover:bg-white/5 hover:text-white/80"
          onClick={() => showPanel("promos")}
        >
          {/* SVG */}
          Promotions
        </Link>

        <Link
          href={"/dashboard/admin/analytics"}
          className="nav-item mb-px flex cursor-pointer items-center gap-2 rounded px-3 py-2.5  text-[#6e6e7e] transition hover:bg-white/5 hover:text-white/80"
          onClick={() => showPanel("analytics")}
        >
          <BsGraphDown /> Analytics
        </Link>

        <Link
          href={"/dashboard/admin/setting"}
          className="nav-item mb-px flex cursor-pointer items-center gap-2 rounded px-3 py-2.5  text-[#6e6e7e] transition hover:bg-white/5 hover:text-white/80"
          onClick={() => showPanel("settings")}
        >
          <IoMdSettings /> Settings
        </Link>

        <Link
          href="/login"
          className="nav-item mb-px flex items-center gap-2 rounded px-3 py-2.5  text-[#6e6e7e] transition hover:bg-white/5 hover:text-white/80"
        >
          <MdLogout />
          Logout
        </Link>
      </nav>

      <div className="sidebar-user flex items-center gap-2.5 border-t border-white/10 px-5 py-4">
        <div className="sidebar-avatar flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#b8953a]  font-bold text-[#0c0c0f]">
          <FaUserGear />
        </div>

        <div>
          <div className="sidebar-user-name text-xs font-semibold text-white">
            Profile
          </div>

          <div className="sidebar-user-role text-[10px] text-[#6e6e7e]">
            Super Admin
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar
