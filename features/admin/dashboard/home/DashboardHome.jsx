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
    <div className="pb-20 lg:px-10  bg-zinc-100 ">
      <div className="flex-1 py-8  px-5">
        <section>
          <div className="grid gap-2 lg:gap-4 lg:grid-cols-4 grid-cols-2">
            <div className="rounded border border-white/10 bg-white p-6 transition hover:-translate-y-1 hover:border-yellow-700/30">
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="lg:text-3xl text-xl font-bold text-black">
                    ${totalRevenue[0]?.totalPrice ? totalRevenue[0].totalPrice.toFixed(2) : 0.00}
                  </h2>

                  <p className="mt-1 text-[8px] lg:text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Revenue (Month)
                  </p>
                </div>

                <div className="text-right hidden lg:block">
                  <div className="flex h-11 w-11 items-center justify-center rounded bg-yellow-700/10 text-lg">
                    💰
                  </div>

                  <p className="mt-2 text-[10px] text-zinc-500">Year 2026</p>
                </div>
              </div>


            </div>

            <div className="rounded border border-white/10 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-500/30">
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="lg:text-3xl text-xl font-bold text-black">
                    {orderCount ? orderCount : 0}
                  </h2>

                  <p className="mt-1  text-[8px] lg:text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Orders
                  </p>
                </div>

                <div className="text-right hidden lg:block">
                  <div className="flex h-11 w-11 items-center justify-center rounded bg-blue-500/10 text-lg">
                    📦
                  </div>

                  <p className="mt-2 text-[10px] text-zinc-500">This Year</p>
                </div>
              </div>


            </div>

            <div className="rounded border border-white/10 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-500/30">
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="lg:text-3xl text-xl font-bold text-black">
                    {userCount ? userCount : 0}
                  </h2>

                  <p className="mt-1  text-[8px] lg:text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Customers
                  </p>
                </div>

                <div className="text-right  hidden lg:block">
                  <div className="flex h-11 w-11 items-center justify-center rounded bg-emerald-500/10 text-lg">
                    👥
                  </div>

                  <p className="mt-2 text-[10px] text-zinc-500">This Year</p>
                </div>
              </div>


            </div>

            <div className="rounded border border-white/10 bg-white p-6 transition hover:-translate-y-1 hover:border-yellow-700/30">
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="lg:text-3xl text-xl font-bold text-black">
                    {productRating[0]?.averageRating ? productRating[0].averageRating.toFixed(1) : 0.0}★
                  </h2>

                  <p className="mt-1  text-[8px] lg:text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Avg Rating of All Products
                  </p>
                </div>

                <div className="text-right  hidden lg:block">
                  <div className="flex h-11 w-11 items-center justify-center rounded bg-yellow-700/10 text-lg">
                    ⭐
                  </div>

                  <p className="mt-2 text-[10px] text-zinc-500">All Time</p>
                </div>
              </div>

             
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
