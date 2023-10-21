import express from 'express'
import theaterController from '../controller/theaterController'
import { uploadTheaterPics } from '../multer/multer'
// import {uploadMoviePoster} from '../multer/multer'


const theaterRouter= express.Router()

theaterRouter.post('/addmovie',theaterController.addMovie)
theaterRouter.get('/movieslist/:id',theaterController.getMovies)
theaterRouter.get('/screenlist/:id',theaterController.getScreens)
theaterRouter.delete('/deletemovie/:movieId/:theater',theaterController.deleteMovie)
theaterRouter.delete('/deletescreen/:id',theaterController.deleteScreen)
theaterRouter.post('/addscreen',theaterController.addScreen)
theaterRouter.post('/movieallocate',theaterController.allocateScreen)
theaterRouter.post('/addprofilepic',uploadTheaterPics,theaterController.addProfilePic)
theaterRouter.get('/getprofile/:id',theaterController.getTheaterProfile)
theaterRouter.post('/edittheaterprofile',theaterController.editTheaterProfileInfo)
theaterRouter.get('/getchart/:id',theaterController.getChartData)


export default theaterRouter