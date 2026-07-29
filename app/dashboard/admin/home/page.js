import DashboardHome from "@/features/admin/dashboard/home/DashboardHome";
import AdminHeader from "@/features/admin/layout/AdminHeader";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import OrderHistory from "@/models/OrderHistory";
import Product from "@/models/Product";
import User from "@/models/User";

async function page() {
  await connectDB();
  const [
    productRating,
    totalRevenue,
    categoryStats,monthlyRevenue,
    order,
    orderCount,
    userCount,
  ] = JSON.parse(
    JSON.stringify(
      await Promise.all([
        Product.aggregate([
          {
            $group: {
              _id: null,
              averageRating: { $avg: "$ratings.average" },
              totalProduct: { $sum: 1 },
            },
          },
        ]),
        OrderHistory.aggregate([
          {
            $group: {
              _id: null,
              totalPrice: { $sum: "$total" },
            },
          },
        ]),
        OrderHistory.aggregate([
          {
            $unwind: "$items",
          },
          {
            $group: {
              _id: "$items.subCategory",
              totalRevenue: {
                $sum: {
                  $multiply: ["$items.price", "$items.quantity"],
                },
              },
              totalSold: {
                $sum: "$items.quantity",
              },
            },
          },
          {
            $project: {
              _id: 0,
              name: "$_id",
              revenue: "$totalRevenue",
              sold: "$totalSold",
            },
          },
        ]),
        OrderHistory.aggregate([
          {
            $group: {
              _id: {
                $month: "$createdAt",
              },
              revenue: {
                $sum: "$total",
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]),
        Order.find().sort({ createdAt: -1 }).limit(5).lean(),
        Order.countDocuments(),
        User.countDocuments(),
      ]),
    ),
  );

  console.log(categoryStats);
  return (
    <div className=" w-full">
      <AdminHeader
        path={"Home"}
        name={"Admin Home "}
        desc={
          "Monitor sales, orders, revenue, and store performance in real time."
        }
      ></AdminHeader>
      <DashboardHome
        order={order}
        totalRevenue={totalRevenue}
        productRating={productRating}
        orderCount={orderCount}
        userCount={userCount}
        categoryStats={categoryStats}
        monthlyRevenue={monthlyRevenue}
      ></DashboardHome>
    </div>
  );
}

export default page;
