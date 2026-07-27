import AdminOrderHistory from "@/features/admin/dashboard/AdminOrderHistory";
import AdminHeader from "@/features/admin/layout/AdminHeader";

function page() {
  return (
    <div className="w-full">
      <AdminHeader
        path={"Order"}
        name={" Order Management"}
        desc={"Manage Order methods, billing details, and transaction history."}
      ></AdminHeader>
      <AdminOrderHistory></AdminOrderHistory>
    </div>
  );
}

export default page;
