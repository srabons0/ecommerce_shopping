import {
  Package,

  CreditCard,
  MapPin,
  User,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

const ORDER_STATUS = [
  "pending",
  "confirmed",
  "processing",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  confirmed: "bg-blue-100 text-blue-700 border-blue-300",
  processing: "bg-violet-100 text-violet-700 border-violet-300",
  packed: "bg-indigo-100 text-indigo-700 border-indigo-300",
  shipped: "bg-cyan-100 text-cyan-700 border-cyan-300",
  delivered: "bg-green-100 text-green-700 border-green-300",
  cancelled: "bg-red-100 text-red-700 border-red-300",
};

export default function OrderDetails({ order }) {
  const currentIndex = ORDER_STATUS.indexOf(order.orderStatus);

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm border">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Order Details</h1>

              <p className="mt-2 text-zinc-500">#{order.orderNumber}</p>
            </div>

            <span
              className={`rounded-full border px-5 py-2 font-semibold capitalize ${statusColors[order.orderStatus]}`}
            >
              {order.orderStatus}
            </span>
          </div>

          <div className="mt-10">
            <div className="flex flex-wrap gap-4">
              {ORDER_STATUS.map((status, index) => {
                const active = index <= currentIndex;

                return (
                  <div
                    key={status}
                    className={`flex-1 min-w-[120px] rounded-2xl border p-4 transition

                    ${active ? "border-black bg-black text-white" : "bg-white"}

                    `}
                  >
                    <div className="mb-2 flex justify-center">
                      <CheckCircle2 size={24} />
                    </div>

                    <p className="text-center text-sm">Step {index + 1}</p>

                    <h3 className="mt-1 text-center font-semibold capitalize">
                      {status}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <User />

              <h2 className="text-xl font-bold">Customer</h2>
            </div>

            <div className="space-y-4">
              <Info title="Name" value={order?.shipping?.fullName} />

              <Info title="Email" value={order?.shipping?.email} />

              <Info title="Phone" value={order?.shipping?.phone} />

              <Info title="User ID" value={order?.user} />
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <MapPin />

              <h2 className="text-xl font-bold">Shipping</h2>
            </div>

            <div className="space-y-4">
              <Info title="Address" value={order.shipping?.address} />

              <Info title="City" value={order.shipping?.city} />

              <Info title="Postal Code" value={order.shipping?.postalCode} />

              <Info title="Shipping Fee" value={`৳${order?.shippingFee}`} />
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <CreditCard />

              <h2 className="text-xl font-bold">Payment</h2>
            </div>

            <div className="space-y-4">
              <Info title="Method" value={order.paymentMethod} />

              <Info title="Status" value={order.paymentStatus} />

              <Info title="Currency" value={order.currency} />

              <Info
                title="Paid At"
                value={new Date(order.paidAt).toLocaleString()}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <Package />

              <h2 className="text-xl font-bold">Order Summary</h2>
            </div>

            <div className="space-y-4">
              <Price title="Subtotal" value={order.subtotal} />

              <Price title="Shipping" value={order.shippingFee} />

              <Price title="Tax" value={order.tax} />

              <Price title="Discount" value={order.discount} />

              <hr />

              <Price title="Grand Total" value={order.total} bold />
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">Update Status</h2>

            <select
              defaultValue={order.orderStatus}
              className="w-full rounded-xl border p-3 outline-none"
            >
              {ORDER_STATUS.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>

            <button className="mt-6 w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:opacity-90">
              Update Order Status
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-xl font-bold">Ordered Products</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="p-4 text-left">Product</th>

                  <th>Size</th>

                  <th>Colour</th>

                  <th>Price</th>

                  <th>Qty</th>

                  <th>Discount</th>

                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {order?.items?.map((item) => (
                  <tr
                    key={item.productId + item.size}
                    className="border-b hover:bg-zinc-50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <Image height={100} width={100}
                          alt={item.name}
                          src={item.image}
                          className="h-20 w-16 rounded-xl object-cover"
                        />

                        <div>
                          <h3 className="font-semibold">{item.name}</h3>

                          <p className="text-sm text-zinc-500">{item.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td>{item.size}</td>

                    <td>
                      <div
                        style={{
                          background: item.color,
                        }}
                        className="mx-auto h-7 w-7 rounded-full border"
                      />
                    </td>

                    <td>৳{item.price}</td>

                    <td>{item.quantity}</td>

                    <td>{item.discountPercentage}%</td>

                    <td className="font-semibold">৳{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div>
      <p className="text-sm text-zinc-500">{title}</p>

      <p className="mt-1 font-semibold break-all">{value}</p>
    </div>
  );
}

function Price({ title, value, bold = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-bold" : ""}>{title}</span>

      <span className={bold ? "font-bold text-lg" : ""}>৳{value}</span>
    </div>
  );
}
