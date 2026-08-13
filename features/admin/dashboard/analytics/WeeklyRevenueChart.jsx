"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";
import { TrendingUp, CalendarDays, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

const COLORS = [
  "#32FB32",
  "#2563EB",
  "#14B8A6",
  "#5B21B6",
  "#4C1D95",
  "#A855F7",
  "#9333EA",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl">
      <p className="font-semibold text-zinc-900">{label}</p>

      <p className="mt-2 text-lg font-bold text-violet-600">
        ৳{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

export default function WeeklyRevenueChart({ weeklyRevenue }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  const weeklyRevenueChart = days.map((day, index) => {
    const found = weeklyRevenue.find((item) => item._id === index + 1);

    return {
      day,
      revenue: found?.revenue ?? 0,
    };
  });
  const totalRevenue = weeklyRevenueChart.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );

  const averageRevenue = Math.round(
    totalRevenue / (weeklyRevenueChart.length || 1),
  );

  const bestDay = weeklyRevenueChart.reduce(
    (prev, current) => (prev.revenue > current.revenue ? prev : current),
    weeklyRevenueChart[0],
  );

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-2 lg:p-6 shadow-sm transition-all hover:shadow-lg">
      <div className="mb-8 pt-4 px-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-zinc-900">
            Weekly Revenue
          </h2>

          <p className="mt-1 text-xs w-2/3 lg:w-full lg:text-sm text-zinc-500">
            Revenue generated during the last 7 days
          </p>
        </div>

        <div className="rounded-xl bg-violet-50 px-2 py-1 lg:px-4 lg:py-2">
          <p className="text-xs text-zinc-500">Total Revenue</p>

          <p className="text-lg lg:text-xl font-bold text-[#2563EB]">
            ৳{totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50  p-2 lg:p-5">
          <DollarSign className="mb-3 text-violet-600" size={22} />

          <p className="text-sm text-zinc-500">Weekly Revenue</p>

          <h3 className="mt-2 text-2xl font-bold">
            ৳{totalRevenue.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
          <TrendingUp className="mb-3 text-emerald-600" size={22} />

          <p className="text-sm text-zinc-500">Daily Average</p>

          <h3 className="mt-2 text-2xl font-bold">
            ৳{averageRevenue.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
          <CalendarDays className="mb-3 text-orange-500" size={22} />

          <p className="text-sm text-zinc-500">Best Day</p>

          <h3 className="mt-2 text-2xl font-bold">{bestDay?.day}</h3>

          <p className="mt-1 text-sm text-zinc-500">
            ৳{bestDay?.revenue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyRevenueChart}
            margin={
              mobile
                ? { top: 10, right: 10, left: 0, bottom: 20 }
                : { top: 20, right: 20, left: 10, bottom: 20 }
            }
          >
            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#71717A",
                fontSize: 13,
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#71717A",
                fontSize: 13,
              }}
              tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
            />

            <Tooltip content={<CustomTooltip />} />

            <ReferenceLine
              y={averageRevenue}
              stroke="#EF4444"
              strokeDasharray="5 5"
              label="Avg"
            />

            <Bar
              dataKey="revenue"
              radius={[12, 12, 0, 0]}
              animationDuration={1500}
            >
              {weeklyRevenueChart.map((item, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
