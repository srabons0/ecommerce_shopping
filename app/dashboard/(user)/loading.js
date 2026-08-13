const statSkeletons = [1, 2, 3, 4];

export default function UserDashboardLoading() {
  return (
    <div className="min-h-screen animate-pulse bg-zinc-50">
      <div className="border-b border-zinc-200 bg-white px-6 py-6 lg:px-12">
        <div className="h-3 w-32 rounded bg-zinc-200" />
        <div className="mt-4 h-9 w-56 rounded bg-zinc-300" />
        <div className="mt-3 h-4 w-80 max-w-full rounded bg-zinc-200" />
      </div>
      <main className="space-y-6 p-5 sm:p-8 lg:p-12">
        <div className="h-48 rounded-[28px] bg-zinc-900 p-8">
          <div className="h-3 w-28 rounded bg-zinc-700" />
          <div className="mt-5 h-10 w-80 max-w-full rounded bg-zinc-700" />
          <div className="mt-4 h-4 w-96 max-w-full rounded bg-zinc-800" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statSkeletons.map((item) => (
            <div
              key={item}
              className="h-28 rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <div className="h-3 w-24 rounded bg-zinc-200" />
              <div className="mt-4 h-7 w-20 rounded bg-zinc-300" />
            </div>
          ))}
        </div>
        <div className="rounded-[28px] border border-zinc-200 bg-white p-6">
          <div className="h-6 w-48 rounded bg-zinc-300" />
          <div className="mt-6 space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-16 rounded-xl bg-zinc-100" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
