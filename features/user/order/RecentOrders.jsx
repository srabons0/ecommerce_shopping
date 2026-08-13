"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiEye, FiPackage } from "react-icons/fi";

const orders = [
  {
    id: "#ORD-1001",
    product: "Premium Hoodie",
    image: "/products/product-1.jpg",
    date: "06 Aug 2026",
    quantity: 2,
    total: 89,
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "#ORD-1002",
    product: "Running Shoes",
    image: "/products/product-2.jpg",
    date: "05 Aug 2026",
    quantity: 1,
    total: 120,
    payment: "Paid",
    status: "Shipping",
  },
  {
    id: "#ORD-1003",
    product: "Oversized T-Shirt",
    image: "/products/product-3.jpg",
    date: "03 Aug 2026",
    quantity: 3,
    total: 74,
    payment: "Pending",
    status: "Processing",
  },
  {
    id: "#ORD-1004",
    product: "Cargo Pant",
    image: "/products/product-4.jpg",
    date: "01 Aug 2026",
    quantity: 1,
    total: 59,
    payment: "Paid",
    status: "Cancelled",
  },
];

const statusClasses = {
  Delivered: "bg-green-100 text-green-700",
  Shipping: "bg-blue-100 text-blue-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const paymentClasses = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-orange-100 text-orange-700",
};

export default function RecentOrders() {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
      
      <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Recent Orders</h2>

          <p className="mt-1 text-sm text-zinc-500">Your latest purchases</p>
        </div>

        <Link
          href="/dashboard/orders"
          className="flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold transition hover:bg-zinc-100"
        >
          View All
          <FiArrowRight />
        </Link>
      </div>


      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100 text-left text-sm text-zinc-500">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Qty</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Total</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-zinc-100 transition hover:bg-zinc-50"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <Image
                      src={order.image}
                      alt={order.product}
                      width={60}
                      height={60}
                      className="rounded-xl border object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">{order.product}</h3>

                      <p className="text-sm text-zinc-500">
                        Fashion Collection
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 font-medium">{order.id}</td>

                <td className="px-6">{order.date}</td>

                <td className="px-6">{order.quantity}</td>

                <td className="px-6">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      paymentClasses[order.payment]
                    }`}
                  >
                    {order.payment}
                  </span>
                </td>

                <td className="px-6">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusClasses[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 text-right font-bold">${order.total}</td>

                <td className="px-6 text-center">
                  <button className="rounded-xl p-3 transition hover:bg-violet-100">
                    <FiEye className="text-lg text-violet-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="space-y-4 p-4 lg:hidden">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-zinc-200 p-4"
          >
            <div className="flex items-start gap-4">
              <Image
                src={order.image}
                alt={order.product}
                width={70}
                height={70}
                className="rounded-xl border object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{order.product}</h3>

                <p className="text-sm text-zinc-500">{order.id}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusClasses[order.status]
                    }`}
                  >
                    {order.status}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      paymentClasses[order.payment]
                    }`}
                  >
                    {order.payment}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold">${order.total}</span>

                  <button className="rounded-xl bg-violet-600 p-3 text-white">
                    <FiEye />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="flex items-center justify-between border-t border-zinc-100 px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <FiPackage />
          Showing latest {orders.length} orders
        </div>

        <Link
          href="/dashboard/orders"
          className="font-semibold text-violet-600 hover:text-violet-700"
        >
          View Order History
        </Link>
      </div>
    </div>
  );
}
