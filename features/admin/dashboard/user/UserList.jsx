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
        <div className="flex items-center pb-3 gap-3">
          <div className="relative">
            <InputGroup className="min-w-70 max-w-xs z-100 text-black bg-white">
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
                      <span className="mr-2 text-xs">{p.name} </span>◕
                      <span className="text-red-500 text-xs  pl-1">
                        {p.email}
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
              { v: "active", l: "Active" },
              { v: "inactive", l: "Inactive" },
              { v: "blocked", l: "Blocked" },
              { v: "admin", l: "Admin" },
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
          <thead className="border-b border-white/10 bg-zinc-200">
            <tr>
              {[
                "id",
                "Customer",
                "Email",
                "Spent",
                "Orders",
                "Member Since",
                "Status",
                "Action",
              ].map((head) => (
                <th
                  key={head}
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
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {customer.map((customer, i) => (
              <tr
                key={i}
                className="
                border-t-2
                border-black/20
                transition
text-center
              "
              >
                <td className="text-xs text-gray-500 px-4">#10{i + 1}</td>
                <td className="px-3 py-5 ">
                  <span className="font-semibold text-black">
                    {customer.name}
                  </span>
                </td>
                <td className="px-6 py-5 text-zinc-500">{customer.email}</td>
                <td className="px-6 py-5 font-semibold text-black">
                  ${customer?.totalSpent}
                </td>
                <td className="px-6 py-5 text-zinc-500">{customer?.orders}</td>
                <td className="px-6 py-5 text-zinc-600">
                  {new Date(customer.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full uppercase px-3 py-1 text-xs font-semibold ${
                      customer.isActive === true
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {customer.userStatus}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setOpen(true);
                        setUser(customer);
                      }}
                      className="rounded bg-white px-3 py-2 text-xs text-black/60 font-semibold transition hover:bg-black/10"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleUserDelete(customer._id)}
                      className="rounded bg-red-500/10 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-500/20"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
