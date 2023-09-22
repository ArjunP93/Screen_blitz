import { BrowserRouter, Routes, Route, json } from "react-router-dom";

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
import UserList from "./Pages/admin/UserList";
import TheaterList from "./Pages/admin/TheaterList";
import MovieList from "./Pages/theater/MovieList";
import Notfound404 from "./Pages/errorPages/notFound404/Notfound404";
import MovieListAdmin from "./Pages/admin/MovieListAdmin";
import ScreenList from "./Pages/theater/ScreenList";
import ShowManage from "./Pages/theater/ShowManage";
import MoviePage from "./Pages/user/MoviePage";
import Location from "./Pages/admin/Location";
import ScreenSeatSelect from "./Pages/user/ScreenSeatSelect";

function App() {
  const userReduxToken = useSelector((state) => state.user.userRedux.userToken);
  const theaterReduxToken = useSelector(
    (state) => state.theater.theaterRedux.theaterToken
  );
  console.log('hghhhgh',theaterReduxToken);
  const adminReduxToken = useSelector(
    (state) => state.admin.adminRedux.adminToken
  );

  const theaterReduxData = useSelector((state) => state.theater.theaterData);

  const TheaterLocalStoreData = localStorage.getItem("theaterData");
  const tempData = JSON.parse(TheaterLocalStoreData);
  const theaterApproval = tempData?.approvalStatus;

  return (
    <>
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
                  google="true"
                />
              )
            }
          ></Route>
          <Route
            path="/movie"
            element={
              userReduxToken ? (
                <MoviePage/>
              ) : (
                <SignInForm
                  onSubmit={logIn}
                  heading="User Sign In"
                  locateHome="/userhome"
                  locateSignUp="/user/signup"
                  google="true"
                />
              )
            }
          ></Route>
          <Route
            path="/selectseats"
            element={
              userReduxToken ? (
                <ScreenSeatSelect/>
              ) : (
                <SignInForm
                  onSubmit={logIn}
                  heading="User Sign In"
                  locateHome="/userhome"
                  locateSignUp="/user/signup"
                  google="true"
                />
              )
            }
          ></Route>

          <Route
            path="/user"
            element={
              userReduxToken ? (
                <HomePage />
              ) : (
                <SignInForm
                  onSubmit={logIn}
                  heading="User Sign In"
                  locateHome="/userhome"
                  locateSignUp="/user/signup"
                  google="true"
                />
              )
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

          {/* theater routes */}

          <Route
            path="/theater"
            element={
              theaterReduxToken ? (
                <TheaterDashboard
                  approval={theaterApproval}
                  data={theaterReduxData}
                />
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
            path="/theaterlistmovies"
            element={
              theaterReduxToken ? (
                <MovieList approval={theaterApproval}  />
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
          
          <Route
            path="/screenlist"
            element={
              theaterReduxToken ? (
                <ScreenList approval={theaterApproval} data={theaterReduxData}  />
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
          <Route
            path="/allocatemovies"
            element={
              theaterReduxToken ? (
                <ShowManage approval={theaterApproval} data={theaterReduxData}  />
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

          <Route
            path="/theaterdash"
            element={
              theaterReduxToken ? (
                <TheaterDashboard
                  approval={theaterApproval}
                  data={theaterReduxData}
                />
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

          {/* admin Routes */}

          <Route
            path="/admin"
            element={adminReduxToken ? <AdminDashboard /> : <AdminSignInForm />}
          ></Route>
          <Route
            path="/admindash"
            element={adminReduxToken ? <AdminDashboard /> : <AdminSignInForm />}
          ></Route>
          <Route
            path="/admin/userlist"
            element={adminReduxToken ? <UserList /> : <AdminSignInForm />}
          ></Route>
          <Route
            path="/admin/theaterlist"
            element={adminReduxToken ? <TheaterList /> : <AdminSignInForm />}
          ></Route>

          <Route
            path="/admin/movielist"
            element={adminReduxToken ? <MovieListAdmin /> : <AdminSignInForm />}
          ></Route>
          <Route
            path="/admin/locations"
            element={adminReduxToken ? <Location /> : <AdminSignInForm />}
          ></Route>


          <Route path="/test" element={<Notfound404/>}>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
