import express from 'express'
import adminController from '../controller/adminController'


const adminRoute = express.Router()


adminRoute.get('/userlist',adminController.userFetch)
adminRoute.get('/theaterlist',adminController.theaterFetch)


export default  adminRoute