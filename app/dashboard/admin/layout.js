import AdminSidebar from '@/features/admin/AdminSidebar'
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import React from 'react'

async function layout({children}) {
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
    <div className="flex">
      <div className='w-78'>
        <AdminSidebar className=""></AdminSidebar>
      </div>
      {children}
    </div>
  );
}

export default layout
