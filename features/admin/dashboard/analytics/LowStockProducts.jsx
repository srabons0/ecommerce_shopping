"use client";

import { AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function LowStockProducts({ products }) {
  const getStatus = (stock) => {
    if (stock <= 2) {
      return {
        label: "Critical",
        color: "bg-red-100 text-red-700 border-red-200",
        progress: "bg-red-500",
      };
    }

    if (stock <= 5) {
      return {
        label: "Low",
        color: "bg-orange-100 text-orange-700 border-orange-200",
        progress: "bg-orange-500",
      };
    }

    return {
      label: "Warning",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      progress: "bg-yellow-500",
    };
  };

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 p-6">
        <div>
          <h2 className=" text-lg lg:text-xl font-bold text-zinc-900">
            Low Stock Products
          </h2>

          <p className="mt-1 text-xs lg:text-sm text-zinc-500">
            Products that require restocking soon
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-2 py-1 lg:px-4 lg:py-2">
          <AlertTriangle className="text-red-500" size={18} />

          <span className="font-semibold text-red-600">
            {products.length} Alerts
          </span>
        </div>
      </div>

      <div className="divide-y divide-zinc-100">
        {products.map((product) => {
          const status = getStatus(product.stock);

          return (
            <div
              key={product._id}
              className="flex items-center gap-5 p-5 transition hover:bg-zinc-50"
            >
              <Image
                width={100}
                height={100}
                src={product.image}
                alt={product.name}
                className="h-16 w-16 rounded-2xl object-cover border"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900">{product.name}</h3>

                <p className="mt-1 text-sm text-zinc-500">{product.gender}</p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className={`h-full ${status.progress}`}
                    style={{
                      width: `${Math.min((product.stock / 20) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="hidden w-24 text-center md:block">
                <p className="text-sm text-zinc-500">Price</p>

                <p className="font-semibold">
                  ৳{product.price.toLocaleString()}
                </p>
              </div>

              <div className="w-24 text-center">
                <p className="text-sm text-zinc-500">Stock</p>

                <p className="text-xl font-bold">{product.stock}</p>
              </div>

              <div>
                <span
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${status.color}`}
                >
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
