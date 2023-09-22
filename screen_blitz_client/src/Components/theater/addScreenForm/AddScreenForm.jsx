import React from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addScreen } from "../../../api/theaterApi";
import { useDispatch, useSelector } from "react-redux";
import { setAllScreenlist } from "../../../redux/theaterSlice";

export function AddScreenForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screenListForUpdation = useSelector(
    (store) => store.theater.allScreenList
  );
  const theaterInfo = useSelector((store) => store.theater.theaterData);

  const formik = useFormik({
    initialValues: {
      screenName: "",
      Rows: 0,
      Columns: 0,
      show1: "00:00",
      show2: "00:00",
      show3: "00:00",
      show4: "00:00",
      show5: "00:00",
      show6: "00:00",
    },
    validationSchema: Yup.object({
      screenName: Yup.string()

        .max(25, "Must be 25 characters or less")
        .required("Required"),
      Rows: Yup.number().required("Required"),
      Columns:
        Yup.number()
        .required("Required"),

      show1: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),
      show2: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),
      show3: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),
      show4: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),
      show5: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),
      show6: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),
    }),

    onSubmit: async (values) => {
      values.theaterId = theaterInfo.theaterId;
      values.theaterName = theaterInfo.theaterName;
      console.log(values);
      const response = await addScreen(values);

     

      console.log(" page ", response);
      if (response?.status === "success") {
        const updatedScrnList = [
          ...screenListForUpdation,
          response?.addedScreenObj,
        ];
        dispatch(setAllScreenlist(updatedScrnList));


        toast.success(` Screen added successfully !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/screenlist");
      }else{
        toast.error(` ${response.message} !!`, {
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
      props.handleScreenAddOpen();
    },
  });

  return (
    <div className="m-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          <div className="w-80">
            <Typography color="black">Screen name</Typography>
            <Input
              color="teal"
              label="screenName"
              type="string"
              {...formik.getFieldProps("screenName")}
            />
            <p className=" text-xs ml-2 text-red-800">
              {formik.touched.screenName && formik.errors.screenName
                ? formik.errors.screenName
                : null}
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="w-80">
              <Typography color="black">Rows</Typography>
              <Input
                color="teal"
                label="select number of rows "
                type="number"
                {...formik.getFieldProps("Rows")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.Rows && formik.errors.Rows
                  ? formik.errors.Rows
                  : null}
              </p>
            </div>
            <div className="w-80">
              <Typography color="black">Columns</Typography>
              <Input
                color="teal"
                label="select number of columns of seat"
                type="number"
                {...formik.getFieldProps("Columns")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.Columns && formik.errors.Columns
                  ? formik.errors.Columns
                  : null}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 ">
            <div className="w-20">
              <Typography color="black">show 1</Typography>
              <Input
                color="teal"
                label="show 1 time"
                type="time"
                {...formik.getFieldProps("show1")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.show1 && formik.errors.show1
                  ? formik.errors.show1
                  : null}
              </p>
            </div>
            <div className="w-20">
              <Typography color="black">show 2</Typography>
              <Input
                color="teal"
                label="show 2 time"
                type="time"
                {...formik.getFieldProps("show2")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.show2 && formik.errors.show2
                  ? formik.errors.show2
                  : null}
              </p>
            </div>
            <div className="w-20">
              <Typography color="black">show 3</Typography>
              <Input
                color="teal"
                label="show 3 time"
                type="time"
                {...formik.getFieldProps("show3")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.show3 && formik.errors.show3
                  ? formik.errors.show3
                  : null}
              </p>
            </div>
            <div className="w-20">
              <Typography color="black">show 4</Typography>
              <Input
                color="teal"
                label="show 4 time"
                type="time"
                {...formik.getFieldProps("show4")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.show4 && formik.errors.show4
                  ? formik.errors.show4
                  : null}
              </p>
            </div>
            <div className="w-20">
              <Typography color="black">show 5</Typography>
              <Input
                color="teal"
                label="show 5 time"
                type="time"
                {...formik.getFieldProps("show5")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.show5 && formik.errors.show5
                  ? formik.errors.show5
                  : null}
              </p>
            </div>
            <div className="w-20">
              <Typography color="black">show 6</Typography>
              <Input
                color="teal"
                label="show 6 time"
                type="time"
                {...formik.getFieldProps("show6")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.show6 && formik.errors.show6
                  ? formik.errors.show6
                  : null}
              </p>
            </div>
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
