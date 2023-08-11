import express,{Request,Response}from 'express'
import authController from '../controller/authController'



const authRoute = express.Router()



    authRoute.post('/login',authController.userLogin)
    authRoute.post('/signup',authController.UserSignup)
    authRoute.post('/glogin',authController.userGoogleAuth)
//theater login and signup
   
authRoute.post('/theater/login',authController.TheaterLogin)
authRoute.post('/theater/signup',authController.TheaterSignUp)
//admin login
authRoute.post('/admin/login',authController.adminLogin)



export default authRoute