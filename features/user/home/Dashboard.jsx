"use client";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import {
  FiPackage,
  FiHeart,
  FiShoppingBag,
  FiCreditCard,
  FiArrowRight,
} from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { HiX } from "react-icons/hi";
import Image from "next/image";

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
function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);
}
const recentOrders = [
  {
    id: "#23124",
    product: "Premium Hoodie",
    date: "05 Aug 2026",
    status: "Delivered",
    price: "$89",
  },
  {
    id: "#23120",
    product: "Oversized T-Shirt",
    date: "02 Aug 2026",
    status: "Shipping",
    price: "$42",
  },
  {
    id: "#23110",
    product: "Running Shoes",
    date: "30 Jul 2026",
    status: "Processing",
    price: "$120",
  },
];

const quickActions = [
  "Continue Shopping",
  "Track Order",
  "View Wishlist",
  "Edit Profile",
];

function Dashboard({ order, orderCount, user, userOrders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const stats = [
    {
      title: "Total Orders",
      value: orderCount,
      icon: FiPackage,
      color: "from-violet-500 to-fuchsia-500",
      bg: "bg-violet-50",
    },
    {
      title: "Wishlist",
      value: user?.wishlist || 0,
      icon: FiHeart,
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
    },
    {
      title: "Cart Items",
      value: userOrders || 0,
      icon: FiShoppingBag,
      color: "from-sky-500 to-cyan-500",
      bg: "bg-sky-50",
    },
    {
      title: "Total Spent",
      value: `$${user?.totalSpent || 0}`,
      icon: FiCreditCard,
      color: "from-emerald-500 to-green-500",
      bg: "bg-emerald-50",
    },
  ];
  return (
    <div>
      {" "}
      <div className="space-y-8 p-4 sm:p-6 lg:p-8">
        
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
          {stats.map((item, index) => (
            <div
              key={item.title}
              className={`rounded-3xl ${item.bg} border border-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:p-6`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-500">{item.title}</p>

                  <h2 className="mt-3 text-3xl font-bold text-zinc-900">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r lg:h-16 lg:w-16 ${item.color}`}
                >
                  <item.icon className="text-lg text-white lg:text-3xl" />
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="grid gap-8 xl:grid-cols-3">
          
          <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Orders</h2>

              <button className="flex items-center gap-2 font-semibold text-gray-600">
                View All
                <FiArrowRight />
              </button>
            </div>

            
            <div className="hidden md:block">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50/80">
                      <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-zinc-500 uppercase">
                        Order
                      </th>

                      <th className="px-3 py-4 text-center text-xs font-bold tracking-wider text-zinc-500 uppercase">
                        Items
                      </th>

                      <th className="py-4 text-left text-xs font-bold tracking-wider text-zinc-500 uppercase">
                        Total
                      </th>

                      <th className="px-3 py-4 text-left text-xs font-bold tracking-wider text-zinc-500 uppercase">
                        Status
                      </th>

                      <th className="py-4 text-left text-xs font-bold tracking-wider text-zinc-500 uppercase">
                        Payment
                      </th>

                      <th className="py-4 text-left text-xs font-bold tracking-wider text-zinc-500 uppercase">
                        Date
                      </th>

                      <th className="py-4 text-center text-xs font-bold tracking-wider text-zinc-500 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {order.map((order) => {
                      const totalItems = order.items.reduce(
                        (acc, item) => acc + item.quantity,
                        0,
                      );

                      return (
                        <tr
                          key={order.orderNumber}
                          className="group border-b border-zinc-100 transition duration-200 last:border-b-0 hover:bg-zinc-50/70"
                        >
                          
                          <td className="py-5 pl-3">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-zinc-900">
                                {order.orderNumber}
                              </span>
                            </div>
                          </td>

                          
                          <td className="text-center">
                            <span className="inline-flex min-w-9 items-center justify-center rounded-lg bg-zinc-100 px-2.5 py-1.5 text-sm font-semibold text-zinc-700">
                              {totalItems}
                            </span>
                          </td>

                          
                          <td className="py-5">
                            <span className="text-sm font-bold text-zinc-900">
                              ${Number(order.total || 0).toLocaleString()}
                            </span>
                          </td>

                          
                          <td className="py-5">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
                                order.orderStatus === "Delivered"
                                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                  : order.orderStatus === "Processing"
                                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                                    : order.orderStatus === "pending"
                                      ? "bg-orange-50 text-orange-700 ring-1 ring-orange-200"
                                      : "bg-red-50 text-red-700 ring-1 ring-red-200"
                              } `}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  order.orderStatus === "Delivered"
                                    ? "bg-emerald-500"
                                    : order.orderStatus === "Processing"
                                      ? "bg-blue-500"
                                      : order.orderStatus === "pending"
                                        ? "bg-orange-500"
                                        : "bg-red-500"
                                } `}
                              />

                              {order.orderStatus}
                            </span>
                          </td>

                          
                          <td className="py-5">
                            <span
                              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
                                order.paymentMethod === "stripe"
                                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                  : order.paymentMethod === "cod"
                                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                                    : "bg-red-50 text-red-700 ring-1 ring-red-200"
                              } `}
                            >
                              {order.paymentMethod === "stripe"
                                ? "Stripe"
                                : order.paymentMethod === "cod"
                                  ? "Cash on delivery"
                                  : order.paymentMethod}
                            </span>
                          </td>

                          
                          <td className="py-5">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-zinc-700">
                                {new Date(order.createdAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                          </td>

                          
                          <td className="py-5">
                            <div className="flex justify-center">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                aria-label={`View ${order.orderNumber}`}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 shadow-sm transition duration-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 hover:shadow-md active:scale-95"
                              >
                                <FaEye className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            
            <div className="space-y-4 md:hidden">
              {order.map((order) => {
                const totalItems = order.items.reduce(
                  (acc, item) => acc + item.quantity,
                  0,
                );

                return (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
                          Order
                        </p>

                        <p className="mt-1 text-sm font-bold text-zinc-900">
                          {order.orderNumber}
                        </p>
                      </div>

                      
                      <button
                        aria-label="Open order"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition hover:bg-black hover:text-white"
                      >
                        <FaEye className="h-4 w-4" />
                      </button>
                    </div>

                    
                    <div className="my-4 h-px bg-black/5" />

                    
                    <div className="grid grid-cols-2 gap-4">
                      
                      <div>
                        <p className="text-xs text-zinc-400">Items</p>

                        <p className="mt-1 font-semibold text-zinc-900">
                          {totalItems}
                        </p>
                      </div>

                      
                      <div>
                        <p className="text-xs text-zinc-400">Total</p>

                        <p className="mt-1 font-bold text-zinc-900">
                          ${order.total}
                        </p>
                      </div>

                      
                      <div>
                        <p className="text-xs text-zinc-400">Date</p>

                        <p className="mt-1 text-sm font-medium text-zinc-700">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>

                      
                      <div>
                        <p className="text-xs text-zinc-400">Payment</p>

                        <span
                          className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            order.paymentMethod === "stripe"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : order.paymentMethod === "cod"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {order.paymentMethod}
                        </span>
                      </div>
                    </div>

                    
                    <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
                      <div>
                        <p className="mb-1 text-xs text-zinc-400">
                          Order Status
                        </p>

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            order.orderStatus === "Delivered"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : order.orderStatus === "Processing"
                                ? "bg-blue-500/10 text-blue-500"
                                : order.orderStatus === "pending"
                                  ? "bg-orange-500/10 text-orange-500"
                                  : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>

                      <button className="rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-zinc-800">
                        View Order
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <h2 className="mb-6 text-2xl font-bold">Quick Actions</h2>

            <div className="space-y-4">
              {quickActions.map((action) => (
                <button
                  key={action}
                  className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 p-4 transition hover:border-violet-500 hover:bg-violet-50"
                >
                  <span>{action}</span>

                  <FiArrowRight />
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 p-5 text-white">
              <p className="text-sm text-violet-200">Available Coupon</p>

              <h3 className="mt-2 text-2xl font-bold">SAVE20</h3>

              <p className="mt-2 text-sm">
                Use this coupon and get 20% off on your next purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={Boolean(selectedOrder)}>
        <DialogContent
          showCloseButton={false}
          className="scrollbar-hide max-h-[90vh] overflow-y-auto rounded-[28px] border-zinc-200 p-0 lg:min-w-5xl"
        >
          {selectedOrder && (
            <>
              <DialogHeader className="border-b border-zinc-200 bg-zinc-950 p-6 text-white sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 pr-8">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 uppercase">
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
                  <h3 className="text-sm font-semibold tracking-wider text-zinc-500 uppercase">
                    Items ({selectedOrder.items?.length || 0})
                  </h3>
                  <div className="grid grid-cols-1 gap-3 rounded-2xl border border-zinc-200 p-4 lg:grid-cols-3">
                    {(selectedOrder.items || []).map((item, index) => (
                      <div
                        key={`${item.productId || item.name}-${index}`}
                        className="flex gap-4 rounded-2xl border-2 p-4"
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
                            <div className="mt-2 flex gap-2">
                              <div
                                style={{ backgroundColor: item.color }}
                                className={`h-4 w-4 rounded-full`}
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

export default Dashboard;
