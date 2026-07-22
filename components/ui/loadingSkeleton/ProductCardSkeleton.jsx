"use client";

import { Skeleton } from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <div className="relative aspect-square">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
        />

        <div className="absolute left-3 top-3">
          <Skeleton variant="rounded" animation="wave" width={80} height={28} />
        </div>

        <div className="absolute bottom-18 right-3">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={110}
            height={26}
          />
        </div>

        <div className="absolute right-3 top-3">
          <Skeleton
            variant="circular"
            animation="wave"
            width={40}
            height={40}
          />
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height={48}
          />
        </div>
      </div>

      <div className="space-y-4 p-5">
        <Skeleton variant="text" animation="wave" width={90} height={20} />

        <div className="flex justify-between gap-3">
          <Skeleton variant="text" animation="wave" width={170} height={32} />

          <div className="flex flex-col items-end">
            <Skeleton variant="text" animation="wave" width={45} height={18} />
            <Skeleton variant="text" animation="wave" width={60} height={28} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Skeleton variant="text" animation="wave" width={90} height={24} />

          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                variant="circular"
                animation="wave"
                width={14}
                height={14}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
