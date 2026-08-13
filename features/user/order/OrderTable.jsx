import Link from "next/link";
import React from "react";
import { FiChevronLeft, FiChevronRight, FiEye } from "react-icons/fi";
import OrderStatusBadge from "./OrderStatusBadge";
import Image from "next/image";

function OrderTable() {
  return (
    <div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr className="text-left text-sm text-zinc-500">
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
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-zinc-100 transition hover:bg-zinc-50"
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
                      <h3 className="font-semibold text-zinc-900">
                        {order.product}
                      </h3>

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
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.payment === "Paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.payment}
                  </span>
                </td>

                <td className="px-6">
                  <OrderStatusBadge status={order.status} />
                </td>

                <td className="px-6 text-right">
                  <span className="font-bold text-zinc-900">
                    ${order.total}
                  </span>
                </td>

                <td className="px-6">
                  <div className="flex justify-center">
                    <Link
                      href={`/dashboard/orders/${order.id.replace("#", "")}`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 transition hover:bg-violet-600 hover:text-white"
                    >
                      <FiEye />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ;
      <div className="space-y-4 p-4 lg:hidden">
        {currentOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <div className="flex gap-4">
              <Image
                src={order.image}
                alt={order.product}
                width={90}
                height={90}
                className="rounded-xl border object-cover"
              />

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-zinc-900">
                    {order.product}
                  </h3>

                  <span className="font-bold">${order.total}</span>
                </div>

                <p className="mt-1 text-sm text-zinc-500">{order.id}</p>

                <p className="mt-1 text-sm text-zinc-500">{order.date}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <OrderStatusBadge status={order.status} />

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.payment === "Paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.payment}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-zinc-500">
                    Qty: {order.quantity}
                  </span>

                  <Link
                    href={`/dashboard/orders/${order.id.replace("#", "")}`}
                    className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-200 px-6 py-5 sm:flex-row">
          <p className="text-sm text-zinc-500">
            Showing{" "}
            <span className="font-semibold">{(page - 1) * PER_PAGE + 1}</span> -
            <span className="font-semibold">
              {" "}
              {Math.min(page * PER_PAGE, filteredOrders.length)}
            </span>{" "}
            of <span className="font-semibold">{filteredOrders.length}</span>{" "}
            orders
          </p>

          <div className="flex items-center gap-2">
            
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiChevronLeft />
            </button>

            
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`h-10 w-10 rounded-xl font-medium transition ${
                  page === index + 1
                    ? "bg-violet-600 text-white"
                    : "border border-zinc-200 hover:bg-zinc-100"
                } `}
              >
                {index + 1}
              </button>
            ))}

            
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderTable;
