import React from 'react'

function RevenueChart() {
  return (
    <div className="rounded border border-white/10 bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-white">
            Revenue Overview
          </h3>

          <p className="mt-1 text-xs text-zinc-500">Monthly 2025</p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-full border border-yellow-700/30 bg-yellow-700/10 px-4 py-1 text-xs text-yellow-500">
            Monthly
          </button>

                  <button className="rounded-full border border-white/10 px-4 py-1 text-xs text-zinc-400 hover:border-yellow-600 hover:text-yellow-500">
            Yearly
          </button>
        </div>
      </div>

      {/* Bars */}

      <div className="flex h-44 items-end gap-3">
        {[60, 75, 90, 55, 82, 70, 100, 78, 84, 66, 92, 72].map(
          (value, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className="w-full rounded-t bg-yellow-700 transition-all hover:bg-yellow-600"
                style={{
                  height: `${value}%`,
                }}
              />
            </div>
          ),
        )}
      </div>

      {/* Month Labels */}

      <div className="mt-3 flex text-center text-[10px] text-zinc-500">
        {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map(
          (m) => (
            <div key={m} className="flex-1">
              {m}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default RevenueChart
