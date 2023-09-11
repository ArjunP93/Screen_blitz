import React from "react";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Typography, Tooltip, IconButton } from "@material-tailwind/react";
import { deleteMovie } from "../../../api/theaterApi";
import { toast } from "react-toastify";

function MovieListMap(props) {
  const handleDelete = async()=>{
    const response = await deleteMovie({movie_id:props.key})
    if(response.useState==="success"){
      toast.success(`${response.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }else{
      toast.error(`${response.message}`, {
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
    <tr key={props.key}>
      <td className={props.classes}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {props.movieName}
            </Typography>
            {/* <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-70"
          >
            {props.directorName}
          </Typography> */}
          </div>
        </div>
      </td>

      <td className={props.classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {props.releaseDate}
        </Typography>
      </td>
      <td className={props.classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {props.language}
        </Typography>
      </td>
      <td className={props.classes}>
        {/* <Tooltip content="Edit Movie">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
        </Tooltip> */}
        <Tooltip content="Delete Movie">
          <IconButton variant="text">
            <TrashIcon onClick={handleDelete} class="h-6 w-6 text-gray-800" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
}

export default MovieListMap;
