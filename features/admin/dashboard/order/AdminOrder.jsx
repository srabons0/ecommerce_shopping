"use client";
import React, { useState, useEffect } from "react";
import OrderList from "./OrderList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination, Stack } from "@mui/material";

function AdminOrder({
  order,
  orderCount,
  pending,
  delivered,
  cancelled,
  filters,
}) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set("page", page);
  useEffect(() => {
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [page, pathname, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 10000);

    return () => clearInterval(interval);
  }, [router]);
  return (
    <div className="mx-6 mt-10 mb-20">
      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              className="
          rounded-lg
          border
          border-white/10
          bg-zinc-100
          p-6
          transition
          duration-300
          hover:-translate-y-1
          hover:border-yellow-700/30
        "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold text-black">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-500">
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
              border-2
              text-lg
            "
                >
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        <OrderList
          order={order}
          orderCount={orderCount}
          filters={filters}
        ></OrderList>
      </section>
      <div className="flex justify-center">
        {orderCount > 15 && (
          <Stack
            spacing={2}
            className="gap-1 flex my-5 justify-center items-center "
          >
            <Pagination
              page={page}
              onChange={(event, value) => setPage(value)}
              count={Math.ceil(orderCount / 15)}
              variant="outlined"
              className="custom-pagination"
            />
          </Stack>
        )}
      </div>
    </div>
  );
}

export default AdminOrder;
