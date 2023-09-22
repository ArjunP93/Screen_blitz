import express from 'express'
import adminController from '../controller/adminController'
import authMiddleware from '../middlewares/authMiddleware'


const adminRoute = express.Router()


adminRoute.get('/userlist',adminController.userFetch)
adminRoute.get('/theaterlist',adminController.theaterFetch)
adminRoute.put('/theaterlist/approval',adminController.theaterApprove)
adminRoute.put('/userlist/approval',adminController.userApprove)
adminRoute.put('/theaterlist/block',adminController.theaterBlockUnblock)
adminRoute.get('/allmovies',adminController.getAllMovies)
adminRoute.post('/addlocation',adminController.addLocations)
adminRoute.get('/locations',adminController.availableLocations)
adminRoute.delete('/removelocation/:id',adminController.deleteLocation)
export default  adminRoute