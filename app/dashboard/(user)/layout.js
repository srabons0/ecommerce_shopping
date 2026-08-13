"use client";

import DashboardLiveRefresh from "@/features/layout/DashboardLiveRefresh";
import MobileSidebar from "@/features/user/sidebar/MobileSidebar";
import Sidebar from "@/features/user/sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="bg-zinc-50">
      <DashboardLiveRefresh />

      <aside className="fixed top-0 left-0 z-40 hidden h-screen w-72 lg:block">
        <Sidebar pathname={pathname} />
      </aside>

      <MobileSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        pathname={pathname}
      />

      <div className="xl:ml-72">
        <main className="min-h-[calc(100vh-72px)]">
          <div className="mx-auto w-full max-w-[1700px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
