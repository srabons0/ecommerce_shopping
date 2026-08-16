"use client";

import Logout from "@/components/shared/Logout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import {
  FiCamera,
  FiCheckCircle,
  FiEdit3,
  FiHeart,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiShield,
  FiUpload,
} from "react-icons/fi";

export default function ProfilePageClient({ initialUser = {} }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(initialUser);
  console.log(user)
  const [form, setForm] = useState(() => ({
    name: initialUser.name || "",
    number: initialUser.number || "",
    address: initialUser.address || "",
    image: initialUser.image || "",
  }));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleSave = async (event) => {
    event.preventDefault();
    if (!session?.user?.email) return;

    setSaving(true);

    try {
      let imageUrl = "";
      const selectedImage = form.image;

      if (selectedImage && selectedImage.startsWith("blob:")) {
        const file = await fetch(selectedImage).then((res) => res.blob());
        const formData = new FormData();
        formData.append("image", file);

        const uploadResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          },
        );

        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult?.data?.url || "";
      } else if (selectedImage) {
        imageUrl = selectedImage;
      }

      const payload = {
        ...form,
        image: imageUrl || form.image,
      };

      const response = await fetch(
        `/api/user/updateProfile?email=${encodeURIComponent(session.user.email)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        router.refresh();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setSaving(false);
    }
  };

  const stats = useMemo(
    () => [
      { label: "Orders", value: user.orders || 0, icon: FiPackage },
      { label: "Wishlist", value: user?.wishlist.length || 0, icon: FiHeart },
    ],
    [user.orders, user.wishlist],
  );

  const displayName = useMemo(() => {
    if (user.name) return user.name;
    if (session?.user?.name) return session.user.name;
    return "User";
  }, [session, user.name]);

  const profileImage = useMemo(() => {
    if (user.image) return user.image;
    if (session?.user?.image) return session.user.image;
    return "";
  }, [session, user.image]);

  const handleImageSelection = (file) => {
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: previewUrl }));
    setUser((prev) => ({ ...prev, image: previewUrl }));
  };

  const handleFileInput = (event) => {
    const file = event.target.files?.[0];
    handleImageSelection(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    handleImageSelection(file);
  };

  return (
    <div className="space-y-6 p-4 pb-15 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-sm">
        <div className="bg-linear-to-r from-red-600 to-orange-500 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.24em] text-white/80 uppercase">
                My account
              </p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Personal profile
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/75 sm:text-base">
                Keep your contact details up to date and manage your account in
                one place.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-sm text-white/75">Member since</p>
              <p className="mt-1 text-lg font-semibold">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recently joined"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-zinc-200 shadow-sm">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt={displayName}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-zinc-600">
                      {displayName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg">
                    <FiCamera className="h-4 w-4" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold text-zinc-900">
                      {displayName}
                    </h2>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold tracking-[0.2em] text-emerald-700 uppercase">
                      {user.role || "user"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600">{user.email}</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-zinc-700 shadow-sm">
                    <FiShield className="h-4 w-4 text-violet-600" />
                    Account active and verified
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-zinc-200 bg-white p-4"
                    >
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </div>
                      <p className="mt-2 text-2xl font-semibold text-zinc-900">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 hidden items-center justify-center lg:flex">
                <Logout></Logout>
              </div>
            </div>

            <form
              onSubmit={handleSave}
              className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900">
                    Profile details
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    Update your personal information.
                  </p>
                </div>
                <div className="rounded-full bg-violet-50 p-2 text-violet-600">
                  <FiEdit3 className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-700">
                    Full name
                  </span>
                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm transition outline-none focus:border-violet-500 focus:bg-white"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-700">
                    Phone number
                  </span>
                  <div className="relative">
                    <FiPhone className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <input
                      value={form.number}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          number: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pr-4 pl-10 text-sm transition outline-none focus:border-violet-500 focus:bg-white"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-700">
                    Address
                  </span>
                  <div className="relative">
                    <FiMapPin className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-zinc-400" />
                    <textarea
                      value={form.address}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          address: event.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pr-4 pl-10 text-sm transition outline-none focus:border-violet-500 focus:bg-white"
                    />
                  </div>
                </label>

                <div className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-700">
                    Profile image
                  </span>
                  <div
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[20px] border border-dashed px-4 py-6 text-center transition ${
                      dragActive
                        ? "border-violet-500 bg-violet-50"
                        : "border-zinc-300 bg-zinc-50 hover:border-violet-500 hover:bg-white"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FiUpload className="h-5 w-5 text-violet-600" />
                    <p className="text-sm font-medium text-zinc-700">
                      Drop your image here or click to browse
                    </p>
                    <p className="text-xs text-zinc-500">PNG, JPG, or WebP</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
                {saved && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                    <FiCheckCircle className="h-4 w-4" />
                    Profile updated
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="mt-6 flex items-center justify-center lg:hidden">
        <Logout></Logout>
      </div>
    </div>
  );
}
