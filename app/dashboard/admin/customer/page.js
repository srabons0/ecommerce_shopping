import AdminUser from "@/features/admin/dashboard/user/AdminUser";
import AdminHeader from "@/features/admin/layout/AdminHeader";
import User from "@/models/User";

async function page({searchParams}) {
   const filters = await searchParams;
   const { page, search } = filters;

    const productFilters = {
    ...(search && { name: search })
  }

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
  console.log(customer);
  return (
    <div className=" w-full">
      <AdminHeader
        path={"Customer"}
        name={" Customer Management"}
        desc={"View customer profiles, purchase history, and account activity."}
      ></AdminHeader>
      <AdminUser customer={customer} customerCount={customerCount}></AdminUser>
    </div>
  );
}

export default page;
