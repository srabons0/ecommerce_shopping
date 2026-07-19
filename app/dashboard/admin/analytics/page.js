import AdminAnalytics from "@/features/admin/dashboard/analytics/AdminAnalytics";
import AdminHeader from "@/features/admin/layout/AdminHeader";

function page() {
  return (
    <div className=" w-full">
      <AdminHeader></AdminHeader>
      <AdminAnalytics></AdminAnalytics>
    </div>
  );
}

export default page;
