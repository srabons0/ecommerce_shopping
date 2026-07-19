
import CollectionBody from "@/features/collection/CollectionBody";
import CollectionIndex from "@/features/collection/CollectionIndex";
import CollectionNews from "@/features/collection/CollectionNews";
import CollectionProduct from "@/features/collection/CollectionProduct";
import CollectionsHeader from "@/features/collection/CollectionsHeader";
import CollectionShowcase from "@/features/collection/CollectionShowcase";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import React from "react";

async function page({ searchParams, params }) {
  const resolvedParams = await params;
  const filters = await searchParams;
  const slug = resolvedParams.slug || [];
  const genderCollection = slug[0];
  const seasonalCollection = slug[1];
 const { page } = filters;
  const limit = 16;
    await connectDB();
   const [product, category, subCategory, productCount] = JSON.parse(
     JSON.stringify(
       await Promise.all([
         Product.find({
           gender: genderCollection,
           collection: {
             $regex: `^${seasonalCollection}$`,
             $options: "i",
           },
         })
           .select(
             "name slug gender images price stock isOnSale description shortDescription currency attributes ratings discountPercentage item subCategory collection",
           )
           .skip((page - 1) * limit)
           .limit(limit)
           .lean(),
         Category.find().select("gender").lean(),
         SubCategory.find().select("name slug gender").lean(),
         Product.countDocuments({
           gender: genderCollection,
           collection: {
             $regex: `^${seasonalCollection}$`,
             $options: "i",
           },
         }),
       ]),
     ),
   );


  // console.log(product);
  return (
    <div>
      {/* <CollectionsHeader></CollectionsHeader> */}
      <CollectionIndex></CollectionIndex>
      <CollectionBody></CollectionBody>
      <CollectionProduct
        product={product}
        category={category}
        productCount={productCount}
        subCategory={subCategory}
        gender={slug[0]}
      ></CollectionProduct>
      <CollectionShowcase></CollectionShowcase>
      <CollectionNews></CollectionNews>
    </div>
  );
}

export default page;
