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


const app : Application = express()
const server = http.createServer(app)

//mongodb connection 
connectDB()

//middleware express config 
expressConfig(app)

//routes
app.get('/api',(req:Request,res:Response)=>{
    res.send('thisl is test to postman')
})
app.use('/api/auth', authRoute)
app.use('/api',userRoute)
app.use('/api/theater',theaterRoute)
app.use('/api/admin',adminRoute)

//start the server
serverConfig(server)



