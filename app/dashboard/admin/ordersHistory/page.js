import AdminOrderHistory from "@/features/admin/dashboard/orderHistory/AdminOrderHistory";
import AdminHeader from "@/features/admin/layout/AdminHeader";
import { connectDB } from "@/lib/mongodb";
import OrderHistory from "@/models/OrderHistory";

async function page({ searchParams }) {
  const filters = await searchParams;
  const { page, search, status } = filters;

  const productFilters = {
    ...(search && { "shipping.fullName": search }),
    ...(status !== "all" && { orderStatus: status }),
  };
  await connectDB();

  const [order, orderCount, pending, delivered, cancelled] = JSON.parse(
    JSON.stringify(
      await Promise.all([
        OrderHistory.find(productFilters)
          .skip((page - 1) * 40)
          .limit(40)
          .lean(),
        OrderHistory.countDocuments(),
        OrderHistory.countDocuments({ orderStatus: "pending" }),
        OrderHistory.countDocuments({ orderStatus: "delivered" }),
        OrderHistory.countDocuments({ orderStatus: "cancelled" }),
      ]),
    ),
  );
  // console.log(order);
  return (
    <div className="w-full">
      <AdminHeader
        path={"Order"}
        name={" Order Management"}
        desc={"Manage Order methods, billing details, and transaction history."}
      ></AdminHeader>
      <AdminOrderHistory
        order={order}
        orderCount={orderCount}
        pending={pending}
        delivered={delivered}
        cancelled={cancelled}
        filters={filters}
      ></AdminOrderHistory>
    </div>
  );
}

export default page;
