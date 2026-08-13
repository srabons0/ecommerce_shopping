import AdminOrder from "@/features/admin/dashboard/order/AdminOrder";
import AdminHeader from "@/features/admin/layout/AdminHeader";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

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
        Order.find(productFilters)
          .skip((page - 1) * 15)
          .limit(15)
          .lean(),
        Order.countDocuments(status !== "all" && { orderStatus: status }),
        Order.countDocuments({ orderStatus: "pending" }),
        Order.countDocuments({ orderStatus: "delivered" }),
        Order.countDocuments({ orderStatus: "cancelled" }),
      ]),
    ),
  );
  return (
    <div className=" w-full">
      <AdminHeader
        path={"Order"}
        name={" Order Management"}
        desc={"Track customer orders, payments, and fulfillment status."}
      ></AdminHeader>
      <AdminOrder
        order={order}
        orderCount={orderCount}
        pending={pending}
        delivered={delivered}
        cancelled={cancelled}
        filters={filters}
      ></AdminOrder>
    </div>
  );
}

export default page;
