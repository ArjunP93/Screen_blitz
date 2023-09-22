import React from 'react'
import { useState,useEffect } from 'react'
import { TheaterNavbar } from '../../Components/theater/navbar/TheaterNavbar'
import { TheaterSideBar } from '../../Components/theater/theaterSidebar/TheaterSideBar'
import { Approve } from '../../Components/theater/Approve'
import { fetchScreens } from '../../api/theaterApi'
import { ScreenListTable } from '../../Components/theater/theaterSimpleTable/ScreenListTable'
import { useDispatch, useSelector } from 'react-redux'
import { setAllScreenlist } from '../../redux/theaterSlice'


function ScreenList(props) {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true);
const screenDetails =useSelector((store)=>store.theater.allScreenList)
 const theaterInfo = useSelector((store)=>store.theater.theaterRedux)
  useEffect(()=>{
    async function fetchScreenDetails(dataId){
      const response = await fetchScreens(dataId)
      console.log('screenliar',response)
      return response
    }
    fetchScreenDetails(theaterInfo.theaterId).then((data)=>{
      console.log('data.screenData',data?.screenData)
     dispatch( setAllScreenlist(data?.screenData))
      setIsLoading(false)

    })
  },[])
  return (
    <div>
    <TheaterNavbar />

    <TheaterSideBar/>
    <div className='  ms-[20rem]   bg-blue-gray-50 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
    {props.data.approvalStatus ? <ScreenListTable data={screenDetails} loading={isLoading}/>:<Approve/>}

    </div>
    


</div>
  )
}

export default ScreenList