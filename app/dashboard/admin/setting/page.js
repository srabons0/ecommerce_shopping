import AdminSetting from "@/features/admin/dashboard/setting/AdminSetting";
import AdminHeader from "@/features/admin/layout/AdminHeader";

function page() {
  return (
    <div className=" w-full">
      <AdminHeader
        path={"Settings"}
        name={" Settings Management"}
        desc={"Configure your store, users, security, and preferences.."}
      ></AdminHeader>
      <AdminSetting></AdminSetting>
    </div>
  );
}

export default page;
