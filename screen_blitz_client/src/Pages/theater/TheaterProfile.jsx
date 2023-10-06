import React from 'react'
import { TheaterNavbar } from '../../Components/theater/navbar/TheaterNavbar'
import { TheaterSideBar } from '../../Components/theater/theaterSidebar/TheaterSideBar'
import { Approve } from '../../Components/theater/Approve'
import TheaterProfileComponent from '../../Components/theater/theaterProfile/TheaterProfileComponent'

function TheaterProfile(props) {
  return (
    <div>
        <TheaterNavbar/>
        <TheaterSideBar/>
        <div className='  ms-[20rem]   bg-blue-gray-50 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
        {props.approval ? <TheaterProfileComponent/> : <Approve/>}

        </div>
        
    </div>
  )
}

export default TheaterProfile