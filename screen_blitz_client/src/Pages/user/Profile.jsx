import React, { useEffect, useState } from "react";
import { HomeNavbar } from "../../Components/user/navbar/HomeNavbar";
import { UserFooter } from "../../Components/footer/UserFooter";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  useSelect,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";

import { TableInprofile } from "../../Components/user/table/TableInprofile";
import { addProfilePic, editUserProfile, userProfileDetails } from "../../api/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

function Profile() {
  const [profilePicOpen, setProfilePicOpen] = React.useState(false);
  const [profileEditOpen, setProfileEditOpen] = React.useState(false);
  const [picURL, setPicURL] = useState("");
  const [fileData, setFileData] = useState(null);

  const handleProfilePicOpen = () => setProfilePicOpen(!profilePicOpen);
  const handleProfileEditOpen = () => setProfileEditOpen(!profileEditOpen);

  const [userProfileInfo, setUserProfileInfo] = useState({});
  const userId = useSelector((store) => store.user.userRedux.userId);
  const latestPic = userProfileInfo?.profilePic?.length;
  useEffect(() => {
    async function userDetails() {
      const response = await userProfileDetails(userId);
      return response;
    }
    userDetails().then((result) => {
      setUserProfileInfo(result.user);
    });
  }, []);

  //formik for profileediting
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      city: "",
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
      city: Yup.string()
        .matches(
          /^(?! )(?=.*[A-Za-z])[A-Za-z\s]*[A-Za-z](?<! )$/,
          "Only alphabets and spaces are allowed"
        )
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      values.id=userId 
      const response = await editUserProfile(values)
     if(response.status==="success"){
      console.log('responseee',response.user)
      setUserProfileInfo(response.user)
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
      handleProfileEditOpen();
    }else{
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
      handleProfileEditOpen();

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
    const response = await addProfilePic(userId, fileData);
    if (response.status === "success") {
      setUserProfileInfo(response.user);
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
      handleProfilePicOpen();
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
    <div className="bg-white w-full ">
      <div>
        <HomeNavbar user={true} />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="w-1/2">
          <div className="bg-white w-full mt-28 rounded-xl shadow-2xl">
            <div>
              <p className="uppercase text-center font-bold text-xl p-2">
                user profile
              </p>
            </div>
            <div className="bg-white flex justify-center m-auto rounded-lg">
              <button onClick={handleProfilePicOpen}>
                <img
                  className="h-60 w-60 p-1 rounded-full object-cover object-center"
                  src={
                    userProfileInfo?.profilePic && latestPic > 0
                      ? `${userProfileInfo.profilePic[latestPic - 1]}`
                      : "https://daluscapital.com/wp-content/uploads/2016/04/dummy-post-square-1-1-300x300.jpg"
                  }
                  alt="nature image"
                />
              </button>
              <Dialog
                open={profilePicOpen}
                handler={handleProfilePicOpen}
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
                          alt="nature image"
                        />
                      ) : (
                        <img
                          // className="h-96 w-96 p-8 rounded-full object-cover object-center"
                          src="https://daluscapital.com/wp-content/uploads/2016/04/dummy-post-square-1-1-300x300.jpg"
                          alt="nature image"
                        />
                      )}
                    </div>
                    <label htmlFor="dropzone-file">
                      <div className="bg-deep-purple-500 p-2 rounded-xl">
                        <p className="text-white">select pic</p>
                      </div>

                      <input
                        type="file"
                        name="userProfileImage"
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
                    onClick={handleProfilePicOpen}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>

                  {picURL !== "" ? (
                    <Button
                      variant="gradient"
                      color="deep-purple"
                      onClick={handleAddPic}
                    >
                      <span>upload</span>
                    </Button>
                  ) : null}
                </DialogFooter>
              </Dialog>
            </div>

            {/* profile and edit dialog forms */}

            <table>
              <td className="p-8">
                <tr className="p-4 ">Name :</tr>
                <tr className="p-4">Email :</tr>
                <tr className="p-4">Mobile :</tr>
                <tr className="p-4">City :</tr>
              </td>

              <td className="p-8">
                <tr className="p-4">{userProfileInfo?.name}</tr>
                <tr className="p-4">{userProfileInfo?.email}</tr>
                <tr className="p-4">{userProfileInfo?.mobile}</tr>
                <tr className="p-4">{userProfileInfo?.city}</tr>
              </td>
            </table>
            <div className="text-end p-4 me-4">
              <Tooltip content="Edit User">
                <IconButton onClick={handleProfileEditOpen} variant="text">
                  <PencilIcon color="purple" className="h-4 w-4" />
                </IconButton>
              </Tooltip>

              <Dialog
                open={profileEditOpen}
                handler={handleProfileEditOpen}
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

                      <Input
                        size="lg"
                        label="city"
                        color="deep-purple"
                        type="string"
                        {...formik.getFieldProps("city")}
                      />
                      <p className=" text-xs ml-2 text-red-800">
                        {formik.touched.city && formik.errors.city
                          ? formik.errors.city
                          : null}
                      </p>

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
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button color="red" className="" onClick={handleProfileEditOpen}>
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

          <div className=" my-5  p-4  pb-4 shadow-2xl bg-white rounded-xl">
            <TableInprofile />
          </div>
        </div>
        <div className="w-5/12 h-52 pt-28 ">
          <Card className="shadow-2xl">
            <CardBody>
              <p className="text-center font-bold uppercase text-lg">wallet</p>
            </CardBody>
          </Card>
        </div>
      </div>

      <div>
        <UserFooter />
      </div>
    </div>
  );
}

export default Profile;
