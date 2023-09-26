import React from 'react'
import { useState,useEffect } from 'react'
import { TheaterNavbar } from '../../Components/theater/navbar/TheaterNavbar'
import { TheaterSideBar } from '../../Components/theater/theaterSidebar/TheaterSideBar'
import { Approve } from '../../Components/theater/Approve'
import { fetchScreens,fetchMovies } from '../../api/theaterApi'
import { useDispatch, useSelector } from 'react-redux'
import { setAllScreenlist,setAllMovielist } from '../../redux/theaterSlice'
import MovieScreenAllocate from '../../Components/theater/movieScreenAllocate/MovieScreenAllocate'


function ShowManage(props) {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true);
const screenDetails =useSelector((store)=>store.theater.allScreenList)
console.log('screenDetails',screenDetails)
const movieDetails = useSelector((store)=>store.theater.allMovieList)
console.log('movieDetails',movieDetails)
 const theaterInfo = useSelector((store)=>store.theater.theaterRedux)
  useEffect(()=>{
    
    async function fetchData () {
      console.log('theaterInfo',theaterInfo)
        const screenResData = await fetchScreens(theaterInfo.theaterId);
        const movieResData = await fetchMovies(theaterInfo.theaterId);
         console.log('screenResData',screenResData)
         console.log('movieResData',movieResData)
        dispatch(setAllScreenlist(screenResData?.screenData));
        dispatch(setAllMovielist(movieResData?.movieData));
        
        setIsLoading(false);
      };

      fetchData()
    


    
  },[])

  console.log('screenDetails',screenDetails);
  console.log('movieDetails',movieDetails);
  return (
    <div>
    <TheaterNavbar />

    <TheaterSideBar/>
    <div className=' fixed  ms-[20rem]   bg-blue-gray-50 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
    {props.data?.approvalStatus ? <MovieScreenAllocate screen={screenDetails} movie={movieDetails}/>
 :<Approve/>}

    </div>
    

</div>
  )
}

export default ShowManage