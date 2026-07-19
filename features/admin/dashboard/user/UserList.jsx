import React from 'react'

function UserList() {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
      {/* Table Header */}

      <div className="flex flex-col gap-4 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold text-white">All Customers</h2>

        <input
          type="text"
          placeholder="Search..."
          className="
          w-full
          rounded-lg
          border
          border-white/10
          bg-zinc-800
          px-4
          py-2.5
          text-sm
          text-white
          placeholder:text-zinc-500
          outline-none
          transition
          md:w-56
          focus:border-yellow-600
        "
        />
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-zinc-800">
            <tr>
              {[
                "Customer",
                "Email",
                "Spent",
                "Orders",
                "Member Since",
                "Status",
                "Action",
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
                name: "Olivia Brown",
                email: "olivia@example.com",
                spent: "$2,480",
                orders: 18,
                joined: "Jan 2024",
                status: "Active",
              },
              {
                name: "James Wilson",
                email: "james@example.com",
                spent: "$1,720",
                orders: 12,
                joined: "Mar 2024",
                status: "Active",
              },
              {
                name: "Emma Watson",
                email: "emma@example.com",
                spent: "$620",
                orders: 5,
                joined: "Jun 2025",
                status: "Inactive",
              },
              {
                name: "Sophia Lee",
                email: "sophia@example.com",
                spent: "$4,150",
                orders: 28,
                joined: "Nov 2023",
                status: "VIP",
              },
            ].map((customer) => (
              <tr
                key={customer.email}
                className="
                border-b
                border-white/10
                transition
                hover:bg-zinc-800/70
              "
              >
                {/* Customer */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-700 font-semibold text-black">
                      {customer.name.charAt(0)}
                    </div>

                    <span className="font-medium text-white">
                      {customer.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5 text-zinc-300">{customer.email}</td>

                <td className="px-6 py-5 font-semibold text-white">
                  {customer.spent}
                </td>

                <td className="px-6 py-5 text-zinc-300">{customer.orders}</td>

                <td className="px-6 py-5 text-zinc-400">{customer.joined}</td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      customer.status === "VIP"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : customer.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <button className="rounded bg-sky-500/10 px-3 py-2 text-xs font-medium text-sky-400 transition hover:bg-sky-500/20">
                      View
                    </button>

                    <button className="rounded bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/20">
                      Remove
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

export default UserList
