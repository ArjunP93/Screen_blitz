import express from 'express'
import theaterController from '../controller/theaterController'
import {uploadMoviePoster} from '../multer/multer'


const theaterRouter= express.Router()

theaterRouter.post('/addmovie',theaterController.addMovie)
theaterRouter.get('/movieslist',theaterController.getMovies)
theaterRouter.delete('/deletemovie/:id',theaterController.deleteMovie)



export default theaterRouter