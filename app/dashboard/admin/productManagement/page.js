import AdminAddProduct from "@/features/admin/dashboard/AddProduct/AdminAddProduct";
import AdminHeader from "@/features/admin/layout/AdminHeader";

function page() {
  return (
    <div className="w-full">
      <AdminHeader
        path="Add Products"
        name="Add Product"
        desc="Create a new product by adding its details, pricing, inventory, images, and visibility settings."
      ></AdminHeader>
      <AdminAddProduct></AdminAddProduct>
    </div>
  );
}

export default page;
