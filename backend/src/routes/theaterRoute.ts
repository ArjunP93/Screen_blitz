import express from 'express'
import theaterController from '../controller/theaterController'



const theaterRouter= express.Router()

theaterRouter.post('/addmovie',theaterController.addMovie)



export default theaterRouter