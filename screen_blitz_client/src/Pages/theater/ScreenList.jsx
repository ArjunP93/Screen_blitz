import React from 'react'
import { useState,useEffect } from 'react'
import { TheaterNavbar } from '../../Components/theater/navbar/TheaterNavbar'
import { TheaterSideBar } from '../../Components/theater/theaterSidebar/TheaterSideBar'
import { Approve } from '../../Components/theater/Approve'
function ScreenList(props) {
  const [screenDetails,setScreenDetails] = useState([])

  useEffect((props)=>{
    async function fetchScreenDetails(){
      const response = await fetchScreens()
      return response
    }
    fetchScreenDetails().then((data)=>{
      setScreenDetails(data)
    })
  },[])
  return (
    <div>
    <TheaterNavbar />

    <TheaterSideBar/>
    <div className='  ms-[20rem]   bg-blue-gray-50 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
    {props.data.approvalStatus ? null:<Approve/>}

    </div>
    


</div>
  )
}

export default ScreenList