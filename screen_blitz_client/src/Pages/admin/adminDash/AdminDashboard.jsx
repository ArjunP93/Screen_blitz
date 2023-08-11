import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import {logOut} from '../../../redux/adminSlice'

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
    <>
    <div className='flex text-center'>welcome to AdminDashboard</div>
    <button onClick={logout} >logout</button>
    
    </>
  )
}

export default AdminDashboard