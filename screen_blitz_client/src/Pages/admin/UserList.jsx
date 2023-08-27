import React from 'react'
import { UserListTable } from '../../Components/admin/simpletable/UserlistTable'
import { useEffect } from 'react'
import { AdminNavbar } from '../../Components/admin/navbar/AdminNavbar'
import { AdminSideBar } from '../../Components/admin/adminSidebar/AdminSidebar'
import { userFetch } from '../../api/adminApi'




function UserList() {
  useEffect(()=>{
    async function fetchData(){
      const response = await userFetch()
      return response

    }
    const userDetails = fetchData()


  },[])
  return (
    <div>
        <AdminNavbar/>
        
       
        <AdminSideBar/>
        <div className='  ms-[20rem]   bg-blue-gray-900 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
        <UserListTable data={userDetails}/>

        </div>

    </div>
  )
}

export default UserList