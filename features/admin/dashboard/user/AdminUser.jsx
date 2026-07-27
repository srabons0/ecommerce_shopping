"use client";
import React from "react";
import UserList from "./UserList";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  return (
    <div className="mx-6 mt-10 mb-20">
      <section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
              <h2 className="text-4xl font-bold text-black">{item.value}</h2>

              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-500">
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
    </div>
  );
}

export default AdminUser;
