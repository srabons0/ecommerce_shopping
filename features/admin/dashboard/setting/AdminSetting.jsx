import React from 'react'

function AdminSetting() {
  return (
    <div className="mx-6 mt-10 mb-20">
      <section>


        <div className="grid  gap-6 lg:grid-cols-2">
          

          <div className="rounded-lg border border-white/10 bg-zinc-900 p-6 lg:col-span-2">
            <h2 className="mb-6 text-lg font-semibold text-white">
              General Settings
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Store Name
                </label>

                <input
                  defaultValue="LUXE Maison de Mode"
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-yellow-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Currency
                </label>

                <select className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-yellow-600">
                  <option>EUR (€)</option>
                  <option>USD ($)</option>
                  <option>GBP (£)</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Time Zone
                </label>

                <select className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-yellow-600">
                  <option>Europe/Paris</option>
                  <option>UTC</option>
                  <option>America/New_York</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Language
                </label>

                <select className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-yellow-600">
                  <option>English</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>

            <button className="mt-6 rounded-lg bg-yellow-700 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-yellow-600">
              Save Changes
            </button>
          </div>

          

          <div className="rounded-lg border border-white/10 bg-zinc-900 p-6">
            <h2 className="mb-6 text-lg font-semibold text-white">
              Notifications
            </h2>

            {[
              {
                title: "New Orders",
                desc: "Receive alerts for new orders",
                enabled: true,
              },
              {
                title: "Low Stock",
                desc: "Alert when stock drops below 5",
                enabled: true,
              },
              {
                title: "New Customers",
                desc: "Notify on new signups",
                enabled: false,
              },
              {
                title: "Weekly Report",
                desc: "Email every Monday",
                enabled: true,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between border-b border-white/10 py-4 last:border-none"
              >
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
                </div>

                

                <button
                  className={`relative h-7 w-14 rounded-full transition ${
                    item.enabled ? "bg-yellow-600" : "bg-zinc-700"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                      item.enabled ? "left-8" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          

          <div className="rounded-lg border border-white/10 bg-zinc-900 p-6">
            <h2 className="mb-6 text-lg font-semibold text-white">
              Change Password
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Current Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-yellow-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-yellow-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-yellow-600"
                />
              </div>
            </div>

            <button className="mt-6 rounded-lg bg-yellow-700 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-yellow-600">
              Update Password
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminSetting
