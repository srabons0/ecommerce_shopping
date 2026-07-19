import AdminAddProduct from "@/features/admin/dashboard/AdminAddProduct";
import AdminHeader from "@/features/admin/layout/AdminHeader";

function page() {
  return (
    <div>
      <AdminHeader></AdminHeader>
      <AdminAddProduct></AdminAddProduct>
    </div>
  );
}

export default page;
