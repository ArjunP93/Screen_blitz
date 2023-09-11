import React from "react";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Typography, Tooltip, IconButton } from "@material-tailwind/react";
import { deleteMovie } from "../../../api/theaterApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAllMovielist } from "../../../redux/theaterSlice";
import { AlertDialog } from "../../alertDialogue/AlertDialog";

function MovieListMap(props) {
  const [deleteAlert, setDeleteAlert] = useState(false);

  const dispatch = useDispatch();

  const movieList = useSelector((store) => store.theater.allMovieList);

  const handleDelete = async () => {
    const updatedMovieList = movieList.filter((data) => {
      return data._id != props.id;
    });
    dispatch(setAllMovielist(updatedMovieList));

    const response = await deleteMovie(props.id);

    if (response.status === "success") {
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
    } else {
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
    setDeleteAlert(!deleteAlert);
  };
  return (
    <tr key={props.key}>
      <td className={props.classes}>
      
          <div className="flex gap-6 items-center  ">
            <div >
            <img src={props.poster} className="w-12 h-15 rounded-md"   ></img>

            </div>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold "
            >
              {props.movieName}
            </Typography>
          
          </div>

      </td>
    

      <td className={props.classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {props.releaseDate}
        </Typography>
      </td>
      <td className={props.classes}>
        <Typography variant="small" color="blue-gray" className=" uppercase font-normal">
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
            <TrashIcon
              onClick={() => setDeleteAlert(true)}
              class="h-6 w-6 text-gray-800"
            />

            <AlertDialog
              state={deleteAlert}
              setState={setDeleteAlert}
              actionHandler={handleDelete}
              heading={'Delete Confirmation'}
              message={'Are you sure you want to delete'}
            />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
}

export default MovieListMap;
