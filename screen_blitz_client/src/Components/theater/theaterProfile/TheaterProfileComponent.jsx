import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Tooltip,
  IconButton,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addProfilePic,
  editTheaterProfile,
  getTheaterProfileInfo,
} from "../../../api/theaterApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

function TheaterProfileComponent() {
  const theaterId = useSelector(
    (store) => store.theater.theaterRedux.theaterId
  );
  const [theaterProfileInfo, setTheaterProfileInfo] = useState({});
  const [locationList, setLocationList] = useState([]);
  const [addPicDialog, setAddPicDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [editSelectedLocation, setEditSelectedLocation] = useState("");
  const [picURL, setPicURL] = useState("");
  const [fileData, setFileData] = useState(null);
  const handlePicDialog = () => setAddPicDialog(!addPicDialog);
  const handleEditDialog = () => setEditDialog(!editDialog);
  console.log("theaterProfileInfo", theaterProfileInfo);
  useEffect(() => {
    async function fetchTheater() {
      const response = await getTheaterProfileInfo(theaterId);
      return response;
    }
    fetchTheater().then((data) => {
      setTheaterProfileInfo({
        ...data?.theater?._doc,
        screens: data?.theater?.screens,
      });
      setLocationList(data?.locations);
    });
  }, []);

  // formik for profileediting

  const formik = useFormik({
    initialValues: {
      name:theaterProfileInfo?.theaterName || "",
      mobile: "",
      location: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(
          /^(?! )(?=.*[A-Za-z])[A-Za-z\s]*[A-Za-z](?<! )$/,
          "Only alphabets and spaces are allowed"
        )
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      mobile: Yup.string()
        .matches(
          /^[0-9]{10}$/,
          "Mobile number must be exactly 10 digits and contain only numbers from 0 to 9"
        )
        .required("Mobile number is required"),
      location: Yup.string().required("Required"),
      description: Yup.string()
      .matches(
        /^[A-Za-z0-9\s]+$/,
        "Only alphabets, numbers, and spaces are allowed"
      )
        .max(50, "Must be 50 characters or less")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      values.id = theaterId;
      const response = await editTheaterProfile(values);
      if (response.status === "success") {
        console.log("responseee", response);
        setTheaterProfileInfo({ ...response?.theater,
            screens: response?.screens});
        toast.success(`profile updated !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleEditDialog();
      } else {
        toast.error(`something went wrong couldn't update profile !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleEditDialog();
      }
    },
  });

  const createURL = (e) => {
    const file = e.target.files[0];
    setFileData(e.target.files[0]);
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPicURL(imageURL);
    }
  };

  const handleAddPic = async () => {
    const response = await addProfilePic(theaterId, fileData);
    if (response.status === "success") {
      setTheaterProfileInfo(response.user);
      toast.success(`profile photo added !!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handlePicDialog();
    } else {
      toast.error(`something went wrong couldn't upload photo !!`, {
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
    <div className="w-full h-full">
      <div className="mx-auto  w-8/12 flex flex-col  rounded-lg shadow-lg">
        <div className="mx-auto">
          <button onClick={handlePicDialog}>
            <img
              className="h-60 w-60 p-1 rounded-full object-cover object-center"
              src={`${theaterProfileInfo?.profilePic}`}
              alt="profile image"
            />
          </button>
        </div>
        <div className="mx-auto">
          <table>
            <td className="p-4">
              <tr className="p-4 text-lg">Name </tr>
              <tr className="p-4 text-lg">Email </tr>
              <tr className="p-4 text-lg">Mobile </tr>
              <tr className="p-4 text-lg">Screens </tr>
              <tr className="p-4 text-lg">Location </tr>
              <tr className="p-4 text-lg">Description </tr>
            </td>
            <td className="p-4">
              <tr className="p-4 text-lg font-bold">
                {theaterProfileInfo?.theaterName}
              </tr>
              <tr className="p-4 text-lg font-bold">
                {theaterProfileInfo?.email}
              </tr>
              <tr className="p-4 text-lg font-bold">
                {theaterProfileInfo?.mobile}
              </tr>
              <tr className="p-4 text-lg font-bold">
                {theaterProfileInfo?.screens}
              </tr>
              <tr className="p-4 text-lg font-bold">
                {theaterProfileInfo.location}
              </tr>
              <tr className="p-4 text-lg font-bold">
                {theaterProfileInfo?.description}
              </tr>
            </td>
          </table>
        </div>

        {/* add pic dialog */}
        <Dialog
          open={addPicDialog}
          handler={handlePicDialog}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Add picture</DialogHeader>
          <DialogBody divider>
            <div className="flex items-center flex-wrap justify-center gap-5">
              <div className="">
                {picURL ? (
                  <img
                    className="h-96 w-96 p-8 rounded-full object-cover object-center"
                    src={picURL}
                    alt="theater profile image"
                  />
                ) : (
                  <img
                    // className="h-96 w-96 p-8 rounded-full object-cover object-center"
                    src="https://daluscapital.com/wp-content/uploads/2016/04/dummy-post-square-1-1-300x300.jpg"
                    alt="theater pic dummy"
                  />
                )}
              </div>
              <label htmlFor="dropzone-file">
                <div className="bg-deep-purple-500 p-2 rounded-xl">
                  <p className="text-white">select pic</p>
                </div>

                <input
                  type="file"
                  name="theaterProfileImage"
                  id="dropzone-file"
                  className="hidden"
                  onChange={createURL}
                ></input>
              </label>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handlePicDialog}
              className="mr-1"
            >
              Cancel
            </Button>

            {picURL !== "" ? (
              <Button
                variant="gradient"
                color="deep-purple"
                onClick={handleAddPic}
              >
                upload
              </Button>
            ) : null}
          </DialogFooter>
        </Dialog>

        {/* edit button and dialog */}

        <div className="text-end p-4 me-4">
          <Tooltip content="Edit User">
            <IconButton onClick={handleEditDialog} variant="text">
              <PencilIcon color="purple" className="h-4 w-4" />
            </IconButton>
          </Tooltip>

          <Dialog
            open={editDialog}
            handler={handleEditDialog}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader>Edit Profile</DialogHeader>
            <DialogBody divider>
              <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 ">
                <div className="mb-4 flex flex-col gap-1">
                  <Input
                    size="lg"
                    value={formik.values.name}
                    label="name"
                    color="deep-purple"
                    type="string"
                    {...formik.getFieldProps("name")}
                  />
                  <p className=" text-xs ml-2 text-red-800">
                    {formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : null}
                  </p>

                  <div className="flex w-80 flex-col gap-6">
                    <Select
                      value={formik.values.location}
                      onChange={(value) =>
                        formik.setFieldValue("location", value)
                      }
                      variant="standard"
                      label="Select Location"
                    >
                      {locationList.length ? (
                        locationList.map((data) => (
                          <Option key={data._id} value={data.location}>
                            {data.location}
                          </Option>
                        ))
                      ) : (
                        <p>no locations</p>
                      )}
                    </Select>
                    <p className=" text-xs ml-2 text-red-800">
                      {formik.touched.location && formik.errors.location
                        ? formik.errors.location
                        : null}
                    </p>
                  </div>

                  <Input
                    size="lg"
                    label="mobile"
                    color="deep-purple"
                    type="string"
                    {...formik.getFieldProps("mobile")}
                  />
                  <p className="text-xs ml-2 text-red-800">
                    {formik.touched.mobile && formik.errors.mobile
                      ? formik.errors.mobile
                      : null}
                  </p>
                  <Input
                    size="lg"
                    label="description"
                    color="deep-purple"
                    type="string"
                    {...formik.getFieldProps("description")}
                  />
                  <p className="text-xs ml-2 text-red-800">
                    {formik.touched.description && formik.errors.description
                      ? formik.errors.description
                      : null}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button color="red" className="" onClick={handleEditDialog}>
                    Cancel
                  </Button>
                  <Button type="submit" color="deep-purple" className="">
                    Update
                  </Button>
                </div>
              </form>
            </DialogBody>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default TheaterProfileComponent;
