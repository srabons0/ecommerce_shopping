import React from "react";
import RecentOrder from "./RecentOrder";
import CategoryChart from "./CategoryChart";
import RevenueChart from "./RevenueChart";

function DashboardHome() {
  return (
    <div className="mb-20">
      <div className="flex-1  mx-6 py-8">
        {/* Dashboard */}
        <section>


          {/* Stats */}
          <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
            {/* Revenue */}

            <div className="rounded border border-white/10 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-yellow-700/30">
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">$48,294</h2>

                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Revenue (Month)
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex h-11 w-11 items-center justify-center rounded bg-yellow-700/10 text-lg">
                    💰
                  </div>

                  <p className="mt-2 text-[10px] text-zinc-500">Mar 2025</p>
                </div>
              </div>


              <p className="mt-3 text-sm font-medium text-emerald-500">
                ↑ 12.5% vs Feb
              </p>
            </div>

            {/* Orders */}

            <div className="rounded border border-white/10 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/30">
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">324</h2>

                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    New Orders
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex h-11 w-11 items-center justify-center rounded bg-blue-500/10 text-lg">
                    📦
                  </div>

                  <p className="mt-2 text-[10px] text-zinc-500">This Month</p>
                </div>
              </div>


              <p className="mt-3 text-sm font-medium text-emerald-500">
                ↑ 8.3%
              </p>
            </div>

            {/* Customers */}

            <div className="rounded border border-white/10 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-emerald-500/30">
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">1,429</h2>

                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    New Customers
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex h-11 w-11 items-center justify-center rounded bg-emerald-500/10 text-lg">
                    👥
                  </div>

                  <p className="mt-2 text-[10px] text-zinc-500">This Month</p>
                </div>
              </div>



              <p className="mt-3 text-sm font-medium text-red-500">↓ 2.1%</p>
            </div>

            {/* Rating */}

            <div className="rounded border border-white/10 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-yellow-700/30">
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">4.8★</h2>

                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Avg Rating
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex h-11 w-11 items-center justify-center rounded bg-yellow-700/10 text-lg">
                    ⭐
                  </div>

                  <p className="mt-2 text-[10px] text-zinc-500">All Time</p>
                </div>
              </div>

            
              <p className="mt-3 text-sm font-medium text-emerald-500">
                ↑ 0.2 this quarter
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Charts */}
      <div className="mt-6 grid gap-4 mx-6 lg:grid-cols-[2fr_1fr]">
        <RevenueChart></RevenueChart>
        <CategoryChart></CategoryChart>
      </div>

      <RecentOrder></RecentOrder>
    </div>
  );
}

export default DashboardHome;
