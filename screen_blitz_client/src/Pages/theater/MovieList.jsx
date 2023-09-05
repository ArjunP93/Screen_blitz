import React, { useEffect } from 'react'
import { TheaterNavbar } from '../../Components/theater/navbar/TheaterNavbar'
import { TheaterSideBar } from '../../Components/theater/theaterSidebar/TheaterSideBar'
import { Approve } from '../../Components/theater/Approve'
import { useState } from 'react'
import { fetchMovies } from '../../api/theaterApi'
import { MovieListTable } from '../../Components/theater/theaterSimpleTable/MovieListTable'

function MovieAdd(props) {

  const [movieDetails,setMovieDetails] = useState([])

  useEffect(()=>{

    async function fetchMoviesData(){
      const response = await fetchMovies()
      return response
      
    }
    fetchMoviesData.then((data)=>{
      setMovieDetails(data.movies)
    })
  },[])


  return (
    <div>
        <TheaterNavbar />

        <TheaterSideBar/>
        <div className='  ms-[20rem]   bg-blue-gray-50 w-[calc(100vw-20rem)] h-[calc(100vh-56px)]'>
        {props.data.approvalStatus ? <MovieListTable data={movieDetails}/> :<Approve/>}

        </div>
        


    </div>
    
  )
}

export default MovieAdd