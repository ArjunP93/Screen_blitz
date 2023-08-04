
import {useFormik} from 'formik'
import * as Yup from 'yup'


import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";


  export function SignUpForm() {

  const formik = useFormik({

    initialValues:{
      Name:'',
      Email:'',
      Mobile:'',
      Password:'',
      RetypePassword:''

    },
    validationSchema : Yup.object({
      Name: Yup.string().max(15, 'Must be 15 characters or less')
      .required('Required'),
      Mobile:Yup.string().min(1).required('Required'),
      Email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      Password: Yup.string()
          .min(6,'Must be 6 characters or more')
          .required('Required'),
      RetypePassword: Yup.string()
          .oneOf([Yup.ref('Password'), ''], 'Password not match')
          .required('Required')
  
  
    }),
    submitHandle:(data)=>{
      console.log('submitdata:',data)
    }

    


  })
 

   
  
    return (
      <div className="flex items-center justify-center h-screen bg-black">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        
        <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg">
          <div className="mb-4 flex flex-col gap-1">
            <Input size="lg" label="Name"
            {...formik.getFieldProps('Name')} />
            <p className=" text-xs ml-2 text-red-800">{formik.touched.Name && formik.errors.Name ?
                        formik.errors.Name : null}</p>
            <Input size="lg" label="Email" 
             {...formik.getFieldProps('Email')}/>
             <p className="text-xs ml-2 text-red-800">{formik.touched.Email && formik.errors.Email ?
                        formik.errors.Email : null}</p>
            <Input size="lg" label="Mobile" 
            {...formik.getFieldProps('Mobile')}/>
            <p className="text-xs ml-2 text-red-800">{formik.touched.Mobile && formik.errors.Mobile ?
                        formik.errors.Mobile : null}</p>
            <Input type="password" size="lg" label="Password"
             {...formik.getFieldProps('Password')} />
             <p className="text-xs ml-2 text-red-800">{formik.touched.Password && formik.errors.Password ?
                        formik.errors.Password : null}</p>
            <Input type="password" size="lg" label="RetypePassword"
            {...formik.getFieldProps('RetypePassword')} />
            <p className="text-xs ml-2 text-red-800">{formik.touched.RetypePassword && formik.errors.RetypePassword ?
                        formik.errors.RetypePassword : null}</p>
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
          <Button className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a
              href="#"
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