import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { adminLogIn } from "../../../api/adminApi";
import { setAdmin } from "../../../redux/adminSlice";

export function AdminSignInForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const response = await adminLogIn(values);
      console.log("admin sigin jsx page ", response);
      if (response?.admin) {
        const adminData = {
          adminToken: response.token,
          adminId: response.admin._id,
        };
        localStorage.setItem("adminData", JSON.stringify(adminData));
        dispatch(setAdmin(adminData));
      }
      if (response?.status === "success") {
        toast.success(`adminsign in success !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/admindash");
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
          Admin Sign In
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
        </form>
      </Card>
    </div>
  );
}
