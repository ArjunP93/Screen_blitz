
import { Schema,model } from "mongoose";


const movieSchema = new Schema({

    movieName:{
        type:String

    },
    language:{
        type:String
    },
    directorName:{
        type:String
    },
    leadCast:{
        type:String
    },
    genere:{
        type:String
    },
    releaseDate:{
        type:String
    },
    poster:{
        type:String
    },
    backgroundPoster:{
        type:String
    },
    duration:{
        type:String
    },
    overview:{
        type:String
    },
    movieId:{
        type:Number
    }
    


},{timestamps:true})

const Movie = model('Movie',movieSchema)
export default Movie