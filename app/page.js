import Banner from "@/components/home/Banner";
import BrandManifesto from "@/components/home/BrandManifesto";
import CallOut from "@/components/home/CallOut";
import Category from "@/components/home/Category";
import NewsLetter from "@/components/home/NewsLetter";
import Review from "@/components/home/Review";
import Upcoming from "@/components/home/Upcoming";
import FeaturedProduct from "@/components/Product/FeaturedProduct";
import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar";
import { connectDB } from "@/lib/mongodb";
import SubCategory from "@/models/SubCategory";


export default async function Home() {
    await connectDB();
  const category = JSON.parse(
      JSON.stringify(
        await SubCategory.find()
          .select("name slug gender")
          .lean(),
      ),
    );
  return (
    <main className=" bg-white text-black overflow-auto">
      <Navbar />
      <Banner category={category}/>
      <Category />
      <FeaturedProduct />
      <BrandManifesto />
      {/* <Upcoming /> */}
      {/* <CallOut /> */}
      <Review />
      {/* <NewsLetter /> */}
      <Footer />
    </main>
  );
}
