"use client";

import { Skeleton } from "@mui/material";

export default function CartTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i}>
          
          <td className="w-2/5 py-2.5">
            <div className="flex items-center gap-4 px-2">
              <Skeleton
                variant="rounded"
                width={60}
                height={60}
                sx={{ borderRadius: "12px" }}
              />

              <div className="space-y-2">
                <Skeleton variant="text" width={180} height={28} />

                <div className="flex items-center gap-2">
                  <Skeleton variant="circular" width={12} height={12} />

                  <Skeleton variant="text" width={100} height={18} />
                </div>
              </div>
            </div>
          </td>

          
          <td className="text-center">
            <Skeleton
              variant="rounded"
              width={35}
              height={28}
              sx={{ mx: "auto" }}
            />
          </td>

          
          <td className="text-center">
            <Skeleton
              variant="text"
              width={70}
              height={30}
              sx={{ mx: "auto" }}
            />
          </td>

          
          <td className="text-center">
            <Skeleton
              variant="text"
              width={80}
              height={30}
              sx={{ mx: "auto" }}
            />
          </td>

          
          <td className="text-center">
            <Skeleton
              variant="circular"
              width={28}
              height={28}
              sx={{ mx: "auto" }}
            />
          </td>
        </tr>
      ))}
    </>
  );
}
