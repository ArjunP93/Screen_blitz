import express,{Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'



const expressConfig = (app:Application)=>{
    // enable cors

    const enableCors = {
        origin:['https://screenblitz.online/'],
        exposeHeadrs:['Cross-Origin-Opener-Policy','Cross-Origin-Resource-Policy']
    }
    // express middlwares config
    app.use(cors(enableCors))
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser())
}
export default expressConfig




