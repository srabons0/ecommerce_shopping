import Footer from "@/features/layout/Footer";
import Navbar from "@/features/layout/Navbar";
import SalesFooter from "@/features/sales/SalesFooter";
import { connectDB } from "@/lib/mongodb";
import SubCategory from "@/models/SubCategory";

export const metadata = {
  title: "Sale",
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
      <SalesFooter category={category}></SalesFooter>
    </>
  );
}
