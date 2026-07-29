"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RevenueChart({ monthlyRevenue }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = months.map((month, index) => {
    const item = monthlyRevenue.find((m) => m._id === index + 1);

    return {
      month,
      revenue: item?.revenue || 0,
    };
  });
  return (
    <div className="w-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">Monthly Revenue</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Revenue overview for this year
          </p>
        </div>
      </div>

      <div className="h-100 w-full ">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A4FA05" stopOpacity={0.35} />
                <stop offset="60%" stopColor="#A4FA05" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#A4FA05" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#A4FA05"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#71717A",
                fontSize: 13,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              width={60}
              tick={{
                fill: "#71717A",
                fontSize: 13,
              }}
              tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}k`}
            />

            <Tooltip
              cursor={{
                stroke: "#A4FA05",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                borderRadius: "14px",
                border: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,.12)",
                padding: "10px 14px",
              }}
              formatter={(value) => [
                `৳${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Area
              type="natural"
              dataKey="revenue"
              stroke="#A4FA05"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              animationBegin={300}
              animationDuration={1500}
              dot={{
                r: 4,
                fill: "#A4FA05",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#A4FA05",
                stroke: "#fff",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;
