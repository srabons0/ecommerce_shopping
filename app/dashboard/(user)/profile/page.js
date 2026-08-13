import DashboardNavbar from "@/features/user/DashboardNavbar/DashboardNavbar";
import ProfilePageClient from "@/features/user/profile/ProfilePageClient";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  await connectDB();

  const user = (JSON.parse(JSON.stringify(await User.findOne({ email: session.user.email }).lean())));

  return (
    <div>
      <DashboardNavbar
        path="Profile"
        name="Profile"
        desc="Manage your account information and personal details"
      />
      <ProfilePageClient initialUser={user || {}} />
    </div>
  );
}
