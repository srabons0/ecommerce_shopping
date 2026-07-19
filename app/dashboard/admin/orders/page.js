import AdminOrder from "@/features/admin/dashboard/order/AdminOrder";
import AdminHeader from "@/features/admin/layout/AdminHeader";

function page() {
  return (
    <div className=" w-full">
      <AdminHeader></AdminHeader>
      <AdminOrder></AdminOrder>
    </div>
  );
}

export default page;
