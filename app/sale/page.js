import ShopProduct from "@/features/shop/ShopProduct";
import ShopProductTool from "@/features/shop/ShopProductTool";
import ShopSidebar from "@/features/shop/ShopSidebar";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Item from "@/models/Item";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import React from "react";

async function page({ searchParams }) {
  const filters = await searchParams;
  await connectDB();
  const product = await Product.find()
    .limit(20)
    .sort()
    .select(
      "name slug gender images price stock isOnSale description shortDescription currency attributes ratings  item subCategory",
    )
    .lean();

  const category = JSON.parse(
    JSON.stringify(await Category.find().select("gender").lean()),
  );

  const subCategory = JSON.parse(
    JSON.stringify(await SubCategory.find().select("name slug gender").lean()),
  );
  const itemCategory = JSON.parse(
    JSON.stringify(await Item.find().select("name slug gender").lean()),
  );

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-row w-full h-full">
        <ShopSidebar
          category={itemCategory}
          gender={category.gender}
          filters={filters}
        ></ShopSidebar>
        <div className="flex flex-col w-full h-full ">
          <ShopProductTool></ShopProductTool>
          <ShopProduct product={product}></ShopProduct>
        </div>
      </div>
    </div>
  );
}

export default page;
