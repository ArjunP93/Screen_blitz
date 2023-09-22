import express from 'express'
import userController from '../controller/userController'



const userRouter = express.Router()

userRouter.get('/movielist',userController.getAllMovies)
userRouter.post('/searchmovie',userController.searchMovie)
userRouter.get("/locations",userController.getAllLocations)
userRouter.post('/movie',userController.moviePageData)






export default userRouter