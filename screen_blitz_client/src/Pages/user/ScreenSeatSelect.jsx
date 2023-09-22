import React from 'react'
import { UserFooter } from '../../Components/footer/UserFooter'
import { HomeNavbar } from '../../Components/user/navbar/HomeNavbar'

function ScreenSeatSelect() {
  return (
    <div className='w-100 h-full bg-blue-gray-500'>
        <div>
            <HomeNavbar/>

        </div>
        <div className=' h-screen'>
            <div className='w-3/4 min-h-full m-auto bg-deep-orange-700'></div>

        </div>
        <div className='w-full'>

            <UserFooter/>
        </div>

    </div>
  )
}

export default ScreenSeatSelect