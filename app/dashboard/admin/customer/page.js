import AdminUser from "@/features/admin/dashboard/user/AdminUser";
import AdminHeader from "@/features/admin/layout/AdminHeader";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

async function page({ searchParams }) {
  const filters = await searchParams;
  const { page, search, status } = filters;

  const productFilters = {
    ...(search && { name: search }),
    ...(status !== "all" && status !== "admin" && { userStatus: status }),
    ...(status === "admin" && { role: status }),
  };
  await connectDB();

  const [customer, customerCount] = JSON.parse(
    JSON.stringify(
      await Promise.all([
        User.find(productFilters)
          .skip((page - 1) * 40)
          .limit(40)
          .lean(),
        User.countDocuments(),
      ]),
    ),
  );
  console.log(customer)
  return (
    <div className=" w-full">
      <AdminHeader
        path={"Customer"}
        name={" Customer Management"}
        desc={"View customer profiles, purchase history, and account activity."}
      ></AdminHeader>
      <AdminUser
        customer={customer}
        filters={filters}
        customerCount={customerCount}
      ></AdminUser>
    </div>
  );
}

export default page;
