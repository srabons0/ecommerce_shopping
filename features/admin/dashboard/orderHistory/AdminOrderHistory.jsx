import React from "react";
import OrderList from "./OrderList";

function AdminOrderHistory({
  order,
  orderCount,
  pending,
  delivered,
  cancelled,
  filters,
}) {
  return (
    <div className="mx-6 mt-10 mb-20 lg:pl-5">
      <section>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              value: orderCount,
              title: "Total Orders",
              icon: "📦",
            },
            {
              value: pending,
              title: "Pending Orders",
              icon: "🕓",
            },
            {
              value: delivered,
              title: "Shipped Orders",
              icon: "🚚",
            },
            {
              value: cancelled,
              title: "Cancelled Orders",
              icon: "❌",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/10 bg-zinc-100 p-3 transition duration-300 hover:-translate-y-1 hover:border-yellow-700/30 lg:p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold text-black">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-[8px] tracking-[0.18em] text-zinc-500 uppercase lg:text-xs">
                    {item.title}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded border-2 text-lg">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        <OrderList order={order} filters={filters}></OrderList>
      </section>
    </div>
  );
}

export default AdminOrderHistory;
