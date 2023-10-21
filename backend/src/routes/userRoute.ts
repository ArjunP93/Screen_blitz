import express from 'express'
import userController from '../controller/userController'
import { uploadUserPics } from '../multer/multer'



const userRouter = express.Router()

userRouter.get('/movielist',userController.getAllMovies)
userRouter.post('/searchmovie',userController.searchMovie)
userRouter.get("/locations",userController.getAllLocations)
userRouter.post('/movie',userController.moviePageData)
userRouter.post('/booking/paymentURL',userController.bookingDataPost)
userRouter.get('/movieinfo/:id',userController.getMovieInfo)
userRouter.get('/bannerfetch',userController.getbanners)
userRouter.post('/booking/confirmation',userController.bookingCreate)
userRouter.post('/bookedseats',userController.bookedSeats)
userRouter.get('/userbookings/:id',userController.getUserBookings)
userRouter.get('/userprofile/:id',userController.getUserProfileInfo)
userRouter.post('/addprofilepic',uploadUserPics,userController.addProfilePic)
userRouter.post('/edituserprofile',userController.editUserProfileInfo)
userRouter.get('/cancelbooking/:id',userController.cancelBooking)



export default userRouter