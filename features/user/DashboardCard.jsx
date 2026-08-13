"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FiTrendingUp } from "react-icons/fi";

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color = "from-violet-500 to-fuchsia-500",
  bg = "bg-violet-50",
  suffix = "",
  prefix = "",
  decimals = 0,
  percentage = "+12%",
  description = "Compared to last month",
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
    >
      <div
        className={`absolute top-0 right-0 h-36 w-36 rounded-full bg-gradient-to-r ${color} opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-20`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">{title}</p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900">
            {prefix}

            <CountUp end={Number(value)} duration={2} decimals={decimals} />

            {suffix}
          </h2>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${color} shadow-lg`}
        >
          <Icon className="text-3xl text-white" />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1">
          <FiTrendingUp className="text-green-600" />

          <span className="text-sm font-semibold text-green-600">
            {percentage}
          </span>
        </div>

        <p className="text-xs text-zinc-400">{description}</p>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80%" }}
          transition={{
            duration: 1.5,
          }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  );
}
