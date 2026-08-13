const statSkeletons = [1, 2, 3, 4];

export default function AdminDashboardLoading() {
  return (
    <div className="min-h-screen animate-pulse bg-zinc-50 lg:pl-4">
      <div className="border-b border-zinc-200 bg-white px-6 py-6 lg:px-10">
        <div className="h-3 w-28 rounded bg-zinc-200" />
        <div className="mt-4 h-9 w-64 rounded bg-zinc-300" />
        <div className="mt-3 h-4 w-96 max-w-full rounded bg-zinc-200" />
      </div>
      <main className="space-y-6 p-5 sm:p-8 lg:p-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statSkeletons.map((item) => (
            <div
              key={item}
              className="h-32 rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <div className="h-3 w-28 rounded bg-zinc-200" />
              <div className="mt-5 h-8 w-24 rounded bg-zinc-300" />
            </div>
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="h-80 rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="h-6 w-48 rounded bg-zinc-300" />
            <div className="mt-8 h-56 rounded-xl bg-zinc-100" />
          </div>
          <div className="h-80 rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="h-6 w-40 rounded bg-zinc-300" />
            <div className="mt-8 space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-10 rounded-lg bg-zinc-100" />
              ))}
            </div>
          </div>
        </div>
        <div className="h-56 rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="h-6 w-44 rounded bg-zinc-300" />
          <div className="mt-6 h-32 rounded-xl bg-zinc-100" />
        </div>
      </main>
    </div>
  );
}
