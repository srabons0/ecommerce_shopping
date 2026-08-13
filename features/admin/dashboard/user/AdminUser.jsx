"use client";
import React from "react";
import UserList from "./UserList";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination, Stack } from "@mui/material";

function AdminUser({ customer, customerCount, filters }) {
  const [page, setPage] = useState(1);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set("page", page);
  useEffect(() => {
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [page, pathname, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 100000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="mt-10 mb-20 lg:mx-6 lg:pl-5">
      <section>
        <div className="mx-6 grid grid-cols-2 gap-5 lg:grid-cols-3">
          {[
            {
              value: customerCount,
              title: "Total Customers",
              change: "↑ 8.3%",
              color: "text-emerald-500",
            },
            {
              value: "3,842",
              title: "Active (30 days)",
              change: "↑ 4.1%",
              color: "text-sky-500",
            },
            {
              value: "1,429",
              title: "New This Month",
              change: "↓ 2.1%",
              color: "text-orange-400",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/10 bg-zinc-100 p-4 transition duration-300 hover:-translate-y-1 hover:border-yellow-700/30 lg:p-6"
            >
              <h2 className="text-4xl font-bold text-black">{item.value}</h2>

              <p className="mt-2 text-[8px] tracking-[0.18em] text-zinc-500 uppercase lg:text-xs">
                {item.title}
              </p>

              <p className={`mt-4 text-sm font-medium ${item.color}`}>
                {item.change}
              </p>
            </div>
          ))}
        </div>
        <UserList customer={customer} filters={filters}></UserList>
      </section>
      {customerCount > 25 && (
        <Stack
          spacing={2}
          className="my-10 flex items-center justify-center gap-1"
        >
          <Pagination
            page={page}
            onChange={(event, value) => setPage(value)}
            count={Math.ceil(customerCount / 25)}
            variant="outlined"
            className="custom-pagination"
          />
        </Stack>
      )}
    </div>
  );
}

export default AdminUser;
