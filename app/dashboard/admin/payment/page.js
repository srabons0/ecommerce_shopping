import AdminPaymentHistory from "@/features/admin/dashboard/AdminPaymentHistory";
import AdminHeader from "@/features/admin/layout/AdminHeader";

function page() {
  return (
    <div className="w-full">
      <AdminHeader
        path={"Payment"}
        name={" Payment Management"}
        desc={
          "Manage payment methods, billing details, and transaction history."
        }
      ></AdminHeader>
      <AdminPaymentHistory></AdminPaymentHistory>
    </div>
  );
}

export default page;
