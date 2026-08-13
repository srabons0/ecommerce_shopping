"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = [
  "#7C3AED",
  "#8B5CF6",
  "#A855F7",
  "#C084FC",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-xl">
      <div className="flex items-center gap-3">
        <div>
          <h3 className="font-semibold">{data.name}</h3>

          <p className="text-sm text-zinc-500">{data.sold} Sold</p>

          <p className="text-sm font-semibold text-violet-600">
            ৳{data.revenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function TopSellingProducts({ topSellingProducts }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Top Selling Products</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Best performing products by units sold
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="hidden lg:block lg:h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={topSellingProducts}
              margin={{
                top: 10,
                right: 20,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid
                horizontal={false}
                strokeDasharray="3 3"
                stroke="#E4E4E7"
              />

              <XAxis type="number" axisLine={false} tickLine={false} />

              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                width={110}
              />

              <Tooltip content={<CustomTooltip />} />

              <Bar dataKey="sold" radius={[0, 12, 12, 0]}>
                {topSellingProducts.map((item, index) => (
                  <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          {topSellingProducts.map((product, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-2xl border border-zinc-100 px-4 py-2 transition hover:bg-zinc-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff85] font-bold text-[#000000cd]">
                ※
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900">{product.name}</h3>

                <div className="mt-1 flex items-center gap-4 text-sm text-zinc-500">
                  <span>{product.sold} Sold</span>
                </div>
              </div>

              <div className="text-right">
                <h4 className="font-bold text-zinc-900">
                  ৳{Math.ceil(product.revenue)}
                </h4>
                <p className="text-sm text-zinc-500">Price</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
