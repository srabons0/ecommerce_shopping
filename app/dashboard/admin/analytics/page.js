import AdminAnalytics from "@/features/admin/dashboard/analytics/AdminAnalytics";
import AdminHeader from "@/features/admin/layout/AdminHeader";
import { connectDB } from "@/lib/mongodb";
import OrderHistory from "@/models/OrderHistory";
import Product from "@/models/Product";

async function page() {
  await connectDB();
  const [
    monthlyRevenue,
    categoryStats,
    weeklyRevenue,
    revenueByCategory,
    topSellingProducts,
    paymentMethods,
    lowStockProducts,
  ] = JSON.parse(
    JSON.stringify(
      await Promise.all([
        // Monthly Revenue
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

        // Category Stats
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

        // Weekly Revenue
        OrderHistory.aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 6)),
              },
            },
          },
          {
            $group: {
              _id: {
                $dayOfWeek: "$createdAt",
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

        // Revenue By Category
        OrderHistory.aggregate([
          {
            $unwind: "$items",
          },
          {
            $group: {
              _id: "$items.gender",
              revenue: {
                $sum: {
                  $multiply: ["$items.price", "$items.quantity"],
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              category: "$_id",
              revenue: 1,
            },
          },
          {
            $sort: {
              revenue: -1,
            },
          },
        ]),

        // Top Selling Products
        OrderHistory.aggregate([
          {
            $unwind: "$items",
          },
          {
            $group: {
              _id: "$items.productId",
              name: {
                $first: "$items.name",
              },
              image: {
                $first: "$items.image",
              },
              sold: {
                $sum: "$items.quantity",
              },
              revenue: {
                $sum: {
                  $multiply: ["$items.price", "$items.quantity"],
                },
              },
            },
          },
          {
            $sort: {
              sold: -1,
            },
          },
          {
            $limit: 10,
          },
          {
            $project: {
              _id: 0,
              productId: "$_id",
              name: 1,
              image: 1,
              sold: 1,
              revenue: 1,
            },
          },
        ]),

        // Payment Methods
        OrderHistory.aggregate([
          {
            $group: {
              _id: "$paymentMethod",
              totalOrders: {
                $sum: 1,
              },
              revenue: {
                $sum: "$total",
              },
            },
          },
          {
            $project: {
              _id: 0,
              name: "$_id",
              orders: "$totalOrders",
              revenue: 1,
            },
          },
        ]),

        // Low Stock Products
        Product.find({
          stock: {
            $lte: 5,
          },
        })
          .select("name image gender stock price")
          .sort({
            stock: 1,
          })
          .limit(10),
      ]),
    ),
  );


  return (
    <div className=" w-full">
      <AdminHeader
        path={"Analytics"}
        name={"All Analytics "}
        desc={"Gain insights into sales, traffic, and customer behavior."}
      ></AdminHeader>
      <AdminAnalytics
        monthlyRevenue={monthlyRevenue}
        categoryStats={categoryStats}
        weeklyRevenue={weeklyRevenue}
        revenueByCategory={revenueByCategory}
        topSellingProducts={topSellingProducts}
        paymentMethods={paymentMethods}
        lowStockProducts={lowStockProducts}
      ></AdminAnalytics>
    </div>
  );
}

export default page;
