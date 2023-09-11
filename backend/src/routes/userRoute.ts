import express from 'express'
import userController from '../controller/userController'



const userRouter = express.Router()

userRouter.get('/movielist',userController.getAllMovies)
userRouter.post('/searchmovie',userController.searchMovie)





export default userRouter