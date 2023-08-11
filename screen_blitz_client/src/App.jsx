import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/user/homePage/HomePage";
import { SignUpForm } from "./Components/signUpForm/SignUpForm";
import { SignInForm } from "./Components/signInForm/SignInForm";
import { logIn, signUp } from "./api/userApi";
import { theaterLogIn, theaterSignup } from "./api/theaterApi";

import TheaterDashboard from "./Pages/theater/theaterDash/TheaterDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminSignInForm } from "./Components/admin/signInForm/AdminSignInForm";
import AdminDashboard from "./Pages/admin/adminDash/AdminDashboard";
import { useSelector } from "react-redux";

// import './App.css'

function App() {
  const userReduxToken = useSelector((state) => state.user.userRedux.userToken);
  const theaterReduxToken = useSelector(
    (state) => state.theater.theaterRedux.theaterToken
  );
  const adminReduxToken = useSelector(
    (state) => state.admin.adminRedux.adminToken
  );

  // console.log('reduxuserr',userReduxToken)
  // console.log('theaterReduxToken',theaterReduxToken)

  return (
    <>
      {/* <div className='container mx-auto max-w-screen-xl py-4'> */}
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/userhome"
            element={
              userReduxToken ? (
                <HomePage />
              ) : (
                <SignInForm
                  onSubmit={logIn}
                  heading="User Sign In"
                  locateHome="/userhome"
                  locateSignUp="/user/signup"
                />
              )
            }
          ></Route>

          <Route
            path="/user"
            element={
              <SignInForm
                onSubmit={logIn}
                heading="User Sign In"
                locateHome="/userhome"
                locateSignUp="/user/signup"
              />
            }
          ></Route>
          <Route
            path="/user/signup"
            element={
              <SignUpForm
                onSubmit={signUp}
                heading="User Sign Up"
                locateLogin="/user"
                locateAftersignup="/user"
              />
            }
          ></Route>

          <Route
            path="/theater"
            element={
              <SignInForm
                onSubmit={theaterLogIn}
                heading="Theater Sign In"
                locateHome="/theaterdash"
                locateSignUp="/theater/signup"
              />
            }
          ></Route>
          <Route
            path="/theater/signup"
            element={
              <SignUpForm
                onSubmit={theaterSignup}
                heading="Theater Sign Up"
                locateLogin="/theater"
                locateAftersignup="/theater"
              />
            }
          ></Route>
          <Route
            path="/theaterdash"
            element={
              theaterReduxToken ? (
                <TheaterDashboard />
              ) : (
                <SignInForm
                  onSubmit={theaterLogIn}
                  heading="Theater Sign In"
                  locateHome="/theaterdash"
                  locateSignUp="/theater/signup"
                />
              )
            }
          ></Route>

          <Route path="/admin" element={<AdminSignInForm />}></Route>
          <Route
            path="/admindash"
            element={adminReduxToken ? <AdminDashboard /> : <AdminSignInForm />}
          ></Route>
        </Routes>
      </BrowserRouter>

      {/* </div> */}
    </>
  );
}

export default App;
