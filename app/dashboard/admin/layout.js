import AdminSidebar from '@/features/admin/AdminSidebar'
import React from 'react'

function layout({children}) {
  return (
    <div>
<AdminSidebar></AdminSidebar>
      {children}
    </div>
  )
}

export default layout
