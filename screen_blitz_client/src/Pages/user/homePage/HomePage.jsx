import React, { useEffect } from 'react'
import { HomeNavbar } from '../../../Components/user/navbar/HomeNavbar'
import { HomeNav } from '../../../Components/user/navbar/HomeNav'
import {HomeCarosal} from '../../../Components/user/carosel/HomeCarosal'
import { MovieCard } from '../../../Components/card/MovieCard'
import { UserFooter } from '../../../Components/footer/UserFooter'

function HomePage() {
  return (
  
    <div className='w-100'>
    
    <div >
    <HomeNavbar/>
    </div>
  
    <div className='mt-24 h-64'>
      <HomeCarosal/>
    </div>
    <div className='m-4'>
      <MovieCard/>
    </div>

    
          <UserFooter/>

          </div>

  )
}

export default HomePage