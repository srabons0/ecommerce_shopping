import React from 'react'

function AdminAnalytics() {
  return (
    <div  className="mx-6 mt-10 mb-20">
      <section>
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            {
              title: "Top Products",
              items: [
                "Noir Silk Blazer — 234 sales, $67,626",
                "Cashmere Turtleneck — 198 sales, $38,610",
                "Oversized Coat — 167 sales, $82,665",
                "Linen Summer Dress — 143 sales, $31,460",
              ],
            },
            {
              title: "Traffic Sources",
              items: [
                "Organic Search — 42%, ↑3.2%",
                "Social Media — 28%, ↑5.8%",
                "Direct — 18%, ↓1.1%",
                "Email — 12%, ↑0.4%",
              ],
            },
            {
              title: "Top Countries",
              items: [
                "France — 38%",
                "United Kingdom — 22%",
                "United States — 19%",
                "Germany — 12%",
                "Other — 9%",
              ],
            },
            {
              title: "Device Breakdown",
              items: ["Mobile — 58%", "Desktop — 32%", "Tablet — 10%"],
            },
          ].map((card) => (
            <div
              key={card.title}
              className="
          rounded-lg
          border
          border-white/10
          bg-zinc-900
          p-6
          transition
          duration-300
          hover:border-yellow-700/30
          hover:-translate-y-1
        "
            >
              {/* Title */}

              <h3 className="mb-6 text-lg font-semibold text-white">
                {card.title}
              </h3>

              {/* Items */}

              <div className="space-y-4">
                {card.items.map((item, index) => (
                  <div
                    key={item}
                    className="
                flex
                items-center
                justify-between
                gap-4
                border-b
                border-white/10
                pb-4
                last:border-none
                last:pb-0
              "
                  >
                    <p className="flex-1 text-sm text-zinc-300">{item}</p>

                    {/* Progress */}

                    <div className="h-1 w-20 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-yellow-600"
                        style={{
                          width: `${95 - index * 18}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminAnalytics
