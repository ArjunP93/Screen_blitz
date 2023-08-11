import { useState,useEffect } from 'react';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";


  export function SignUpForm(props) {
    
    const navigate = useNavigate()
    


    

  const formik = useFormik({

    initialValues:{
      name:'',
      email:'',
      mobile:'',
      password:'',
      retypePassword:''

    },
    validationSchema : Yup.object({
      name: Yup.string().max(15, 'Must be 15 characters or less')
      .required('Required'),
      mobile:Yup.number().min(1).required('Required'),
      email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      password: Yup.string()
          .min(6,'Must be 6 characters or more')
          .required('Required'),
      retypePassword: Yup.string()
          .oneOf([Yup.ref('password'), ''], 'Password not match')
          .required('Required')
  
  
    }),
  
    onSubmit:async(values) => {
      console.log(values);
      const response=await props.onSubmit(values)
      console.log('signup jsx page ',response);
      if(response?.status==='success'){
        toast.success(`signup successfull !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

        navigate(props.locateLogin)
      }
    },

    


  })
 

   
  
    return (
      <div className="flex items-center justify-center h-screen bg-black">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          {props.heading}
        </Typography>
        
        <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg">
          <div className="mb-4 flex flex-col gap-1">
            <Input size="lg" label="name" type='string'
            {...formik.getFieldProps('name')} />
            <p className=" text-xs ml-2 text-red-800">{formik.touched.name && formik.errors.name ?
                        formik.errors.name : null}</p>
            <Input size="lg" label="email" type='email'
             {...formik.getFieldProps('email')}/>
             <p className="text-xs ml-2 text-red-800">{formik.touched.email && formik.errors.email ?
                        formik.errors.email : null}</p>
            <Input size="lg" label="mobile" type='number'
            {...formik.getFieldProps('mobile')}/>
            <p className="text-xs ml-2 text-red-800">{formik.touched.mobile && formik.errors.mobile ?
                        formik.errors.mobile : null}</p>
            <Input type="password" size="lg" label="password"
             {...formik.getFieldProps('password')} />
             <p className="text-xs ml-2 text-red-800">{formik.touched.password && formik.errors.password ?
                        formik.errors.password : null}</p>
            <Input type="password" size="lg" label="retypePassword"
            {...formik.getFieldProps('retypePassword')} />
            <p className="text-xs ml-2 text-red-800">{formik.touched.retypePassword && formik.errors.retypePassword ?
                        formik.errors.retypePassword : null}</p>
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-blue-500"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type='submit' className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a
              href={props.locateAftersignup}
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </a>
          </Typography>
        </form>

      </Card>
      </div>
    );
  }