import DashboardNavbar from "@/features/user/DashboardNavbar/DashboardNavbar";
import OrdersPageClient from "@/features/user/order/OrdersPageClient";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  await connectDB();

  const orders = await Order.find(
    session.user.id
      ? { user: session.user.id }
      : { "shipping.email": session.user.email },
  )
    .sort({ createdAt: -1 })
    .lean();

  const normalizedOrders = orders.map((order) => ({
    ...order,
    shipping: order.shipping || {},
    items: order.items || [],
  }));

  return (
    <div>
      <DashboardNavbar
              path="Orders"
              name="Orders"
              desc="View and manage your orders"
            />
    <OrdersPageClient
      initialOrders={normalizedOrders}
      userName={session.user.name || "there"}
    /></div>
  );
}
