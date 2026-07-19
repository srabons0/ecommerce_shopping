import React from 'react'

function CategoryChart() {
  return (
    <div>
      {" "}
      <div className="rounded border border-white/10 bg-zinc-900 p-6">
        <h3 className="text-[15px] font-semibold text-white">Category Split</h3>

        <p className="mb-5 mt-1 text-xs text-zinc-500">This Month</p>

        {/* Donut */}

        <div className="flex justify-center">
          <div className="relative h-40 w-40">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(#b8953a 0% 35%, #3498db 35% 60%, #22c55e 60% 80%, #ea580c 80% 100%)",
              }}
            />

            <div className="absolute inset-5 rounded-full bg-zinc-900" />
          </div>
        </div>

        {/* Legend */}

        <div className="mt-8 space-y-3">
          <div className="flex items-center text-sm text-zinc-300">
            <span className="mr-3 h-2 w-2 rounded-full bg-yellow-700"></span>
            Blazers
            <span className="ml-auto font-semibold">35%</span>
          </div>

          <div className="flex items-center text-sm text-zinc-300">
            <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
            Dresses
            <span className="ml-auto font-semibold">25%</span>
          </div>

          <div className="flex items-center text-sm text-zinc-300">
            <span className="mr-3 h-2 w-2 rounded-full bg-emerald-500"></span>
            Coats
            <span className="ml-auto font-semibold">20%</span>
          </div>

          <div className="flex items-center text-sm text-zinc-300">
            <span className="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
            Other
            <span className="ml-auto font-semibold">20%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryChart
