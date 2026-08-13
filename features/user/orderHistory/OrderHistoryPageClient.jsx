"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Archive,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  Search,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { HiX } from "react-icons/hi";

const filters = [
  { value: "all", label: "All records" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
];

const statusStyles = {
  delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelled: "bg-red-50 text-red-700 ring-red-200",
  refunded: "bg-zinc-100 text-zinc-700 ring-zinc-200",
  shipped: "bg-blue-50 text-blue-700 ring-blue-200",
  processing: "bg-amber-50 text-amber-700 ring-amber-200",
};

function formatCurrency(value, currency = "BDT") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) return "Date unavailable";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function titleCase(value) {
  return (value || "pending").replace(/\b\w/g, (letter) =>
    letter.toUpperCase(),
  );
}

export default function OrderHistoryPageClient({
  initialHistory = [],
  userName = "there",
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const visibleHistory = useMemo(() => {
    const search = query.trim().toLowerCase();
    return initialHistory.filter((order) => {
      const status = (order.orderStatus || "pending").toLowerCase();
      const searchable = [
        order.orderNumber,
        order.shipping?.fullName,
        order.shipping?.city,
        ...(order.items || []).map((item) => item.name),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesFilter =
        filter === "all" || status === filter || order.paymentStatus === filter;
      return matchesFilter && (!search || searchable.includes(search));
    });
  }, [filter, initialHistory, query]);

  const stats = useMemo(() => {
    const delivered = initialHistory.filter(
      (order) => order.orderStatus === "delivered",
    ).length;
    const cancelled = initialHistory.filter(
      (order) => order.orderStatus === "cancelled",
    ).length;
    const spent = initialHistory.reduce(
      (total, order) => total + Number(order.total || 0),
      0,
    );
    return { delivered, cancelled, spent };
  }, [initialHistory]);

  return (
    <div className="min-h-screen pb-15 bg-[#f7f7f5] px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
      <section className="relative overflow-hidden bg-zinc-950 p-6 text-white shadow-xl sm:p-9">
        <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-red-600/70 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
            <Archive className="h-4 w-4" /> Your archive
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Every order has a story.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">
            Hi {userName.split(" ")[0]}, browse your completed purchases,
            payment records, and delivery details from one calm, organized view.
          </p>

        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Archived orders",
            value: initialHistory.length,
            icon: Package,
          },
          { label: "Delivered", value: stats.delivered, icon: CheckCircle2 },
          {
            label: "Total spent",
            value: formatCurrency(stats.spent, initialHistory[0]?.currency),
            icon: CreditCard,
          },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">{label}</p>
                <p className="mt-2 text-2xl font-black text-zinc-950">
                  {value}
                </p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center bg-red-50 text-red-600">
                <Icon className="h-5 w-5" />
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
              Purchase timeline
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight">
              Your order history
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`px-3 py-2 text-xs font-bold transition ${filter === item.value ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-red-50 hover:text-red-700"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {visibleHistory.length === 0 ? (
            <div className="border border-dashed border-zinc-300 px-6 py-14 text-center">
              <Archive className="mx-auto h-8 w-8 text-zinc-300" />
              <h3 className="mt-4 font-bold text-zinc-900">No history found</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Try another search or choose a different status.
              </p>
            </div>
          ) : (
            visibleHistory.map((order) => {
              const status = (order.orderStatus || "pending").toLowerCase();
              const itemCount = (order.items || []).reduce(
                (total, item) => total + Number(item.quantity || 0),
                0,
              );
              const firstItem = order.items?.[0];
              return (
                <article
                  key={order._id || order.orderNumber}
                  className="group border border-zinc-200 p-4 transition hover:border-red-300 hover:shadow-md sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-zinc-100 text-lg font-bold text-zinc-500">
                      {firstItem?.image ? (
                        <Image
                          src={firstItem.image}
                          alt={firstItem.name || "Order item"}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>
                          {(firstItem?.name || "O").charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-zinc-950">
                          {order.orderNumber}
                        </h3>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${statusStyles[status] || "bg-zinc-100 text-zinc-600 ring-zinc-200"}`}
                        >
                          {titleCase(status)}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-zinc-500">
                        {firstItem?.name || "Order items"}{" "}
                        {itemCount > 1 ? `and ${itemCount - 1} more` : ""}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-500">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(order.createdAt)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {order.shipping?.city || "Address saved"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-zinc-100 pt-4 sm:block sm:border-0 sm:pt-0 sm:text-right">
                      <div>
                        <p className="text-xs text-zinc-500">Order total</p>
                        <p className="text-lg font-black text-zinc-950">
                          {formatCurrency(order.total, order.currency)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-red-600 hover:text-red-800"
                      >
                        View details <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <Dialog open={Boolean(selectedOrder)}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[90vh] lg:max-w-5xl scrollbar-hide overflow-y-auto rounded-3xl p-0"
        >
          {selectedOrder && (
            <>
              <DialogHeader className="bg-zinc-950 p-6 text-white sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-red-400">
                    <Archive className="h-4 w-4" /> Archived purchase
                  </div>
                  <button
                    onClick={() => setSelectedOrder(false)}
                    className="rounded-xl p-2 text-white hover:bg-white/10"
                  >
                    <HiX size={24} />
                  </button>
                </div>
                <DialogTitle className="mt-3 text-2xl text-white">
                  {selectedOrder.orderNumber}
                </DialogTitle>
                <DialogDescription className="text-zinc-300">
                  Placed on {formatDate(selectedOrder.createdAt)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusStyles[selectedOrder.orderStatus] || "bg-zinc-100 text-zinc-600 ring-zinc-200"}`}
                  >
                    {titleCase(selectedOrder.orderStatus)}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600">
                    {titleCase(selectedOrder.paymentStatus || "pending")}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Items
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-4 rounded-2xl border border-zinc-200">
                    {(selectedOrder.items || []).map((item, index) => (
                      <div
                        key={`${item.name}-${index}`}
                        className="flex gap-4 p-4 border-2 rounded-2xl"
                      >
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden bg-zinc-100 text-sm font-bold text-zinc-500">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name || "Order item"}
                              width={56}
                              height={56}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            (item.name || "O").charAt(0)
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-zinc-900">{item.name}</p>
                          <p className="mt-1 text-xs text-zinc-500">
                            Qty {item.quantity}
                            {item.size ? ` · Size ${item.size}` : ""}
                            {item.color ? ` · ${item.color}` : ""}
                          </p>
                        </div>
                        <p className="font-bold text-zinc-900">
                          {formatCurrency(
                            item.subtotal || item.price * item.quantity,
                            selectedOrder.currency,
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-zinc-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <MapPin className="h-4 w-4 text-red-600" /> Delivery
                      address
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {selectedOrder.shipping?.fullName}
                      <br />
                      {selectedOrder.shipping?.address}
                      <br />
                      {selectedOrder.shipping?.city}{" "}
                      {selectedOrder.shipping?.postalCode}
                    </p>
                  </div>
                  <div className="bg-zinc-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Truck className="h-4 w-4 text-red-600" /> Payment method
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {selectedOrder.paymentMethod === "stripe"
                        ? "Stripe"
                        : "Cash on delivery"}
                      <br />
                      {selectedOrder.shipping?.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 border-t border-zinc-200 pt-5 text-sm">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal</span>
                    <span>
                      {formatCurrency(
                        selectedOrder.subtotal,
                        selectedOrder.currency,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Shipping</span>
                    <span>
                      {formatCurrency(
                        selectedOrder.shippingFee,
                        selectedOrder.currency,
                      )}
                    </span>
                  </div>
                  {Number(selectedOrder.discount) > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span>
                        -
                        {formatCurrency(
                          selectedOrder.discount,
                          selectedOrder.currency,
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-zinc-200 pt-3 text-base font-black">
                    <span>Total</span>
                    <span>
                      {formatCurrency(
                        selectedOrder.total,
                        selectedOrder.currency,
                      )}
                    </span>
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
