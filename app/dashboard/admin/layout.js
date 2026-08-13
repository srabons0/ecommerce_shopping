import AdminSidebar from "@/features/admin/AdminSidebar";
import DashboardMobileMenu from "@/features/admin/DashboardMobileMenu";
import DashboardLiveRefresh from "@/features/layout/DashboardLiveRefresh";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Dashboard",
};

async function layout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  await connectDB();

  const user = await User.findById(session.user.id);

  if (!user) {
    redirect("/login");
  }
  return (
    <div className="lg:flex">
      <DashboardLiveRefresh />
      <div className="lg:w-78">
        <AdminSidebar className=""></AdminSidebar>
        <DashboardMobileMenu className=""></DashboardMobileMenu>
      </div>
      {children}
    </div>
  );
}

export default layout;
