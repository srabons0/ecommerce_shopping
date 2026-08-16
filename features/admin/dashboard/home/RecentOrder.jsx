import Link from "next/link";
import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";

function RecentOrder({ order }) {
  return (
    <div className="mx-6 mt-6 overflow-hidden rounded border border-white/10 bg-zinc-100 text-black">
      <div className="flex  gap-4 border-b border-white/10 p-6 items-center justify-between">
        <h3 className="text-lg font-semibold text-black">Recent Orders</h3>

        <div className="flex gap-3">
          <Link
            href={{
              pathname: "/dashboard/admin/orders",
              query: {
                status: "all",
              },
            }}
            className="rounded border border-white/10 px-4 py-2 text-xs tracking-widest text-zinc-500 uppercase transition hover:border-red-700 hover:text-red-500"
          >
            View All →
          </Link>
        </div>
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-zinc-200">
              {[
                "Order ID",
                "Customer",
                "Quantity",
                "Amount",
                "Status",
                "Method",
                "Date",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-4 text-left text-[11px] font-semibold tracking-[0.18em] text-zinc-500 uppercase"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {order.map((order,i) => (
              <tr key={i} className="border-b border-white/10">
                <td className="px-6 py-5 font-medium text-gray-500">
                  {order.orderNumber}
                </td>

                <td className="px-6 py-5 text-zinc-500">
                  {order.shipping.fullName}
                </td>

                <td className="px-6 py-5 text-zinc-500">
                  {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                </td>

                <td className="px-6 py-5 font-semibold text-black">
                  ${order.total}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.orderStatus === "Delivered"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : order.orderStatus === "Processing"
                          ? "bg-blue-500/10 text-blue-400"
                          : order.orderStatus === "pending"
                            ? "bg-orange-500/10 text-orange-400"
                            : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.paymentMethod === "stripe"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : order.paymentMethod === "cod"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {order.paymentMethod}
                  </span>
                </td>
                <td className="px-6 py-5 text-zinc-400">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="py-5 pl-7">
                  <div className="flex gap-2">
                    <button
                      aria-label="Open dialog"
                      className="rounded bg-white px-3 py-2 text-xs font-semibold text-black/60 transition hover:bg-black/10"
                    >
                      <FaEye className="h-4 w-4" />
                    </button>

                    <button
                      aria-label="delete"
                      className="rounded bg-red-500/10 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-500/20"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-4 p-4 lg:hidden">
        {order.map((order,i) => {

          return (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-semibold text-zinc-900">
                      {order.shipping.fullName}
                    </h3>

                    <p className="text-xs text-zinc-500">
                      #{order.orderNumber}
                    </p>
                  </div>
                </div>

                <span className="text-lg font-bold">
                  ${Number(order.total).toFixed(2)}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-zinc-400">Items</p>
                  <p className="font-semibold">
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-400">Payment</p>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.paymentMethod === "stripe"
                        ? "bg-emerald-100 text-emerald-700"
                        : order.paymentMethod === "cod"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.paymentMethod}
                  </span>
                </div>

                <div className="col-span-2">
                  <p className="mb-2 text-zinc-400">Status</p>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold `}
                  >

                    {order.orderStatus}
                  </span>
                </div>

                <div className="col-span-2">
                  <p className="text-zinc-400">Order Date</p>

                  <p className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>


            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentOrder;
