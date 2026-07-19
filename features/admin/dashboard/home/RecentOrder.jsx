import React from "react";

function RecentOrder() {
  return (
    <div className="mt-6 mx-6 overflow-hidden rounded border border-white/10 bg-zinc-900">
      <div className="flex flex-col gap-4 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
        <h3 className="text-lg font-semibold text-white">Recent Orders</h3>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Filter..."
            className="
          w-44
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
          transition
          focus:border-yellow-700
        "
          />

          <button
            className="
          rounded
          border
          border-white/10
          px-4
          py-2
          text-xs
          uppercase
          tracking-widest
          text-zinc-400
          transition
          hover:border-yellow-700
          hover:text-yellow-500
        "
          >
            View All →
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-zinc-800">
              {[
                "Order",
                "Customer",
                "Items",
                "Total",
                "Status",
                "Date",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
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
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[
              {
                id: "#LX-1001",
                customer: "Olivia Brown",
                items: 3,
                total: "$289",
                status: "Delivered",
                date: "12 Mar",
              },
              {
                id: "#LX-1002",
                customer: "James Wilson",
                items: 1,
                total: "$129",
                status: "Processing",
                date: "13 Mar",
              },
              {
                id: "#LX-1003",
                customer: "Sophia Lee",
                items: 5,
                total: "$654",
                status: "Transit",
                date: "14 Mar",
              },
              {
                id: "#LX-1004",
                customer: "Emma Taylor",
                items: 2,
                total: "$180",
                status: "Cancelled",
                date: "15 Mar",
              },
            ].map((order) => (
              <tr
                key={order.id}
                className="
              border-b
              border-white/10
              transition
              hover:bg-zinc-800
            "
              >
                <td className="px-6 py-5 font-medium text-white">{order.id}</td>

                <td className="px-6 py-5 text-zinc-300">{order.customer}</td>

                <td className="px-6 py-5 text-zinc-300">{order.items}</td>

                <td className="px-6 py-5 font-semibold text-white">
                  {order.total}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`
                  inline-flex
                  items-center
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-semibold

                  ${
                    order.status === "Delivered"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : order.status === "Processing"
                        ? "bg-blue-500/10 text-blue-400"
                        : order.status === "Transit"
                          ? "bg-orange-500/10 text-orange-400"
                          : "bg-red-500/10 text-red-400"
                  }
                `}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-zinc-400">{order.date}</td>

                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <button
                      className="
                    rounded
                    bg-blue-500/10
                    px-3
                    py-2
                    text-xs
                    text-blue-400
                    transition
                    hover:bg-blue-500/20
                  "
                    >
                      Edit
                    </button>

                    <button
                      className="
                    rounded
                    bg-red-500/10
                    px-3
                    py-2
                    text-xs
                    text-red-400
                    transition
                    hover:bg-red-500/20
                  "
                    >
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

export default RecentOrder;
