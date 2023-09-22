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


const app : Application = express()
const server = http.createServer(app)

//mongodb connection 
connectDB()


//cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

//middleware express config 
expressConfig(app)

//routes

app.use('/api/auth', authRoute)
app.use('/api/admin',authMiddleware('admin'),adminRoute)
app.use('/api/theater',authMiddleware('theater'),theaterRoute)
app.use('/api/user',authMiddleware('user'),userRoute)

//start the server
serverConfig(server)



