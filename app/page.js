import Banner from "@/components/home/Banner";
import BrandManifesto from "@/components/home/BrandManifesto";
import Category from "@/components/home/Category";
import Review from "@/components/home/Review";
import FeaturedProduct from "@/components/Product/FeaturedProduct";
import Footer from "@/layout/Footer";
import Navbar from "@/layout/navbar/Navbar";
// import Navbar from "@/layout/Navbar";
import { connectDB } from "@/lib/mongodb";
import SubCategory from "@/models/SubCategory";

export default async function Home() {
  await connectDB();
  const category = JSON.parse(
    JSON.stringify(await SubCategory.find().select("name slug gender").lean()),
  );

  const subCategory = JSON.parse(
    JSON.stringify(await SubCategory.find().select("name slug gender").lean()),
  );
  return (
    <main className=" bg-white text-black relative overflow-auto">
      <Navbar category={category} subCategory={subCategory} />
      <Banner category={category} />
      <Category />
      <FeaturedProduct />
      <BrandManifesto />
      <Review />
      <Footer />
    </main>
  );
}
