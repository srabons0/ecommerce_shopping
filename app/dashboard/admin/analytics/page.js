import AdminAnalytics from "@/features/admin/dashboard/analytics/AdminAnalytics";
import AdminHeader from "@/features/admin/layout/AdminHeader";

function page() {
  return (
    <div className=" w-full">
      <AdminHeader
        path={"Analytics"}
        name={"All Analytics "}
        desc={"Gain insights into sales, traffic, and customer behavior."}
      ></AdminHeader>
      <AdminAnalytics></AdminAnalytics>
    </div>
  );
}

export default page;
