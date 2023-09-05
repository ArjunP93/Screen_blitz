import {Request,Response} from 'express'
import Theater from '../models/theaterSchema'
import Movie from '../models/movieSchema'
import Screen from '../models/screenSchema'




const theaterController = {
    addMovie:async(req:Request,res:Response)=>{

        try {
            const movieData = req.body
            

            console.log('movie data request body',movieData)
            
        } catch (error) {
            
        }


    },
    getMovies:async(req:Request,res:Response)=>{
try {
    const moviesList = await Movie.find()
    res.json({movieData:moviesList,status:'success'})
    
} catch (error) {
    res.json({message:'could not fetch movies',status:'failed',error})
    
}

       
    },
    getScreens:async(req:Request,res:Response)=>{

        try {
            const screenList = await Screen.find()
             res.json({screenData:screenList,status:'success'})
            
        } catch (error) {
            res.json({message:'could not fetch movies',status:'failed',error})
            
        }

    }

}

export default theaterController