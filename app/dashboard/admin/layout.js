import AdminSidebar from '@/features/admin/AdminSidebar'
import React from 'react'

function layout({children}) {
  
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
