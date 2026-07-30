import Footer from "@/features/layout/Footer";
import Navbar from "@/features/layout/Navbar";
import { connectDB } from "@/lib/mongodb";
import SubCategory from "@/models/SubCategory";

export const metadata = {
  title: "Collection",
};

export default async function Layout({ children }) {
  await connectDB();
  const category = JSON.parse(
    JSON.stringify(await SubCategory.find().select("name slug gender").lean()),
  );
  return (
    <>
      <Navbar category={category}></Navbar>
      {children}
      <Footer category={category}></Footer>
    </>
  );
}
