import DashboardNavbar from "@/features/user/DashboardNavbar/DashboardNavbar";
import OrderHistoryPageClient from "@/features/user/orderHistory/OrderHistoryPageClient";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import OrderHistory from "@/models/OrderHistory";
import { getServerSession } from "next-auth";

export default async function OrderHistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id && !session?.user?.email) {
    return null;
  }

  await connectDB();

  const history = JSON.parse(JSON.stringify((await OrderHistory.find(
    session.user.id
      ? { user: session.user.id }
      : { "shipping.email": session.user.email },
  )
    .sort({ createdAt: -1 })
    .lean())));

  const normalizedHistory = history.map((order) => ({
    ...order,
    _id: order._id.toString(),
    user: order.user?.toString(),
    shipping: order.shipping || {},
    items: order.items || [],
  }));

  return (
    <div>
      <DashboardNavbar
        path="Order history"
        name="Order history"
        desc="Revisit every purchase and keep your records in one place"
      />
      <OrderHistoryPageClient
        initialHistory={normalizedHistory}
        userName={session.user.name || "there"}
      />
    </div>
  );
}
