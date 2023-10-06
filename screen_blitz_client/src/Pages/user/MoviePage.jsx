import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { HomeNavbar } from "../../Components/user/navbar/HomeNavbar";
import { UserFooter } from "../../Components/footer/UserFooter";
import { ButtonGroup, Button } from "@material-tailwind/react";
import moment from "moment";
import { moviePageData } from "../../api/userApi";
import TheaterMapComponent from "./moviePageLists/TheaterMapComponent";
import { setChoosenShowDate } from "../../redux/userSlice";

function MoviePage() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [nextDays, setNextDays] = useState([]);

  const [theaterShowResults, setTheaterShowResults] = useState([]); // data for this page including theater and show details

  const [movieInfo, setMovieInfo] = useState({}); //to store movie details of selected movie
  const currentLocation = useSelector((store) => store.user.choosenLocation);
  const choosenMovie = useSelector(
    (store) => store.user.userOperationsData.movieId
  );


  const dispatch = useDispatch();


  function showDateClickHandle (date){
   dispatch(setChoosenShowDate(date.format('YYYY-MM-DD')))
  }

  //to get and update date and time
  useEffect(() => {
    // Calculate the next 6 days
    const nextDaysArray = [];
    nextDaysArray.push(currentDate);

    const calculateNextDays = () => {
      for (let i = 1; i <= 5; i++) {
        const nextDate = moment().add(i, "days");
        nextDaysArray.push(nextDate);
      }

      return nextDaysArray;
    };
    // Update the current date and next 6 days every second
    setCurrentDate(moment());
    setNextDays(calculateNextDays());

    // const intervalId = setInterval(() => {
    //   setCurrentDate(moment());
    //   setNextSixDays(calculateNextSixDays());
    // }, 10000);

    // Clear the interval when the component unmounts
    // return () => clearInterval(intervalId);
  }, []);

  //to fetch datas from server
  useEffect(() => {
    async function fetchMoviePageData() {
      const movieResponse = await moviePageData({
        location: currentLocation,
        movie: choosenMovie,
      });
      return movieResponse;
    }
    fetchMoviePageData().then((result) => {
      console.log("results", result);
      setTheaterShowResults(result?.results?.responseData);
      setMovieInfo(result?.results?.movie);
    });
  }, []);
  return (
    <div className="w-full h-full bg-blue-gray-200 overflow-y-auto ">
      <div className="">
        <HomeNavbar user={true} />
      </div>

      <div
        className="bg-cover bg-no-repeat  h-4/5 "
        style={{
          backgroundImage:
            `url(${movieInfo.backgroundPoster})`,
          // width: '1080px', // Adjust the width as needed
          // height: '400px', // Adjust the height as needed
        }}
      >
        <div className="flex flex-wrap mx-14  gap-3">
          <div className="bg-white  w-72 ms-32 mt-20 rounded-md border-solid">
            <img  src={movieInfo.poster} alt="" />
          </div>
          <div className="w-1/2 h-64 rounded-md mt-28  bg-transparent">
            <h1 className="ps-5 pt-3 font-semibold text-white uppercase text-4xl">
            {movieInfo.movieName}
              
            </h1>
            <h1 className="ps-5 pt-3 text-xl uppercase text-white">{movieInfo.language}</h1>
            <h1 className="ps-5 pt-3 text-xl text-white">Released on:   {moment(movieInfo.releaseDate).format('MMMM DD, YYYY')}</h1>
            <h1 className="ps-5 pt-3 text-white">Description: {movieInfo.overview}</h1>
          </div>
        </div>
      </div>
      <div className=" bg-blue-gray-200 w-screen">
        
          <div className="w-1/2 mx-2 my-3 px-2 py-2 bg-white rounded-lg">
            <ButtonGroup color="deep-purple" size="lg">
              {nextDays.length > 0
                ? nextDays.map((date, index) => (
                    <Button  key={index} onClick={()=>showDateClickHandle(date)}>{date.format("ddd Do MMM")}</Button>
                  ))
                : null}
            </ButtonGroup>
          </div>
        
      </div>
      <div className="w-screen my-3 bg-blue-gray-200">
        <div className="w-3/4 rounded-lg mx-auto ">
          <div className="bg-white rounded-xl  w-full">
            <div className="px-2 py-2 ">
              <h1 className="font-semibold text-xl ">Shows Available</h1>
            </div>
            <div className=" bg-gray-400 px-4 py-4">
              <div className="px-4 py-4 h-96 overflow-y-auto">
                {/* mapcomponent */}

                {theaterShowResults?.length > 0 ? (
                  theaterShowResults?.map((theater,index) => (
                   <TheaterMapComponent key={index} theater={theater}/> 
                  ))
                ) : (
                  <h1>no shows available</h1>
                )}
                {/* mapcomponent end*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <UserFooter />
      </div>
    </div>
  );
}

export default MoviePage;
