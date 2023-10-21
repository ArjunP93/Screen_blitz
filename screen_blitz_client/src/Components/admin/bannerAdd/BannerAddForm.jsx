import React, { useState } from "react";
import {
  Button,
  Typography,
  Input,
  
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addBanner } from "../../../api/adminApi";

export function BannerAddForm(props) {
  const [bannerPic,setBannerPic] = useState('')
  const [bannerFile,setBannerFile]  = useState(null)
  const navigate = useNavigate();


  const handleChangeBanner = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setBannerPic(imageURL)
    }

    setBannerFile(file);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      
    },
    validationSchema: Yup.object({
      
      title: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed")
        .max(30, "Must be 30 characters or less")
        .required("Required"),
        description: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed")
        .max(30, "Must be 30 characters or less")
        .required("Required"),
        
      
    }),

    onSubmit: async (values) => {
      console.log(values);
      

       const response=await addBanner(values,bannerFile)
       if(response?.status ==='success'){
      toast.success(` Moviebanner added successfully !!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      props.handleBannerAddOpen()
      navigate('/admin/banner')


       }else{
        toast.error(`${response?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        props.handleBannerAddOpen()

        navigate('/admin/banner')


       }
    },
  });

  return (
    <div className="m-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
    
        <div className="space-y-4">
          <div className="w-11/12">
            <Typography color="black">Banner Title</Typography>
            <Input
              color="teal"
              label="banner name"
              type="string"
              {...formik.getFieldProps("title")}
            />
            <p className=" text-xs ml-2 text-red-800">
              {formik.touched.title && formik.errors.title
                ? formik.errors.title
                : null}
            </p>
          </div>
          
            <div className="w-80">
              <Typography color="black">Description</Typography>
              <Input
                color="teal"
                label="enter description"
                type="string"
                {...formik.getFieldProps("description")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : null}
              </p>
            </div>
           
          
          
          

          <div className="flex space-x-4">
            <div className="flex-col w-80">
              <Typography color="black">Banner</Typography>
              <Input
              name="banner"
                color="teal"
                type="file"
                onChange={handleChangeBanner}
              />
              <img height={"200px"} width={"200px"} src={bannerPic}></img>

              {/* <p className=" text-xs ml-2 text-red-800">
                {formik.touched.bannerImage && formik.errors.bannerImage
                  ? formik.errors.bannerImage
                  : null}
              </p> */}
            </div>
            {/* <div className="flex-col w-80">
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
            </div> */}
          </div>

         

          <div className="flex justify-center">
            <Button  onClick={formik.handleSubmit} variant="gradient" color="teal">
              <span>Submit</span>
            </Button>
          </div>
        </div>
    
    </div>
  );
}
