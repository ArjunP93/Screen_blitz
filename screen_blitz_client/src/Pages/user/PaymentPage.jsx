import React, { useEffect, useState } from "react";
import { HomeNavbar } from "../../Components/user/navbar/HomeNavbar";
import { UserFooter } from "../../Components/footer/UserFooter";
import PaymentCard from "../../Components/user/paymentCard/PaymentCard";
import { useSelector } from "react-redux";
import moment from "moment";
import { movieInfoGet } from "../../api/userApi";
import MultiPaymentCard from "../../Components/user/paymentCard/MultiPaymentCard";

function PaymentPage() {
  const [movieInfo, setMovieInfo] = useState({});
  const bookingConfirmDetails = useSelector(
    (store) => store.user.userOperationsData
  );

  useEffect(() => {
    async function fetchMovieById() {
      const response = await movieInfoGet(bookingConfirmDetails.movieId);
      return response;
    }
    fetchMovieById().then((data) => {
      setMovieInfo(data?.movie);
    });
  }, []);
  console.log("movieeee", movieInfo);
  const displaySelectedSeats = bookingConfirmDetails.selectedSeats.toString();
  return (
    <div className="bg-blue-gray-200 w-full h-full">
      <div>
        <HomeNavbar user={true} />
      </div>
      <div className=" pt-28 flex flex-wrap justify-center gap-20">
        {/* <div className="border  bg-deep-orange-600  "> */}
        <div className="bg-white p-12 h-full  border-blue-gray-900 rounded-lg  ">
          <div>
            <div className="w-full bg-white mb-6 ">
              <p className="font-bold uppercase text-lg text-center ">
                confirm booking
              </p>
            </div>
            <div className="flex flex-wrap h-full w-full px-10 gap-1 ">
              <div className=" border-1 rounded-lg border-blue-gray-900 bg-light-green-400 w-40 h-52 ">
                <img className="rounded-lg" src={movieInfo.poster} alt="" />
              </div>
              <div className="bg-gray-600 ">
                <div className="w-full bg-white px-3 py-3">
                  <p className="m-1">
                    Movie:
                    <span className="text-lg font-semibold uppercase">
                      {bookingConfirmDetails.movieName}
                    </span>
                  </p>
                  <p className="m-1">
                    Theater:
                    <span className="text-lg font-semibold uppercase">
                      {bookingConfirmDetails.selectedTheater}
                    </span>
                  </p>
                  <p className="m-1">
                    Screen:
                    <span className="text-lg font-semibold uppercase">
                      {" "}
                      {bookingConfirmDetails.selectedScreen}
                    </span>
                  </p>
                  <p className="m-1">
                    Time:
                    <span className="text-lg font-semibold uppercase">
                      {" "}
                      {bookingConfirmDetails.selectedShow}
                    </span>
                  </p>
                  <p className="m-1">
                    Seats:
                    <span className="text-lg font-semibold uppercase">
                      {" "}
                      {displaySelectedSeats}
                    </span>
                  </p>
                  <p className="m-1">
                    Show Date:
                    <span className="text-lg font-semibold uppercase">
                      {" "}
                      {moment(bookingConfirmDetails.showDate).format(
                        "DD-MM-YYYY"
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div>
          {/* <PaymentCard /> */}
          <MultiPaymentCard />{" "}
        </div>
      </div>
      <div className="mt-10">
        <UserFooter />
      </div>
    </div>
  );
}

export default PaymentPage;
