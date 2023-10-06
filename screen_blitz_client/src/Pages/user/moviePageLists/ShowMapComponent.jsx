import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  setChoosenShowDate,
  setuserOperationsData,
} from "../../../redux/userSlice";

function ShowMapComponent(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const showDate = useSelector((store) => store.user.choosenShowDate);
  async function showTimeClickHandle(time) {
    const data = JSON.parse(localStorage.getItem("userOperationsData"));
    data.theaterId=props.theaterId
    data.showDate = showDate;
    data.selectedTheater = props.theater;
    data.selectedScreen = props.screen;
    data.selectedShow = time;
    data.screenId = props.screenObj._id;
    data.screenRows = props.screenObj.rows;
    data.screenCols = props.screenObj.columns;
    data.movieName = props.screenObj.movieName;
    data.ticketPrice = props.screenObj.ticketRate;
    if (showDate !== "") {
      localStorage.setItem("userOperationsData", JSON.stringify(data));
      dispatch(setuserOperationsData(data));
      navigate("/selectseats");
      dispatch(setChoosenShowDate(""));
    } else {
      toast.error(`please select show date to continue..`, {
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
  }
  return (
    <Button
      size="sm"
      color={""}
      className="me-1 bg-black"
      key={props.index}
      variant="outlined"
      onClick={() => {
        showTimeClickHandle(props.time[`show${props.index + 1}`]);
      }}
    >
      {props.time[`show${props.index + 1}`]}
    </Button>
  );
}

export default ShowMapComponent;
