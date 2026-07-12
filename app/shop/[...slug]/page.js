import ProductModal from "@/features/shop/ProductModal";
import ShopCategory from "@/features/shop/ShopCategory";
import ShopProduct from "@/features/shop/ShopProduct";
import ShopProductTool from "@/features/shop/ShopProductTool";
import ShopSidebar from "@/features/shop/ShopSidebar";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Item from "@/models/Item";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import React from "react";

async function page({ params, searchParams }) {
  const resolvedParams = await params;
  const filters = await searchParams;
  const slug = resolvedParams.slug || [];
  const gender = slug[0];
  const subCategorySlug = slug[1];
  const { colors, size, inStock, onSale, ratings, price, cat,page } = filters;
  const sortby = slug[2];

  // console.log("slug", slug);
  console.log("filters", filters);
  // cat &&console.log(cat.split(","));
  // colors && console.log("colors",colors.split(","));

  // console.log(subCategorySlug)

  const productFilters = {
    ...(!cat && { subCategorySlug: subCategorySlug }),
    ...(cat && { itemSlug: { $in: cat.split(",") } }),
    ...(inStock === "true" && { stock: { $gte: 10 } }),
    ...(onSale === "true" && { isOnSale: onSale }),
    ...(price && { price: { $lt: Number(price) } }),
    ...(size && { "attributes.sizes": { $in: size.split(",") } }),
    ...(colors && { "attributes.colors": { $in: colors.split(",") } }),
    ...(ratings && {
      "ratings.average":
        Number(ratings) === 5
          ? 5
          : {
              $gte: Number(ratings),
              $lt: Number(ratings) + 1,
            },
    }),
  };

  let sort = {};

  switch (sortby) {
    case "newest":
      sort = { createdAt: -1 };
      break;
    case "popular":
      sort = { salesCount: -1 };
      break;
    case "price-asc":
      sort = { price: 1 };
      break;
    case "price-desc":
      sort = { price: -1 };
      break;
    case "rating":
      sort = { "ratings.average": -1 };
      break;
    case "viewed":
      sort = { viewCount: -1 };
      break;
    case "AtoZ":
      sort = { name: 1 };
      break;
    case "ZtoA":
      sort = { name: -1 };
      break;
    default:
      sort = { createdAt: -1 };
  }

  const limit =15;
  // console.log(JSON.stringify(productFilters));
  await connectDB();
  const product = JSON.parse(JSON.stringify(await Product.find(productFilters)
  .skip((page-1)*limit)
    .limit(limit)
    .sort(sort)
    .select(
      "name slug gender images price stock isOnSale description shortDescription currency attributes ratings  item subCategory",
    )
    .lean()))

    const productCount = await Product.countDocuments(productFilters);


  const category = JSON.parse(
    JSON.stringify(await Category.find().select("gender").lean()),
  );

  const subCategory = JSON.parse(
    JSON.stringify(await SubCategory.find().select("name slug gender").lean()),
  );
  const itemCategory = JSON.parse(
    JSON.stringify(await Item.find().select("name slug gender colors").lean()),
  );

  // console.log("category", category);
  // console.log("subCategory", subCategory);
  // console.log("itemCategory", itemCategory);
  // console.log("product:", product.length, product);
  // console.log("product:", product.length);
  return (
    <div className="w-full h-full relative">
      {/* <ShopNav></ShopNav> */}
      {/* <ShopPage></ShopPage> */}
      {/* <ShopHeader></ShopHeader> */}
      <ShopCategory
        category={category}
        subCategory={subCategory}
        gender={slug[0]}
        subCat={subCategorySlug}
      ></ShopCategory>
      <div className="flex flex-row w-full h-full">
        <ShopSidebar
          category={itemCategory}
          gender={slug[0]}
          filters={filters}
        ></ShopSidebar>
        <div className="flex flex-col w-full h-full ">
          <ShopProductTool></ShopProductTool>
          <ShopProduct
            product={product}
            productCount={productCount}
          ></ShopProduct>
        </div>
      </div>
    </div>
  );
}

export default page;
