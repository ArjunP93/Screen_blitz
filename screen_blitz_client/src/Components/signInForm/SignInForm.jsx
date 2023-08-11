import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"; 
import { setTheater } from "../../redux/theaterSlice";
import { setUser } from "../../redux/userSlice";

export function SignInForm(props) {
  const navigate = useNavigate();
  const dispatch=useDispatch()
 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const response = await props.onSubmit(values);
      console.log("sigin jsx page ", response);
      if (response?.user) {
        const userData={
          userToken:response.token,
          userId:response.user._id
        }
        localStorage.setItem("userData",JSON.stringify(userData) );
        dispatch(setUser(userData))
        
        
        
      } else if (response?.theater) {
        const theaterData= {
          theaterToken:response.token,
          theaterId:response.theater_id
        }
        localStorage.setItem("theaterData", JSON.stringify(theaterData));
        dispatch(setTheater(theaterData))
      }
      if (response?.status === "success") {
        
        toast.success(`sign success !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(props.locateHome);
      } else {
        console.log(`${response.message}`);
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
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          {props.heading}
        </Typography>

        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg"
        >
          <div className="mb-4 flex flex-col gap-1">
            <Input
              size="lg"
              label="email"
              type="email"
              {...formik.getFieldProps("email")}
            />
            <p className="text-xs ml-2 text-red-800">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </p>

            <Input
              type="password"
              size="lg"
              label="password"
              {...formik.getFieldProps("password")}
            />
            <p className="text-xs ml-2 text-red-800">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null}
            </p>
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Log In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            create account{" "}
            <a
              href={props.locateSignUp}
              className="font-medium text-deep-purple-700 transition-colors hover:text-deep-purple-700"
            >
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
