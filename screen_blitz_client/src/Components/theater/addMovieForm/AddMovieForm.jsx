import React from "react";
import {
  Button,
  Dialog,
  Typography,
  Input,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addMovie } from "../../../api/theaterApi";

export function AddMovieForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      movieName: "",
      language: "",
      directorName: "",
      genere: "",
      leadCast: "",
      // releaseDate: "",
      // duration: "",
      duration: "00:00",
      poster1: undefined,
      poster2: undefined,
    },
    validationSchema: Yup.object({
      movieName: Yup.string()
        .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      language: Yup.string()
        .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      directorName: Yup.string()
        .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      genere: Yup.string()
        .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      releaseDate: Yup.date().required("Required"),
      leadCast: Yup.string()
        //Yup.array()
        //   .of(Yup.string())
        .required("At least one lead cast member is required"),
      duration: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),

      poster1: Yup.mixed(),
      // .test("fileType", "Invalid file format", (value) => {
      //   if (!value) return true; // for allowing empty values
      //   const supportedFormats = ["image/jpeg","image/jpg", "image/png", "image/gif"]; // supported formats
      //   return supportedFormats.includes(value.type);
      // })
      // .test("fileSize", "File is too large", (value) => {
      //   if (!value) return true; //  for allowing empty values
      //   const maxSize = 5 * 1024 * 1024; // 5MB (adjust file size)
      //   return value.size <= maxSize;
      // }),
      poster2: Yup.mixed(),
      // .test("fileType", "Invalid file format", (value) => {
      //   if (!value) return true; //  for allowing empty values
      //   const supportedFormats = ["image/jpg", "image/png", "image/gif"]; // supported formats
      //   return supportedFormats.includes(value.type);
      // })
      //     .test("fileSize", "File is too large", (value) => {
      //       if (!value) return true; //  for allowing empty values
      //       const maxSize = 5 * 1024 * 1024; // 5MB (adjust file size)
      //       return value.size <= maxSize;
      //     }),
    }),

    onSubmit: async (values) => {
      console.log(values);
       const response=await addMovie(values)
      // console.log(' page ',response);
      // if(response?.status==='success'){
      toast.success(` Movie added successfully !!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // }
    },
  });

  return (
    <div className="m-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          <div className="w-11/12">
            <Typography color="black">Movie Title</Typography>
            <Input
              color="teal"
              label="movieName"
              type="string"
              {...formik.getFieldProps("movieName")}
            />
            <p className=" text-xs ml-2 text-red-800">
              {formik.touched.movieName && formik.errors.movieName
                ? formik.errors.movieName
                : null}
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="w-80">
              <Typography color="black">Language</Typography>
              <Input
                color="teal"
                label="language"
                type="string"
                {...formik.getFieldProps("language")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.language && formik.errors.language
                  ? formik.errors.language
                  : null}
              </p>
            </div>
            <div className="w-80">
              <Typography color="black">Genre</Typography>
              <Input
                color="teal"
                label="genere"
                type="string"
                {...formik.getFieldProps("genere")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.genere && formik.errors.genere
                  ? formik.errors.genere
                  : null}
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-80">
              <Typography color="black">Director</Typography>
              <Input
                color="teal"
                label="directorName"
                type="string"
                {...formik.getFieldProps("directorName")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.directorName && formik.errors.directorName
                  ? formik.errors.directorName
                  : null}
              </p>
            </div>
            <div className="w-28">
              <Typography color="black">Release Date</Typography>
              <Input
                type="date"
                label="releaseDate"
                color="teal"
                {...formik.getFieldProps("releaseDate")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.releaseDate && formik.errors.releaseDate
                  ? formik.errors.releaseDate
                  : null}
              </p>
            </div>
          </div>
          <div className="w-11/12">
            <Typography color="black">Cast</Typography>
            <Input
              color="teal"
              label="leadCast"
              type="string"
              {...formik.getFieldProps("leadCast")}
            />
            <p className=" text-xs ml-2 text-red-800">
              {formik.touched.leadCast && formik.errors.leadCast
                ? formik.errors.leadCast
                : null}
            </p>
          </div>

          <div className="flex space-x-4">
            <div className="flex-col w-80">
              <Typography color="black">Poster 1</Typography>
              <Input
                color="teal"
                type="file"
                {...formik.getFieldProps("poster1")}
              />
              <img height={"200px"} width={"200px"} src=""></img>
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.poster1 && formik.errors.poster1
                  ? formik.errors.poster1
                  : null}
              </p>
            </div>
            <div className="flex-col w-80">
              <Typography color="black">Poster 2</Typography>
              <Input
                color="teal"
                type="file"
                {...formik.getFieldProps("poster2")}
              />
              <img height={"200px"} width={"200px"} src=""></img>
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.poster2 && formik.errors.poster2
                  ? formik.errors.poster2
                  : null}
              </p>
            </div>
          </div>

          <div className="w-60">
            <Typography color="black">Duration</Typography>
            <Input
              type="time"
              color="teal"
              label="duration"
              {...formik.getFieldProps("duration")}
            />
            <p className=" text-xs ml-2 text-red-800">
              {formik.touched.duration && formik.errors.duration
                ? formik.errors.duration
                : null}
            </p>
          </div>

          <div className="flex justify-center">
            <Button type="submit" variant="gradient" color="teal">
              <span>Submit</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
