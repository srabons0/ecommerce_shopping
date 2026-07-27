import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  User,
  MapPin,
  CreditCard,
  Package2,
  Truck,
  Clock3,
  CheckCircle2,
  Save,
  Ban,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const ORDER_STATUS = [
  "pending",
  "confirmed",
  "processing",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];

const statusConfig = {
  pending: {
    icon: Clock3,
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },

  confirmed: {
    icon: CheckCircle2,
    color: "bg-sky-50 text-sky-700 border-sky-200",
  },

  processing: {
    icon: Package2,
    color: "bg-violet-50 text-violet-700 border-violet-200",
  },

  packed: {
    icon: Package2,
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },

  shipped: {
    icon: Truck,
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },

  delivered: {
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  cancelled: {
    icon: Ban,
    color: "bg-red-50 text-red-700 border-red-200",
  },
};

export default function OrderDetailsModal({
  open,
  onOpenChange,
  setOpen,
  order,
  // onStatusUpdate,
}) {
  const [status, setStatus] = useState(order.orderStatus);
  const router = useRouter();
  const totalItems = useMemo(() => {
    return order?.items?.reduce((acc, item) => acc + item.quantity, 0);
  }, [order.items]);

  const CurrentIcon = statusConfig[order.orderStatus]?.icon;

  const onStatusUpdate = async (id, orderStatus) => {
    try {
      const res = await fetch(`/api/orders/statusUpdate/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: orderStatus }),
      });
      if (!res.ok) {
        throw new Error(result?.error || "Failed to update product");
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error("Product update failed", error);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
          fixed
          inset-0
          z-240
          bg-black/60
          backdrop-blur-md
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
        "
        />

        <Dialog.Content
          className="
          fixed
          left-1/2
          top-1/2
          z-250
          h-[94vh]
          w-[96vw]
          max-w-7xl
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-[32px]
          border
          border-zinc-200
          bg-zinc-50
          shadow-[0_40px_120px_rgba(0,0,0,.25)]
          outline-none
        "
        >
          <div
            className="
            sticky
            top-0
            z-20
            border-b
            bg-white/90
            backdrop-blur-xl
          "
          >
            <div className="flex items-center justify-between px-8 py-6">
              <div>
                <Dialog.Title className="text-3xl font-bold tracking-tight">
                  Order Details
                </Dialog.Title>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
                    {order.orderNumber}
                  </span>

                  <span className="text-sm text-zinc-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`
                  flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${statusConfig[order.orderStatus]?.color}
                `}
                >
                  <CurrentIcon size={18} />

                  <span className="capitalize">{order.orderStatus}</span>
                </div>

                <Dialog.Close
                  onClick={() => setOpen(false)}
                  className="
                  rounded-xl
                  border
                  bg-white
                  p-3
                  transition
                  hover:bg-zinc-100
                "
                >
                  <X size={20} />
                </Dialog.Close>
              </div>
            </div>
          </div>

          <div className="h-[calc(94vh-150px)] overflow-y-auto p-8">
            <div className="grid gap-6 xl:grid-cols-3">
              <div className="space-y-6 xl:col-span-2">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-2xl bg-zinc-100 p-3">
                        <User size={20} />
                      </div>

                      <h2 className="text-lg font-bold">
                        Customer Information
                      </h2>
                    </div>

                    <div className="space-y-5">
                      <div className="flex gap-10 items-center">
                        <Info
                          title="Full Name"
                          value={order.shipping?.fullName}
                        />
                        <Info title="Phone" value={order.shipping?.phone} />
                      </div>

                      <Info title="Email" value={order.shipping?.email} />

                      <Info title="Customer ID" value={order.user} />
                    </div>
                  </div>

                  <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-2xl bg-zinc-100 p-3">
                        <MapPin size={20} />
                      </div>

                      <h2 className="text-lg font-bold">Shipping Address</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <Info title="Address" value={order.shipping?.address} />

                      <Info title="City" value={order.shipping?.city} />

                      <Info
                        title="Postal Code"
                        value={order.shipping?.postalCode}
                      />

                      <Info
                        title="Shipping Fee"
                        value={`৳ ${order.shippingFee}`}
                      />
                    </div>
                  </div>

                  <div className="rounded-3xl border bg-white  px-7 py-9 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-2xl bg-zinc-100 p-3">
                        <CreditCard size={20} />
                      </div>

                      <h2 className="text-lg font-bold">Payment Information</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <Info
                        title="Payment Method"
                        value={order.paymentMethod}
                      />

                      <Info
                        title="Payment Status"
                        value={order.paymentStatus}
                      />

                      <Info title="Currency" value={order.currency} />

                      <Info
                        title="Paid At (Date)"
                        value={new Date(order.paidAt).toLocaleDateString()}
                      />
                      <Info
                        title="Paid At (Time)"
                        value={new Date(order.paidAt).toLocaleTimeString()}
                      />

                      <Info
                        title="Stripe Payment"
                        value={order.stripePaymentIntentId}
                      />
                    </div>
                  </div>

                  <div className="rounded-3xl border bg-white px-7 py-9 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-2xl bg-zinc-100 p-3">
                        <Package2 size={20} />
                      </div>

                      <h2 className="text-lg font-bold">Order Summary</h2>
                    </div>

                    <div className="space-y-4">
                      <Price title="Items" value={totalItems} />

                      <Price title="Subtotal" value={`৳ ${order.subtotal}`} />

                      <Price
                        title="Shipping"
                        value={`৳ ${order.shippingFee}`}
                      />

                      <Price title="Tax" value={`৳ ${order.tax}`} />

                      <Price title="Discount" value={`৳ ${order.discount}`} />

                      <div className="my-4 border-t" />

                      <Price
                        title="Grand Total"
                        value={`৳ ${order.total}`}
                        bold
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 ">
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-lg font-bold">
                    Update Order Status
                  </h2>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-2xl border bg-white px-4 py-3 outline-none transition focus:border-zinc-900"
                  >
                    {ORDER_STATUS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => onStatusUpdate(order._id, status)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-3 font-semibold text-white transition hover:bg-black"
                  >
                    <Save size={18} />
                    Save Status
                  </button>
                  <div className="mt-8 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border bg-zinc-50 p-4">
                        <p className="text-sm text-zinc-500">Total Items</p>

                        <h3 className="mt-2 text-3xl font-bold">
                          {totalItems}
                        </h3>
                      </div>

                      <div className="rounded-2xl border bg-zinc-50 p-4">
                        <p className="text-sm text-zinc-500">Products</p>

                        <h3 className="mt-2 text-3xl font-bold">
                          {order?.items?.length}
                        </h3>
                      </div>

                      <div className="rounded-2xl border bg-zinc-50 p-4">
                        <p className="text-sm text-zinc-500">Payment</p>

                        <h3
                          className={`mt-2 text-xl font-bold capitalize ${
                            order.paymentStatus === "paid"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {order.paymentStatus}
                        </h3>
                      </div>

                      <div className="rounded-2xl border bg-zinc-50 p-4">
                        <p className="text-sm text-zinc-500">Method</p>

                        <h3 className="mt-2 text-xl font-bold uppercase">
                          {order.paymentMethod}
                        </h3>
                      </div>
                    </div>

                    <div className="rounded-2xl border bg-zinc-50 p-5">
                      <h3 className="mb-4 text-lg font-bold">
                        Order Information
                      </h3>

                      <div className="space-y-2">
                        <Info title="Order Number" value={order.orderNumber} />

                        <Info
                          title="Order At"
                          value={new Date(order.createdAt).toLocaleString()}
                        />
                        <Info title="Order ID" value={order._id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-10">
              {order.items?.map((item, index) => {
                const originalPrice =
                  item.discountPercentage > 0
                    ? item.price / (1 - item.discountPercentage / 100)
                    : item.price;

                return (
                  <div
                    key={`${item.productId}-${index}`}
                    className="group rounded-2xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:border-zinc-900 hover:shadow-lg"
                  >
                    <div className="flex gap-4">
                      <Image
                        width={300}
                        height={300}
                        src={item.image}
                        alt={item.name}
                        className="h-full w-40 rounded-xl border object-cover"
                      />

                      <div className="flex w-full">
                        <div className="flex items-start w-full gap-6">
                          <div className="w-full">
                            <h3 className="text-lg font-semibold text-zinc-900">
                              {item.name}
                            </h3>

                            <p className="mt-1 font-mono text-xs text-zinc-400">
                              #{item.productId}
                            </p>
                          </div>

                          <div className="mt-5 grid grid-cols-2  w-full gap-3 lg:grid-cols-3">
                            <div className="rounded-xl border bg-zinc-50 p-3">
                              <p className="text-[11px] uppercase tracking-wide text-zinc-400">
                                Size
                              </p>

                              <p className="mt-1 font-semibold">{item.size}</p>
                            </div>

                            <div className="rounded-xl border bg-zinc-50 p-3">
                              <p className="text-[11px] uppercase tracking-wide text-zinc-400">
                                Color
                              </p>

                              <div className="mt-2 flex items-center gap-2">
                                <div
                                  style={{
                                    backgroundColor: item.color,
                                  }}
                                  className="h-5 w-5 rounded-full border"
                                />

                                <span className="text-sm">{item.color}</span>
                              </div>
                            </div>

                            <div className="rounded-xl border bg-zinc-50 p-3">
                              <p className="text-[11px] uppercase tracking-wide text-zinc-400">
                                Discount
                              </p>

                              {item.discountPercentage > 0 ? (
                                <span className="mt-2 inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-600">
                                  {item.discountPercentage}% OFF
                                </span>
                              ) : (
                                <span className="mt-2 inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs">
                                  No Discount
                                </span>
                              )}
                            </div>

                            <div className="rounded-xl border bg-zinc-50 p-3">
                              <p className="text-[11px] uppercase tracking-wide text-zinc-400">
                                Price
                              </p>

                              {item.discountPercentage > 0 ? (
                                <div className="flex gap-3 items-center">
                                  <p className="text-xs text-zinc-400 line-through">
                                    ৳{Math.ceil(originalPrice)}
                                  </p>

                                  <p className="font-semibold text-red-600">
                                    ৳{Math.ceil(item.price)}
                                  </p>
                                </div>
                              ) : (
                                <p className="mt-1 font-semibold">
                                  ৳{Math.ceil(item.price)}
                                </p>
                              )}
                            </div>

                            <div className="rounded-xl border bg-zinc-50 p-3">
                              <p className="text-[11px] uppercase tracking-wide text-zinc-400">
                                Qty
                              </p>

                              <p className="mt-1 text-lg font-bold">
                                ×{item.quantity}
                              </p>
                            </div>

                            <div className="rounded-xl border bg-red-500 p-3 text-white">
                              <p className="text-[11px] uppercase tracking-wide ">
                                Total
                              </p>

                              <p className="mt-1 text-lg font-bold">
                                ৳{Math.ceil(item.subtotal)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Info({ title, value }) {
  return (
    <div>
      <p className="text-sm text-zinc-500">{title}</p>

      <p className="mt-1 break-all font-semibold">{value}</p>
    </div>
  );
}

function Price({ title, value, bold = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-bold" : ""}>{title}</span>

      <span className={bold ? "text-xl font-bold" : "font-medium"}>
        {value}
      </span>
    </div>
  );
}
