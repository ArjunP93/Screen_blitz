
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
    },
    
    theaterIds:[{ type: Schema.Types.ObjectId, ref: 'Theater' }], // An array of ObjectIds referencing 'Theater' model

    
    


},{
    timestamps:true,
    // toJSON:{
    //     transform(doc,ret){
    //         ret.id = ret._id
    //         delete ret._id
    //         delete ret.__v
    //     }
    // }
})

// movieSchema.pre('save',()=>{
    
// })

const Movie = model('Movie',movieSchema)
export default Movie