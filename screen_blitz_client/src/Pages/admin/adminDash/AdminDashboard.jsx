import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import {logOut} from '../../../redux/adminSlice'
import { AdminSideBar } from '../../../Components/admin/adminSidebar/AdminSidebar'
import { AdminNavbar } from '../../../Components/admin/navbar/AdminNavbar'
import { UserListTable } from '../../../Components/admin/simpletable/UserlistTable'

function AdminDashboard() {
    const navigate = useNavigate()
    const dispatch=useDispatch()

    const logout=()=>{
        localStorage.removeItem("adminData")
        dispatch(logOut())
        
        toast.success('logout success')
        navigate('/admin')

    }



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