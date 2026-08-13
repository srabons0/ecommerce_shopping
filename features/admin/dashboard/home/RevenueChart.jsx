"use client";

import { useEffect, useState } from "react";
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
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
    <div className="w-full rounded-3xl border border-zinc-200 bg-white p-2 lg:p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div className=" mt-5 ml-5 lg:mt-0 lg:ml-0">
          <h2 className="text-xl font-bold text-zinc-900">Monthly Revenue</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Revenue overview for this year
          </p>
        </div>
      </div>

      <div className="h-75 lg:h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={
              mobile
                ? { top: 10, right: 10, left: 0, bottom: 20 }
                : {
                    top: 20,
                    right: 20,
                    left: 10,
                    bottom: 20,
                  }
            }
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.45} />
                <stop offset="50%" stopColor="#7C3AED" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#E4E4E7"
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
                stroke: "#7C3AED",
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
              stroke="#7C3AED"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              animationBegin={300}
              animationDuration={1500}
              dot={{
                r: 4,
                fill: "#7C3AED",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#7C3AED",
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
