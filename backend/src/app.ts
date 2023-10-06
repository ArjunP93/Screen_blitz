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
import authMiddleware from './middlewares/authMiddleware';
import accessCheckMiddelware from './middlewares/accessCheckMiddelware';
import guestRouter from './routes/guestRoute';


const app : Application = express()
const server = http.createServer(app)

//mongodb connection 
connectDB()

// console.log('process.env.CLOUDINARY_CLOUD_NAME',process.env.CLOUDINARY_CLOUD_NAME)
// console.log('proces',process.env.CLOUDINARY_API_KEY)
// console.log('1111',process.env.CLOUDINARY_API_SECRET)
//cloudinary 
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET

// })
cloudinary.config({
        cloud_name: 'arjun-cloud-storage',
        api_key: '356783219286312',
        api_secret: 'hN92sGprnV_R0d9ho6jkHMOTves'
    
    })

//middleware express config 
expressConfig(app)

//routes

app.use('/api/auth', authRoute)
app.use('/api/admin',authMiddleware('admin'),adminRoute)
app.use('/api/theater',authMiddleware('theater'),accessCheckMiddelware.theaterBlockCheck,theaterRoute)
app.use('/api/user',authMiddleware('user'),accessCheckMiddelware.userBlockCheck,userRoute)
app.use('/api/guest',guestRouter)

//start the server
serverConfig(server)



