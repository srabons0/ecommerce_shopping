import AdminAddProduct from "@/features/admin/dashboard/AddProduct/AdminAddProduct";
import AdminHeader from "@/features/admin/layout/AdminHeader";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Item from "@/models/Item";
import SubCategory from "@/models/SubCategory";

async function page() {
  await connectDB();
  const [category, subCategory, itemCategory] = JSON.parse(
    JSON.stringify(
      await Promise.all([
        Category.find().select("gender").lean(),
        SubCategory.find().select("name slug gender").lean(),
        Item.find().select("name slug gender colors subCategorySlug").lean(),
      ]),
    ),
  );
  return (
    <div className="w-full">
      <AdminHeader
        path="Add Products"
        name="Add Product"
        desc="Create a new product by adding its details, pricing, inventory, images, and visibility settings."
      ></AdminHeader>
      <AdminAddProduct
        category={category}
        subCategory={subCategory}
        itemCategory={itemCategory}
      ></AdminAddProduct>
    </div>
  );
}

export default page;
