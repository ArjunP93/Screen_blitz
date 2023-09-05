
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
        type:Date
    },
    poster:{
        type:[]
    },
    duration:{
        type:String
    }


})

const Movie = model('Movie',movieSchema)
export default Movie