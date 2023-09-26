import React, { useEffect, useState } from "react";
import { UserFooter } from "../../Components/footer/UserFooter";
import { HomeNavbar } from "../../Components/user/navbar/HomeNavbar";
import { Button } from "@material-tailwind/react";
import SeatColumn from "../../Components/user/seatAllocation/SeatColumn";
import { useSelector } from "react-redux";
import moment from "moment";

function ScreenSeatSelect() {
  const [totalAmount, setTotalAmount] = useState(0);
  const operationsDataUser = useSelector(
    (store) => store.user.userOperationsData
  );
  const selectedSeatsUser = useSelector(
    (store) => store.user.userSelectedSeats
  );
  const tickets = useSelector((store) => store.user.userSeatCount);

  const formattedPricePerTicket = operationsDataUser.ticketPrice.toLocaleString(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
    }
  );
  const rowCount = operationsDataUser.screenRows;
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx", operationsDataUser);

  const rowArray = Array.from({ length: rowCount }, (_, index) => index); //array place holder row objects for maping
  const seatNameArr = Array.from({ length: rowCount }, (_, index) => index); //array to print the alphabets for rows

  const bookedArray = [{ rowNo: 1, colNo: 2 }];
  // function for creating seat columns
  const seatColumnArray = [];

  function seatArrange(columns) {
    for (let c = 1; c < columns; c++) {
      const seatObj = { rowNo: 0, colNo: c };
      seatColumnArray.push(seatObj);
    }
  }
  seatArrange(operationsDataUser.screenCols);

  const bookingSubmitHandle = ()=>{
    
  }

  return (
    <div className="w-100 h-full bg-blue-gray-500">
      <div>
        <HomeNavbar />
      </div>

      <div className="h-40 bg-gray-300 ">
        <div className="flex gap-6 pt-24 ps-10">
          <div className="border text-lg rounded-lg  bg-amber-500">
            <h1 className="px-2 py-2 font-semibold">
              {moment(operationsDataUser.showDate).format("DD-MM-YYYY")}
            </h1>
          </div>
          <div className="border text-lg rounded-lg  bg-amber-500">
            <h1 className="px-2 py-2 font-semibold">
              Theater :{operationsDataUser.selectedTheater}
            </h1>
          </div>
          <div className="border text-lg rounded-lg  bg-amber-500">
            <h1 className="px-2 py-2 font-semibold">
              Screen :{operationsDataUser.selectedScreen}
            </h1>
          </div>
          <div className="border text-lg rounded-lg  bg-amber-500">
            <h1 className="px-2 py-2 font-semibold">
              Show Time :{operationsDataUser.selectedShow}
            </h1>
          </div>
          <div className="border text-lg rounded-lg  bg-amber-500">
            <h1 className="px-2 py-2 font-semibold">
              Ticket Price :{formattedPricePerTicket}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-4/5 h-screen m-auto px-2 py-2  bg-white">
        <div className=" bg-brown-50 w-full h-4/5 overflow-auto">
          <div className="w-2/3  h-3 mx-auto bg-blue-gray-900 "></div>

          <div className="mt-16 mx-auto">
            <div className="flex gap-3">
              <div className="bg-black w-12 grid grid-flow-column">
                {seatNameArr?.length > 0
                  ? seatNameArr?.map((item, alpha) => (
                      <div
                        key={alpha}
                        className="bg-blue-gray-400 border-solid ps-3 pt-3 w-12 h-10"
                      >
                        {String.fromCharCode(65 + alpha)}
                      </div>
                    ))
                  : null}
              </div>
              <div className="grid grid-flow-row">
                {rowArray?.length > 0
                  ? rowArray?.map((item, rowIndex) => (
                      <SeatColumn
                        key={rowIndex}
                        rowNo={rowIndex + 1}
                        seatColumnArray={seatColumnArray}
                        bookedArray={bookedArray}
                      />
                    ))
                  : null}
              </div>

              {/* <div className="bg-black w-12 grid grid-flow-column">

              <div className="bg-blue-gray-400 border-solid ps-3 pt-3 w-12 h-10">
                A
              </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="bg- my-3 start-0 w-1/2 h-28 rounded-lg border-2 border-solid border-black  px-3 py-3">
          <div className="flex gap-2 ">
            <div className=" w-1/2">
              <div className=" bg-cyan-700 mb-1  h-10 p-1 font-semibold text-center text-white rounded-lg">
                <span>Tickets</span>
                <span>:</span>
                <span>{tickets}</span>
              </div>
              <div className="bg-cyan-700  h-10 p-1 text-center font-semibold text-white rounded-lg">
                <span>Total</span>
                <span>:</span>
                <span>
                  {(tickets * operationsDataUser?.ticketPrice).toLocaleString(
                    "en-IN",
                    {
                      style: "currency",
                      currency: "INR",
                    }
                  )}
                </span>
              </div>
            </div>
            <div className="w-1/2 my-auto mx-10">
              <Button color="deep-purple" size="lg">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <UserFooter />
      </div>
    </div>
  );
}

export default ScreenSeatSelect;
