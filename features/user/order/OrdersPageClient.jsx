"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiPackage,
  FiSearch,
  FiTruck,
} from "react-icons/fi";
import { HiX } from "react-icons/hi";

const statusStyles = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  processing: "border-sky-200 bg-sky-50 text-sky-700",
  packed: "border-violet-200 bg-violet-50 text-violet-700",
  shipped: "border-indigo-200 bg-indigo-50 text-indigo-700",
  delivered: "border-emerald-200 bg-emerald-50 text-emerald-700",
  cancelled: "border-rose-200 bg-rose-50 text-rose-700",
};

const paymentStyles = {
  paid: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  failed: "bg-rose-50 text-rose-700",
  refunded: "bg-slate-100 text-slate-700",
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatDate(value) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatStatus(value) {
  if (!value) return "Pending";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function OrdersPageClient({ initialOrders = [] }) {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return initialOrders.filter((order) => {
      const searchableText = [
        order.orderNumber,
        order.shipping?.fullName,
        order.shipping?.address,
        order.items?.map((item) => item.name).join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);
      return matchesSearch;
    });
  }, [initialOrders, search]);

  const summary = useMemo(() => {
    const totalOrders = initialOrders.length;
    const deliveredCount = initialOrders.filter(
      (order) => (order.orderStatus || "pending").toLowerCase() === "delivered",
    ).length;
    const inProgressCount = initialOrders.filter((order) => {
      const currentStatus = (order.orderStatus || "pending").toLowerCase();
      return ["pending", "processing", "packed", "shipped"].includes(
        currentStatus,
      );
    }).length;
    const totalSpent = initialOrders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0,
    );

    return [
      {
        label: "Total orders",
        value: totalOrders,
        icon: FiPackage,
        tint: "from-violet-500 to-fuchsia-500",
      },
      {
        label: "Delivered",
        value: deliveredCount,
        icon: FiCheckCircle,
        tint: "from-emerald-500 to-green-500",
      },
      {
        label: "In progress",
        value: inProgressCount,
        icon: FiTruck,
        tint: "from-sky-500 to-cyan-500",
      },
      {
        label: "Total spent",
        value: formatCurrency(totalSpent),
        icon: FiCreditCard,
        tint: "from-amber-500 to-orange-500",
      },
    ];
  }, [initialOrders]);

  return (
    <div className="space-y-6 p-4 pb-15 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-[32px] border border-zinc-200 bg-linear-to-br from-slate-950 via-red-950 to-red-900 p-6 text-white shadow-[0_30px_80px_-20px_rgba(109,40,217,0.45)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              Your account
            </span>
            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Your orders, beautifully organized
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/75 sm:text-base">
              Keep track of every purchase, review delivery progress, and
              revisit your favorite pieces at a glance.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
            <p className="mt-2 text-2xl font-semibold">
              {initialOrders.length} order
              {initialOrders.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {summary.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-zinc-900">
                    {item.value}
                  </p>
                </div>
                <div
                  className={`rounded-2xl bg-linear-to-r ${item.tint} p-1.5 lg:p-3 text-white`}
                >
                  <Icon className="lg:h-5 lg:w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="rounded-[28px] border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by order number or item"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-zinc-300 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <FiPackage className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-zinc-900">
              No orders found
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Try a different search term or switch the status filter to see
              more results.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const firstItem = order.items?.[0] || {};
            const itemCount = (order.items || []).reduce(
              (sum, item) => sum + Number(item.quantity || 0),
              0,
            );
            const currentStatus = (
              order.orderStatus || "pending"
            ).toLowerCase();

            return (
              <article
                key={order._id || order.orderNumber}
                className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-zinc-100 text-sm font-semibold text-zinc-600">
                      {firstItem.image ? (
                        <Image
                          src={firstItem.image}
                          alt={firstItem.name || "Order item"}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>
                          {(firstItem.name || "O").charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-semibold text-zinc-900">
                          {firstItem.name || "Order item"}
                        </h2>
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[currentStatus] || statusStyles.pending}`}
                        >
                          {formatStatus(currentStatus)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-500">
                        {order.orderNumber} • {itemCount} item
                        {itemCount === 1 ? "" : "s"}
                      </p>
                      <p className="mt-2 text-sm text-zinc-500">
                        {order.shipping?.fullName || "Customer"} •{" "}
                        {order.shipping?.address || "Address on file"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentStyles[order.paymentStatus] || paymentStyles.pending}`}
                    >
                      {formatStatus(order.paymentStatus || "pending")}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-zinc-200 pt-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap gap-3 text-sm text-zinc-500">
                    <span className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-2">
                      <FiClock className="h-4 w-4" />
                      {formatDate(order.createdAt)}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-2">
                      <FiCreditCard className="h-4 w-4" />
                      {order.paymentMethod === "stripe"
                        ? "Stripe"
                        : "Cash on delivery"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between lg:justify-center gap-3">
                    <div className="text-right">
                      <p className="text-sm text-zinc-500">Total paid</p>
                      <p className="text-xl font-semibold text-zinc-900">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
                    >
                      View details
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      <Dialog open={Boolean(selectedOrder)}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[90vh] lg:min-w-5xl overflow-y-auto scrollbar-hide rounded-[28px] border-zinc-200 p-0"
        >
          {selectedOrder && (
            <>
              <DialogHeader className="border-b border-zinc-200 bg-zinc-950 p-6 text-white sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 pr-8">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase text-white/80">
                      Order details
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[(selectedOrder.orderStatus || "pending").toLowerCase()] || statusStyles.pending}`}
                    >
                      {formatStatus(selectedOrder.orderStatus || "pending")}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(false)}
                    className="rounded-xl p-2 text-white hover:bg-white/10"
                  >
                    <HiX size={24} />
                  </button>
                </div>
                <DialogTitle className="mt-4 text-2xl font-semibold text-white">
                  {selectedOrder.orderNumber}
                </DialogTitle>
                <DialogDescription className="text-sm text-zinc-300">
                  Placed on {formatDate(selectedOrder.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 p-6 sm:p-8">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                    Items ({selectedOrder.items?.length || 0})
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-4 rounded-2xl border border-zinc-200">
                    {(selectedOrder.items || []).map((item, index) => (
                      <div
                        key={`${item.productId || item.name}-${index}`}
                        className="flex gap-4 p-4 border-2 rounded-2xl"
                      >
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-100 text-sm font-semibold text-zinc-500">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name || "Order item"}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            (item.name || "O").charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-zinc-900">
                            {item.name}
                          </p>
                          <div className="mt-1 flex flex-col text-sm text-zinc-500">
                            Qty · {item.quantity || 0}
                            <div>
                              {item.size ? `  Size · ${item.size}` : ""}
                            </div>
                            <div className="flex gap-2 mt-2">
                              <div
                                style={{ backgroundColor: item.color }}
                                className={` w-4 h-4 rounded-full`}
                              ></div>
                              {item.color ? ` ${item.color}` : ""}
                            </div>
                          </div>
                        </div>
                        <p className="font-semibold text-zinc-900">
                          {formatCurrency(
                            item.subtotal || item.price * item.quantity,
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-zinc-50 p-4">
                    <h3 className="text-sm font-semibold text-zinc-900">
                      Delivery address
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {selectedOrder.shipping?.fullName}
                      <br />
                      {selectedOrder.shipping?.address}
                      <br />
                      {selectedOrder.shipping?.city}{" "}
                      {selectedOrder.shipping?.postalCode}
                      <br />
                      {selectedOrder.shipping?.phone}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-zinc-50 p-4">
                    <h3 className="text-sm font-semibold text-zinc-900">
                      Payment
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {selectedOrder.paymentMethod === "stripe"
                        ? "Stripe"
                        : "Cash on delivery"}
                      <br />
                      <span className="font-medium text-zinc-700">
                        {formatStatus(selectedOrder.paymentStatus || "pending")}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-zinc-200 pt-5 text-sm">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal</span>
                    <span>{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Shipping</span>
                    <span>{formatCurrency(selectedOrder.shippingFee)}</span>
                  </div>
                  {Number(selectedOrder.discount) > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span>-{formatCurrency(selectedOrder.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-zinc-200 pt-3 text-base font-bold text-zinc-900">
                    <span>Total paid</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
