import React from "react";

function GuestMovieCard(props) {
  return (
    <div className="px-2 md:w-full w-60 hover:shadow-2xl py-2 border flex flex-col bg-white hover:border-2 hover:bg-gray-200 border-gray-200 cursor-pointer rounded-md shadow-md">
      <div className="flex justify-center items-center">
        <img
          src={props.data.poster}
          alt=""
          className="w-full h-full rounded-md"
        />
      </div>
      <div className="h-full gap-1 md:gap-2 px-2 py-1 flex flex-col justify-between">
        <div className="flex justify-between items-center gap-2">
          <h4 className="font-medium">{props.data.movieName}</h4>
          <span className="uppercase text-sm font-semibold">
            {" "}
            {props.data.language}
          </span>
        </div>
        <div className="">
          <button
            onClick={() => props.bookHandle()}
            className="uppercase w-full bg-purple-800 py-2 border-2  border-purple-800 hover:text-purple-800 hover:bg-white font-semibold rounded-md text-gray-50 transition duration-500"
          >
            book now
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuestMovieCard;
