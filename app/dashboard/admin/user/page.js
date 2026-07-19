import AdminUser from "@/features/admin/dashboard/user/AdminUser";
import AdminHeader from "@/features/admin/layout/AdminHeader";

function page() {
  return (
    <div className=" w-full">
      <AdminHeader></AdminHeader>
      <AdminUser></AdminUser>
    </div>
  );
}

export default page;
