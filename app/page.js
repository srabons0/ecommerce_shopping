import Banner from "@/components/home/Banner";
import BrandManifesto from "@/components/home/BrandManifesto";
import Review from "@/components/home/Review";
import FeaturedProduct from "@/components/Product/FeaturedProduct";
import Footer from "@/layout/Footer";
import Navbar from "@/layout/navbar/Navbar";
import { connectDB } from "@/lib/mongodb";
import SubCategory from "@/models/SubCategory";
import AllCategory from "@/components/home/AllCategory";
import Category from "@/models/Category";
import Product from "@/models/Product";
import DiscountProducts from "@/components/Product/DiscountProducts";
import CollectionIndex from "@/components/Product/CollectionIndex";

export default async function Home() {
  await connectDB();

  const [product, discountProduct,category, subCategory] = JSON.parse(
    JSON.stringify(
      await Promise.all([
        Product.find({ isFeatured: true })
          .limit(9)
          .sort({ createdAt: -1 })
          .select(
            "name slug gender images price stock isOnSale description shortDescription currency attributes ratings discountPercentage item subCategory brand",
          )
          .lean(),
          Product.find()
            .limit(3)
            .sort({ discountPercentage: -1 })
            .select(
              "name slug gender images price stock isOnSale description shortDescription currency attributes ratings discountPercentage item subCategory",
            )
            .lean(),
        Category.find().select("name slug image gender").lean(),
        SubCategory.find().select("name slug gender").lean(),
      ]),
    ),
  );
  console.log(discountProduct);

  return (
    <main className=" bg-white text-black relative overflow-auto">
      <Navbar category={subCategory} subCategory={subCategory} />
      <Banner category={subCategory} />
      <AllCategory category={category} subCategory={subCategory} />
      <FeaturedProduct
      
        product={product}
        category={subCategory}
      />
      <BrandManifesto />
      <DiscountProducts
        product={discountProduct}
        subCategory={subCategory}
      ></DiscountProducts>
      <CollectionIndex></CollectionIndex>
      <Review />
      <Footer category={subCategory} />
    </main>
  );
}
