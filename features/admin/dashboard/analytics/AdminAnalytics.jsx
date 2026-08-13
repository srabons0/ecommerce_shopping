import WeeklyRevenueChart from "./WeeklyRevenueChart";
import RevenueChart from "./RevenueChart";
import RevenueByCategory from "./RevenueByCategory";
import TopSellingProducts from "./TopSellingProducts";
import PaymentMethods from "./PaymentMethods";
import LowStockProducts from "./LowStockProducts";

export default function AdminAnalytics({
  monthlyRevenue,
  weeklyRevenue,
  revenueByCategory,
  topSellingProducts,
  paymentMethods,
  lowStockProducts,
}) {
  return (
    <div className="min-h-screen bg-zinc-50 lg:pl-6">
      <div className="mx-auto max-w-7xl space-y-8 lg:px-6 py-8">
        <div className="grid gap-6 xl:grid-cols-1">
          <div className="xl:col-span-2">
            <RevenueChart monthlyRevenue={monthlyRevenue} />
          </div>

          <WeeklyRevenueChart weeklyRevenue={weeklyRevenue} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueByCategory revenueByCategory={revenueByCategory} />

          <PaymentMethods paymentMethods={paymentMethods} />
        </div>

        <TopSellingProducts topSellingProducts={topSellingProducts} />

        <LowStockProducts products={lowStockProducts} />
      </div>
    </div>
  );
}
