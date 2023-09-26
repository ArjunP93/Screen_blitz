import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import SeatButton from "../../theater/seatButton/SeatButton";
import { useDispatch } from "react-redux";
import {
  setUserSeatCount,
  setUserSelectedSeats,
} from "../../../redux/userSlice";

function SeatColumn(props) {
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [sCount, setScount] = useState(0);
  console.log("selectedSeats", selectedSeats);

  // Function to add  seat to the selectedSeats array
  const handleSeatSelect = (seatId) => {
    setScount((prevState) => prevState + 1);
    setSelectedSeats([...selectedSeats, seatId]);
    dispatch(setUserSelectedSeats([...selectedSeats, seatId]));
    dispatch(setUserSeatCount(+1));
  };

  // Function to remove  seat from the selectedSeats array
  const handleSeatDeselect = (seatId) => {
    const newSeats = selectedSeats.filter(
      (selectedSeat) => selectedSeat !== seatId
    );
    setScount((prevState) => prevState - 1);

    setSelectedSeats(newSeats);

    dispatch(setUserSelectedSeats(newSeats));
    dispatch(setUserSeatCount(-1));
  };

  return (
    <div className="grid grid-flow-col gap-1 p-1">
      {props?.seatColumnArray?.length > 0
        ? props?.seatColumnArray?.map((data, colIndex) => {
            const rowAlphabet = String.fromCharCode(props.rowNo + 64);
            const seatId = `${rowAlphabet}${colIndex + 1}`;

            return (
              <SeatButton
                data={data}
                seatId={seatId}
                onSeatSelect={handleSeatSelect}
                onSeatDeselect={handleSeatDeselect}
              />
            );
          })
        : null}
    </div>
  );
}

export default SeatColumn;
