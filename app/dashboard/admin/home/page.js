import DashboardHome from "@/features/admin/dashboard/home/DashboardHome";
import AdminHeader from "@/features/admin/layout/AdminHeader";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

async function page() {
  await connectDB;

  const order = await Order.find().sort({ createdAt: -1 }).limit(5).lean();

  return (
    <div className=" w-full">
      <AdminHeader
        path={"Home"}
        name={"Admin Home "}
        desc={
          "Monitor sales, orders, revenue, and store performance in real time."
        }
      ></AdminHeader>
      <DashboardHome order={order}></DashboardHome>
    </div>
  );
}

export default page;
