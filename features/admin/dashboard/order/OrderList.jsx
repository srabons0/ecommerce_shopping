import React from 'react'

function OrderList() {
  return (
    <div className="mt-6 overflow-hidden rounded border border-white/10 bg-zinc-900">
      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-white/10 p-6 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-lg font-semibold text-white">All Orders</h2>

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search orders..."
            className="
            w-48
            rounded
            border
            border-white/10
            bg-zinc-800
            px-4
            py-2
            text-sm
            text-white
            placeholder:text-zinc-500
            outline-none
            focus:border-yellow-700
          "
          />

          <select
            className="
            w-40
            rounded
            border
            border-white/10
            bg-zinc-800
            px-4
            py-2
            text-sm
            text-white
            outline-none
            focus:border-yellow-700
          "
          >
            <option>All Status</option>
            <option>Delivered</option>
            <option>In Transit</option>
            <option>Processing</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-zinc-800">
              {[
                "Order ID",
                "Customer",
                "Product",
                "Amount",
                "Status",
                "Date",
                "Actions",
              ].map((item) => (
                <th
                  key={item}
                  className="
                  px-6
                  py-4
                  text-left
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-zinc-500
                "
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[
              {
                id: "#LX1001",
                customer: "John Doe",
                product: "Luxury Blazer",
                amount: "$180",
                status: "Delivered",
                date: "12 Mar",
              },
              {
                id: "#LX1002",
                customer: "Emma Watson",
                product: "Classic Coat",
                amount: "$250",
                status: "Processing",
                date: "13 Mar",
              },
              {
                id: "#LX1003",
                customer: "James Smith",
                product: "Premium Shirt",
                amount: "$95",
                status: "In Transit",
                date: "14 Mar",
              },
              {
                id: "#LX1004",
                customer: "Sophia Lee",
                product: "Casual Jacket",
                amount: "$150",
                status: "Cancelled",
                date: "15 Mar",
              },
            ].map((order) => (
              <tr
                key={order.id}
                className="border-b border-white/10 hover:bg-zinc-800"
              >
                <td className="px-6 py-5 font-medium text-white">{order.id}</td>

                <td className="px-6 py-5 text-zinc-300">{order.customer}</td>

                <td className="px-6 py-5 text-zinc-300">{order.product}</td>

                <td className="px-6 py-5 font-semibold text-white">
                  {order.amount}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                    ${
                      order.status === "Delivered"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : order.status === "Processing"
                          ? "bg-blue-500/10 text-blue-400"
                          : order.status === "In Transit"
                            ? "bg-orange-500/10 text-orange-400"
                            : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-zinc-400">{order.date}</td>

                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <button className="rounded bg-blue-500/10 px-3 py-2 text-xs text-blue-400 hover:bg-blue-500/20">
                      View
                    </button>

                    <button className="rounded bg-red-500/10 px-3 py-2 text-xs text-red-400 hover:bg-red-500/20">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList
