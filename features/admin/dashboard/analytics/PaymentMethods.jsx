"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#049AC4", "#10B981", "#3B82F6", "#F59E0B"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl">
      <p className="font-semibold text-zinc-900">{data.name}</p>

      <div className="mt-2 space-y-1 text-sm">
        <p>
          Orders:
          <span className="ml-2 font-semibold">{data.orders}</span>
        </p>

        <p>
          Revenue:
          <span className="ml-2 font-semibold text-violet-600">
            ৳{data.revenue.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default function PaymentMethods({ paymentMethods }) {
  const totalRevenue = paymentMethods.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );

  const totalOrders = paymentMethods.reduce(
    (sum, item) => sum + item.orders,
    0,
  );

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-zinc-900">Payment Methods</h2>

        <p className="mt-1 text-sm text-zinc-500">
          Revenue and order distribution
        </p>
      </div>

      <div className="grid items-center gap-8 grid-cols-1">
        <div className="relative h-[330px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentMethods}
                dataKey="revenue"
                nameKey="name"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={4}
                stroke="#fff"
                strokeWidth={4}
                animationDuration={1200}
              >
                {paymentMethods.map((item, index) => (
                  <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
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

        <div className="space-y-4">
          {paymentMethods.map((item, index) => {
            const percentage = ((item.revenue / totalRevenue) * 100).toFixed(1);

            return (
              <div
                key={item.name}
                className="rounded-2xl border border-zinc-100 p-5 transition hover:bg-zinc-50"
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
                      <h3 className="font-semibold">{item.name}</h3>

                      <p className="text-sm text-zinc-500">
                        {item.orders} Orders
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">
                      ৳{item.revenue.toLocaleString()}
                    </p>

                    <p className="text-sm text-zinc-500">{percentage}%</p>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
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

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-violet-50 p-5">
              <p className="text-sm text-zinc-500">Total Revenue</p>

              <h3 className="mt-2 text-2xl font-bold text-violet-700">
                ৳{totalRevenue.toLocaleString()}
              </h3>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm text-zinc-500">Total Orders</p>

              <h3 className="mt-2 text-2xl font-bold text-emerald-700">
                {totalOrders}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
