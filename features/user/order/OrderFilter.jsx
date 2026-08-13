"use client";

import { FiSearch, FiFilter } from "react-icons/fi";

const statusOptions = [
  "All",
  "Delivered",
  "Shipping",
  "Processing",
  "Cancelled",
];

export default function OrderFilter({ search, setSearch, status, setStatus }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-zinc-400" />

          <input
            type="text"
            placeholder="Search order ID or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pr-4 pl-12 transition outline-none focus:border-violet-500 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4">
            <FiFilter className="text-zinc-500" />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-transparent py-3 text-sm font-medium outline-none"
            >
              {statusOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              setSearch("");
              setStatus("All");
            }}
            className="rounded-2xl border border-zinc-200 px-5 py-3 font-medium transition hover:bg-zinc-100"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
