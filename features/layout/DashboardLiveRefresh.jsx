"use client";

import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

const REFRESH_INTERVAL = 30_000;

export default function DashboardLiveRefresh() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState !== "visible") return;

      startTransition(() => {
        router.refresh();
      });
    };

    const interval = window.setInterval(refresh, REFRESH_INTERVAL);

    document.addEventListener("visibilitychange", refresh);

    return () => {
      window.clearInterval(interval);

      document.removeEventListener("visibilitychange", refresh);
    };
  }, [router]);

  return null;
}
