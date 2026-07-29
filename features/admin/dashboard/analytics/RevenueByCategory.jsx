"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  // "#7C3AED",
  "#C90000",
  "#10B981",
  "#FFA600",
  "#0039C9",
  // "#EC4899",
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-3 shadow-xl">
      <p className="font-semibold text-zinc-900">{payload[0].name}</p>
      <p className="mt-1 text-sm text-zinc-600">
        Revenue:
        <span className="ml-1 font-semibold text-[#F59E0B]">
          ৳{payload[0].value.toLocaleString()}
        </span>
      </p>
    </div>
  );
};

export default function RevenueByCategory({ revenueByCategory }) {
  const totalRevenue = revenueByCategory.reduce(
    (acc, item) => acc + item.revenue,
    0,
  );

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">
            Revenue by Category
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Revenue distribution across product categories
          </p>
        </div>

        <div className="rounded-xl bg-violet-50 px-4 py-2">
          <p className="text-xs text-zinc-500">Total Revenue</p>
          <p className="text-lg font-bold text-[#F59E0B]">
            ৳{Math.ceil(totalRevenue)}
          </p>
        </div>
      </div>

      <div className="grid items-center gap-6 grid-cols-1">
        <div className="relative h-[330px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={revenueByCategory}
                dataKey="revenue"
                nameKey="category"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={3}
                stroke="white"
                strokeWidth={3}
                animationDuration={1200}
              >
                {revenueByCategory.map((item, index) => (
                  <Cell
                    key={item.category}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-sm text-zinc-500">Total Revenue</p>

            <h3 className="mt-1 text-2xl font-bold text-zinc-900">
              ৳{(totalRevenue / 1000).toFixed(0)}k
            </h3>
          </div>
        </div>

        <div className=" grid grid-cols-2 gap-5">
          {revenueByCategory.map((item, index) => {
            const percentage = ((item.revenue / totalRevenue) * 100).toFixed(1);

            return (
              <div
                key={item.category}
                className="rounded-2xl border border-zinc-100 p-4 transition hover:bg-zinc-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-4 w-4 rounded-full"
                      style={{
                        background: COLORS[index % COLORS.length],
                      }}
                    />

                    <div>
                      <h4 className="font-semibold uppercase text-zinc-900">
                        {item.category}
                      </h4>

                      <p className="text-sm text-zinc-500">
                        {percentage}% of revenue
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-zinc-900">
                      ৳{item.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${percentage}%`,
                      background: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
