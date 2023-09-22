import React, { useEffect, useState } from "react";
import { HomeNavbar } from "../../../Components/user/navbar/HomeNavbar";
import { HomeNav } from "../../../Components/user/navbar/HomeNav";
import { HomeCarosal } from "../../../Components/user/carosel/HomeCarosal";
import { MovieCard } from "../../../Components/card/MovieCard";
import { UserFooter } from "../../../Components/footer/UserFooter";
import { moviesFetchUser, } from "../../../api/userApi";
import { useDispatch,useSelector } from "react-redux";
import { setMovieData,setuserOperationsData } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";




function HomePage() {
const navigate = useNavigate()
  const movies = useSelector((store)=>store.user.movieData)
  const [banners, setBanners] = useState([]);
  const dispatch = useDispatch()

  

  useEffect(() => {
    async function fetchAllMovies() {
      const movieResponse = await moviesFetchUser();
      return movieResponse;
    }
    async function fetchAllBanners() {
      // const bannerResponse = await
      // return bannerResponse
    }

    fetchAllMovies().then((data) => {
      dispatch(setMovieData(data.movieData));
    });
  }, []);

  async function bookClickHandle(movId){
    const data ={
      movieId:movId
    }
    localStorage.setItem('userOperationsData',JSON.stringify(data))
    dispatch(setuserOperationsData(data))
    navigate('/movie')
  }


  return (
    <div className="">
      <div>
        <HomeNavbar />
      </div>

      <div className="mt-24 h-64">
        <HomeCarosal />
      </div>
      {/* <div className='flex justify-center' > */}
      <div className=" px-5 py-5 ">
        <div className="text-xl px-2 py-2 font-semibold">
          <h3>Movies</h3>
        </div>
      <div className="grid md:grid-cols-4 grid-flow-col md:grid-flow-row md:h-full overflow-y-auto  gap-3">
        {movies.length > 0 ? (
          movies.map((movie, _id) => <MovieCard bookHandle={bookClickHandle} key={_id} data={movie} />)
        ) : (
          <p>No movies found.</p>
        )}
      </div>
      </div>
      {/* </div> */}

      <UserFooter />
    </div>
  );
}

export default HomePage;
