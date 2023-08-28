import React from 'react'

import { AdminSideBar } from '../../../Components/admin/adminSidebar/AdminSidebar'
import { AdminNavbar } from '../../../Components/admin/navbar/AdminNavbar'
import { UserListTable } from '../../../Components/admin/simpletable/UserlistTable'

function AdminDashboard() {




  return (
    <div>
      
        <AdminNavbar/>
        
       
        <AdminSideBar/>
        <div className='  ms-[20rem]   bg-blue-gray-900 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
        {/* <UserListTable/> */}

        </div>

     
      </div>






    
    
    
  
  )
}

export default AdminDashboard