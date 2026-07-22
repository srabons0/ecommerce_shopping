import ProfileInfo from '@/features/admin/dashboard/profile/ProfileInfo';
import AdminHeader from '@/features/admin/layout/AdminHeader';
import React from 'react'

function page() {
  return (
    <div className=" w-full">
      <AdminHeader
        path={"Profile"}
        name={"My Profile"}
        desc={
          "Manage your personal details, contact information, and profile settings"
        }
      ></AdminHeader>
      <ProfileInfo></ProfileInfo>
    </div>
  );
}

export default page
