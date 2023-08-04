import { useState } from 'react'
import Button from "./Components/Button/Button"
import { Router,Link } from 'react-dom'
import HomePage from './Pages/homePage/HomePage'
import { SignUpForm } from './Components/user/signUpForm/SignUpForm'


// import './App.css'

function App() {

  return (
    <>
    {/* <div className='container mx-auto max-w-screen-xl py-4'> */}
      {/* <HomePage/> */}
      <SignUpForm/>


    {/* </div> */}
    
  
    </>
  )
}

export default App
