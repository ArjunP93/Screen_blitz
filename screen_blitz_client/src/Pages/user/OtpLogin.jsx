import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { auth } from "../../firebase/googleAuth/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { findUserDetails, otpLogIn } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";

export function OtpLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otpInput, setOtpInput] = useState("");
  const [ShowOtp, setShowOtp] = useState(false);
  const [userObj, setUserObj] = useState({});

  const formik = useFormik({
    initialValues: {
      mobile: "",
    },
    validationSchema: Yup.object({
      mobile:Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits and contain only numbers from 0 to 9')
      .required('Mobile number is required')
    }),

    onSubmit: async (values) => {
      console.log("submit values in formik", values.mobile);
      onSignIn(values.mobile);
    },
  });
  //captcah function
  function captcahVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {},
        "expired-callback": () => {},
      }
    );
  }
  // otp sending and checking  user exists in db
  async function onSignIn(ph) {
    const validUser = await findUserDetails(ph);
    if (validUser.status === true) {
      captcahVerify();
      const phoneNumber = "+91" + ph;
      const appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setShowOtp(true);
          toast.success(`otp send success !!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
setUserObj(validUser.user); // if valid  user is saved to state
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      toast.error(`no user found plz signup and continue !!`, {
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

  const handleGetOtp = () => {
    formik.handleSubmit();
  };

  const verifyOtpAndSignin = () => {
    const code = otpInput;
    confirmationResult
      .confirm(code)
      .then(async (result) => {
        // User signed in successfully.
        const response = await otpLogIn({id: userObj._id });

        if (response.status === "success") {
          const userData = {
            userToken: response.token,
            userId: response.user._id,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          dispatch(setUser(userData));

          toast.success(`signin success !!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/userhome");
        } else if (response.userBlocked) {
          toast.error(`sign in failed you are blocked by Admin !!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/user");
        } else {
          toast.error(`sign in failed plz try other methods !!`, {
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
      })
      .catch((error) => {
        toast.error(` invalid otp code !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowOtp(false);
        setOtpInput("");
      });
  };

  return (
    <div className="w-full h-screen bg-blue-gray-100 pt-32">
      <Card className="w-96 mx-auto ">
      <CardHeader
        variant="gradient"
        color="purple"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Screen Blitz
        </Typography>
      </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {ShowOtp === false ? (
            <div className="">
              <div className="mb-4">
                <Input
                  color="purple"
                  label="enter mobile number"
                  size="lg"
                  type="string"
                  {...formik.getFieldProps("mobile")}
                />
                <p className="text-xs ml-2 text-red-800">
                  {formik.touched.mobile && formik.errors.mobile
                    ? formik.errors.mobile
                    : null}
                </p>
              </div>
              <div id="recaptcha-container"></div>

              <div className="mt-4">
                <Button
                  onClick={handleGetOtp}
                  variant="gradient"
                  color="purple"
                  fullWidth
                >
                  Get OTP
                </Button>
              </div>
            </div>
          ) : (
            <div className="">
              <div className="mb-2">
                <Input
                  onChange={(e) => setOtpInput(e.target.value)}
                  value={otpInput}
                  color="purple"
                  label="enter OTP"
                  size="lg"
                  type="text"
                />
              </div>
              <div id="recaptcha-container"></div>
              <div className="mt-2">
                <Button
                  onClick={verifyOtpAndSignin}
                  variant="gradient"
                  color="purple"
                  id="sign-in-button"
                  fullWidth
                >
                  {/* <span><Spinner/></span> */}
                  Sign In
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
