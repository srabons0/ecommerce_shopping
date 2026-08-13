"use client";

import {
  ArrowRight,
  ChevronRight,
  Clock3,
  Mail,
  Package,
  Phone,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const statusStyles = {
  delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelled: "bg-red-50 text-red-700 ring-red-200",
  shipped: "bg-blue-50 text-blue-700 ring-blue-200",
  processing: "bg-amber-50 text-amber-700 ring-amber-200",
  confirmed: "bg-sky-50 text-sky-700 ring-sky-200",
  pending: "bg-zinc-100 text-zinc-700 ring-zinc-200",
};

function formatDate(value) {
  return value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date unavailable";
}

function formatCurrency(value, currency = "BDT") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function titleCase(value) {
  return (value || "pending").replace(/\b\w/g, (letter) =>
    letter.toUpperCase(),
  );
}

export default function GuestOrdersPage() {
  const [form, setForm] = useState({ email: "", phone: "", orderNumber: "" });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleLookup(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSearched(false);

    try {
      const params = new URLSearchParams({
        email: form.email,
        phone: form.phone,
      });
      if (form.orderNumber.trim())
        params.set("orderNumber", form.orderNumber.trim());
      const response = await fetch(`/api/guest-orders?${params.toString()}`);
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message);
      setOrders(data.orders || []);
      setSearched(true);
    } catch (lookupError) {
      setError(lookupError.message || "Unable to find your orders.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[#f6f6f4] pb-16">
      <section className="relative isolate mx-auto overflow-hidden bg-gradient-to-br from-zinc-700 via-black to-red-950 px-6 py-12 text-white shadow-2xl sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -top-32 -right-24 -z-10 h-96 w-96 rounded-full bg-red-600/25 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 left-1/3 -z-10 h-56 w-56 rounded-full bg-red-900/20 blur-3xl" />

        <div className="pointer-events-none absolute bottom-8 left-1/3 -z-10 h-28 w-28 rounded-full border-[20px] border-red-500/10" />

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase transition hover:text-white"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Everyday Wear
        </Link>

        <div className="relative mt-12 max-w-2xl sm:ml-8 lg:ml-22">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-red-400 uppercase">
            <Package className="h-4 w-4" />
            Guest order desk
          </p>

          <h1 className="mt-4 text-4xl leading-[1.05] font-black tracking-tight text-white sm:text-6xl">
            Your orders,
            <span className="block text-red-500">still within reach.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">
            No account? No problem. Enter the contact details used at checkout
            to view your orders and delivery progress.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 pt-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <section className="border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-red-600 uppercase">
                Private lookup
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">
                Find your order
              </h2>
            </div>
            <ShieldCheck className="h-6 w-6 text-red-600" />
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            We match both email and phone number to keep your order details
            private.
          </p>
          <form onSubmit={handleLookup} className="mt-7 space-y-4">
            <label className="block text-sm font-bold text-zinc-800">
              Email address
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                className="mt-2 h-12 w-full border border-zinc-200 px-4 font-normal outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </label>
            <label className="block text-sm font-bold text-zinc-800">
              Phone number
              <input
                required
                name="phone"
                value={form.phone}
                onChange={updateField}
                placeholder="Your checkout phone number"
                className="mt-2 h-12 w-full border border-zinc-200 px-4 font-normal outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </label>
            <label className="block text-sm font-bold text-zinc-800">
              Order number{" "}
              <span className="font-normal text-zinc-400">(optional)</span>
              <input
                name="orderNumber"
                value={form.orderNumber}
                onChange={updateField}
                placeholder="e.g. ORD-123456"
                className="mt-2 h-12 w-full border border-zinc-200 px-4 font-normal outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </label>
            {error && (
              <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 w-full items-center justify-center gap-2 bg-zinc-950 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? "Searching..." : "View my orders"}{" "}
              {!loading && <Search className="h-4 w-4" />}
            </button>
          </form>
          <div className="mt-6 border-t border-zinc-200 pt-5 text-sm text-zinc-500">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-red-600" /> Use the email from your
              order
            </p>
            <p className="mt-2 flex items-center gap-2">
              <Phone className="h-4 w-4 text-red-600" /> Use the phone from
              checkout
            </p>
          </div>
        </section>

        <section className="min-h-105">
          {!searched ? (
            <div className="flex min-h-105 flex-col items-center justify-center border border-dashed border-zinc-300 bg-white px-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Search className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-2xl font-black">
                Your order history will appear here
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                Enter your details to see current and past purchases in one
                place.
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex min-h-105 flex-col items-center justify-center border border-dashed border-zinc-300 bg-white px-8 text-center">
              <Package className="h-10 w-10 text-zinc-300" />
              <h2 className="mt-5 text-2xl font-black">No matching orders</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                Check your email, phone number, or order number and try again.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] text-red-600 uppercase">
                    Order history
                  </p>
                  <h2 className="mt-1 text-2xl font-black">Your purchases</h2>
                </div>
                <span className="text-sm text-zinc-500">
                  {orders.length} record{orders.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="space-y-4">
                {orders.map((order) => {
                  const status = (order.orderStatus || "pending").toLowerCase();
                  const itemCount = (order.items || []).reduce(
                    (total, item) => total + Number(item.quantity || 0),
                    0,
                  );
                  return (
                    <article
                      key={order._id || order.orderNumber}
                      className="border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-red-300 hover:shadow-md"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-zinc-100 text-zinc-500">
                          {order.items?.[0]?.image ? (
                            <Image
                              src={order.items[0].image}
                              alt={order.items[0].name || "Order item"}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Package className="h-6 w-6" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold">{order.orderNumber}</h3>
                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${statusStyles[status] || statusStyles.pending}`}
                            >
                              {titleCase(status)}
                            </span>
                          </div>
                          <p className="mt-1 truncate text-sm text-zinc-500">
                            {order.items?.[0]?.name || "Order items"}{" "}
                            {itemCount > 1 ? `and ${itemCount - 1} more` : ""}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-500">
                            <span className="inline-flex items-center gap-1">
                              <Clock3 className="h-3.5 w-3.5" />
                              {formatDate(order.createdAt)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Truck className="h-3.5 w-3.5" />
                              {titleCase(order.paymentStatus || "pending")}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-3 border-t border-zinc-100 pt-3 sm:block sm:border-0 sm:pt-0 sm:text-right">
                          <p className="text-lg font-black">
                            {formatCurrency(order.total, order.currency)}
                          </p>
                          <p className="mt-1 text-xs text-zinc-500">
                            {order.shipping?.city || "Delivery details saved"}
                          </p>
                          <Link
                            href={`/guest-orders/${order.orderNumber}`}
                            className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-red-600 hover:text-red-800"
                          >
                            View details <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
