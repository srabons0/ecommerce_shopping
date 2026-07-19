import AdminPaymentHistory from "@/features/admin/dashboard/AdminPaymentHistory";
import AdminHeader from "@/features/admin/layout/AdminHeader";

function page() {
  return (
    <div>
      <AdminHeader></AdminHeader>
      <AdminPaymentHistory></AdminPaymentHistory>
    </div>
  );
}

export default page;
