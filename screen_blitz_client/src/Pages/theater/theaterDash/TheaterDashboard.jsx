import React from 'react'
import Button from '../../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function TheaterDashboard() {
    const navigate = useNavigate()
    const signOut = ()=>{
        localStorage.removeItem('token')
        toast.success("Signout success")
        navigate('/theater')

    }
  return (
    <>
        <div className='flex-col text-center py-10'>
            <h2>TheaterDashboard</h2>
        </div>
        <div className='text-center'>
            <button onClick={signOut}>logout</button> 
        </div>


    </>
  )
}

export default TheaterDashboard