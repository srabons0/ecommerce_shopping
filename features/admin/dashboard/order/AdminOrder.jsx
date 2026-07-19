import React from "react";
import OrderList from "./OrderList";

function AdminOrder() {
  return (
    <div className="mx-6 mt-10 mb-20">
      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              value: "1,284",
              title: "Total Orders",
              icon: "📦",
            },
            {
              value: "24",
              title: "Pending Orders",
              icon: "⏳",
            },
            {
              value: "156",
              title: "Shipped Orders",
              icon: "🚚",
            },
            {
              value: "18",
              title: "Cancelled Orders",
              icon: "❌",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
          rounded
          border
          border-white/10
          bg-zinc-900
          p-5
          transition
          hover:-translate-y-1
          hover:border-yellow-700/30
        "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    {item.title}
                  </p>
                </div>

                <div
                  className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded
              bg-zinc-800
              text-lg
            "
                >
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        <OrderList></OrderList>
      </section>
    </div>
  );
}

export default AdminOrder;
