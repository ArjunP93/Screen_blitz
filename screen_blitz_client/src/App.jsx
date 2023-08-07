import { useState } from 'react'
import Button from "./Components/Button/Button"
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import HomePage from './Pages/user/homePage/HomePage'
import { SignUpForm } from './Components/signUpForm/SignUpForm';
import { SignInForm } from './Components/signInForm/SignInForm'
import { logIn, signUp } from './api/userApi';
import { theaterLogIn, theaterSignup } from './api/theaterApi';
import TheaterDashboard from './Pages/theater/theaterDash/TheaterDashboard';



// import './App.css'

function App() {

  return (
    <>
    {/* <div className='container mx-auto max-w-screen-xl py-4'> */}
    <BrowserRouter>
    <Routes>
      <Route path='/userhome' element={<HomePage/>}></Route>

      <Route path='/user' element={<SignInForm onSubmit={logIn} heading='User Sign In' locateHome='/userhome' locateSignUp='/user/signup' />}></Route>
      <Route path='/user/signup' element={<SignUpForm onSubmit={signUp} heading='User Sign Up' locateLogin='/user' locateAftersignup='/user' />}></Route>

      
      <Route path='/theater' element={<SignInForm onSubmit={theaterLogIn} heading='Theater Sign In' locateHome='/theaterdash' locateSignUp='/theater/signup' />}></Route>
      <Route path='/theater/signup' element={<SignUpForm onSubmit={theaterSignup} heading='Theater Sign Up' locateLogin='/theater' locateAftersignup='/theater' />}></Route>
      <Route path='/theaterdash' element={<TheaterDashboard/>}></Route>

    </Routes>
    
    
    </BrowserRouter>
     


    {/* </div> */}
    
  
    </>
  )
}

export default App
