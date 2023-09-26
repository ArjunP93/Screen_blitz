import React from "react";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Typography, Tooltip, IconButton } from "@material-tailwind/react";
import { deleteScreen } from "../../../api/theaterApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AlertDialog } from "../../alertDialogue/AlertDialog";
import { setAllScreenlist } from "../../../redux/theaterSlice";

function ScreenListMap(props) {
  const [deleteAlert, setDeleteAlert] = useState(false);

  const dispatch = useDispatch();

  const screenList = useSelector((store) => store.theater.allScreenList);
  

  const handleDelete = async () => {
    

    const updatedScreenList = screenList.filter((data) => {
      return data._id != props.id;

    });
    
    dispatch(setAllScreenlist(updatedScreenList));

    const response = await deleteScreen(props.id);

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
        <Typography variant="small" color="blue-gray" className="font-normal">
          {props.screenName}
        </Typography>
      </td>
      <td className={props.classes}>
      
         
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold "
            >
              {props.movieName}
            </Typography>
          
          

      </td>
    

      <td className={props.classes}>
        <div className="flex flex-col">

        { props.shows.length>0? (props.shows.map((data,index)=>
        (
          <div>
            <Typography variant="small" color="blue-gray" className=" uppercase font-normal">
            {data[`show${index + 1}`]}
                    </Typography>

          </div>

          ))):null}

        </div>
        
      </td>
      <td className={props.classes}>
        {/* <Tooltip content="Edit Movie">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
        </Tooltip> */}
        <Tooltip content="Delete Screen">
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

export default ScreenListMap;
