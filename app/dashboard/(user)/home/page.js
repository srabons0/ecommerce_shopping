import DashboardNavbar from "@/features/user/DashboardNavbar/DashboardNavbar";
import Dashboard from "@/features/user/home/Dashboard";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import UserOrder from "@/models/UserOrder";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  await connectDB();
  const [order, orderCount, user, userOrders] = JSON.parse(
    JSON.stringify(
      await Promise.all([
        Order.find(
          session.user.id
            ? { user: session.user.id }
            : { "shipping.email": session.user.email },
        )
          .sort({ createdAt: -1 })
          .limit(5)
          .lean(),
        Order.countDocuments(
          session.user.id
            ? { user: session.user.id }
            : { "shipping.email": session.user.email },
        ),
        User.find({ email: session?.user?.email }).lean(),
        UserOrder.countDocuments({
          email: session?.user?.email,
        }),
      ]),
    ),
  );
  return (
    <div>

      <DashboardNavbar
        path="Home"
        name="Dashboard"
        desc="Manage your account and view your orders"
      />
      <Dashboard
        order={order}
        orderCount={orderCount}
        user={user}
        userOrders={userOrders}
      />
    </div>
  );
}
