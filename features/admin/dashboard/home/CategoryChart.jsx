"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8B5CF6",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
];

function CategoryChart({ categoryStats }) {
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
  return (
    <div className="h-130 my-10 w-full rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-lg font-semibold text-zinc-800">
        Sales by Category
      </h2>

      <ResponsiveContainer width="100%" height="100%" className="pb-10">
        <PieChart>
          <Pie
            data={categoryStats}
            dataKey="revenue"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={mobile ? 70 : 120}
            innerRadius={mobile ? 30 : 70}
            paddingAngle={3}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {categoryStats.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload?.length) {
                const data = payload[0].payload;

                return (
                  <div className="rounded-lg bg-white p-3 shadow-lg border">
                    <p>{label}</p>
                    <p>Revenue: ৳{data.revenue.toLocaleString()}</p>
                    <p>Sold: {data.sold}</p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;
