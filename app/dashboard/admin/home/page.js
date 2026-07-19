import DashboardHome from "@/features/admin/dashboard/home/DashboardHome";
import AdminHeader from "@/features/admin/layout/AdminHeader";

function page() {
  return (
    <div className=" w-full">
      <AdminHeader></AdminHeader>
      <DashboardHome></DashboardHome>
    </div>
  );
}

export default page;
