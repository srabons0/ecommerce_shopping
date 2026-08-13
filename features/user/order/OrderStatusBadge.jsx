"use client";

import { FiCheckCircle, FiClock, FiTruck, FiXCircle } from "react-icons/fi";

const STATUS = {
  Processing: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    ring: "ring-amber-200",
    icon: FiClock,
  },

  Shipping: {
    bg: "bg-sky-100",
    text: "text-sky-700",
    ring: "ring-sky-200",
    icon: FiTruck,
  },

  Delivered: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
    icon: FiCheckCircle,
  },

  Cancelled: {
    bg: "bg-red-100",
    text: "text-red-700",
    ring: "ring-red-200",
    icon: FiXCircle,
  },
};

export default function OrderStatusBadge({ status }) {
  const config = STATUS[status] || {
    bg: "bg-zinc-100",
    text: "text-zinc-700",
    ring: "ring-zinc-200",
    icon: FiClock,
  };

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1.5
        text-xs
        font-semibold
        ring-1
        ${config.bg}
        ${config.text}
        ${config.ring}
      `}
    >
      <Icon className="text-sm" />
      {status}
    </span>
  );
}

