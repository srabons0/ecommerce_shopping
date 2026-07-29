import React from "react";
import RecentOrder from "./RecentOrder";
import CategoryChart from "./CategoryChart";
import RevenueChart from "./RevenueChart";

function DashboardHome({
  productRating,
  totalRevenue,
  order,
  orderCount,
  userCount,
  categoryStats,
  monthlyRevenue,
}) {
  return (
    <div className="pb-20 px-10  bg-zinc-100 ">
      <div className="flex-1  py-8">
        <section>
          <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
            <div className="rounded border border-white/10 bg-white p-6 transition hover:-translate-y-1 hover:border-yellow-700/30">
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-black">
                    ${totalRevenue[0].totalPrice}
                  </h2>

                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Revenue (Month)
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex h-11 w-11 items-center justify-center rounded bg-yellow-700/10 text-lg">
                    💰
                  </div>

                  <p className="mt-2 text-[10px] text-zinc-500">Year 2026</p>
                </div>
              </div>

              <p className="mt-3 text-sm font-medium text-emerald-500">
                ↑ 12.5%
              </p>
            </div>

            <div className="rounded border border-white/10 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-500/30">
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-black">
                    {orderCount}
                  </h2>

                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Orders
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex h-11 w-11 items-center justify-center rounded bg-blue-500/10 text-lg">
                    📦
                  </div>

                  <p className="mt-2 text-[10px] text-zinc-500">This Year</p>
                </div>
              </div>

              <p className="mt-3 text-sm font-medium text-emerald-500">
                ↑ 8.3%
              </p>
            </div>

            <div className="rounded border border-white/10 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-500/30">
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-black">{userCount}</h2>

                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Customers
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex h-11 w-11 items-center justify-center rounded bg-emerald-500/10 text-lg">
                    👥
                  </div>

                  <p className="mt-2 text-[10px] text-zinc-500">This Year</p>
                </div>
              </div>

              <p className="mt-3 text-sm font-medium text-red-500">↓ 2.1%</p>
            </div>

            <div className="rounded border border-white/10 bg-white p-6 transition hover:-translate-y-1 hover:border-yellow-700/30">
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-black">
                    {productRating[0].averageRating.toFixed(2)}★
                  </h2>

                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Avg Rating of All Products
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


        <RevenueChart monthlyRevenue={monthlyRevenue}></RevenueChart>
        <CategoryChart categoryStats={categoryStats}></CategoryChart>

      <RecentOrder order={order}></RecentOrder>
    </div>
  );
}

export default DashboardHome;
