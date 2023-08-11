import React,{useEffect} from 'react'
import Button from '../../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../redux/theaterSlice'

function TheaterDashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const signOut = ()=>{
        localStorage.removeItem('theaterData')
        dispatch(logOut())
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