"use client";

import {
  ArrowLeft,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const statusStyles = {
  delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelled: "bg-red-50 text-red-700 ring-red-200",
  shipped: "bg-blue-50 text-blue-700 ring-blue-200",
  processing: "bg-amber-50 text-amber-700 ring-amber-200",
  confirmed: "bg-sky-50 text-sky-700 ring-sky-200",
  pending: "bg-zinc-100 text-zinc-700 ring-zinc-200",
};

function titleCase(value) {
  return (value || "pending").replace(/\b\w/g, (letter) =>
    letter.toUpperCase(),
  );
}

function formatDate(value) {
  return value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "long",
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

export default function GuestOrderDetailsPage() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderNumber) return;

    async function loadOrder() {
      try {
        const response = await fetch(
          `/api/guest-orders?orderNumber=${encodeURIComponent(orderNumber)}`,
        );
        const data = await response.json();
        if (!response.ok || !data.success || !data.orders?.[0]) {
          throw new Error("We could not find an order with that number.");
        }
        setOrder(data.orders[0]);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderNumber]);

  const status = (order?.orderStatus || "pending").toLowerCase();

  return (
    <main className=" bg-[#f6f6f4] px-5 pb-16 pt-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/guest-orders"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 transition hover:text-red-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to order history
        </Link>
        <header className="mt-7 bg-zinc-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
            <Package className="h-4 w-4" /> Order details
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            {orderNumber}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300">
            Your complete order and delivery information, all in one place.
          </p>
        </header>

        {loading ? (
          <section className="mx-auto mt-8 max-w-xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-red-600" />
            <p className="mt-4 text-sm text-zinc-500">
              Loading order details...
            </p>
          </section>
        ) : error ? (
          <section className="mx-auto mt-8 max-w-xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <Package className="mx-auto h-10 w-10 text-red-500" />
            <h2 className="mt-4 text-2xl font-black">Order not found</h2>
            <p className="mt-2 text-sm text-zinc-500">{error}</p>
            <Link
              href="/guest-orders"
              className="mt-6 inline-flex items-center gap-2 bg-zinc-950 px-5 py-3 text-sm font-bold text-white hover:bg-red-600"
            >
              Back to order search <ArrowLeft className="h-4 w-4" />
            </Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <section className="space-y-6">
              <div className="border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-zinc-500">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                    <h2 className="mt-1 text-2xl font-black">
                      Order {order.orderNumber}
                    </h2>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${statusStyles[status] || statusStyles.pending}`}
                  >
                    {titleCase(status)}
                  </span>
                </div>
                <div className="mt-7 flex items-center gap-3 text-sm text-zinc-500">
                  <span className="flex h-9 w-9 items-center justify-center bg-red-50 text-red-600">
                    <Truck className="h-4 w-4" />
                  </span>
                  {status === "delivered"
                    ? "Your order has been delivered."
                    : "Your order is being prepared for delivery."}
                </div>
              </div>
              <div className="border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
                  Items in this order
                </h2>
                <div className="mt-5 divide-y divide-zinc-200">
                  {(order.items || []).map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-zinc-100 text-zinc-500">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name || "Order item"}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Package className="h-6 w-6" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-zinc-900">{item.name}</p>
                        <p className="mt-1 text-sm text-zinc-500">
                          Qty {item.quantity}
                          {item.size ? ` · Size ${item.size}` : ""}
                          {item.color ? ` · ${item.color}` : ""}
                        </p>
                      </div>
                      <p className="font-bold text-zinc-900">
                        {formatCurrency(
                          item.subtotal || item.price * item.quantity,
                          order.currency,
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <aside className="space-y-4">
              <div className="border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 font-black">
                  <MapPin className="h-4 w-4 text-red-600" /> Delivery details
                </h2>
                <p className="mt-4 text-sm leading-6 text-zinc-500">
                  {order.shipping?.fullName}
                  <br />
                  {order.shipping?.address}
                  <br />
                  {order.shipping?.city} {order.shipping?.postalCode}
                </p>
              </div>
              <div className="border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 font-black">
                  <CreditCard className="h-4 w-4 text-red-600" /> Payment
                  summary
                </h2>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-zinc-500">
                    <span>Method</span>
                    <span className="font-semibold text-zinc-900">
                      {order.paymentMethod === "cod"
                        ? "Cash on delivery"
                        : "Stripe"}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Status</span>
                    <span className="font-semibold text-zinc-900">
                      {titleCase(order.paymentStatus)}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between border-t border-zinc-200 pt-4 text-lg font-black">
                    <span>Total</span>
                    <span>{formatCurrency(order.total, order.currency)}</span>
                  </div>
                </div>
              </div>
              <div className="border border-red-100 bg-red-50 p-5 text-sm text-red-800">
                <div className="flex items-center gap-2 font-bold">
                  <Clock3 className="h-4 w-4" /> Need help?
                </div>
                <p className="mt-2 leading-6">
                  Keep your order number handy when contacting support.
                </p>
                <Link
                  href="/guest-orders"
                  className="mt-3 inline-flex items-center gap-1 font-bold underline underline-offset-4"
                >
                  Find another order{" "}
                  <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
