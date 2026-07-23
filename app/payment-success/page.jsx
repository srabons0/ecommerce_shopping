import Link from "next/link";

export default async function PaymentSuccessPage({ searchParams }) {
  const { id } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-center text-3xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="mt-4 text-center text-gray-600">
          Thank you for your purchase.
        </p>

        <div className="mt-8 rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">Order ID</p>

          <p className="mt-2 break-all font-semibold">{id}</p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/"
            className="rounded-lg bg-black py-3 text-center text-white"
          >
            Home
          </Link>

          <Link
            href={{
              pathname: "/dashboard/admin/orders",
              query: {
                status: "all",
              },
            }}
            className="rounded-lg border py-3 text-center"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </main>
  );
}
