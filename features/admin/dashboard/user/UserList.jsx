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
import UserDetailsModal from "./UserDetailsModal";
import Swal from "sweetalert2";

function UserList({ customer, filters }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const { status } = filters;
  const [hasSearched, setHasSearched] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const handleSearch = async () => {
    setProduct([]);
    setLoading(true);
    await fetch(`/api/user/searchUser?search=${search}`)
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
  const handleUserDelete = async (id) => {
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
            const res = await fetch(`/api/user/delete/${id}`, {
              method: "DELETE",
            });
            if (res.ok && res.status === 200) {
              router.refresh();
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Customer has been deleted.",
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
              text: "Customer is safe",
              icon: "error",
            });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-zinc-100">
      <div className="flex flex-col gap-4 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold text-black">All Customers</h2>
        <div className="flex flex-col items-end gap-3 pb-3 lg:flex-row lg:items-center">
          <div className="relative">
            <InputGroup className="z-100 max-w-xs min-w-70 bg-white text-black">
              <InputGroupInput
                value={search}
                required
                onChange={(e) => {
                  setSearch(e.target.value);
                  search && setHasSearched(false);
                  search && setProduct([]);
                }}
                placeholder="Name or Email..."
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
                    ? "pointer-events-none text-black opacity-30"
                    : "border-l pl-2"
                }`}
                onClick={handleSearch}
                align="inline-end"
              >
                <SiSearxng />
              </InputGroupAddon>
            </InputGroup>

            <div className="scrollbar-hide absolute top-4 z-80 max-h-40 w-full overflow-y-auto rounded-b-md bg-white">
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
                <p className="mt-5 text-center text-gray-500">Not Found</p>
              )}
              <div className="px-1 pt-4">
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
                      className="flex cursor-pointer items-center justify-between border-b py-2 text-sm text-black"
                    >
                      <span className="mr-2 text-xs">{p.name} </span>◕
                      <span className="pl-1 text-xs text-red-500">
                        {p.email}
                      </span>
                      <span className="w-1/6 pl-4 text-green-500">
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
            className="select h-8 w-40 rounded-lg border border-[#6d6d6d] px-3 py-1 text-center text-black"
          >
            {[
              { v: "all", l: "All Status" },
              { v: "active", l: "Active" },
              { v: "inactive", l: "Inactive" },
              { v: "blocked", l: "Blocked" },
              { v: "admin", l: "Admin" },
            ].map((items, i) => (
              <option key={i} className="bg-white text-black" value={items.v}>
                {items.l}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1100px]">
            <thead className="border-b border-zinc-200 bg-zinc-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  Customer
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  Email
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  Spent
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  Orders
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  Member Since
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {customer.map((customer, i) => (
                <tr
                  key={customer._id}
                  className="border-b border-zinc-100 transition-colors hover:bg-zinc-50"
                >
                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-zinc-900">
                      #10{i + 1}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-zinc-900">
                        {customer.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span className="text-sm text-zinc-600">
                      {customer.email}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span className="text-lg font-semibold text-zinc-900">
                      ${customer.totalSpent}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex rounded-full text-sm font-semibold text-zinc-700">
                      {customer.orders}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center text-sm whitespace-nowrap text-zinc-600">
                    {new Date(customer.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                        customer.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.userStatus}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setUser(customer);
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => handleUserDelete(customer._id)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-4 lg:hidden">
          {customer.map((customer, i) => (
            <div
              key={customer._id}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-900">
                    {customer.name}
                  </h3>

                  <p className="text-xs text-zinc-500">#{10 + i}</p>
                </div>

                <span className="text-lg font-bold">
                  ${customer.totalSpent}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-zinc-400">Email</p>
                  <p className="font-medium break-all">{customer.email}</p>
                </div>

                <div>
                  <p className="text-zinc-400">Orders</p>
                  <p className="font-semibold">{customer.orders}</p>
                </div>

                <div>
                  <p className="text-zinc-400">Member Since</p>
                  <p className="font-medium">
                    {new Date(customer.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-400">Status</p>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      customer.isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.userStatus}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setOpen(true);
                    setUser(customer);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 py-3 font-medium text-zinc-700 transition hover:bg-zinc-100"
                >
                  <FaEye />
                  View
                </button>

                <button
                  onClick={() => handleUserDelete(customer._id)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <UserDetailsModal
          open={open}
          setOpen={setOpen}
          user={user}
        ></UserDetailsModal>
      )}
    </div>
  );
}

export default UserList;
