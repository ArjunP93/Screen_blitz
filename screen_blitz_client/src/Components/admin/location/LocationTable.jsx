import React, { useEffect, useState } from "react";
import { Input, Button, IconButton, Tooltip } from "@material-tailwind/react";
import {
  addLocation,
  allLocations,
  deleteLocation,
} from "../../../api/adminApi";
import { toast } from "react-toastify";
import { AlertDialog } from "../../alertDialogue/AlertDialog";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

function LocationTable() {
  const [locationVal, setLocationVal] = React.useState("");
  const [locationList, setLocationList] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [delId, setDelId] = useState("");

  useEffect(() => {
    async function fetchLocations() {
      const responseData = await allLocations();
      return responseData;
    }
    fetchLocations().then((resData) => {
      setLocationList(resData.locations);
    });
  }, []);

  const onChange = ({ target }) => setLocationVal(target.value);
  const handleAdd = async () => {
    const response = await addLocation({ location: locationVal });

    if (response?.status === "success") {
      toast.success(` ${response?.message} !!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLocationList([...locationList, response.location]);
    } else {
      toast.error(`${response?.error} !!`, {
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
    setLocationVal('')
  };
  async function handleDeleteLoc (id) {
    console.log("delId", id);
    const updatedlocList = locationList.filter((data) => {
      return data._id !== id;
    });
    console.log("updatedlocList", updatedlocList);

    const response = await deleteLocation(id);
    if (response?.status === "success") {
      toast.success(` ${response?.message} !!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLocationList(updatedlocList);
    } else {
      toast.error(`${response?.error} !!`, {
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
  };


  return (
    <div className="">
      <div>
        <h1 className="px-6 py-6 text-xl font-semibold">Locations</h1>
      </div>
      <div className="px-6 py-6">
        <div className=" relative   flex w-full max-w-[24rem]">
          <Input
            type="text"
            label="enter location"
            color="black"
            value={locationVal}
            onChange={onChange}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color={locationVal ? "gray" : "blue-gray"}
            disabled={!locationVal}
            className="!absolute right-1 top-1 rounded"
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="w-1/2 h-60 mx-auto">
        {locationList.length > 0 ? (
          locationList.map((loc) => (
            <div
              key={loc._id}
              className="flex justify-between px-2 py-2 border rounded-md"
            >
              <h1>{loc.location}</h1>
              <Tooltip content="Delete location">
                <IconButton variant="text">
                  <TrashIcon
                    // onClick={() => {
                    //   setDelId(loc._id); setDeleteAlert(true);
                    // }}
                    onClick={()=>handleDeleteLoc(loc._id)}
                    className="h-6 w-6 text-gray-800"
                  />
                  

                  {/* <AlertDialog
                    state={deleteAlert}
                    setState={setDeleteAlert}
                    actionHandler={handleDeleteLoc}
                    heading={"Delete Confirmation"}
                    message={"Are you sure you want to delete"}
                  /> */}
                </IconButton>
              </Tooltip>
            </div>
          ))
        ) : (
          <h2>no results</h2>
        )}
      </div>
    </div>
  );
}

export default LocationTable;
