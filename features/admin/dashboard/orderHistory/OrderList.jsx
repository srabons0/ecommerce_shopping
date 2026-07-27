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

        <div className="flex items-center pb-3 gap-3">
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
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-zinc-200">
              {[
                "Order ID",
                "Customer",
                "Quantity",
                "Amount",
                "Status",
                "Method",
                "Date",
                "Actions",
              ].map((item) => (
                <th
                  key={item}
                  className="
                  px-6
                  py-4
                  text-center
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-zinc-500
                "
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {order.map((order) => {
              const CurrentIcon = statusConfig[order.orderStatus]?.icon;
              return (
                <tr
                  key={order._id}
                  className="border-b border-white/10 text-center "
                >
                  <td className="px-6 py-5 font-medium text-sm text-zinc-600">
                    {order.orderNumber}
                  </td>

                  <td className="px-6 py-5 text-zinc-600">
                    {order.shipping.fullName}
                  </td>

                  <td className="px-6 py-5 text-zinc-600">
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                  </td>

                  <td className="px-6 py-5 font-semibold text-black">
                    ${order.total}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`flex items-center gap-2 justify-center rounded-full border py-2 text-sm font-semibold
                    ${statusConfig[order.orderStatus]?.color}`}
                    >
                      <CurrentIcon size={18} />

                      <span className="capitalize">{order.orderStatus}</span>
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                    ${
                      order.paymentMethod === "stripe"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : order.paymentMethod === "cod"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-red-500/10 text-red-400"
                    }`}
                    >
                      {order.paymentMethod}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-zinc-600">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="pl-7 py-5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setUserOrder(order);
                        }}
                        className="rounded bg-white px-3 py-2 text-xs text-black/60 font-semibold transition hover:bg-black/10"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleOrderDelete(order._id)}
                        className="rounded bg-red-500/10 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-500/20"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
