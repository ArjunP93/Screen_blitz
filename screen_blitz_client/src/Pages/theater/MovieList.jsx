import React, { useEffect } from 'react'
import { TheaterNavbar } from '../../Components/theater/navbar/TheaterNavbar'
import { TheaterSideBar } from '../../Components/theater/theaterSidebar/TheaterSideBar'
import { Approve } from '../../Components/theater/Approve'
import { useState } from 'react'
import { fetchMovies } from '../../api/theaterApi'
import { MovieListTable } from '../../Components/theater/theaterSimpleTable/MovieListTable'
import { useDispatch,useSelector } from 'react-redux'
import { setAllMovielist } from '../../redux/theaterSlice'
function MovieList(props) {
  const dispatch =useDispatch()

  const movieDetails = useSelector((store)=>store.theater.allMovieList)

  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{

    async function fetchMoviesData(){
      const response = await fetchMovies()
      return response
      
    }
    fetchMoviesData().then((data)=>{
      
      dispatch(setAllMovielist(data.movieData))
      setIsLoading(false)

    })
  },[])

  



  return (
    <div>
        <TheaterNavbar />

        <TheaterSideBar/>
        <div className='  ms-[20rem]   bg-blue-gray-50 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
        {props.approval ? <MovieListTable data={movieDetails} loading={isLoading}/>:<Approve/>}

        </div>
        


    </div>
    
  )
}

export default MovieList