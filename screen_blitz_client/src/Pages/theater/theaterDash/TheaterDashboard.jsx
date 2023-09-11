import React,{useEffect} from 'react'

import { TheaterNavbar } from '../../../Components/theater/navbar/TheaterNavbar'
import { TheaterSideBar } from '../../../Components/theater/theaterSidebar/TheaterSideBar'
import { Approve } from '../../../Components/theater/Approve'

function TheaterDashboard(props) {



   console.log('props in admin dashboard',props.data)

  
  return (
    <div>
        <TheaterNavbar />

        <TheaterSideBar/>
        <div className='  ms-[20rem]   bg-blue-gray-50 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
        {props.approval ? null : <Approve/>}

        </div>
        


    </div>
  )
}

export default TheaterDashboard