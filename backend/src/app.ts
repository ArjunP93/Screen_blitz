// Importing module
import express,{Application,Request,Response} from 'express';
import expressConfig from './config/expressConfig';
import http from 'http'
import connectDB from './config/databaseConfig';
import serverConfig from './config/server';
import adminRoute from './routes/adminRoute';
import userRoute from './routes/userRoute';
import theaterRoute from './routes/theaterRoute';
import authRoute from './routes/authRoute';
import {v2 as cloudinary} from 'cloudinary'


const app : Application = express()
const server = http.createServer(app)

//mongodb connection 
connectDB()


//cloudinary 
cloudinary.config({
    cloud_name:'arjun-cloud-storage',
    api_key:'356783219286312',
    api_secret:'hN92sGprnV_R0d9ho6jkHMOTves'

})

//middleware express config 
expressConfig(app)

//routes
app.get('/api',(req:Request,res:Response)=>{
    res.send('thisl is test to postman')
})
app.use('/api/auth', authRoute)
app.use('/api/admin',adminRoute)
app.use('/api/theater',theaterRoute)
app.use('/api/user',userRoute)

//start the server
serverConfig(server)



