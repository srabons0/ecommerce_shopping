import AdminSetting from "@/features/admin/dashboard/setting/AdminSetting";
import AdminHeader from "@/features/admin/layout/AdminHeader";

function page() {
  return (
    <div className=" w-full">
      <AdminHeader></AdminHeader>
      <AdminSetting></AdminSetting>
    </div>
  );
}

export default page;
