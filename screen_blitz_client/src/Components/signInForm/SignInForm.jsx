import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setTheater, setTheaterData } from "../../redux/theaterSlice";
import { setUser } from "../../redux/userSlice";
import { googleLogIn } from "../../api/userApi";
import { auth, googleProvider } from "../../firebase/googleAuth/config";
import { signInWithPopup } from "firebase/auth";

export function SignInForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGlogin = async () => {
    signInWithPopup(auth, googleProvider).then(async (data) => {
      console.log(data, "datta from firebse");
      const gData = { name: data.user.displayName, email: data.user.email };
      const response = await googleLogIn(gData);
      console.log("sigin jsx google page ", response);
      if (response?.user) {
        const userData = {
          userToken: response.token,
          userId: response.user._id,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        dispatch(setUser(userData));
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
    });
  };

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
        const userData = {
          userToken: response.token,
          userId: response.user._id,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        dispatch(setUser(userData));
      } else if (response?.theater) {
        const theaterData = {
          theaterToken: response.token,
          theaterId: response.theater._id,
          approvalStatus: response.theater.approvalStatus,
          theaterName: response.theater.theaterName,
        };
        localStorage.setItem("theaterData", JSON.stringify(theaterData));

        dispatch(setTheaterData(response.theater));
        dispatch(setTheater(theaterData));
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
    <div className="flex items-center justify-center h-screen bg-blue-gray-100">
      <Card className="w-96 shadow-xl" color="transparent" shadow={true}>
        <div className="m-auto py-4">
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

            <Button
              ripple={true}
              color="purple"
              variant="gradient"
              type="submit"
              className="mt-6 "
              fullWidth
            >
              Log In
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              create account{" "}
              <a
                href={props.locateSignUp}
                className="font-medium text-deep-purple-500 transition-colors hover:text-deep-purple-700"
              >
                Sign Up
              </a>
            </Typography>
          </form>
          {props.otp === true ? (
            <div className="m-3 text-center">
              <Button
                onClick={() => navigate("/user/otplogin")}
                size="sm"
                variant="outlined"
                color="deep-purple"
                className=""
              >
                OTP Login
              </Button>
            </div>
          ) : null}
          {props.google === "true" ? (
            <div className=" mx-12">
              <Button
                onClick={handleGlogin}
                size="sm"
                variant="outlined"
                color="blue-gray"
                className="flex text-center items-center gap-3"
              >
                <img
                  src="https://img.icons8.com/office/40/google-logo.png"
                  alt="googleicon"
                  className="h-6 w-6"
                />
                Continue with Google
              </Button>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
