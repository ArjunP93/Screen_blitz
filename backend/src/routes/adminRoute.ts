import express from 'express'
import adminController from '../controller/adminController'


const adminRoute = express.Router()


adminRoute.get('/userlist',adminController.userFetch)


export default  adminRoute