"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  BadgeCheck,
  Pencil,
  Copy,
  Save,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserDetailsModal({
  open,
  onOpenChange,
  user,
  setOpen,
}) {
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [role, setRole] = useState(user?.role || "");
  const [status, setStatus] = useState(user?.userStatus || "");
  const router = useRouter();
  if (!user) return null;

  const createdDate = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const createdTime = new Date(user.createdAt).toLocaleTimeString();

  const updatedDate = new Date(user.updatedAt).toLocaleDateString({
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const updatedTime = new Date(user.updatedAt).toLocaleTimeString();

  const handleUpdateRole = async (id, role, status) => {

    try {
      const res = await fetch(`/api/user/statusUpdate/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: role,
          isActive: status === "active",
          userStatus: status,
        }),
      });
      if (!res.ok) {
        throw new Error(result?.error || "Failed to update product");
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-240 bg-black/60 backdrop-blur-md" />

        <Dialog.Content className="fixed top-1/2 left-1/2 z-250 h-[92vh] w-[95vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[32px] border bg-zinc-100 shadow-[0_40px_120px_rgba(0,0,0,.35)] outline-none">
          <div className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur-xl">
            <div className="flex items-center justify-between px-8 py-6">
              <div>
                <Dialog.Title className="text-3xl font-bold">
                  User Details
                </Dialog.Title>

                <p className="mt-2 text-sm text-zinc-500">
                  Complete account information
                </p>
              </div>

              <Dialog.Close
                onClick={() => setOpen(false)}
                className="rounded-xl border bg-white p-3 transition hover:bg-zinc-100"
              >
                <X size={20} />
              </Dialog.Close>
            </div>
          </div>

          <div className="h-[calc(92vh-90px)] overflow-y-auto p-4 pb-20 lg:p-8 lg:pb-0">
            <div className="mb-30 grid gap-8 xl:grid-cols-3">
              <div className="space-y-6">
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                  <div className="flex flex-col items-center">
                    <Image
                      width={150}
                      height={150}
                      src={
                        user.image
                          ? user.image
                          : "https://i.ibb.co.com/NYF9QTQ/images.png"
                      }
                      alt={user.name}
                      className="h-36 w-36 rounded-full border-4 border-white object-cover shadow-lg"
                    />

                    <h2 className="mt-5 text-2xl font-bold">{user.name}</h2>

                    <p className="mt-1 text-zinc-500">{user.email}</p>

                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold uppercase ${
                          user.role === "admin"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-zinc-100 text-zinc-700"
                        } `}
                      >
                        {user.role}
                      </span>

                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold uppercase ${
                          user.userStatus === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        } `}
                      >
                        {user.userStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-lg font-bold">Quick Actions</h2>

                  <div className="space-y-3">
                    <button
                      onClick={() => setOpenRoleModal(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-3 font-semibold text-white transition hover:bg-black"
                    >
                      <Pencil size={18} />
                      Edit User
                    </button>

                    <button
                      onClick={() => navigator.clipboard.writeText(user._id)}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border bg-white py-3 font-medium transition hover:bg-zinc-100"
                    >
                      <Copy size={18} />
                      Copy User ID
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6 xl:col-span-2">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="rounded-xl bg-zinc-100 p-3">
                        <User size={20} />
                      </div>

                      <h2 className="text-lg font-bold">
                        Personal Information
                      </h2>
                    </div>

                    <div className="space-y-5">
                      <Info
                        icon={<User size={18} />}
                        title="Full Name"
                        value={user.name}
                      />

                      <Info
                        icon={<Mail size={18} />}
                        title="Email"
                        value={user.email}
                      />

                      <Info
                        icon={<Phone size={18} />}
                        title="Phone"
                        value={user.number}
                      />

                      <Info
                        icon={<MapPin size={18} />}
                        title="Address"
                        value={user.address}
                      />
                    </div>
                  </div>{" "}
                  <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="rounded-xl bg-zinc-100 p-3">
                        <Shield size={20} />
                      </div>

                      <h2 className="text-lg font-bold">Account Information</h2>
                    </div>

                    <div className="space-y-5">
                      <Info
                        icon={<Shield size={18} />}
                        title="Role"
                        value={user.role}
                      />

                      <Info
                        icon={<BadgeCheck size={18} />}
                        title="Status"
                        value={user.userStatus}
                      />

                      <Info
                        icon={<User size={18} />}
                        title="User ID"
                        value={user._id}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-xl bg-zinc-100 p-3">
                        <Calendar size={20} />
                      </div>

                      <h2 className="text-lg font-bold">Account Created</h2>
                    </div>

                    <div className="space-y-5">
                      <Info title="Date" value={createdDate} />

                      <Info title="Time" value={createdTime} />
                    </div>
                  </div>

                  <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-xl bg-zinc-100 p-3">
                        <Calendar size={20} />
                      </div>

                      <h2 className="text-lg font-bold">Last Updated</h2>
                    </div>

                    <div className="space-y-5">
                      <Info title="Date" value={updatedDate} />

                      <Info title="Time" value={updatedTime} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 flex flex-col items-center justify-between gap-5 border-t bg-white px-8 py-5 lg:flex-row">
            <div className="text-sm text-zinc-500">User ID: {user._id}</div>

            <div className="flex items-center gap-3">
              <Dialog.Close
                onClick={() => setOpen(false)}
                className="rounded-2xl border bg-white px-6 py-3 font-medium transition hover:bg-zinc-100"
              >
                Close
              </Dialog.Close>

              <button
                onClick={() => setOpenRoleModal(true)}
                className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-7 py-3 font-semibold text-white transition hover:bg-black"
              >
                <Pencil size={18} />
                Edit User
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>

      {openRoleModal && (
        <Dialog.Root open={openRoleModal} onOpenChange={setOpenRoleModal}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-255 bg-black/60 backdrop-blur-sm" />

            <Dialog.Content className="fixed top-1/2 left-1/2 z-260 w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl outline-none">
              <div className="border-b px-6 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-zinc-100 p-3">
                      <Shield size={20} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">Edit User Role</h2>

                      <p className="text-sm text-zinc-500">
                        Change user permissions
                      </p>
                    </div>
                  </div>

                  <Dialog.Close className="rounded-xl p-2 transition hover:bg-zinc-100">
                    <X size={20} />
                  </Dialog.Close>
                </div>
              </div>

              <div className="space-y-6 p-6">
                <div className="flex items-center gap-4 rounded-2xl border bg-zinc-50 p-4">
                  <Image
                    width={100}
                    height={100}
                    src={user.image}
                    alt={user.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">{user.name}</h3>

                    <p className="text-sm text-zinc-500">{user.email}</p>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-600">
                    User Role
                  </label>

                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition outline-none focus:border-zinc-900"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-600">
                    Account Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition outline-none focus:border-zinc-900"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t px-6 py-5">
                <Dialog.Close className="rounded-2xl border px-5 py-3 font-medium transition hover:bg-zinc-100">
                  Cancel
                </Dialog.Close>

                <button
                  onClick={() => handleUpdateRole(user._id, role, status)}
                  className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 font-semibold text-white transition hover:bg-black"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </Dialog.Root>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex items-start gap-4">
      {icon && <div className="mt-1 text-zinc-500">{icon}</div>}

      <div className="min-w-0">
        <p className="text-sm text-zinc-500">{title}</p>

        <p className="mt-1 font-semibold break-all">{value}</p>
      </div>
    </div>
  );
}
