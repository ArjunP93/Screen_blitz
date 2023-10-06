import React, { useEffect } from 'react'
import { HomeNavbar } from '../../Components/user/navbar/HomeNavbar';
import { HomeCarosal } from '../../Components/user/carosel/HomeCarosal';
import { UserFooter } from '../../Components/footer/UserFooter';
import { moviesFetchGuest } from '../../api/guestApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setGuestMovieSearch } from '../../redux/guestSlice';
import GuestMovieCard from '../../Components/card/GuestMovieCard';


function GuestHome() {
const guestSearchMovieResults = useSelector((store)=>store.guest.guestMovieSearch)
const dispatch = useDispatch()
    useEffect(() => {
        async function fetchAllMovies() {
          const movieResponse = await moviesFetchGuest();
          return movieResponse;
        }
        async function fetchAllBanners() {
          // const bannerResponse = await
          // return bannerResponse
        }
    
        fetchAllMovies().then((data) => {
            dispatch(setGuestMovieSearch(data.movieData));
        });
      }, []);
        
      
      async function bookClickHandle(){
        
        toast.error(`please login to continue...`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
        {guestSearchMovieResults?.length > 0 ? (
          guestSearchMovieResults?.map((movie, _id) => <GuestMovieCard bookHandle={bookClickHandle} key={_id} data={movie} />)
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


export default GuestHome