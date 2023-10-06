import express from 'express'
import guestController from '../controller/guestController'

const guestRouter = express.Router()
guestRouter.get('/movielist',guestController.guestGetAllMovies)
guestRouter.post('/searchmovie',guestController.searchMovie)

export default guestRouter