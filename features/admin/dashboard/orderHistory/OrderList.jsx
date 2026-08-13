"use client";
import React from "react";
import { SiSearxng } from "react-icons/si";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ImCancelCircle } from "react-icons/im";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { FaArrowRight, FaEye, FaTrash } from "react-icons/fa";
import { Hourglass } from "react-loader-spinner";
import OrderDetailsModal from "./OrderDetailsModal";
import { Package2, Truck, Clock3, CheckCircle2, Ban } from "lucide-react";
import Swal from "sweetalert2";


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

function OrderList({ order, filters }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [userOrder, setUserOrder] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { status } = filters;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleSearch = async () => {
    setProduct([]);
    setLoading(true);
    await fetch(`/api/orders/searchOrder?search=${search}`)
      .then((res) => res.json())
      .then(setProduct);
    setLoading(false);
    setHasSearched(true);
  };
  const handleCancelSearch = () => {
    setSearch("");
    setProduct([]);
    setLoading(false);
    setHasSearched(false);
  };

  const handleOrderDelete = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton:
            "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ml-2",
          cancelButton:
            "px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const res = await fetch(`/api/orderHistory/delete/${id}`, {
              method: "DELETE",
            });
            if (res.ok && res.status === 200) {
              router.refresh();
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Order has been deleted.",
                icon: "success",
                customClass: {
                  confirmButton:
                    "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-2",
                },
              });
            }
          } else if (result.dismiss === Swal.DismissReason.cancel)
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Order is safe",
              icon: "error",
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-6 overflow-hidden rounded border border-white/10 bg-zinc-100">
      <div className="flex flex-col gap-4 border-b border-white/10 p-6 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-lg font-semibold text-black">All Orders</h2>

        <div className="flex flex-col lg:flex-row items-end lg:items-center pb-3 gap-3">
          <div className="relative ">
            <InputGroup className="min-w-70 max-w-xs z-100 text-black bg-white">
              <InputGroupInput
                value={search}
                required
                onChange={(e) => {
                  setSearch(e.target.value);
                  search && setHasSearched(false);
                  search && setProduct([]);
                }}
                placeholder="Name, Id or Phone"
              />

              <InputGroupAddon
                className="cursor-pointer"
                onClick={() => handleCancelSearch()}
                align="inline-end"
              >
                {search && <ImCancelCircle />}
              </InputGroupAddon>
              <InputGroupAddon
                className={`cursor-pointer text-black ${
                  !search.trim()
                    ? "opacity-30 pointer-events-none text-black"
                    : "border-l pl-2"
                }`}
                onClick={handleSearch}
                align="inline-end"
              >
                <SiSearxng />
              </InputGroupAddon>
            </InputGroup>

            <div className=" absolute  z-80 max-h-40 top-4 rounded-b-md bg-white w-full overflow-y-auto    scrollbar-hide">
              {loading && (
                <div className="flex justify-center pt-8">
                  <Hourglass
                    visible={true}
                    height="18"
                    width="18"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#ffffff", "#ffffff"]}
                  />
                </div>
              )}
              {!loading && hasSearched && product.length <= 0 && search && (
                <p className="text-center mt-5 text-gray-500 ">Not Found</p>
              )}
              <div className="px-1 pt-4 ">
                {(loading || product.length > 0) &&
                  product.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => {
                        params.set("search", p.name);
                        router.push(`${pathname}?${params}`);
                        setSearch("");
                        setProduct([]);
                        setLoading(false);
                        setHasSearched(false);
                      }}
                      className="border-b py-2 flex items-center  justify-between cursor-pointer text-sm text-black"
                    >
                      <span className="mr-2 text-xs">
                        {p.shipping.fullName}{" "}
                      </span>
                      ◕
                      <span className="text-red-500 text-xs  pl-1">
                        {p.orderNumber}
                      </span>
                      <span className="text-green-500 w-1/6 pl-4">
                        <FaArrowRight />
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <select
            value={status}
            onChange={(e) => {
              params.set("status", e.target.value);
              params.set("page", 1);
              router.push(`${pathname}?${params}`);
            }}
            className="select rounded-lg w-40 h-8  text-black text-center px-3 py-1 border-[#6d6d6d] border "
          >
            {[
              { v: "all", l: "All Status" },
              { v: "pending", l: "Pending" },
              { v: "confirmed", l: "Confirmed" },
              { v: "processing", l: "Processing" },
              { v: "delivered", l: "Delivered" },
            ].map((items, i) => (
              <option key={i} className="bg-white text-black " value={items.v}>
                {items.l}
              </option>
            ))}
          </select>
        </div>
      </div>
       <div className="rounded-2xl border  border-zinc-200 bg-white shadow-sm overflow-hidden">
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-[1100px] w-full">
                  <thead className="bg-zinc-50 border-b border-zinc-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Order
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Items
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Total
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Payment
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Date
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {order.map((order) => {
                      const CurrentIcon = statusConfig[order.orderStatus]?.icon;

                      return (
                        <tr
                          key={order._id}
                          className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
                        >
                          <td className="px-6 py-5">
                            <div className="font-semibold text-xs text-zinc-900">
                              #{order.orderNumber}
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div>
                                <p className="font-medium text-zinc-900">
                                  {order.shipping.fullName}
                                </p>

                                {order.shipping.email && (
                                  <p className="text-xs text-zinc-500">
                                    {order.shipping.email}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5 text-center">
                            <span className="inline-flex rounded-full  text-sm font-semibold text-zinc-700">
                              {order.items.reduce(
                                (acc, item) => acc + item.quantity,
                                0,
                              )}{" "}
                              Items
                            </span>
                          </td>

                          <td className="px-6 py-5 text-center">
                            <span className="font-semibold text-lg text-zinc-900">
                              ${Number(order.total).toFixed(2)}
                            </span>
                          </td>

                          <td className="px-6 py-5 text-center">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${statusConfig[order.orderStatus]?.color}`}
                            >
                              {CurrentIcon && <CurrentIcon size={16} />}
                              <span className="capitalize">{order.orderStatus}</span>
                            </span>
                          </td>

                          <td className="px-6 py-5 text-center">
                            <span
                              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide
                        ${
                          order.paymentMethod === "stripe"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.paymentMethod === "cod"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                        }`}
                            >
                              {order.paymentMethod}
                            </span>
                          </td>

                          <td className="px-6 py-5 text-center whitespace-nowrap text-sm text-zinc-600">
                            {new Date(order.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => {
                                  setOpen(true);
                                  setUserOrder(order);
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                              >
                                <FaEye />
                              </button>

                              <button
                                onClick={() => handleOrderDelete(order._id, order)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition-all hover:bg-red-100"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 p-4 lg:hidden">
                {order.map((order) => {
                  const CurrentIcon = statusConfig[order.orderStatus]?.icon;

                  return (
                    <div
                      key={order._id}
                      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="font-semibold text-zinc-900">
                              {order.shipping.fullName}
                            </h3>

                            <p className="text-xs text-zinc-500">
                              #{order.orderNumber}
                            </p>
                          </div>
                        </div>

                        <span className="font-bold text-lg">
                          ${Number(order.total).toFixed(2)}
                        </span>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-zinc-400">Items</p>
                          <p className="font-semibold">
                            {order.items.reduce(
                              (acc, item) => acc + item.quantity,
                              0,
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-zinc-400">Payment</p>

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                      ${
                        order.paymentMethod === "stripe"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.paymentMethod === "cod"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }`}
                          >
                            {order.paymentMethod}
                          </span>
                        </div>

                        <div className="col-span-2">
                          <p className="text-zinc-400 mb-2">Status</p>

                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${statusConfig[order.orderStatus]?.color}`}
                          >
                            {CurrentIcon && <CurrentIcon size={16} />}
                            {order.orderStatus}
                          </span>
                        </div>

                        <div className="col-span-2">
                          <p className="text-zinc-400">Order Date</p>

                          <p className="font-medium">
                            {new Date(order.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={() => {
                            setOpen(true);
                            setUserOrder(order);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-zinc-200 py-3 font-medium text-zinc-700 transition hover:bg-zinc-100"
                        >
                          <FaEye />
                          View
                        </button>

                        <button
                          onClick={() => handleOrderDelete(order._id, order)}
                          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
      {open && (
        <OrderDetailsModal
          open={open}
          setOpen={setOpen}
          order={userOrder}
        ></OrderDetailsModal>
      )}
    </div>
  );
}

export default OrderList;
