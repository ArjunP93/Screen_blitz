import express from 'express'
import theaterController from '../controller/theaterController'
import {uploadMoviePoster} from '../multer/multer'


const theaterRouter= express.Router()

theaterRouter.post('/addmovie',theaterController.addMovie)
theaterRouter.get('/movieslist/:id',theaterController.getMovies)
theaterRouter.get('/screenlist/:id',theaterController.getScreens)
theaterRouter.delete('/deletemovie/:id',theaterController.deleteMovie)
theaterRouter.delete('/deletescreen/:id',theaterController.deleteScreen)
theaterRouter.post('/addscreen',theaterController.addScreen)
theaterRouter.post('/movieallocate',theaterController.allocateScreen)


export default theaterRouter