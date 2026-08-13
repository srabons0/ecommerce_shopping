"use client";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BsGraphDown, BsPersonCircle } from "react-icons/bs";
import { IoBagHandleSharp } from "react-icons/io5";

export default function AdminHeader({ path, name, desc }) {
  const { data: session } = useSession();
  return (
    <header className="relative lg:pl-20 z-30 lg:flex py-5 items-center justify-between border-b border-gray-200 bg-black px-8 backdrop-blur-xl">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Dashboard</span>
          <ChevronRight size={15} />
          <span className="font-medium text-gray-100"> {path}</span>
        </div>

        <div>
          <h1 className="text-3xl mt-2 font-bold tracking-tight text-gray-100">
            {name}
          </h1>

          <p className="mt-1 text-sm text-gray-500">{desc}</p>
        </div>
      </div>

      <div className="lg:flex hidden items-center gap-4">
        <Link
          href={{
            pathname: "/dashboard/admin/orders",
            query: {
              status: "all",
            },
          }}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white hover:bg-gray-50"
        >
          <IoBagHandleSharp size={19} />

          <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-red-500"></span>
        </Link>

        <Link
          href={"/dashboard/admin/analytics"}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white hover:bg-gray-50"
        >
          <BsGraphDown size={19} />
        </Link>

        <button
          aria-label="profile"
          className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50"
        >
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width={100}
              height={100}
              className="h-10 w-10 object-cover rounded-full"
            />
          ) : (
            <BsPersonCircle className="h-10 w-10 " />
          )}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-gray-900">
              {session?.user?.name}
            </h3>
          </div>
        </button>
      </div>
    </header>
  );
}
